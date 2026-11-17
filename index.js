/**
 * Host half of the Sensenova image-generation bundle.
 *
 * Registers the model-facing `generate_image` tool and declares the live
 * `profiles` / `activeProfileId` settings that the browser page writes through
 * the settings form. API keys never enter the configuration: each account
 * names a credential reference that `ctx.credentials` resolves per request.
 *
 * The Config schema is built with the Harness installation's own schemastery,
 * resolved from `DSH_INSTALL_DIR`, so this local bundle needs no dependencies.
 * @module dsh-sense-img
 */

import { createRequire } from 'node:module'
import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { pathToFileURL } from 'node:url'

/** Entry id of this plugin; it is also the settings namespace. */
export const ENTRY_ID = 'dsh-sense-img'

const DEFAULT_BASE_URL = 'https://token.sensenova.cn/v1/images/generations'
const DEFAULT_MODEL = 'sensenova-u1.5-lite'
const DEFAULT_PROFILE_ID = 'default'
const DEFAULT_TIMEOUT_MS = 180_000
const MAX_TIMEOUT_MS = 900_000

const FALLBACK_PROFILE = Object.freeze({
  id: DEFAULT_PROFILE_ID,
  name: '默认账号',
  baseUrl: DEFAULT_BASE_URL,
  model: DEFAULT_MODEL,
  apiKeyEnv: 'SENSENOVA_API_KEY',
})

/**
 * Resolve the schemastery copy that ships with the running Harness.
 *
 * The ESM entry is imported rather than `require`d so the resulting schema
 * class is the very instance the Loader already uses: a second copy would
 * fail its schema identity check, leaving this entry without a Config form.
 * The installation anchor cannot rely on `DSH_INSTALL_DIR`, which is exported
 * only to tool shells, so packaged (ASAR) and checkout layouts are probed.
 * @returns {Promise<{z?: any, error?: string}>} the schema builder or a reason.
 */
async function loadSchemaLibrary() {
  const seen = new Set()
  const anchors = []
  const push = value => {
    if (typeof value !== 'string' || value.length === 0 || seen.has(value)) return
    seen.add(value)
    anchors.push(value)
  }
  push(process.env.DSH_INSTALL_DIR)
  const resources = process.resourcesPath
  if (typeof resources === 'string') {
    push(join(resources, 'app.asar', 'dsh', 'node_modules', '@deepseek-ai', 'dsh'))
    push(join(resources, 'app', 'dsh', 'node_modules', '@deepseek-ai', 'dsh'))
    push(join(resources, 'app.asar.unpacked', 'dsh', 'node_modules', '@deepseek-ai', 'dsh'))
  }
  const executableDir = dirname(process.execPath ?? '')
  push(join(executableDir, 'resources', 'app.asar', 'dsh', 'node_modules', '@deepseek-ai', 'dsh'))
  push(join(executableDir, 'node_modules', '@deepseek-ai', 'dsh'))
  push(join(executableDir, '..', 'lib', 'node_modules', '@deepseek-ai', 'dsh'))
  let lastError
  for (const anchor of anchors) {
    try {
      const hostRequire = createRequire(join(anchor, 'package.json'))
      const manifest = hostRequire.resolve('@deepseek-ai/schemastery/package.json')
      const loaded = await import(pathToFileURL(join(dirname(manifest), 'lib', 'index.mjs')).href)
      const builder = loaded?.default
      if (typeof builder === 'function') return { z: builder }
      lastError = 'the schemastery ESM entry has no default export'
    } catch (error) {
      lastError = error?.message ?? String(error)
    }
  }
  try {
    const ownRequire = createRequire(import.meta.url)
    const manifest = ownRequire.resolve('@deepseek-ai/schemastery/package.json')
    const loaded = await import(pathToFileURL(join(dirname(manifest), 'lib', 'index.mjs')).href)
    if (typeof loaded?.default === 'function') return { z: loaded.default }
  } catch (error) {
    lastError = error?.message ?? String(error)
  }
  return { error: `schemastery was not found; anchors: ${anchors.join(', ')}; last error: ${lastError ?? 'none'}` }
}

const schemaLibrary = await loadSchemaLibrary()
const z = schemaLibrary.z

const ProfileSchema = z?.object({
  id: z.string().required(),
  name: z.string().default(''),
  baseUrl: z.string().default(DEFAULT_BASE_URL),
  model: z.string().default(DEFAULT_MODEL),
  apiKeyEnv: z.string().default('SENSENOVA_API_KEY'),
})

