/* Status admin — shop-side console for the live job status portal.
 * Lives at /status/admin/ (noindex). Auth is the shop key, checked
 * server-side on every request (STATUS_ADMIN_KEY env var on Netlify); the key
 * is kept in localStorage so Rob signs in once per device.
 */
const ADMIN_KEY_STORAGE = 'th-status-admin-key';

const ADMIN_STAGES = {
  dyno: ['Checked in', 'Baseline pulls', 'DynoAI modeling', 'Tune + verification pulls', 'Final quality check', 'Ready for pickup'],
  storage: ['Checked in', 'Prepped for storage', 'In storage', 'Ready for pickup'],
};

async function adminApi(key, method, path, body) {
  const res = await fetch(path, {
    method,
    headers: {
      'X-Admin-Key': key,
      Accept: 'application/json',
      ...(body ? { 'Content-Type': 'application/json' } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error(data.error || 'HTTP ' + res.status);
    err.status = res.status;
    err.hint = data.hint;
    throw err;
  }
  return data;
}

function AdminField({ label, children }) {
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 5, minWidth: 0 }}>
      <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--steel-500)' }}>{label}</span>
      {children}
    </label>
  );
}

const adminInputStyle = {
  height: 36, padding: '0 10px', background: 'var(--black)', border: '1px solid var(--ink-500)',
  borderRadius: 'var(--radius-sm)', color: 'var(--bone)', fontFamily: 'var(--font-body)', fontSize: 14,
  outline: 'none', width: '100%', boxSizing: 'border-box',
};

