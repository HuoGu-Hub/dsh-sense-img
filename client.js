window.__ModuleLoader__.load({
  id: '@local/sensenova-image',
  factory(require) {
    const React = require('react');
    const h = React.createElement;

    const ENTRY_ID = 'sensenova-image';
    const NS = 'settings.imageGeneration';
    const DEFAULT_BASE_URL = 'https://token.sensenova.cn/v1/images/generations';
    const DEFAULT_MODEL = 'sensenova-u1.5-lite';
    const DEFAULT_SIZE = '1024x1024';
    const DEFAULT_TIMEOUT_SECONDS = 180;

    /** English copy. */
    const en = {
      title: 'Image generation',
      description: 'Saved Sensenova image accounts. The agent generates images with the active account through the generate_image tool.',
      active: 'Active',
      keySet: 'API Key set',
      keyMissing: 'No API Key',
      keyUnknown: 'Checking key…',
      keyStatusFailed: 'The API Key status could not be read.',
      keyStatusRetry: 'Retry',
      use: 'Use this account',
      edit: 'Edit',
      delete: 'Delete',
      add: 'Add account',
      save: 'Save',
      cancel: 'Cancel',
      saving: 'Saving…',
      confirmDelete: 'Delete account “{name}”? Its saved API Key is removed too.',
      confirmYes: 'Delete account',
      activeWillMove: 'The active account becomes “{name}”.',
      loading: 'Reading configuration…',
      readOnly: 'This deployment stores settings read-only.',
      unavailable: 'This plugin is not configured right now.',
      saveFailed: 'The deployment did not accept the change. Try again.',
      rejected: 'The deployment rejected the change.',
      saved: 'Saved',
      keyCleared: 'API Key cleared',
      keySaveFailed: 'The account was saved, but its API Key was not. Use Edit to add it again.',
      keyCleanupFailed: 'The account was deleted, but its API Key may remain in the credential store.',
      name: 'Account name',
      model: 'Model',
      baseUrl: 'Request URL',
      apiKey: 'API Key',
      apiKeySetPlaceholder: 'Set — leave blank to keep it',
      apiKeyEmptyPlaceholder: 'Paste the API Key',
      clearKey: 'Clear saved key',
      clearKeyConfirm: 'Clear this saved API Key? It must be entered again later.',
      clearKeyYes: 'Clear key',
      requestDefaults: 'Request defaults',
      defaultSize: 'Default size',
      defaultSizeHint: 'Used when a call does not pass size, for example 1024x1024.',
      timeout: 'Request timeout (seconds)',
      timeoutHint: 'Longest wait for one generation request.',
      invalidName: 'Enter an account name.',
      invalidModel: 'Enter a model name.',
      invalidBaseUrl: 'The request URL must start with http:// or https://.',
      invalidSize: 'Use WIDTHxHEIGHT, for example 1024x1024.',
      invalidTimeout: 'Enter a timeout between 5 and 900 seconds.',
      keyRequired: 'A new account needs an API Key.',
      duplicateName: 'Another account already uses this name; the agent resolves accounts by name.',
      unknownError: 'The operation failed.',
      toolHint: 'Tool: generate_image',
      newAccount: 'New account',
      accountRemoved: 'Deleted “{name}”.',
      nowUsing: 'Now using “{name}”.',
      lastAccountHint: 'Keep at least one account; edit this one instead.',
      emptyAccounts: 'No accounts yet. Add one to generate images.',
    };

    /** Simplified Chinese copy. */
    const zh = {
      title: '图片生成',
      description: '保存的商汤生图账号。Agent 通过 generate_image 工具使用当前账号生成图片。',
      active: '使用中',
      keySet: '密钥已设置',
      keyMissing: '未设置密钥',
      keyUnknown: '正在检查密钥…',
      keyStatusFailed: '无法读取密钥状态。',
      keyStatusRetry: '重试',
      use: '切换至此',
      edit: '编辑',
      delete: '删除',
      add: '添加账号',
      save: '保存',
      cancel: '取消',
      saving: '保存中…',
      confirmDelete: '删除账号「{name}」？已保存的 API Key 会一并删除。',
      confirmYes: '确认删除',
      activeWillMove: '当前账号会切换为「{name}」。',
      loading: '正在读取配置…',
      readOnly: '当前部署的设置为只读。',
      unavailable: '本插件当前不可配置。',
      saveFailed: '本部署没有接受这次修改，请重试。',
      rejected: '本部署拒绝了这次修改。',
      saved: '已保存',
      keyCleared: '已清除密钥',
      keySaveFailed: '账号已保存，但 API Key 未保存。请点「编辑」重新填写。',
      keyCleanupFailed: '账号已删除，但它的 API Key 可能仍留在凭证存储中。',
      name: '账号名称',
      model: '模型',
      baseUrl: '请求地址',
      apiKey: 'API Key',
      apiKeySetPlaceholder: '已设置，留空保持不变',
      apiKeyEmptyPlaceholder: '粘贴 API Key',
      clearKey: '清除已保存的密钥',
      clearKeyConfirm: '清除这条已保存的 API Key？之后需要重新填写。',
      clearKeyYes: '确认清除',
      requestDefaults: '请求默认值',
      defaultSize: '默认尺寸',
      defaultSizeHint: '调用时未指定 size 时使用，例如 1024x1024。',
      timeout: '请求超时（秒）',
      timeoutHint: '单次生图请求的最长等待时间。',
      invalidName: '请填写账号名称。',
      invalidModel: '请填写模型名称。',
      invalidBaseUrl: '请求地址需以 http:// 或 https:// 开头。',
      invalidSize: '尺寸格式为 宽x高，例如 1024x1024。',
      invalidTimeout: '超时时间需在 5 到 900 秒之间。',
      keyRequired: '新账号需要填写 API Key。',
      duplicateName: '已有账号使用这个名称；Agent 会按名称选择账号。',
      unknownError: '操作失败。',
      toolHint: '工具：generate_image',
      newAccount: '新账号',
      accountRemoved: '已删除「{name}」。',
      nowUsing: '已切换到「{name}」。',
      lastAccountHint: '至少保留一个账号，请直接编辑这个账号。',
      emptyAccounts: '还没有账号。添加一个账号后即可生成图片。',
    };

    const STYLE = [
      '.sg-root{display:flex;flex-direction:column;gap:20px;padding:4px 0 40px;color:var(--dsw-alias-label-primary);font-size:14px;line-height:20px}',
      '.sg-lead-title{margin:0;font-size:14px;line-height:20px;font-weight:600}',
      '.sg-lead-desc{margin-top:6px;color:var(--dsw-alias-label-secondary);font-size:12px;line-height:18px;max-width:640px}',
      '.sg-list{display:flex;flex-direction:column;gap:10px}',
      '.sg-card{display:flex;align-items:flex-start;justify-content:space-between;gap:16px;padding:14px 16px;border:0.5px solid var(--dsw-alias-border-l2);border-radius:10px;background:var(--dsw-alias-bg-layer-1)}',
      '.sg-card.is-active{border-color:var(--dsw-alias-brand-primary)}',
      '.sg-card.is-editing,.sg-card.is-confirming{flex-direction:column;align-items:stretch}',
      '.sg-card-main{min-width:0;display:flex;flex-direction:column;gap:4px}',
      '.sg-head{display:flex;align-items:center;flex-wrap:wrap;gap:8px}',
      '.sg-name{font-size:14px;line-height:20px;font-weight:600;overflow-wrap:anywhere}',
      '.sg-badge{font-size:11px;line-height:16px;padding:0 6px;border-radius:999px;color:var(--dsw-alias-brand-primary);border:0.5px solid var(--dsw-alias-brand-primary)}',
      '.sg-key{display:inline-flex;align-items:center;gap:5px;font-size:12px;line-height:18px;color:var(--dsw-alias-label-secondary)}',
      '.sg-dot{width:6px;height:6px;border-radius:50%;background:var(--dsw-alias-state-idle-primary)}',
      '.sg-key.is-set .sg-dot{background:var(--dsw-alias-state-success-primary)}',
      '.sg-key.is-missing .sg-dot{background:var(--dsw-alias-state-warn-primary)}',
      '.sg-meta{font-size:12px;line-height:18px;color:var(--dsw-alias-label-secondary);overflow-wrap:anywhere}',
      '.sg-actions{display:flex;flex-shrink:0;gap:8px;align-items:center}',
      '.sg-btn{height:30px;padding:0 12px;border-radius:8px;border:0.5px solid var(--dsw-alias-border-l2);background:transparent;color:var(--dsw-alias-label-primary);font-size:12px;font-family:inherit;cursor:pointer;white-space:nowrap}',
      '.sg-btn:hover:not(:disabled){background:var(--dsw-alias-bg-layer-2)}',
      '.sg-btn:focus-visible{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:1px}',
      '.sg-btn:disabled{opacity:.45;cursor:default}',
      '.sg-btn.is-primary{background:var(--dsw-alias-brand-primary);border-color:transparent;color:var(--dsw-alias-label-on-color,#fff)}',
      '.sg-btn.is-danger{color:var(--dsw-alias-state-error-primary)}',
      '.sg-editor{display:flex;flex-direction:column;gap:12px}',
      '.sg-fields{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:12px}',
      '.sg-field{display:flex;flex-direction:column;gap:6px;min-width:0}',
      '.sg-field-label{font-size:12px;line-height:18px;color:var(--dsw-alias-label-secondary)}',
      '.sg-input{height:32px;box-sizing:border-box;width:100%;padding:0 10px;border:0.5px solid var(--dsw-alias-border-l2);border-radius:8px;background:var(--dsw-alias-bg-base);color:var(--dsw-alias-label-primary);font-size:13px;font-family:inherit}',
      '.sg-input:focus{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:-1px}',
      '.sg-input[aria-invalid="true"]{border-color:var(--dsw-alias-state-error-primary)}',
      '.sg-hint{font-size:12px;line-height:18px;color:var(--dsw-alias-label-secondary)}',
      '.sg-editor-actions{display:flex;gap:8px;align-items:center;justify-content:flex-end;flex-wrap:wrap}',
      '.sg-confirm{display:flex;gap:8px;align-items:center;justify-content:space-between;flex-wrap:wrap;font-size:12px;line-height:18px}',
      '.sg-confirm-text{display:flex;flex-direction:column;gap:2px;min-width:0}',
      '.sg-confirm-note{color:var(--dsw-alias-label-secondary)}',
      '.sg-global{display:flex;flex-direction:column;gap:12px;padding-top:16px;border-top:0.5px solid var(--dsw-alias-border-l2)}',
      '.sg-global-title{margin:0;font-size:14px;line-height:20px;font-weight:600}',
      '.sg-notice{font-size:12px;line-height:18px;display:flex;gap:8px;align-items:center;flex-wrap:wrap}',
      '.sg-notice.is-error{color:var(--dsw-alias-state-error-primary)}',
      '.sg-notice.is-ok{color:var(--dsw-alias-state-success-primary)}',
      '.sg-foot{font-size:12px;line-height:18px;color:var(--dsw-alias-label-secondary)}',
      '.sg-empty{padding:16px;border:0.5px dashed var(--dsw-alias-border-l2);border-radius:10px;font-size:12px;line-height:18px;color:var(--dsw-alias-label-secondary)}',
    ].join('');

    let host = null;

    /**
     * Replace `{name}` placeholders in one localized template.
     * @param {string} template locale string.
     * @param {Record<string, string>} values replacements.
     * @returns {string} rendered text.
     */
    function format(template, values) {
      return String(template).replace(/\{(\w+)\}/g, (match, key) => values[key] ?? match);
    }

    /**
     * Subscribe one React state to a synchronous snapshot store.
     * @param {{getSnapshot: Function, subscribe: Function}} store observable.
     * @returns {any} the current snapshot.
     */
    function useSnapshot(store) {
      const [snapshot, setSnapshot] = React.useState(() => store.getSnapshot());
      React.useEffect(() => {
        setSnapshot(store.getSnapshot());
        return store.subscribe(() => { setSnapshot(store.getSnapshot()); });
      }, [store]);
      return snapshot;
    }

    /**
     * Read the stored API Key presence for the given credential references.
     * @param {any} ctx client context owning the credentials Remote.
     * @param {string[]} refs credential references.
     * @returns {{entries: Record<string, any>, loading: boolean, failed: boolean, refresh: Function}} presence state.
     */
    function useCredentialPresence(ctx, refs) {
      const joined = refs.filter(ref => typeof ref === 'string' && ref.length > 0).join('\n');
      const [state, setState] = React.useState({ entries: {}, loading: true, failed: false });
      const refresh = React.useCallback(async () => {
        const list = joined.length > 0 ? joined.split('\n') : [];
        if (list.length === 0) {
          setState({ entries: {}, loading: false, failed: false });
          return;
        }
        setState(current => ({ ...current, loading: true }));
        try {
          const entries = await ctx.remote.credentials.describe(list);
          setState({ entries: entries ?? {}, loading: false, failed: false });
        } catch {
          setState({ entries: {}, loading: false, failed: true });
        }
      }, [ctx, joined]);
      React.useEffect(() => { void refresh(); }, [refresh]);
      return { entries: state.entries, loading: state.loading, failed: state.failed, refresh };
    }

    /**
     * Validate one profile draft.
     * @param {object} draft edited values.
     * @param {Array<object>} profiles every saved account.
     * @param {(key: string) => string} t locale reader.
     * @returns {string | undefined} the first error.
     */
    function validateDraft(draft, profiles, t) {
      if (draft.name.trim().length === 0) return { field: 'name', message: t('invalidName') };
      const current = profiles.find(profile => profile.id === draft.id);
      const renamed = current === undefined || draft.name.trim() !== String(current.name ?? '').trim();
      const duplicate = renamed && profiles.some(profile => profile.id !== draft.id
        && String(profile.name ?? '').trim().toLowerCase() === draft.name.trim().toLowerCase());
      if (duplicate) return { field: 'name', message: t('duplicateName') };
      if (draft.model.trim().length === 0) return { field: 'model', message: t('invalidModel') };
      if (!/^https?:\/\/\S+$/i.test(draft.baseUrl.trim())) return { field: 'baseUrl', message: t('invalidBaseUrl') };
      return undefined;
    }

    /**
     * Pick an unused default display name for a new account.
     * @param {Array<object>} profiles every saved account.
     * @param {string} base localized base name.
     * @returns {string} unique name.
     */
    function uniqueAccountName(profiles, base) {
      const taken = new Set(profiles.map(profile => String(profile.name ?? '').trim().toLowerCase()));
      if (!taken.has(base.toLowerCase())) return base;
      let index = 2;
      while (taken.has(`${base} ${index}`.toLowerCase())) index += 1;
      return `${base} ${index}`;
    }

    /** Settings page registered into the settings section list. */
    function Page(props) {
      const t = typeof props?.t === 'function' ? props.t : key => (zh[key] ?? en[key] ?? key);
      const snapshot = useSnapshot(host.form);
      const value = snapshot.value ?? {};
      const profiles = Array.isArray(value.profiles) ? value.profiles : [];
      const activeId = typeof value.activeProfileId === 'string' ? value.activeProfileId : '';
      const resolvedSize = typeof value.defaultSize === 'string' && value.defaultSize.length > 0 ? value.defaultSize : DEFAULT_SIZE;
      const resolvedTimeout = Math.round((typeof value.timeoutMs === 'number' && value.timeoutMs > 0 ? value.timeoutMs : DEFAULT_TIMEOUT_SECONDS * 1000) / 1000);
      const presence = useCredentialPresence(host.ctx, profiles.map(profile => profile?.apiKeyEnv));
      const [editing, setEditing] = React.useState(null);
      const [confirmingId, setConfirmingId] = React.useState(null);
      const [keyConfirm, setKeyConfirm] = React.useState(false);
      const [busy, setBusy] = React.useState(null);
      const [notice, setNotice] = React.useState(null);
      const [draftError, setDraftError] = React.useState(undefined);
      const [sizeDraft, setSizeDraft] = React.useState(resolvedSize);
      const [timeoutDraft, setTimeoutDraft] = React.useState(String(resolvedTimeout));

      React.useEffect(() => { setSizeDraft(resolvedSize); }, [resolvedSize]);
      React.useEffect(() => { setTimeoutDraft(String(resolvedTimeout)); }, [resolvedTimeout]);
      React.useEffect(() => {
        if (notice === null || notice.kind !== 'ok') return undefined;
        const timer = setTimeout(() => { setNotice(null); }, 4000);
        return () => { clearTimeout(timer); };
      }, [notice]);

      const writable = snapshot.writable === true;

      /**
       * Apply config path operations and report the outcome.
       * @param {Array<object>} ops ordered path edits.
       * @param {string} successMessage message shown on acceptance.
       * @returns {Promise<boolean>} whether the Host accepted the change.
       */
      async function commit(ops, successMessage) {
        try {
          const accepted = await host.form.mutate(ops);
          if (!accepted) {
            setNotice({ kind: 'error', text: t('rejected') });
            return false;
          }
          setNotice({ kind: 'ok', text: successMessage });
          return true;
        } catch (error) {
          setNotice({ kind: 'error', text: `${t('saveFailed')} ${error?.message ?? ''}`.trim() });
          return false;
        }
      }

      /** Open the editor for one saved account. */
      function startEdit(profile) {
        setNotice(null);
        setConfirmingId(null);
        setKeyConfirm(false);
        setDraftError(undefined);
        setEditing({
          isNew: false,
          draft: {
            id: profile.id,
            name: profile.name ?? '',
            model: profile.model ?? DEFAULT_MODEL,
            baseUrl: profile.baseUrl ?? DEFAULT_BASE_URL,
            apiKeyEnv: profile.apiKeyEnv ?? '',
            apiKey: '',
          },
        });
      }

      /** Open an editor for a new account. */
      function startAdd() {
        const template = profiles[0];
        const stamp = Date.now().toString(36);
        setNotice(null);
        setConfirmingId(null);
        setKeyConfirm(false);
        setDraftError(undefined);
        setEditing({
          isNew: true,
          draft: {
            id: `acct-${stamp}`,
            name: uniqueAccountName(profiles, t('newAccount')),
            model: template?.model ?? DEFAULT_MODEL,
            baseUrl: template?.baseUrl ?? DEFAULT_BASE_URL,
            apiKeyEnv: `SENSENOVA_IMAGE_KEY_${stamp.toUpperCase().replace(/[^A-Z0-9]/g, '')}`,
            apiKey: '',
          },
        });
      }

      /** Send the edited account to the Host: configuration first, then its key. */
      async function saveEditing() {
        if (editing === null || busy !== null) return;
        const draft = editing.draft;
        const invalid = validateDraft(draft, profiles, t);
        if (invalid !== undefined) {
          setDraftError(invalid);
          setNotice(null);
          return;
        }
        const key = draft.apiKey.trim();
        if (editing.isNew && key.length === 0) {
          setDraftError({ field: 'key', message: t('keyRequired') });
          setNotice(null);
          return;
        }
        setDraftError(undefined);
        setBusy('save');
        try {
          const ops = [];
          if (editing.isNew) {
            ops.push({
              op: 'set',
              path: ['profiles', String(profiles.length)],
              value: {
                id: draft.id,
                name: draft.name.trim(),
                baseUrl: draft.baseUrl.trim(),
                model: draft.model.trim(),
                apiKeyEnv: draft.apiKeyEnv,
              },
            });
          } else {
            const index = profiles.findIndex(profile => profile.id === draft.id);
            if (index < 0) throw new Error('this account no longer exists');
            const current = profiles[index];
            const prefix = ['profiles', String(index)];
            if (draft.name.trim() !== (current.name ?? '')) ops.push({ op: 'set', path: [...prefix, 'name'], value: draft.name.trim() });
            if (draft.model.trim() !== (current.model ?? '')) ops.push({ op: 'set', path: [...prefix, 'model'], value: draft.model.trim() });
            if (draft.baseUrl.trim() !== (current.baseUrl ?? '')) ops.push({ op: 'set', path: [...prefix, 'baseUrl'], value: draft.baseUrl.trim() });
          }
          if (ops.length > 0) {
            const accepted = await commit(ops, t('saved'));
            if (!accepted) return;
          } else {
            setNotice({ kind: 'ok', text: t('saved') });
          }
          if (key.length > 0) {
            try {
              await host.ctx.remote.credentials.set(draft.apiKeyEnv, key);
            } catch (error) {
              setNotice({ kind: 'error', text: `${t('keySaveFailed')} ${error?.message ?? ''}`.trim() });
              setEditing(null);
              await presence.refresh();
              return;
            }
          }
          setEditing(null);
          await presence.refresh();
        } catch (error) {
          setNotice({ kind: 'error', text: `${t('unknownError')} ${error?.message ?? ''}`.trim() });
        } finally {
          setBusy(null);
        }
      }

      /** Delete one saved account, then its credential. */
      async function removeAccount(id) {
        if (busy !== null) return;
        const index = profiles.findIndex(profile => profile.id === id);
        if (index < 0) { setConfirmingId(null); return; }
        const profile = profiles[index];
        const successor = profile.id === activeId ? profiles.find((candidate, position) => position !== index) : undefined;
        setBusy('delete');
        try {
          const ops = [];
          if (successor !== undefined) ops.push({ op: 'set', path: ['activeProfileId'], value: successor.id });
          ops.push({ op: 'unset', path: ['profiles', String(index)] });
          const accepted = await commit(ops, format(t('accountRemoved'), { name: profile.name ?? profile.id }));
          if (!accepted) return;
          if (typeof profile.apiKeyEnv === 'string' && profile.apiKeyEnv.length > 0) {
            try {
              await host.ctx.remote.credentials.unset(profile.apiKeyEnv);
            } catch {
              setNotice({ kind: 'error', text: t('keyCleanupFailed') });
            }
          }
          setConfirmingId(null);
          await presence.refresh();
        } catch (error) {
          setNotice({ kind: 'error', text: `${t('unknownError')} ${error?.message ?? ''}`.trim() });
        } finally {
          setBusy(null);
        }
      }

      /** Make one saved account active. */
      async function useAccount(profile) {
        if (busy !== null) return;
        setNotice(null);
        setBusy('active');
        try {
          await commit([{ op: 'set', path: ['activeProfileId'], value: profile.id }], format(t('nowUsing'), { name: profile.name ?? profile.id }));
        } finally {
          setBusy(null);
        }
      }

      /** Remove the stored key of the account open in the editor. */
      async function clearKey(ref) {
        if (busy !== null || typeof ref !== 'string' || ref.length === 0) return;
        setBusy('key');
        try {
          await host.ctx.remote.credentials.unset(ref);
          setNotice({ kind: 'ok', text: t('keyCleared') });
          setKeyConfirm(false);
          await presence.refresh();
        } catch (error) {
          setNotice({ kind: 'error', text: `${t('unknownError')} ${error?.message ?? ''}`.trim() });
        } finally {
          setBusy(null);
        }
      }

      /** Persist the default size when the field is left. */
      async function commitSize() {
        const next = sizeDraft.trim();
        if (next === resolvedSize) return;
        if (!/^\d{2,5}x\d{2,5}$/i.test(next)) {
          setNotice({ kind: 'error', text: t('invalidSize') });
          setSizeDraft(resolvedSize);
          return;
        }
        await commit([{ op: 'set', path: ['defaultSize'], value: next }], t('saved'));
      }

      /** Persist the request timeout when the field is left. */
      async function commitTimeout() {
        const seconds = Number.parseInt(timeoutDraft, 10);
        if (seconds === resolvedTimeout) return;
        if (!Number.isFinite(seconds) || seconds < 5 || seconds > 900) {
          setNotice({ kind: 'error', text: t('invalidTimeout') });
          setTimeoutDraft(String(resolvedTimeout));
          return;
        }
        await commit([{ op: 'set', path: ['timeoutMs'], value: seconds * 1000 }], t('saved'));
      }

      /** Render one labelled text field. */
      function textField(id, label, valueText, onChange, extra) {
        return h('label', { className: 'sg-field', htmlFor: id, key: id },
          h('span', { className: 'sg-field-label' }, label),
          h('input', {
            id,
            className: 'sg-input',
            type: 'text',
            value: valueText,
            spellCheck: false,
            autoComplete: 'off',
            disabled: !writable || busy !== null,
            onChange: event => { onChange(event.target.value); },
            ...extra ?? {},
          }));
      }

      /** Render the editor of one account. */
      function renderEditor() {
        const draft = editing.draft;
        const update = patch => {
          setDraftError(undefined);
          setEditing(current => current === null ? current : { ...current, draft: { ...current.draft, ...patch } });
        };
        const fieldInvalid = field => draftError !== undefined && draftError.field === field;
        const keyKnown = !presence.loading && !presence.failed;
        const hasKey = keyKnown && presence.entries[draft.apiKeyEnv]?.configured === true;
        return h('div', { className: 'sg-editor' },
          h('div', { className: 'sg-fields' },
            textField('sg-e-name', t('name'), draft.name, next => { update({ name: next }); }, { autoFocus: true, 'aria-invalid': fieldInvalid('name') ? 'true' : undefined }),
            textField('sg-e-model', t('model'), draft.model, next => { update({ model: next }); }, { 'aria-invalid': fieldInvalid('model') ? 'true' : undefined }),
            textField('sg-e-url', t('baseUrl'), draft.baseUrl, next => { update({ baseUrl: next }); }, { 'aria-invalid': fieldInvalid('baseUrl') ? 'true' : undefined }),
            h('div', { className: 'sg-field', key: 'sg-e-key' },
              h('label', { className: 'sg-field-label', htmlFor: 'sg-e-key' }, t('apiKey')),
              h('input', {
                id: 'sg-e-key',
                className: 'sg-input',
                type: 'password',
                value: draft.apiKey,
                autoComplete: 'off',
                spellCheck: false,
                disabled: !writable || busy !== null,
                'aria-invalid': fieldInvalid('key') ? 'true' : undefined,
                placeholder: !keyKnown ? t('keyUnknown') : hasKey ? t('apiKeySetPlaceholder') : t('apiKeyEmptyPlaceholder'),
                onChange: event => { update({ apiKey: event.target.value }); },
              }),
              keyKnown && hasKey
                ? (keyConfirm
                  ? h('div', { className: 'sg-confirm' },
                    h('span', { className: 'sg-confirm-text' }, t('clearKeyConfirm')),
                    h('div', { className: 'sg-actions' },
                      h('button', { type: 'button', className: 'sg-btn', autoFocus: true, disabled: busy !== null, onClick: () => { setKeyConfirm(false); } }, t('cancel')),
                      h('button', { type: 'button', className: 'sg-btn is-danger', disabled: busy !== null, onClick: () => { void clearKey(draft.apiKeyEnv); } }, t('clearKeyYes'))))
                  : h('button', {
                    type: 'button',
                    className: 'sg-btn is-danger',
                    disabled: !writable || busy !== null,
                    onClick: () => { setKeyConfirm(true); },
                  }, t('clearKey')))
                : null)),
          draftError !== undefined
            ? h('div', { className: 'sg-notice is-error', role: 'alert' }, draftError.message)
            : null,
          h('div', { className: 'sg-editor-actions' },
            h('button', { type: 'button', className: 'sg-btn', disabled: busy !== null, onClick: () => { setEditing(null); setDraftError(undefined); setKeyConfirm(false); } }, t('cancel')),
            h('button', {
              type: 'button',
              className: 'sg-btn is-primary',
              disabled: !writable || busy !== null,
              onClick: () => { void saveEditing(); },
            }, busy === 'save' ? t('saving') : t('save'))));
      }

      /** Render one saved account card. */
      function renderCard(profile, index) {
        const isActive = profile.id === activeId;
        const hasKey = typeof profile.apiKeyEnv === 'string' && profile.apiKeyEnv.length > 0
          && presence.entries[profile.apiKeyEnv]?.configured === true;
        const keyClass = presence.loading || presence.failed ? '' : hasKey ? 'is-set' : 'is-missing';
        const keyLabel = presence.loading || presence.failed ? t('keyUnknown') : hasKey ? t('keySet') : t('keyMissing');
        const editingThis = editing !== null && !editing.isNew && editing.draft.id === profile.id;
        const confirmingThis = confirmingId !== null && confirmingId === profile.id;
        const successor = isActive ? profiles.find((candidate) => candidate.id !== profile.id) : undefined;
        const blocked = !writable || busy !== null || (editing !== null && !editingThis);
        return h('div', { className: `sg-card${isActive ? ' is-active' : ''}${editingThis ? ' is-editing' : ''}${confirmingThis ? ' is-confirming' : ''}`, key: profile.id ?? index },
          h('div', { className: 'sg-card-main' },
            h('div', { className: 'sg-head' },
              h('span', { className: 'sg-name' }, profile.name || profile.id || `#${index + 1}`),
              isActive ? h('span', { className: 'sg-badge' }, t('active')) : null,
              h('span', { className: `sg-key ${keyClass}` },
                h('span', { className: 'sg-dot' }),
                keyLabel)),
            h('div', { className: 'sg-meta' }, `${profile.model ?? DEFAULT_MODEL} · ${profile.baseUrl ?? DEFAULT_BASE_URL}`),
            profiles.length <= 1 && !editingThis
              ? h('div', { className: 'sg-hint' }, t('lastAccountHint'))
              : null),
          editingThis
            ? renderEditor()
            : confirmingThis
              ? h('div', { className: 'sg-confirm' },
                h('div', { className: 'sg-confirm-text' },
                  h('span', null, format(t('confirmDelete'), { name: profile.name ?? profile.id })),
                  successor !== undefined
                    ? h('span', { className: 'sg-confirm-note' }, format(t('activeWillMove'), { name: successor.name ?? successor.id }))
                    : null),
                h('div', { className: 'sg-actions' },
                  h('button', { type: 'button', className: 'sg-btn', autoFocus: true, onClick: () => { setConfirmingId(null); } }, t('cancel')),
                  h('button', {
                    type: 'button',
                    className: 'sg-btn is-danger',
                    disabled: busy !== null,
                    onClick: () => { void removeAccount(profile.id); },
                  }, t('confirmYes'))))
              : h('div', { className: 'sg-actions' },
                !isActive
                  ? h('button', {
                    type: 'button',
                    className: 'sg-btn is-primary',
                    disabled: blocked,
                    onClick: () => { void useAccount(profile); },
                  }, t('use'))
                  : null,
                h('button', {
                  type: 'button',
                  className: 'sg-btn',
                  disabled: blocked,
                  onClick: () => { startEdit(profile); },
                }, t('edit')),
                h('button', {
                  type: 'button',
                  className: 'sg-btn is-danger',
                  disabled: blocked || profiles.length <= 1,
                  onClick: () => { setEditing(null); setNotice(null); setConfirmingId(profile.id); },
                }, t('delete'))));
      }

      if (snapshot.status === 'unavailable') {
        return h('div', { className: 'sg-root' }, h('style', null, STYLE), h('div', { className: 'sg-lead-desc' }, t('unavailable')));
      }
      if (snapshot.status === 'loading' || snapshot.value === undefined) {
        return h('div', { className: 'sg-root', role: 'status' }, h('style', null, STYLE), h('div', { className: 'sg-lead-desc' }, t('loading')));
      }

      const adding = editing !== null && editing.isNew;
      return h('div', { className: 'sg-root' },
        h('style', null, STYLE),
        h('div', null,
          h('h2', { className: 'sg-lead-title' }, t('title')),
          h('div', { className: 'sg-lead-desc' }, t('description')),
          !writable ? h('div', { className: 'sg-lead-desc' }, t('readOnly')) : null),
        presence.failed
          ? h('div', { className: 'sg-notice is-error', role: 'alert' },
            h('span', null, t('keyStatusFailed')),
            h('button', {
              type: 'button',
              className: 'sg-btn',
              onClick: () => { void presence.refresh(); },
            }, t('keyStatusRetry')))
          : null,
        notice !== null
          ? h('div', { className: `sg-notice ${notice.kind === 'error' ? 'is-error' : 'is-ok'}`, role: notice.kind === 'error' ? 'alert' : 'status' }, notice.text)
          : null,
        h('div', { className: 'sg-list' },
          profiles.map((profile, index) => renderCard(profile, index)),
          adding
            ? h('div', { className: 'sg-card is-editing', key: 'sg-new' },
              h('div', { className: 'sg-head' }, h('span', { className: 'sg-name' }, editing.draft.name)),
              renderEditor())
            : null,
          profiles.length === 0 && !adding
            ? h('div', { className: 'sg-empty' }, t('emptyAccounts'))
            : null),
        h('div', null,
          h('button', {
            type: 'button',
            className: 'sg-btn',
            disabled: !writable || busy !== null || editing !== null,
            onClick: () => { startAdd(); },
          }, t('add'))),
        h('div', { className: 'sg-global' },
          h('h3', { className: 'sg-global-title' }, t('requestDefaults')),
          h('div', { className: 'sg-fields' },
            h('label', { className: 'sg-field', htmlFor: 'sg-default-size', key: 'sg-size' },
              h('span', { className: 'sg-field-label' }, t('defaultSize')),
              h('input', {
                id: 'sg-default-size',
                className: 'sg-input',
                type: 'text',
                value: sizeDraft,
                spellCheck: false,
                disabled: !writable || busy !== null,
                onChange: event => { setSizeDraft(event.target.value); },
                onBlur: () => { void commitSize(); },
              }),
              h('span', { className: 'sg-hint' }, t('defaultSizeHint'))),
            h('label', { className: 'sg-field', htmlFor: 'sg-timeout', key: 'sg-timeout' },
              h('span', { className: 'sg-field-label' }, t('timeout')),
              h('input', {
                id: 'sg-timeout',
                className: 'sg-input',
                type: 'number',
                min: 5,
                max: 900,
                step: 1,
                value: timeoutDraft,
                disabled: !writable || busy !== null,
                onChange: event => { setTimeoutDraft(event.target.value); },
                onBlur: () => { void commitTimeout(); },
              }),
              h('span', { className: 'sg-hint' }, t('timeoutHint')))),
          h('div', { className: 'sg-foot' }, t('toolHint'))));
    }

    /** Required client services. */
    const inject = ['slots', 'locale', 'configForms', 'remote', 'remote.credentials'];

    /**
     * Register the settings dictionaries and the settings page.
     * @param {any} ctx client plugin context.
     */
    function apply(ctx) {
      ctx.effect(() => ctx.locale.register(NS, { zh, en }), 'sensenova-image: dictionaries');
      const t = ctx.locale.bind(NS);
      host = { ctx, form: ctx.configForms.get(ENTRY_ID) };
      ctx.effect(() => ctx.configForms.whileServed([ENTRY_ID], () => ctx.slots.inject('settings.section', () => ctx.slots.register({
        name: 'settings.section',
        id: ENTRY_ID,
        order: 55,
        label: () => t('title'),
        locale: NS,
      }, Page))), 'sensenova-image: settings page');
      ctx.effect(() => () => { host = null; }, 'sensenova-image: page state');
    }

    return { inject, apply };
  },
});