/** Live configuration form projected to the browser settings page. */
export const Config = z
  ? z.object({
    profiles: z.array(ProfileSchema).default([{ ...FALLBACK_PROFILE }]).volatile(),
    activeProfileId: z.string().default(DEFAULT_PROFILE_ID).volatile(),
    defaultSize: z.string().default('1024x1024').volatile(),
    timeoutMs: z.number().default(DEFAULT_TIMEOUT_MS).volatile(),
  })
  : undefined

/**
 * Read one Config field, whether it is a volatile live value or a plain value.
 * @param {any} config plugin configuration.
 * @param {string} key field name.
 * @param {any} fallback value used when the field is missing.
 * @returns {any} the effective value.
 */
function readField(config, key, fallback) {
  const field = config?.[key]
  if (field === undefined || field === null) return fallback
  if (typeof field.get === 'function') {
    const value = field.get()
    return value === undefined ? fallback : value
  }
  return field
}

/**
 * Sanitize the saved accounts.
 * @param {any} config plugin configuration.
 * @returns {Array<object>} usable profiles, never empty.
 */
function profilesOf(config) {
  const raw = readField(config, 'profiles', undefined)
  const list = Array.isArray(raw) ? raw : []
  const profiles = list.flatMap((entry, index) => {
    if (entry === null || typeof entry !== 'object') return []
    const id = typeof entry.id === 'string' && entry.id.length > 0 ? entry.id : `profile-${index}`
    return [{
      id,
      name: typeof entry.name === 'string' && entry.name.length > 0 ? entry.name : id,
      baseUrl: typeof entry.baseUrl === 'string' && entry.baseUrl.length > 0 ? entry.baseUrl : DEFAULT_BASE_URL,
      model: typeof entry.model === 'string' && entry.model.length > 0 ? entry.model : DEFAULT_MODEL,
      apiKeyEnv: typeof entry.apiKeyEnv === 'string' ? entry.apiKeyEnv : '',
    }]
  })
  return profiles.length > 0 ? profiles : [{ ...FALLBACK_PROFILE }]
}

/**
 * Resolve the account one call uses.
 * @param {any} config plugin configuration.
 * @param {any} requested id or display name passed by the model.
 * @returns {object} the selected profile.
 */
function selectProfile(config, requested) {
  const profiles = profilesOf(config)
  if (typeof requested === 'string' && requested.trim().length > 0) {
    const needle = requested.trim().toLowerCase()
    const hit = profiles.find(profile => profile.id.toLowerCase() === needle)
      ?? profiles.find(profile => profile.name.toLowerCase() === needle)
      ?? profiles.find(profile => profile.id.toLowerCase().includes(needle) || profile.name.toLowerCase().includes(needle))
    if (hit !== undefined) return hit
    throw new Error(`unknown image account "${requested}"; saved accounts: ${profiles.map(profile => profile.name).join(', ')}`)
  }
  const activeId = readField(config, 'activeProfileId', DEFAULT_PROFILE_ID)
  return profiles.find(profile => profile.id === activeId) ?? profiles[0]
}

/**
 * Send one generation request and return parsed JSON.
 * @param {object} request request facts.
 * @returns {Promise<any>} parsed response body.
 */
async function requestImage(request) {
  const { url, model, prompt, size, apiKey, signal } = request
  let response
  try {
    response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      // `watermark: false` asks the API to return the image without the
      // generated-image watermark.
      body: JSON.stringify({ model, prompt, size, watermark: false }),
      signal,
    })
  } catch (error) {
    if (signal.aborted) throw new Error('image request was cancelled or timed out')
    throw new Error(`cannot reach ${url}: ${error?.message ?? String(error)}`)
  }
  const text = await response.text()
  if (!response.ok) {
    const detail = text.trim().slice(0, 400)
    if (response.status === 401 || response.status === 403) {
      throw new Error(`the image API rejected the account credential (HTTP ${response.status}); check the API Key in Settings → 图片生成 (Image generation)${detail ? `: ${detail}` : ''}`)
    }
    if (response.status === 429 || response.status === 402) {
      throw new Error(`the image API refused this account for quota or rate limits (HTTP ${response.status}); switch to another saved account${detail ? `: ${detail}` : ''}`)
    }
    throw new Error(`the image API failed (HTTP ${response.status})${detail ? `: ${detail}` : ''}`)
  }
  try {
    return JSON.parse(text)
  } catch {
    throw new Error(`the image API returned a non-JSON body: ${text.trim().slice(0, 300)}`)
  }
}

/**
 * Find the first usable image carrier in one response body.
 * @param {any} payload parsed response.
 * @returns {{url?: string, b64?: string} | undefined} image location.
 */
