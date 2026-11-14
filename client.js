window.__ModuleLoader__.load({
  id: 'dsh-sense-img',
  factory(require) {
    const React = require('react');
    const h = React.createElement;

    const ENTRY_ID = 'dsh-sense-img';
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
      keyStatusUnknown: 'Key status unknown',
      keyStatusFailed: 'The API Key status could not be read.',
      keyStatusRetry: 'Retry',
      use: 'Use this account',
      edit: 'Edit',
      delete: 'Delete',
      useAccount: 'Use “{name}”',
      editAccount: 'Edit “{name}”',
      deleteAccount: 'Delete “{name}”',
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
      keyStatusUnknown: '密钥状态未知',
      keyStatusFailed: '无法读取密钥状态。',
      keyStatusRetry: '重试',
      use: '切换至此',
      edit: '编辑',
      delete: '删除',
      useAccount: '切换到「{name}」',
      editAccount: '编辑「{name}」',
      deleteAccount: '删除「{name}」',
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

    /**
     * Page styles.
     *
     * Geometry, type and row anatomy follow the shipped Models settings page
     * (`settings.models` section): one column capped at 720px, a 16/24 title
     * over a 14/22 intro, the settings card material for rows (`padding: 12px
     * 14px`, `radius: xl`, `settings-card-fill`), compact 28px row actions, an
     * inset module fill for the open editor, and a dashed full-width add row
     * that reads as the list's last slot rather than a stray button.
     *
     * Every colour resolves through a `--dsw-alias-*` token. The richer tokens
     * this build uses internally (`settings-card-*`, `bg-module-platform`,
     * `label-tertiary`, `border-l3/l4`, `button-primary-*`,
     * `interactive-bg-hover*`) each carry a fallback to a token the Client
     * theme service publishes, so a renamed token degrades instead of
     * rendering an invisible surface.
     */
    const STYLE = [
      '.sg-section{display:flex;flex-direction:column;gap:12px;max-width:720px;color:var(--dsw-alias-label-primary);font-size:14px;line-height:22px}',
      '.sg-title{margin:0;font-size:16px;line-height:24px;font-weight:500}',
      '.sg-intro{margin:0;font-size:14px;line-height:22px;color:var(--dsw-alias-label-tertiary,var(--dsw-alias-label-secondary))}',
      '.sg-note{margin:0;font-size:12px;line-height:18px;color:var(--dsw-alias-state-warn-label,var(--dsw-alias-label-secondary))}',
      '.sg-notice{display:flex;align-items:center;gap:8px;flex-wrap:wrap;font-size:12px;line-height:18px}',
      '.sg-notice.is-error{color:var(--dsw-alias-state-error-primary)}',
      '.sg-notice.is-ok{color:var(--dsw-alias-state-success-primary)}',
      '.sg-list{list-style:none;margin:12px 0 0;padding:0;display:flex;flex-direction:column;gap:8px}',
      '.sg-card{display:flex;flex-direction:column;gap:12px;padding:12px 14px;border:0.5px solid var(--dsw-alias-settings-card-stroke,var(--dsw-alias-border-l2));border-radius:var(--dsw-radius-xl,20px);background:var(--dsw-alias-settings-card-fill,var(--dsw-alias-bg-layer-1))}',
      '.sg-card.is-active{border-color:var(--dsw-alias-brand-primary)}',
      '.sg-card.is-editing{border-color:transparent;background:var(--dsw-alias-bg-module-platform,var(--dsw-alias-bg-layer-2))}',
      '.sg-head{display:flex;align-items:center;flex-wrap:wrap;gap:8px 10px}',
      '.sg-identity{display:inline-flex;align-items:center;gap:6px;min-width:0}',
      '.sg-name{font-size:14px;line-height:22px;font-weight:500;overflow-wrap:anywhere}',
      '.sg-tag{flex:none;padding:1px 6px;border:0.5px solid var(--dsw-alias-border-l3,var(--dsw-alias-border-l2));border-radius:var(--dsw-radius-xs,4px);font-size:11px;line-height:16px;color:var(--dsw-alias-label-secondary);white-space:nowrap}',
      '.sg-tag.is-active{color:var(--dsw-alias-brand-primary);border-color:var(--dsw-alias-brand-primary)}',
      '.sg-sub{display:flex;align-items:center;flex-wrap:wrap;gap:6px 12px;min-width:0}',
      '.sg-key{display:inline-flex;align-items:center;gap:6px;flex:none;margin-left:auto;font-size:12px;line-height:18px;color:var(--dsw-alias-label-secondary);white-space:nowrap}',
      '.sg-dot{width:8px;height:8px;border-radius:50%;background:var(--dsw-alias-state-idle-primary);flex:none}',
      '.sg-key.is-set .sg-dot{background:var(--dsw-alias-state-success-primary)}',
      '.sg-key.is-missing .sg-dot{background:var(--dsw-alias-state-error-primary)}',
      '.sg-meta{flex:1 1 auto;min-width:0;font-size:12px;line-height:18px;color:var(--dsw-alias-label-tertiary,var(--dsw-alias-label-secondary));overflow:hidden;text-overflow:ellipsis;white-space:nowrap}',
      '.sg-actions{display:inline-flex;align-items:center;gap:4px;margin-left:auto;flex-wrap:wrap;justify-content:flex-end}',
      '.sg-btn{box-sizing:border-box;display:inline-flex;align-items:center;justify-content:center;gap:6px;height:28px;padding:0 10px;border:0.5px solid var(--dsw-alias-border-l3,var(--dsw-alias-border-l2));border-radius:var(--dsw-radius-sm,8px);background:transparent;color:var(--dsw-alias-label-primary);font:inherit;font-size:12px;line-height:18px;cursor:pointer;white-space:nowrap}',
      '.sg-btn:disabled{opacity:.4;cursor:default}',
      '.sg-btn:focus-visible{outline:2px solid transparent;outline-offset:2px;box-shadow:0 0 0 2px var(--dsw-focus-ring-color,var(--dsw-alias-state-business-primary,var(--dsw-alias-brand-primary)))}',
      '@media (hover:hover){.sg-btn:hover:not(:disabled){background:var(--dsw-alias-interactive-bg-hover,var(--dsw-alias-bg-layer-2))}}',
      '.sg-btn.is-danger{border-color:transparent;color:var(--dsw-alias-state-error-primary)}',
      '@media (hover:hover){.sg-btn.is-danger:hover:not(:disabled){background:var(--dsw-alias-interactive-bg-hover-danger,var(--dsw-alias-bg-layer-2))}}',
      '.sg-btn.is-link{align-self:flex-start;padding:0 6px;border-color:transparent;color:var(--dsw-alias-label-tertiary,var(--dsw-alias-label-secondary))}',
      '@media (hover:hover){.sg-btn.is-link:hover:not(:disabled){background:var(--dsw-alias-interactive-bg-hover,var(--dsw-alias-bg-layer-2));color:var(--dsw-alias-label-primary)}}',
      '.sg-btn.is-filled{height:36px;padding:0 14px;border:none;border-radius:var(--dsw-radius-md,12px);background:var(--dsw-alias-button-primary-fill,var(--dsw-alias-brand-primary));color:var(--dsw-alias-label-primary-foreground,#fff);font-size:14px;line-height:22px}',
      '@media (hover:hover){.sg-btn.is-filled:hover:not(:disabled){background:var(--dsw-alias-button-primary-hover,var(--dsw-alias-brand-primary))}}',
      '.sg-btn.is-wide{height:36px;padding:0 14px;border-radius:var(--dsw-radius-md,12px);font-size:14px;line-height:22px}',
      '.sg-add{display:flex}',
      '.sg-btn.is-add{flex:1 1 0;min-width:180px;height:44px;border:1px dashed var(--dsw-alias-border-l3,var(--dsw-alias-border-l2));border-radius:var(--dsw-radius-lg,16px);font-size:14px;line-height:22px}',
      '.sg-editor{display:flex;flex-direction:column;gap:16px}',
      '.sg-fields{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:16px}',
      '.sg-field{display:flex;flex-direction:column;gap:8px;min-width:0}',
      '.sg-field.is-wide{grid-column:1/-1}',
      '.sg-label{font-size:12px;line-height:18px;font-weight:500;color:var(--dsw-alias-label-secondary)}',
      '.sg-input{box-sizing:border-box;width:100%;height:32px;padding:0 10px;border:0.5px solid var(--dsw-alias-border-l4,var(--dsw-alias-border-l2));border-radius:var(--dsw-radius-md,12px);background:var(--dsw-alias-bg-layer-1);color:var(--dsw-alias-label-primary);font:inherit;font-size:14px;line-height:22px}',
      '.sg-input:focus{outline:none;border-color:var(--dsw-alias-state-business-primary,var(--dsw-alias-brand-primary))}',
      '.sg-input::placeholder{color:var(--dsw-alias-label-dimmed,var(--dsw-alias-label-secondary))}',
      '.sg-input:disabled{opacity:.6;cursor:default}',
      '.sg-input[aria-invalid="true"]{border-color:var(--dsw-alias-state-error-primary)}',
      '.sg-hint{margin:0;font-size:12px;line-height:18px;color:var(--dsw-alias-label-tertiary,var(--dsw-alias-label-secondary))}',
      '.sg-editor-actions{display:flex;justify-content:flex-end;gap:8px}',
      '.sg-confirm{display:flex;align-items:center;justify-content:space-between;gap:12px 16px;flex-wrap:wrap;font-size:12px;line-height:18px}',
      '.sg-confirm-text{display:flex;flex-direction:column;gap:2px;min-width:0}',
      '.sg-confirm-note{color:var(--dsw-alias-label-tertiary,var(--dsw-alias-label-secondary))}',
      '.sg-panel{display:flex;flex-direction:column;gap:16px;padding:14px 16px;border:0.5px solid var(--dsw-alias-settings-card-stroke,var(--dsw-alias-border-l2));border-radius:var(--dsw-radius-xl,20px);background:var(--dsw-alias-settings-card-fill,var(--dsw-alias-bg-layer-1))}',
      '.sg-group-head{display:flex;align-items:baseline;justify-content:space-between;gap:12px;flex-wrap:wrap}',
      '.sg-group-title{margin:0;font-size:14px;line-height:22px;font-weight:500}',
      '.sg-empty{margin:12px 0 0;padding:20px 16px;font-size:13px;line-height:20px;color:var(--dsw-alias-label-tertiary,var(--dsw-alias-label-secondary));text-align:center}',
      '.sg-foot{font-size:12px;line-height:18px;color:var(--dsw-alias-label-tertiary,var(--dsw-alias-label-secondary))}',
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
     * The 14px plus mark on the add row.
     *
     * Drawn here rather than imported: the Client half may not load Harness
     * Client packages, so a shipped icon primitive is not available.
     * @returns {any} the icon element.
     */
    function plusIcon() {
      return h('svg', {
        width: 14,
        height: 14,
        viewBox: '0 0 14 14',
        'aria-hidden': 'true',
        focusable: 'false',
      }, h('path', {
        d: 'M7 2.5v9M2.5 7h9',
        fill: 'none',
        stroke: 'currentColor',
        strokeWidth: 1.4,
        strokeLinecap: 'round',
      }));
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
      const [sizeError, setSizeError] = React.useState(null);
      const [timeoutError, setTimeoutError] = React.useState(null);
      const [defaultsNotice, setDefaultsNotice] = React.useState(null);
      // Focus returns to the control that opened a form once that form closes:
      // otherwise the focused button unmounts and focus falls back to <body>.
      const editButtons = React.useRef(new Map());
      const addButton = React.useRef(null);
      const clearKeyButton = React.useRef(null);
      const keyInput = React.useRef(null);
      const pendingFocus = React.useRef(null);

      React.useEffect(() => {
        const target = pendingFocus.current;
        if (target === null) return;
        const element = target === 'add' ? addButton.current
          : target === 'keyInput' ? keyInput.current
            : target === 'clearKey' ? clearKeyButton.current
              : editButtons.current.get(target);
        // A control takes focus only once it exists and is enabled. The save
        // path clears `busy` after the editor has already closed, so the retry
        // keyed on `busy` is what actually lands that focus.
        if (element === undefined || element === null || element.disabled === true) return;
        pendingFocus.current = null;
        element.focus();
      }, [editing, confirmingId, keyConfirm, busy]);

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
       * @param {(notice: {kind: string, text: string}) => void} [report] when
       * given, the outcome goes here instead of the page-level notice, so a
       * control far below the top reports beside itself.
       * @returns {Promise<boolean>} whether the Host accepted the change.
       */
      async function commit(ops, successMessage, report) {
        const fail = text => {
          if (report === undefined) setNotice({ kind: 'error', text });
          else report({ kind: 'error', text });
          return false;
        };
        try {
          const accepted = await host.form.mutate(ops);
          if (!accepted) return fail(t('rejected'));
          const done = { kind: 'ok', text: successMessage };
          if (report === undefined) setNotice(done);
          else report(done);
          return true;
        } catch (error) {
          return fail(`${t('saveFailed')} ${error?.message ?? ''}`.trim());
        }
      }

      /** Open the editor for one saved account. */
      function startEdit(profile) {
        pendingFocus.current = null;
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
        pendingFocus.current = null;
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
              pendingFocus.current = draft.id;
              setEditing(null);
              await presence.refresh();
              return;
            }
          }
          pendingFocus.current = draft.id;
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
          // Land focus on a neighbour's editor entry rather than <body>: the
          // confirmation button is unmounted by this update.
          const neighbour = profiles[index + 1] ?? profiles[index - 1];
          pendingFocus.current = neighbour === undefined ? 'add' : neighbour.id;
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
          // The row's "use" button disappears once this account is active, so
          // focus moves to the row's edit entry.
          pendingFocus.current = profile.id;
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
          pendingFocus.current = 'keyInput';
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
        setSizeError(null);
        setDefaultsNotice(null);
        if (next === resolvedSize) return;
        if (!/^\d{2,5}x\d{2,5}$/i.test(next)) {
          // The invalid text stays in the field: reverting it would leave the
          // format error pointing at a value that is already correct.
          setSizeError(t('invalidSize'));
          return;
        }
        await commit([{ op: 'set', path: ['defaultSize'], value: next }], t('saved'), setDefaultsNotice);
      }

      /** Persist the request timeout when the field is left. */
      async function commitTimeout() {
        const seconds = Number.parseInt(timeoutDraft, 10);
        setTimeoutError(null);
        setDefaultsNotice(null);
        if (seconds === resolvedTimeout) return;
        if (!Number.isFinite(seconds) || seconds < 5 || seconds > 900) {
          setTimeoutError(t('invalidTimeout'));
          return;
        }
        await commit([{ op: 'set', path: ['timeoutMs'], value: seconds * 1000 }], t('saved'), setDefaultsNotice);
      }

      /**
       * Render one labelled text field.
       * @param {string} id input id; also the wrapper key.
       * @param {string} label visible label text.
       * @param {string} valueText current value.
       * @param {(next: string) => void} onChange value writer.
       * @param {any} [extra] `wide` marks a full-row field; anything else is
       * passed to the input element.
       * @returns {any} the field element.
       */
      function textField(id, label, valueText, onChange, extra = {}) {
        const { wide, ...inputProps } = extra;
        return h('label', { className: `sg-field${wide === true ? ' is-wide' : ''}`, htmlFor: id, key: id },
          h('span', { className: 'sg-label' }, label),
          h('input', {
            id,
            className: 'sg-input',
            type: 'text',
            value: valueText,
            spellCheck: false,
            autoComplete: 'off',
            disabled: !writable || busy !== null,
            onChange: event => { onChange(event.target.value); },
            ...inputProps,
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
        const describedBy = field => (fieldInvalid(field) ? 'sg-draft-error' : undefined);
        // Read this account's own entry first: a page-wide refresh must not
        // relabel a known credential, nor hide its clear control for a beat.
        const describedKey = typeof draft.apiKeyEnv === 'string' && draft.apiKeyEnv.length > 0
          ? presence.entries[draft.apiKeyEnv]
          : undefined;
        const keyKnown = describedKey !== undefined;
        const hasKey = describedKey?.configured === true;
        return h('div', { className: 'sg-editor' },
          h('div', { className: 'sg-fields' },
            textField('sg-e-name', t('name'), draft.name, next => { update({ name: next }); }, {
              autoFocus: true,
              'aria-invalid': fieldInvalid('name') ? 'true' : undefined,
              'aria-describedby': describedBy('name'),
            }),
            textField('sg-e-model', t('model'), draft.model, next => { update({ model: next }); }, {
              'aria-invalid': fieldInvalid('model') ? 'true' : undefined,
              'aria-describedby': describedBy('model'),
            }),
            textField('sg-e-url', t('baseUrl'), draft.baseUrl, next => { update({ baseUrl: next }); }, {
              wide: true,
              'aria-invalid': fieldInvalid('baseUrl') ? 'true' : undefined,
              'aria-describedby': describedBy('baseUrl'),
            }),
            h('div', { className: 'sg-field is-wide', key: 'sg-e-key' },
              h('label', { className: 'sg-label', htmlFor: 'sg-e-key' }, t('apiKey')),
              h('input', {
                id: 'sg-e-key',
                className: 'sg-input',
                ref: keyInput,
                type: 'password',
                value: draft.apiKey,
                autoComplete: 'off',
                spellCheck: false,
                disabled: !writable || busy !== null,
                'aria-invalid': fieldInvalid('key') ? 'true' : undefined,
                'aria-describedby': describedBy('key'),
                placeholder: !keyKnown
                  ? (presence.failed ? t('keyStatusUnknown') : t('keyUnknown'))
                  : hasKey ? t('apiKeySetPlaceholder') : t('apiKeyEmptyPlaceholder'),
                onChange: event => { update({ apiKey: event.target.value }); },
              }),
              hasKey
                ? (keyConfirm
                  ? h('div', { className: 'sg-confirm' },
                    h('span', { className: 'sg-confirm-text' }, t('clearKeyConfirm')),
                    h('div', { className: 'sg-actions' },
                      h('button', { type: 'button', className: 'sg-btn', autoFocus: true, disabled: busy !== null, onClick: () => { pendingFocus.current = 'clearKey'; setKeyConfirm(false); } }, t('cancel')),
                      h('button', { type: 'button', className: 'sg-btn is-danger', disabled: busy !== null, onClick: () => { void clearKey(draft.apiKeyEnv); } }, t('clearKeyYes'))))
                  : h('button', {
                    type: 'button',
                    className: 'sg-btn is-link',
                    ref: clearKeyButton,
                    disabled: !writable || busy !== null,
                    onClick: () => { setKeyConfirm(true); },
                  }, t('clearKey')))
                : null)),
          draftError !== undefined
            ? h('div', { className: 'sg-notice is-error', role: 'alert', id: 'sg-draft-error' }, draftError.message)
            : null,
          h('div', { className: 'sg-editor-actions' },
            h('button', {
              type: 'button',
              className: 'sg-btn is-wide',
              disabled: busy !== null,
              onClick: () => {
                pendingFocus.current = editing.isNew ? 'add' : editing.draft.id;
                setEditing(null);
                setDraftError(undefined);
                setKeyConfirm(false);
              },
            }, t('cancel')),
            h('button', {
              type: 'button',
              className: 'sg-btn is-filled',
              disabled: !writable || busy !== null,
              'aria-busy': busy === 'save' ? 'true' : undefined,
              onClick: () => { void saveEditing(); },
            }, busy === 'save' ? t('saving') : t('save'))));
      }

      /** Render one saved account row. */
      function renderCard(profile, index) {
        const displayName = profile.name || profile.id || `#${index + 1}`;
        const isActive = profile.id === activeId;
        const keyRef = typeof profile.apiKeyEnv === 'string' && profile.apiKeyEnv.length > 0 ? profile.apiKeyEnv : undefined;
        const described = keyRef === undefined ? undefined : presence.entries[keyRef];
        // A described credential outranks the page-wide loading or failure flag,
        // so one refresh does not relabel every row as "checking".
        const keyState = described !== undefined
          ? (described.configured === true ? 'set' : 'missing')
          : presence.failed ? 'unknown' : presence.loading ? 'pending' : 'missing';
        const keyClass = keyState === 'set' ? 'is-set' : keyState === 'missing' ? 'is-missing' : '';
        const keyLabel = keyState === 'set' ? t('keySet')
          : keyState === 'missing' ? t('keyMissing')
            : keyState === 'unknown' ? t('keyStatusUnknown') : t('keyUnknown');
        const editingThis = editing !== null && !editing.isNew && editing.draft.id === profile.id;
        const confirmingThis = confirmingId !== null && confirmingId === profile.id;
        const successor = isActive ? profiles.find((candidate) => candidate.id !== profile.id) : undefined;
        const blocked = !writable || busy !== null || (editing !== null && !editingThis);
        const meta = `${profile.model ?? DEFAULT_MODEL} · ${profile.baseUrl ?? DEFAULT_BASE_URL}`;
        return h('li', { className: `sg-card${isActive ? ' is-active' : ''}${editingThis ? ' is-editing' : ''}`, key: profile.id ?? index },
          h('div', { className: 'sg-head' },
            h('span', { className: 'sg-identity' },
              h('span', { className: 'sg-name' }, displayName),
              isActive ? h('span', { className: 'sg-tag is-active' }, t('active')) : null),
            editingThis || confirmingThis
              ? null
              : h('div', { className: 'sg-actions' },
                !isActive
                  ? h('button', {
                    type: 'button',
                    className: 'sg-btn',
                    'aria-label': format(t('useAccount'), { name: displayName }),
                    disabled: blocked,
                    onClick: () => { void useAccount(profile); },
                  }, t('use'))
                  : null,
                h('button', {
                  type: 'button',
                  className: 'sg-btn',
                  ref: element => {
                    if (element === null) editButtons.current.delete(profile.id);
                    else editButtons.current.set(profile.id, element);
                  },
                  'aria-label': format(t('editAccount'), { name: displayName }),
                  disabled: blocked,
                  onClick: () => { startEdit(profile); },
                }, t('edit')),
                h('button', {
                  type: 'button',
                  className: 'sg-btn is-danger',
                  'aria-label': format(t('deleteAccount'), { name: displayName }),
                  disabled: blocked || profiles.length <= 1,
                  onClick: () => { setEditing(null); setNotice(null); setConfirmingId(profile.id); },
                }, t('delete')))),
          h('div', { className: 'sg-sub' },
            editingThis ? null : h('span', { className: 'sg-meta', title: meta }, meta),
            h('span', { className: `sg-key ${keyClass}` },
              h('span', { className: 'sg-dot' }),
              keyLabel)),
          profiles.length <= 1 && !editingThis && !confirmingThis
            ? h('p', { className: 'sg-hint' }, t('lastAccountHint'))
            : null,
          editingThis
            ? renderEditor()
            : confirmingThis
              ? h('div', { className: 'sg-confirm' },
                h('div', { className: 'sg-confirm-text' },
                  h('span', null, format(t('confirmDelete'), { name: displayName })),
                  successor !== undefined
                    ? h('span', { className: 'sg-confirm-note' }, format(t('activeWillMove'), { name: successor.name ?? successor.id }))
                    : null),
                h('div', { className: 'sg-actions' },
                  h('button', {
                    type: 'button',
                    className: 'sg-btn',
                    autoFocus: true,
                    onClick: () => { pendingFocus.current = profile.id; setConfirmingId(null); },
                  }, t('cancel')),
                  h('button', {
                    type: 'button',
                    className: 'sg-btn is-danger',
                    disabled: busy !== null,
                    onClick: () => { void removeAccount(profile.id); },
                  }, t('confirmYes'))))
              : null);
      }

      if (snapshot.status === 'unavailable') {
        return h('div', { className: 'sg-section' },
          h('style', null, STYLE),
          h('h2', { className: 'sg-title' }, t('title')),
          h('p', { className: 'sg-intro' }, t('unavailable')));
      }
      if (snapshot.status === 'loading' || snapshot.value === undefined) {
        return h('div', { className: 'sg-section', role: 'status' },
          h('style', null, STYLE),
          h('h2', { className: 'sg-title' }, t('title')),
          h('p', { className: 'sg-intro' }, t('loading')));
      }

      const adding = editing !== null && editing.isNew;
      return h('div', { className: 'sg-section' },
        h('style', null, STYLE),
        h('h2', { className: 'sg-title' }, t('title')),
        h('p', { className: 'sg-intro' }, t('description')),
        !writable ? h('p', { className: 'sg-note' }, t('readOnly')) : null,
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
        profiles.length === 0 && !adding
          ? h('p', { className: 'sg-empty' }, t('emptyAccounts'))
          : h('ul', { className: 'sg-list' },
            profiles.map((profile, index) => renderCard(profile, index)),
            adding
              ? h('li', { className: 'sg-card is-editing', key: 'sg-new' },
                h('div', { className: 'sg-head' },
                  h('span', { className: 'sg-name' }, editing.draft.name)),
                renderEditor())
              : null),
        editing === null
          ? h('div', { className: 'sg-add' },
            h('button', {
              type: 'button',
              className: 'sg-btn is-add',
              ref: addButton,
              disabled: !writable || busy !== null,
              onClick: () => { startAdd(); },
            }, plusIcon(), t('add')))
          : null,
        h('div', { className: 'sg-panel' },
          h('div', { className: 'sg-group-head' },
            h('h3', { className: 'sg-group-title' }, t('requestDefaults')),
            defaultsNotice === null
              ? null
              : h('span', {
                className: `sg-notice ${defaultsNotice.kind === 'error' ? 'is-error' : 'is-ok'}`,
                role: defaultsNotice.kind === 'error' ? 'alert' : 'status',
              }, defaultsNotice.text)),
          h('div', { className: 'sg-fields' },
            h('div', { className: 'sg-field', key: 'sg-size' },
              h('label', { className: 'sg-label', htmlFor: 'sg-default-size' }, t('defaultSize')),
              h('input', {
                id: 'sg-default-size',
                className: 'sg-input',
                type: 'text',
                value: sizeDraft,
                spellCheck: false,
                'aria-invalid': sizeError !== null ? 'true' : undefined,
                'aria-describedby': sizeError !== null ? 'sg-default-size-error sg-default-size-hint' : 'sg-default-size-hint',
                disabled: !writable || busy !== null,
                onChange: event => { setSizeDraft(event.target.value); setSizeError(null); setDefaultsNotice(null); },
                onBlur: () => { void commitSize(); },
              }),
              h('p', { className: 'sg-hint', id: 'sg-default-size-hint' }, t('defaultSizeHint')),
              sizeError !== null
                ? h('p', { className: 'sg-notice is-error', id: 'sg-default-size-error', role: 'alert' }, sizeError)
                : null),
            h('div', { className: 'sg-field', key: 'sg-timeout' },
              h('label', { className: 'sg-label', htmlFor: 'sg-timeout' }, t('timeout')),
              h('input', {
                id: 'sg-timeout',
                className: 'sg-input',
                type: 'number',
                inputMode: 'numeric',
                min: 5,
                max: 900,
                step: 1,
                value: timeoutDraft,
                'aria-invalid': timeoutError !== null ? 'true' : undefined,
                'aria-describedby': timeoutError !== null ? 'sg-timeout-error sg-timeout-hint' : 'sg-timeout-hint',
                disabled: !writable || busy !== null,
                onChange: event => { setTimeoutDraft(event.target.value); setTimeoutError(null); setDefaultsNotice(null); },
                onBlur: () => { void commitTimeout(); },
              }),
              h('p', { className: 'sg-hint', id: 'sg-timeout-hint' }, t('timeoutHint')),
              timeoutError !== null
                ? h('p', { className: 'sg-notice is-error', id: 'sg-timeout-error', role: 'alert' }, timeoutError)
                : null))),
        h('div', { className: 'sg-foot' }, t('toolHint')));
    }

    /** Required client services. */
    const inject = ['slots', 'locale', 'configForms', 'remote', 'remote.credentials'];

    /**
     * Register the settings dictionaries and the settings page.
     * @param {any} ctx client plugin context.
     */
    function apply(ctx) {
      ctx.effect(() => ctx.locale.register(NS, { zh, en }), 'dsh-sense-img: dictionaries');
      const t = ctx.locale.bind(NS);
      host = { ctx, form: ctx.configForms.get(ENTRY_ID) };
      ctx.effect(() => ctx.configForms.whileServed([ENTRY_ID], () => ctx.slots.inject('settings.section', () => ctx.slots.register({
        name: 'settings.section',
        id: ENTRY_ID,
        order: 55,
        label: () => t('title'),
        locale: NS,
      }, Page))), 'dsh-sense-img: settings page');
      ctx.effect(() => () => { host = null; }, 'dsh-sense-img: page state');
    }

    return { inject, apply };
  },
});