function AdminJobCard({ job, apiKey, onSaved }) {
  const { Button, Badge } = window.DS;
  const [f, setF] = React.useState(() => ({
    stage: job.stage,
    eta: job.eta || '',
    bay: job.bay || '',
    pullsDone: job.pullsDone || 0,
    pullsTotal: job.pullsTotal || 4,
    noteText: (job.note && job.note.text) || '',
    noteAuthor: (job.note && job.note.author) || 'Rob, lead tuner',
    baseHp: (job.numbers && job.numbers.baseHp) || '',
    tunedHp: (job.numbers && job.numbers.tunedHp) || '',
    baseTq: (job.numbers && job.numbers.baseTq) || '',
    tunedTq: (job.numbers && job.numbers.tunedTq) || '',
    bill: (job.bill || []).map((r) => ({ ...r })),
    due: job.due || '',
    archived: !!job.archived,
  }));
  const [busy, setBusy] = React.useState(false);
  const [flash, setFlash] = React.useState(null);
  const [open, setOpen] = React.useState(false);

  const stages = ADMIN_STAGES[job.type] || ADMIN_STAGES.dyno;
  const set = (k) => (e) => setF((s) => ({ ...s, [k]: e && e.target ? e.target.value : e }));
  const setBill = (i, k, v) => setF((s) => {
    const bill = s.bill.map((r, j) => (j === i ? { ...r, [k]: v } : r));
    return { ...s, bill };
  });

  const link = window.location.origin + '/status/?t=' + job.token;

  async function save(extra) {
    setBusy(true);
    setFlash(null);
    try {
      const patch = {
        stage: Number(f.stage),
        eta: f.eta,
        bay: f.bay,
        pullsDone: Number(f.pullsDone),
        pullsTotal: Number(f.pullsTotal),
        note: f.noteText ? { text: f.noteText, author: f.noteAuthor } : null,
        numbers: { baseHp: f.baseHp, tunedHp: f.tunedHp, baseTq: f.baseTq, tunedTq: f.tunedTq },
        bill: f.bill,
        due: f.due,
        archived: f.archived,
        ...(extra || {}),
      };
      const data = await adminApi(apiKey, 'PUT', '/api/admin/jobs?t=' + encodeURIComponent(job.token), { patch });
      onSaved(data.job);
      setFlash('Saved');
    } catch (err) {
      setFlash(err.message === 'unauthorized' ? 'Bad shop key' : 'Save failed — ' + err.message);
    } finally {
      setBusy(false);
      setTimeout(() => setFlash(null), 2500);
    }
  }

  const bumpStage = (dir) => {
    const next = Math.max(0, Math.min(stages.length - 1, Number(f.stage) + dir));
    setF((s) => ({ ...s, stage: next }));
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(link);
      setFlash('Link copied');
    } catch {
      window.prompt('Copy the customer link:', link);
    }
    setTimeout(() => setFlash(null), 2500);
  };

  const isReady = Number(f.stage) === stages.length - 1;

  return (
    <div style={{ background: 'var(--ink-800)', border: '1px solid var(--ink-600)', borderLeft: `3px solid ${f.archived ? 'var(--ink-500)' : isReady ? 'var(--green-500)' : 'var(--red-500)'}`, borderRadius: 'var(--radius-md)', padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: 14, opacity: f.archived ? 0.6 : 1 }}>
      {/* header row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 12, color: 'var(--steel-400)' }}>{job.wo}</span>
        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 15, textTransform: 'uppercase', color: 'var(--white)' }}>{job.owner || '—'}</span>
        <span style={{ fontSize: 13.5, color: 'var(--steel-300)' }}>{job.bike}</span>
        <Badge tone={job.type === 'dyno' ? 'brand' : 'neutral'}>{job.type === 'dyno' ? 'Dyno' : 'Storage'}</Badge>
        <span style={{ flex: 1 }} />
        {flash && <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: flash === 'Saved' || flash === 'Link copied' ? 'var(--green-500)' : 'var(--red-400)' }}>{flash.toUpperCase()}</span>}
        <Button variant="secondary" size="sm" onClick={copyLink}>Copy customer link</Button>
        <Button variant="ghost" size="sm" onClick={() => setOpen((o) => !o)}>{open ? 'Less' : 'More'}</Button>
      </div>

      {/* stage stepper */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
        <Button variant="secondary" size="sm" onClick={() => bumpStage(-1)} disabled={Number(f.stage) === 0}>&larr;</Button>
        <select value={f.stage} onChange={set('stage')} style={{ ...adminInputStyle, width: 'auto', minWidth: 220, height: 32 }}>
          {stages.map((s, i) => <option key={s} value={i}>{(i + 1) + ' · ' + s}</option>)}
        </select>
        <Button variant="primary" size="sm" onClick={() => bumpStage(1)} disabled={isReady}>Next stage &rarr;</Button>
        <span style={{ flex: 1 }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--steel-500)' }}>ETA</span>
          <input value={f.eta} onChange={set('eta')} placeholder="Today · 4:30 PM" style={{ ...adminInputStyle, width: 170, height: 32 }} />
        </div>
        {job.type === 'dyno' && (Number(f.stage) === 1 || Number(f.stage) === 3) && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--steel-500)' }}>Pulls</span>
            <Button variant="secondary" size="sm" onClick={() => setF((s) => ({ ...s, pullsDone: Math.max(0, Number(s.pullsDone) - 1) }))}>−</Button>
            <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 13, color: 'var(--red-400)', minWidth: 42, textAlign: 'center' }}>{f.pullsDone} / {f.pullsTotal}</span>
            <Button variant="secondary" size="sm" onClick={() => setF((s) => ({ ...s, pullsDone: Math.min(Number(s.pullsTotal), Number(s.pullsDone) + 1) }))}>+</Button>
          </div>
        )}
        <Button variant="primary" size="sm" onClick={() => save()} disabled={busy}>{busy ? 'Saving…' : 'Save'}</Button>
      </div>

      {open && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, borderTop: '1px solid var(--ink-700)', paddingTop: 14 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 12 }}>
            <AdminField label="Bay label"><input value={f.bay} onChange={set('bay')} placeholder="BAY 1" style={adminInputStyle} /></AdminField>
            <AdminField label="Pulls total"><input type="number" min="0" max="12" value={f.pullsTotal} onChange={set('pullsTotal')} style={adminInputStyle} /></AdminField>
            <AdminField label="Due at pickup"><input value={f.due} onChange={set('due')} placeholder="$650.00" style={adminInputStyle} /></AdminField>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 12 }}>
            <AdminField label="Baseline HP"><input value={f.baseHp} onChange={set('baseHp')} placeholder="79.4" style={adminInputStyle} /></AdminField>
            <AdminField label="Tuned HP"><input value={f.tunedHp} onChange={set('tunedHp')} placeholder="93.6" style={adminInputStyle} /></AdminField>
            <AdminField label="Baseline TQ"><input value={f.baseTq} onChange={set('baseTq')} placeholder="68.9" style={adminInputStyle} /></AdminField>
            <AdminField label="Tuned TQ"><input value={f.tunedTq} onChange={set('tunedTq')} placeholder="78.2" style={adminInputStyle} /></AdminField>
          </div>

          <AdminField label="Note from the bench (customer sees this)">
            <textarea value={f.noteText} onChange={set('noteText')} rows={3} placeholder="Chased down that stutter you felt around 105…" style={{ ...adminInputStyle, height: 'auto', padding: '8px 10px', resize: 'vertical', fontFamily: 'var(--font-body)' }} />
          </AdminField>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 12, maxWidth: 320 }}>
            <AdminField label="Signed"><input value={f.noteAuthor} onChange={set('noteAuthor')} style={adminInputStyle} /></AdminField>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--steel-500)' }}>The bill</span>
            {f.bill.map((row, i) => (
              <div key={i} style={{ display: 'flex', gap: 8 }}>
                <input value={row.label} onChange={(e) => setBill(i, 'label', e.target.value)} placeholder="Full dyno tune · DynoAI" style={{ ...adminInputStyle, flex: 2 }} />
                <input value={row.amount} onChange={(e) => setBill(i, 'amount', e.target.value)} placeholder="$650.00 or INCLUDED" style={{ ...adminInputStyle, flex: 1 }} />
                <Button variant="ghost" size="sm" onClick={() => setF((s) => ({ ...s, bill: s.bill.filter((_, j) => j !== i) }))}>✕</Button>
              </div>
            ))}
            <div><Button variant="secondary" size="sm" onClick={() => setF((s) => ({ ...s, bill: [...s.bill, { label: '', amount: '' }] }))}>+ Line item</Button></div>
          </div>

          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <Button variant="ghost" size="sm" onClick={() => { setF((s) => ({ ...s, archived: !s.archived })); }}>{f.archived ? 'Unarchive' : 'Archive job'}</Button>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, color: 'var(--steel-600)' }}>{link}</span>
          </div>
        </div>
      )}
    </div>
  );
}