function findImage(payload) {
  if (payload === null || typeof payload !== 'object') return undefined
  const candidates = []
  const consider = value => {
    if (value === undefined || value === null) return
    if (Array.isArray(value)) { for (const item of value) consider(item); return }
    candidates.push(value)
  }
  consider(payload.data)
  consider(payload.images)
  consider(payload.image)
  consider(payload.output)
  consider(payload.result)
  consider(payload)
  for (const candidate of candidates) {
    if (typeof candidate === 'string') {
      if (/^https?:\/\//i.test(candidate)) return { url: candidate }
      if (/^data:image\//i.test(candidate) || candidate.length > 256) return { b64: candidate }
      continue
    }
    if (typeof candidate !== 'object') continue
    const url = candidate.url ?? candidate.image_url ?? candidate.imageUrl ?? candidate.href ?? candidate.uri
    if (typeof url === 'string' && /^https?:\/\//i.test(url)) return { url }
    const b64 = candidate.b64_json ?? candidate.b64 ?? candidate.base64
      ?? candidate.image_base64 ?? candidate.imageBase64
    if (typeof b64 === 'string' && b64.length > 0) return { b64 }
    if (typeof candidate.image === 'string' && candidate.image.length > 0) return { b64: candidate.image }
  }
  return undefined
}

/**
 * Read a supported image media type from the bytes.
 * @param {Uint8Array} data image bytes.
 * @returns {string | undefined} media type.
 */
function sniffMediaType(data) {
  const starts = (offset, bytes) => bytes.every((byte, index) => data[offset + index] === byte)
  if (starts(0, [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])) return 'image/png'
  if (starts(0, [0xff, 0xd8, 0xff])) return 'image/jpeg'
  if (data[0] === 0x47 && data[1] === 0x49 && data[2] === 0x46) return 'image/gif'
  if (data[0] === 0x52 && data[1] === 0x49 && data[2] === 0x46 && data[3] === 0x46
    && data[8] === 0x57 && data[9] === 0x45 && data[10] === 0x42 && data[11] === 0x50) return 'image/webp'
  return undefined
}

/**
 * Read PNG or JPEG dimensions without decoding the image.
 * @param {Uint8Array} data image bytes.
 * @returns {{width: number, height: number} | undefined} dimensions.
 */
function measureImage(data) {
  const view = new DataView(data.buffer, data.byteOffset, data.byteLength)
  if (data.length >= 24 && sniffMediaType(data) === 'image/png') {
    return { width: view.getUint32(16), height: view.getUint32(20) }
  }
  if (sniffMediaType(data) === 'image/jpeg') {
    let offset = 2
    while (offset + 9 < data.length) {
      if (data[offset] !== 0xff) { offset += 1; continue }
      const marker = data[offset + 1]
      const length = (data[offset + 2] << 8) | data[offset + 3]
      const isSof = marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc
      if (isSof) {
        return {
          height: (data[offset + 5] << 8) | data[offset + 6],
          width: (data[offset + 7] << 8) | data[offset + 8],
        }
      }
      if (length <= 0) break
      offset += 2 + length
    }
  }
  return undefined
}

/**
 * Decode base64 image data, accepting a data URL prefix.
 * @param {string} value raw base64 or data URL.
 * @returns {Uint8Array} decoded bytes.
 */
function decodeBase64(value) {
  const comma = value.startsWith('data:') ? value.indexOf(',') : -1
  const raw = comma >= 0 ? value.slice(comma + 1) : value
  return new Uint8Array(Buffer.from(raw, 'base64'))
}

/**
 * Load the image bytes from the carrier.
 * @param {{url?: string, b64?: string}} image image location.
 * @param {string} apiOrigin origin allowed to receive the bearer token.
 * @param {string} apiKey account credential.
 * @param {AbortSignal} signal cancellation.
 * @returns {Promise<Uint8Array>} image bytes.
 */
async function loadImageBytes(image, apiOrigin, apiKey, signal) {
  if (image.b64 !== undefined) return decodeBase64(image.b64)
  let origin
  try { origin = new URL(image.url).origin } catch { throw new Error(`the image API returned an invalid image URL: ${String(image.url).slice(0, 200)}`) }
  const headers = origin === apiOrigin ? { Authorization: `Bearer ${apiKey}` } : {}
  const response = await fetch(image.url, { headers, signal })
  if (!response.ok) throw new Error(`cannot download the generated image (HTTP ${response.status})`)
  return new Uint8Array(await response.arrayBuffer())
}

/**
 * Whether the calling route declares image input, which decides whether the
 * result may carry the durable image block (a text-only route cannot).
 * @param {any} ctx plugin context.
 * @param {any} exec tool execution.
 * @returns {Promise<boolean>} capability.
 */
async function routeAcceptsImage(ctx, exec) {
  try {
    const llm = ctx.get('llm')
    const routed = exec?.agent?.session?.requestHeader?.()?.config
    const provider = routed?.provider ?? exec?.agent?.options?.provider
    const model = routed?.model ?? exec?.agent?.options?.model
    if (llm === undefined || provider === undefined || model === undefined) return false
    const info = await llm.resolveModelInfo(provider, model, exec.signal)
    return Array.isArray(info?.inputModalities) && info.inputModalities.includes('image')
  } catch {
    return false
  }
}

/**
 * Timestamped file name for one generated image.
 * @param {string} extension file extension without the dot.
 * @returns {string} file name.
 */
function outputName(extension) {
  const now = new Date()
  const pad = value => String(value).padStart(2, '0')
  const stamp = `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}-${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`
  const salt = Math.random().toString(36).slice(2, 6)
  return `dsh-sense-img-${stamp}-${salt}.${extension}`
}

/**
 * Extension for one supported media type.
 * @param {string} mediaType image media type.
 * @returns {string} extension.
 */
function extensionFor(mediaType) {
  switch (mediaType) {
    case 'image/jpeg': return 'jpg'
    case 'image/webp': return 'webp'
    case 'image/gif': return 'gif'
    default: return 'png'
  }
}

/** Size of the prompt echo kept in the model-facing result. */
const PROMPT_ECHO_LIMIT = 300

/**
 * Host entry: register the tool and read the live settings on every call.
 * @param {any} ctx plugin context.
 * @param {any} config parsed plugin configuration.
 */
export function apply(ctx, config) {
  if (schemaLibrary.error !== undefined) {
    ctx.logger?.warn?.('dsh-sense-img: the settings page stays unavailable because %s', schemaLibrary.error)
  }
  const tool = {
    name: 'generate_image',
    description: 'Generate an image from a text prompt with the configured image model. '
      + 'The active account comes from Settings → 图片生成 (Image generation); pass `account` to use another saved account. '
      + 'Returns the saved image file and, when the current model accepts images, the image itself.',
    // Raw JSON Schema (the registry projects it to the model as-is); the model
    // never sees the author-facing parameter DSL.
    parameters: {
      type: 'object',
      additionalProperties: false,
      required: ['prompt'],
      properties: {
        prompt: {
          type: 'string',
          description: 'Text description of the image to generate. Be specific about subject, style, composition, and lighting.',
        },
        size: {
          type: 'string',
          description: 'Image size as WIDTHxHEIGHT, such as "1024x1024". Defaults to the size configured in settings.',
        },
        account: {
          type: 'string',
          description: 'Saved account id or display name to charge this request to. Defaults to the active account.',
        },
      },
    },
    output: {
      schema: {
        type: 'object',
        additionalProperties: false,
        required: ['prompt', 'account', 'model', 'size', 'mediaType', 'bytes'],
        properties: {
          prompt: { type: 'string' },
          account: { type: 'string' },
          model: { type: 'string' },
          size: { type: 'string' },
          mediaType: { type: 'string', enum: ['image/png', 'image/jpeg', 'image/webp', 'image/gif'] },
          bytes: { type: 'integer' },
          width: { type: 'integer' },
          height: { type: 'integer' },
          path: { type: 'string' },
          attachmentId: { type: 'string' },
        },
      },
      render: (_args, value) => {
        const kb = Math.max(1, Math.round(value.bytes / 1024))
        const dimensions = value.width !== undefined && value.height !== undefined ? `, ${value.width}x${value.height} px` : ''
        const lines = [
          `Generated an image with ${value.model} using account "${value.account}" (${value.size}, ${kb} KB${dimensions}).`,
          value.path === undefined
            ? 'The image was not written to a file; only the tool result carries it.'
            : `<path>${value.path}</path>`,
        ]
        const blocks = [{ type: 'text', text: lines.join('\n') }]
        if (value.attachmentId !== undefined) {
          blocks.push({
            type: 'image',
            attachment: {
              attachmentId: value.attachmentId,
              mediaType: value.mediaType,
              bytes: value.bytes,
              ...value.width === undefined ? {} : { width: value.width },
              ...value.height === undefined ? {} : { height: value.height },
            },
          })
        }
        return blocks
      },
    },
    async execute(args, exec) {
      const prompt = typeof args?.prompt === 'string' ? args.prompt.trim() : ''
      if (prompt.length === 0) throw new Error('prompt must be a non-empty string')
      const profile = selectProfile(config, args?.account)
      if (profile.apiKeyEnv.length === 0) {
        throw new Error(`account "${profile.name}" has no credential reference; set its API Key in Settings → 图片生成 (Image generation)`)
      }
      const credentials = ctx.get('credentials')
      if (credentials === undefined) throw new Error('the credentials service is unavailable, so the image account key cannot be resolved')
      const credential = await credentials.resolve(profile.apiKeyEnv)
      if (credential === undefined || typeof credential.value !== 'string' || credential.value.length === 0) {
        throw new Error(`account "${profile.name}" has no API Key stored (${profile.apiKeyEnv}); add it in Settings → 图片生成 (Image generation)`)
      }
      const configuredSize = readField(config, 'defaultSize', '1024x1024')
      const size = typeof args?.size === 'string' && /^\d{2,5}x\d{2,5}$/.test(args.size.trim())
        ? args.size.trim()
        : configuredSize
      const timeoutMs = Math.min(MAX_TIMEOUT_MS, Math.max(5_000, Number(readField(config, 'timeoutMs', DEFAULT_TIMEOUT_MS)) || DEFAULT_TIMEOUT_MS))

      const controller = new AbortController()
      const abortFromCaller = () => controller.abort(exec.signal.reason)
      if (exec.signal.aborted) controller.abort(exec.signal.reason)
      else exec.signal.addEventListener('abort', abortFromCaller, { once: true })
      const timer = setTimeout(() => controller.abort(new Error('image request timed out')), timeoutMs)
      try {
        const payload = await requestImage({
          url: profile.baseUrl,
          model: profile.model,
          prompt,
          size,
          apiKey: credential.value,
          signal: controller.signal,
        })
        const image = findImage(payload)
        if (image === undefined) {
          const shape = JSON.stringify(payload).slice(0, 400)
          throw new Error(`the image API returned no image URL or image data; response: ${shape}`)
        }
        let origin = ''
        try { origin = new URL(profile.baseUrl).origin } catch { origin = '' }
        const data = await loadImageBytes(image, origin, credential.value, controller.signal)
        const mediaType = sniffMediaType(data)
        if (mediaType === undefined) throw new Error('the image API returned bytes that are not a supported PNG/JPEG/WebP/GIF image')
        const dimensions = measureImage(data)

        let attachmentId
        let width = dimensions?.width
        let height = dimensions?.height
        const attachments = ctx.get('attachments')
        if (attachments !== undefined) {
          try {
            const stored = await attachments.saveImage({ data, mediaType, name: outputName(extensionFor(mediaType)) })
            attachmentId = stored.attachmentId
            width = stored.width ?? width
            height = stored.height ?? height
          } catch (error) {
            ctx.logger?.warn?.('dsh-sense-img: durable image storage refused the result: %s', error?.message ?? String(error))
          }
        }

        let savedPath
        try {
          const workingDirectory = ctx.get('workingDirectory')
          const session = exec.agent?.session
          const base = workingDirectory !== undefined && session !== undefined
            ? workingDirectory.get(session)
            : process.cwd()
          const directory = join(base, 'generated-images')
          await mkdir(directory, { recursive: true })
          savedPath = join(directory, outputName(extensionFor(mediaType)))
          await writeFile(savedPath, data)
        } catch (error) {
          ctx.logger?.warn?.('dsh-sense-img: could not save the image to the workspace: %s', error?.message ?? String(error))
        }

        const acceptsImage = attachmentId !== undefined && await routeAcceptsImage(ctx, exec)
        return {
          prompt: prompt.length > PROMPT_ECHO_LIMIT ? `${prompt.slice(0, PROMPT_ECHO_LIMIT)}…` : prompt,
          account: profile.name,
          model: profile.model,
          size,
          mediaType,
          bytes: data.byteLength,
          ...width === undefined ? {} : { width },
          ...height === undefined ? {} : { height },
          ...savedPath === undefined ? {} : { path: savedPath },
          // Only an image-capable route receives the durable block; a text-only
          // provider would reject the next request carrying it.
          ...acceptsImage ? { attachmentId } : {},
        }
      } finally {
        clearTimeout(timer)
        exec.signal.removeEventListener('abort', abortFromCaller)
      }
    },
  }

  // A child fiber keeps the entry active (and its settings form served) even
  // before the tools service is mounted, and drops the tool with the service.
  ctx.inject(['tools'], child => {
    child.effect(() => child.tools.register(tool), 'dsh-sense-img: generate_image tool')
  })
}
