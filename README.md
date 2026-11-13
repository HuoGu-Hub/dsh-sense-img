# call-image-model

DeepSeek Harness 生图插件：在设置里保存多个商汤生图账号，Agent 通过 `generate_image` 工具用当前账号调用 `sensenova-u1.5-lite`。

原理与完整使用说明见 [docs/原理与使用.html](docs/原理与使用.html)。

## 功能

- 设置页「图片生成」：保存多个账号，字段为账号名称、请求地址、模型、API Key。
- 账号切换：每个账号独立额度，点「切换至此」即可换用另一个账号。
- `generate_image` 工具：参数 `prompt`、可选 `size`、可选 `account`；默认使用当前账号。
- API Key 存进 DSH 凭证库，配置里只保留引用名；仓库和配置文件都不含密钥。
- 请求体为 `{ model, prompt, size }`，鉴权头为 `Authorization: Bearer <API Key>`。
- 生成结果保存到会话工作目录的 `generated-images/`；当前模型支持图片输入时，工具结果同时附带图片。

## 安装

```sh
git clone https://github.com/HuoGu-Hub/call-image-model.git
```

在 DSH Web / Desktop 中打开 **设置 → 插件**，把克隆下来的 `call-image-model` 目录作为插件添加。

装好后刷新页面，侧栏 **设置** 里会出现「图片生成」，Agent 工具列表里会出现 `generate_image`。

## 使用

1. 打开 **设置 → 图片生成**。
2. 默认账号使用 `https://token.sensenova.cn/v1/images/generations` 和 `sensenova-u1.5-lite`，密钥引用为 `SENSENOVA_API_KEY`。
3. 「添加账号」可新增账号并粘贴 API Key；「切换至此」把该账号设为当前账号。
4. 对 Agent 说「画一只橘猫」，或直接调用：

```json
{
  "prompt": "a red apple on a white table",
  "size": "1024x1024"
}
```

指定其他账号时传 `account`，值为账号 id 或名称。

## 配置

设置页写入插件的以下字段，均为热更新，保存后下一次工具调用立即生效：

| 字段 | 说明 |
|---|---|
| `profiles` | 账号列表：`id`、`name`、`baseUrl`、`model`、`apiKeyEnv` |
| `activeProfileId` | 当前账号 id |
| `defaultSize` | 调用未传 `size` 时使用的尺寸，默认 `1024x1024` |
| `timeoutMs` | 单次请求超时，默认 `180000` |

`apiKeyEnv` 是 DSH 凭证引用名，不是密钥本身。

## 安全

- 仓库不包含任何 API Key。
- API Key 只写进 DSH 的凭证存储，配置文件和本仓库只保留引用名。
- 删除账号时会一并删除对应的凭证；若凭证清理失败，页面会提示密钥可能仍留在凭证库中。

## 响应解析

支持常见的生图响应形态：`data[].url`、`data[].b64_json`，以及 `images`、`output`、`result` 下的 URL 或 base64。图片字节会做 PNG/JPEG/WebP/GIF 魔数校验。

## 限制

- 只实现文本生图，请求体固定为 `model`、`prompt`、`size`；不包含参考图、批量生成、编辑等能力。
- 只有当前模型声明图片输入时，工具结果才会附带图片块；否则只返回保存路径。
- 生成图片的水印由服务商决定，插件不做处理。
- 插件用 `link:` 方式安装，移动或删除本目录会导致插件失效，需要重新安装。

## 目录

```
call-image-model/
├─ index.js           Host 半：Config + generate_image 工具
├─ client.js          浏览器半：设置页（设置 → 图片生成）
├─ cordis.patch.yml   Bundle patch
├─ locale/            插件标题与描述（en / zh）
├─ icon.svg           插件图标
└─ README.md
```

## 开发

`index.js` 与 `client.js` 都是无构建的原生 ESM/浏览器脚本，不需要安装依赖。

Config schema 使用 DSH 自带的 `@deepseek-ai/schemastery`：运行时从当前安装目录按 `DSH_INSTALL_DIR`、`process.resourcesPath`（Desktop ASAR）等锚点解析 ESM 入口，避免引入第二份 schema 实例。浏览器半只 `require('react')`，其余交互通过 `ctx.configForms`、`ctx.locale`、`ctx.remote.credentials` 与 `ctx.slots` 完成。