function AdminNewJob({ apiKey, onCreated }) {
  const { Button } = window.DS;
  const [f, setF] = React.useState({ type: 'dyno', owner: '', bike: '', package: '', bay: '', eta: '', pullsTotal: 4 });
  const [busy, setBusy] = React.useState(false);
  const [err, setErr] = React.useState(null);
  const set = (k) => (e) => setF((s) => ({ ...s, [k]: e.target.value }));

  async function create() {
    setBusy(true);
    setErr(null);
    try {
      const patch = { ...f, pullsTotal: Number(f.pullsTotal) };
      if (!patch.package) delete patch.package;
      if (!patch.bay) delete patch.bay;
      const data = await adminApi(apiKey, 'POST', '/api/admin/jobs', { patch });
      onCreated(data.job);
      setF({ type: 'dyno', owner: '', bike: '', package: '', bay: '', eta: '', pullsTotal: 4 });
    } catch (e) {
      setErr(e.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div style={{ background: 'var(--black)', border: '1px solid var(--ink-600)', borderRadius: 'var(--radius-md)', padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: 12 }}>
      <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 12, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--steel-300)' }}>Check in a bike</span>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 12 }}>
        <AdminField label="Job type">
          <select value={f.type} onChange={set('type')} style={adminInputStyle}>
            <option value="dyno">Dyno tune</option>
            <option value="storage">Storage</option>
          </select>
        </AdminField>
        <AdminField label="Owner"><input value={f.owner} onChange={set('owner')} placeholder="Mike Torrance" style={adminInputStyle} /></AdminField>
        <AdminField label="Bike"><input value={f.bike} onChange={set('bike')} placeholder="'19 Street Glide Special" style={adminInputStyle} /></AdminField>
        <AdminField label="Package"><input value={f.package} onChange={set('package')} placeholder={f.type === 'dyno' ? 'Full dyno tune · DynoAI' : 'Winter storage'} style={adminInputStyle} /></AdminField>
        <AdminField label="Bay"><input value={f.bay} onChange={set('bay')} placeholder={f.type === 'dyno' ? 'BAY 1' : 'STORAGE'} style={adminInputStyle} /></AdminField>
        <AdminField label="ETA"><input value={f.eta} onChange={set('eta')} placeholder="Today · 4:30 PM" style={adminInputStyle} /></AdminField>
      </div>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <Button variant="primary" size="md" onClick={create} disabled={busy || !f.bike}>{busy ? 'Creating…' : 'Create job + link'}</Button>
        {err && <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--red-400)' }}>{err.toUpperCase()}</span>}
      </div>
    </div>
  );
}

function StatusAdmin() {
  const { Button } = window.DS;
  const [key, setKey] = React.useState(null); // null = booting (SSR-safe)
  const [draftKey, setDraftKey] = React.useState('');
  const [jobs, setJobs] = React.useState(null);
  const [err, setErr] = React.useState(null);
  const [showArchived, setShowArchived] = React.useState(false);

  React.useEffect(() => {
    let saved = '';
    try { saved = window.localStorage.getItem(ADMIN_KEY_STORAGE) || ''; } catch { /* private mode */ }
    setKey(saved);
  }, []);

  const loadJobs = React.useCallback(async (k) => {
    setErr(null);
    try {
      const data = await adminApi(k, 'GET', '/api/admin/jobs');
      setJobs(data.jobs);
    } catch (e) {
      if (e.status === 401) {
        setKey('');
        try { window.localStorage.removeItem(ADMIN_KEY_STORAGE); } catch { /* ignore */ }
        setErr('That key was rejected. Try again.');
      } else {
        setErr(e.hint || e.message);
      }
      setJobs(null);
    }
  }, []);

  React.useEffect(() => {
    if (key) loadJobs(key);
  }, [key, loadJobs]);

  const signIn = () => {
    const k = draftKey.trim();
    if (!k) return;
    try { window.localStorage.setItem(ADMIN_KEY_STORAGE, k); } catch { /* ignore */ }
    setKey(k);
  };

  const replaceJob = (job) => setJobs((list) => (list || []).map((j) => (j.token === job.token ? job : j)));

  return (
    <div className="th-dark" style={{ minHeight: '100vh', background: 'var(--ink-900)', fontFamily: 'var(--font-body)', color: 'var(--steel-200)' }}>
      <div style={{ height: 6, background: 'var(--hazard)' }} />
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '22px 18px 60px', display: 'flex', flexDirection: 'column', gap: 16 }}>

        <header style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <img src={window.ASSET + 'thunderhorse-badge-cream.png'} alt="Thunderhorse Tuning" style={{ height: 44 }} />
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 17, textTransform: 'uppercase', color: 'var(--white)', lineHeight: 1 }}>Status console</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--steel-500)', marginTop: 3 }}>Live job status · shop side</div>
          </div>
          <span style={{ flex: 1 }} />
          {key && jobs && (
            <>
              <Button variant="ghost" size="sm" onClick={() => setShowArchived((v) => !v)}>{showArchived ? 'Hide archived' : 'Show archived'}</Button>
              <Button variant="secondary" size="sm" onClick={() => loadJobs(key)}>Refresh</Button>
            </>
          )}
        </header>

        {key === null ? null : !key ? (
          <div style={{ background: 'var(--ink-800)', border: '1px solid var(--ink-600)', borderRadius: 'var(--radius-md)', padding: '24px 22px', maxWidth: 460 }}>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 14, textTransform: 'uppercase', color: 'var(--white)', marginBottom: 6 }}>Shop key</div>
            <p style={{ margin: '0 0 14px', fontSize: 13.5, lineHeight: 1.5, color: 'var(--steel-400)' }}>Enter the shop key to manage live job statuses. It's the STATUS_ADMIN_KEY value set on Netlify.</p>
            <div style={{ display: 'flex', gap: 10 }}>
              <input
                type="password"
                value={draftKey}
                onChange={(e) => setDraftKey(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') signIn(); }}
                placeholder="Shop key"
                style={adminInputStyle}
              />
              <Button variant="primary" size="md" onClick={signIn}>Open</Button>
            </div>
            {err && <p style={{ margin: '10px 0 0', fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--red-400)' }}>{String(err).toUpperCase()}</p>}
          </div>
        ) : (
          <>
            <AdminNewJob apiKey={key} onCreated={(job) => setJobs((list) => [job, ...(list || [])])} />
            {err && <p style={{ margin: 0, fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--red-400)' }}>{String(err).toUpperCase()}</p>}
            {jobs === null && !err && <p style={{ margin: 0, fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--steel-400)' }}>LOADING JOBS…</p>}
            {jobs && jobs.filter((j) => showArchived || !j.archived).length === 0 && (
              <p style={{ margin: 0, fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--steel-500)' }}>NO ACTIVE JOBS — CHECK ONE IN ABOVE.</p>
            )}
            {jobs && jobs.filter((j) => showArchived || !j.archived).map((job) => (
              <AdminJobCard key={job.token + ':' + job.updatedAt} job={job} apiKey={key} onSaved={replaceJob} />
            ))}
          </>
        )}
      </div>
    </div>
  );
}

Object.assign(window, { StatusAdmin });
