/* Live job status portal — customer view.
 * Reached via the capability link we text at drop-off:
 *   https://thunderhorsetuning.com/status/?t=<token>
 * Polls /api/status every 12s (plus on tab focus) so the page updates on its
 * own while the bike is on the dyno or in storage. Design source:
 * "Live Tune Status" mock (Tune Status.dc.html).
 */
const STATUS_POLL_MS = 12000;

function statusToken() {
  if (typeof window === 'undefined' || !window.location) return '';
  const search = window.location.search || '';
  const m = search.match(/[?&]t=([a-zA-Z0-9-]+)/);
  return m ? m[1].toLowerCase() : '';
}

function fmtStageTime(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  if (isNaN(d.getTime())) return '';
  return d.toLocaleDateString('en-US', { weekday: 'short' }) + ' ' +
    d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
}

/* Stage-dependent hero copy for dyno jobs; storage jobs get simpler copy. */
function statusHero(job) {
  const last = job.stages.length - 1;
  const isReady = job.stage === last;
  if (job.type === 'storage') {
    const heroes = [
      { title: 'Checked in', sub: 'Walk-around done, keys tagged. Prepping your spot now.' },
      { title: 'Prepping for storage', sub: 'Fuel stabilized, battery on the tender, tires at spec.' },
      { title: 'Tucked in', sub: 'Covered and on the tender. We check on it — you don\u2019t have to.' },
      { title: 'Ready for pickup', sub: 'Rolled up front, paperwork ready. Come get it.' },
    ];
    return heroes[Math.min(job.stage, heroes.length - 1)];
  }
  const heroes = [
    { title: 'In the queue', sub: 'Checked in, keys tagged, walk-around done. Your bike goes on the drum next.' },
    { title: 'Baseline pulls', sub: 'Stock numbers first — so the gains you see at pickup are real, not marketing.' },
    { title: 'DynoAI is modeling', sub: 'Your WOT pull is building the full VE model. Physics, not guesswork.' },
    { title: 'On the dyno', sub: 'Corrected map is flashed. Verifying it against target, pull by pull.' },
    { title: 'Final quality check', sub: 'Tune verified. Heat cycle, decel, throttle response — then it gets ridden, not just revved.' },
    { title: 'Ready for pickup', sub: 'Dyno sheet printed, paperwork ready. Come get it — it rides like it should have from the factory.' },
  ];
  const h = heroes[Math.min(job.stage, heroes.length - 1)];
  return isReady ? heroes[heroes.length - 1] : h;
}

function StatusCard({ children, label, style }) {
  return (
    <section data-label={label} style={{
      background: 'var(--ink-800)', border: '1px solid var(--ink-600)',
      borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)', ...style,
    }}>{children}</section>
  );
}

function StatusH2({ children }) {
  return <h2 style={{ margin: 0, fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 18, letterSpacing: '0.01em', textTransform: 'uppercase', color: 'var(--white)' }}>{children}</h2>;
}

function LivePulseDot({ color, glow }) {
  return <span className="th-live-pulse" style={{
    width: 7, height: 7, borderRadius: 999, flex: 'none',
    background: color || 'var(--red-500)',
    boxShadow: glow || '0 0 8px rgba(209,10,17,0.8)',
  }} />;
}

/* ── Sections ──────────────────────────────────────────────── */

function StatusHero({ job }) {
  const last = job.stages.length - 1;
  const isReady = job.stage === last;
  const hero = statusHero(job);
  const isDyno = job.type === 'dyno';
  const onBaseline = isDyno && job.stage === 1;
  const onVerify = isDyno && job.stage === 3;
  const showPulls = (onBaseline || onVerify) && job.pullsTotal > 0;
  const pullsDone = Math.min(job.pullsDone || 0, job.pullsTotal);
  const showGains = isDyno && job.stage >= 4 && job.numbers;
  const queued = isDyno && job.stage === 0;
  const { StatReadout } = window.DS;

  const updated = job.updatedAt ? new Date(job.updatedAt).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }) : '';

  return (
    <StatusCard label="Current status" style={{ boxShadow: 'var(--shadow-md)', padding: '22px 22px 20px' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 12 }}>
        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--red-400)' }}>Current status</span>
        <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 11, letterSpacing: '0.06em', color: 'var(--steel-500)' }}>{job.wo}</span>
      </div>

      <h1 style={{ margin: '10px 0 6px', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(34px, 9vw, 44px)', lineHeight: 1.02, letterSpacing: '-0.01em', textTransform: 'uppercase', color: isReady ? 'var(--green-500)' : 'var(--white)' }}>{hero.title}</h1>
      <p style={{ margin: 0, fontSize: 15, lineHeight: 1.5, color: 'var(--steel-300)' }}>{hero.sub}</p>

      {/* stage progress */}
      <div style={{ marginTop: 18, display: 'flex', flexDirection: 'column', gap: 7 }}>
        <div style={{ display: 'flex', gap: 4 }}>
          {job.stages.map((_, i) => (
            <div key={i} style={{
              flex: 1, height: 4, borderRadius: 1,
              background: i < job.stage ? 'var(--red-500)' : i === job.stage ? (isReady ? 'var(--green-500)' : 'var(--red-500)') : 'var(--ink-600)',
            }} />
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 11, letterSpacing: '0.08em', color: 'var(--steel-400)' }}>STEP {job.stage + 1} OF {job.stages.length}</span>
          {updated && <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--steel-500)' }}>UPDATED {updated.toUpperCase()}</span>}
        </div>
      </div>

      {/* queue / gains stat row */}
      {(queued || showGains) && (
        <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid var(--ink-600)', display: 'flex', flexWrap: 'wrap', gap: '14px 30px' }}>
          {queued && <StatReadout label="Bay" value={job.bay || 'BAY 1'} tone="strong" />}
          {showGains && <StatReadout label="Peak power" value={job.numbers.tunedHp} unit="HP" tone="brand" delta={gainDelta(job.numbers.baseHp, job.numbers.tunedHp)} />}
          {showGains && <StatReadout label="Peak torque" value={job.numbers.tunedTq} unit="LB-FT" tone="brand" delta={gainDelta(job.numbers.baseTq, job.numbers.tunedTq)} />}
        </div>
      )}

      {/* pull counter */}
      {showPulls && (
        <div style={{ marginTop: 16, padding: '12px 14px', background: 'var(--black)', border: '1px solid var(--ink-600)', borderRadius: 'var(--radius-sm)', display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 10.5, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--steel-400)', whiteSpace: 'nowrap' }}>{onBaseline ? 'Baseline pulls' : 'Verification pulls'}</span>
          <div style={{ flex: 1, display: 'flex', gap: 4 }}>
            {Array.from({ length: job.pullsTotal }, (_, i) => (
              <div key={i} style={{ flex: 1, height: 8, borderRadius: 1, background: i < pullsDone ? 'var(--red-500)' : 'var(--ink-600)' }} />
            ))}
          </div>
          <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 12, letterSpacing: '0.04em', color: 'var(--red-400)', whiteSpace: 'nowrap' }}>
            {pullsDone >= job.pullsTotal ? 'COMPLETE' : 'PULL ' + Math.min(pullsDone + 1, job.pullsTotal) + ' OF ' + job.pullsTotal}
          </span>
        </div>
      )}

      {/* eta */}
      {(job.eta || isReady) && (
        <div style={{ marginTop: 16, paddingTop: 14, borderTop: '1px solid var(--ink-600)', display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 12 }}>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--steel-400)' }}>{isReady ? 'Pick up' : (job.type === 'storage' ? 'Pickup window' : 'Est. ready')}</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 15, color: isReady ? 'var(--green-500)' : 'var(--white)' }}>{job.eta || 'Today'}</span>
        </div>
      )}
    </StatusCard>
  );
}

function gainDelta(base, tuned) {
  const b = parseFloat(base), t = parseFloat(tuned);
  if (!isFinite(b) || !isFinite(t) || t <= b) return undefined;
  return '+' + (Math.round((t - b) * 10) / 10);
}

function StatusBike({ job }) {
  const isDyno = job.type === 'dyno';
  const onDrum = isDyno && (job.stage === 1 || job.stage === 3);
  const isReady = job.stage === job.stages.length - 1;
  const bayLabel = (job.bay || 'BAY 1') + (onDrum ? ' · ON THE DRUM' : isReady ? ' · READY' : '');
  return (
    <StatusCard label="Your bike" style={{ overflow: 'hidden' }}>
      <div style={{ position: 'relative' }}>
        <Photo name="dyno-pull.jpg" alt="Your bike on the dyno" sizes="(max-width: 660px) 100vw, 620px" style={{ display: 'block', width: '100%', height: 240, objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(15,15,20,0) 45%, rgba(15,15,20,0.85) 100%)' }} />
        <div style={{ position: 'absolute', left: 14, bottom: 12, display: 'inline-flex', alignItems: 'center', gap: 8, padding: '5px 10px', background: 'rgba(8,8,12,0.75)', border: '1px solid var(--ink-500)', borderRadius: 'var(--radius-sm)' }}>
          {onDrum && <LivePulseDot />}
          <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 10.5, letterSpacing: '0.08em', color: 'var(--bone)' }}>{bayLabel}</span>
        </div>
      </div>
      <div style={{ padding: '16px 20px 18px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px 20px' }}>
        {[
          ['Owner', job.owner || '—'],
          ['Bike', job.bike || '—'],
          ['Package', job.package || '—'],
          ['Work order', job.wo + ' · ' + (job.bay || 'BAY 1')],
        ].map(([k, v], i) => (
          <div key={k} style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--steel-500)' }}>{k}</span>
            <span style={i === 3
              ? { fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 13.5, color: 'var(--steel-200)' }
              : { fontSize: 14.5, fontWeight: 500, color: 'var(--white)' }}>{v}</span>
          </div>
        ))}
      </div>
    </StatusCard>
  );
}

function StatusTimeline({ job }) {
  const isReady = job.stage === job.stages.length - 1;
  return (
    <StatusCard label="Timeline" style={{ padding: '20px 20px 8px' }}>
      <div style={{ marginBottom: 16 }}><StatusH2>Where it&rsquo;s at</StatusH2></div>
      {job.stages.map((st, i) => {
        const isDone = i < job.stage;
        const isCurrent = i === job.stage;
        const timeIso = job.stageTimes && job.stageTimes[i];
        let timeLabel, timeColor;
        if (isDone) { timeLabel = (fmtStageTime(timeIso) || '—').toUpperCase(); timeColor = 'var(--steel-500)'; }
        else if (isCurrent) { timeLabel = isReady ? 'NOW' : 'IN PROGRESS'; timeColor = isReady ? 'var(--green-500)' : 'var(--red-400)'; }
        else { timeLabel = i === job.stage + 1 ? 'UP NEXT' : '—'; timeColor = 'var(--steel-600)'; }
        return (
          <div key={st.label} style={{ display: 'grid', gridTemplateColumns: '26px 1fr', gap: '0 14px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              {isDone && (
                <span style={{ width: 22, height: 22, borderRadius: 999, background: 'var(--ink-500)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#F4F2EC" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                </span>
              )}
              {isCurrent && (
                <span style={{ width: 22, height: 22, borderRadius: 999, background: isReady ? 'var(--green-500)' : 'var(--red-500)', boxShadow: isReady ? '0 0 14px -2px rgba(24,169,87,0.7)' : 'var(--glow-voltage)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>
                  <span className="th-live-pulse" style={{ width: 7, height: 7, borderRadius: 999, background: 'var(--white)' }} />
                </span>
              )}
              {!isDone && !isCurrent && (
                <span style={{ width: 22, height: 22, borderRadius: 999, border: '2px solid var(--ink-500)', background: 'transparent', boxSizing: 'border-box', flex: 'none' }} />
              )}
              {i < job.stages.length - 1 && <span style={{ width: 2, flex: 1, minHeight: 14, background: 'var(--ink-600)' }} />}
            </div>
            <div style={{ paddingBottom: 18 }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 10.5, color: 'var(--steel-600)' }}>{'0' + (i + 1)}</span>
                <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 14.5, letterSpacing: '0.03em', textTransform: 'uppercase', color: isCurrent ? 'var(--white)' : isDone ? 'var(--steel-300)' : 'var(--steel-500)' }}>{st.label}</span>
                <span style={{ flex: 1 }} />
                <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 10.5, letterSpacing: '0.05em', color: timeColor, whiteSpace: 'nowrap' }}>{timeLabel}</span>
              </div>
              <p style={{ margin: '4px 0 0', fontSize: 13, lineHeight: 1.45, color: isCurrent ? 'var(--steel-300)' : 'var(--steel-500)' }}>{st.desc}</p>
            </div>
          </div>
        );
      })}
    </StatusCard>
  );
}

function StatusNote({ note }) {
  if (!note || !note.text) return null;
  return (
    <StatusCard label="Shop note" style={{ borderLeft: '3px solid var(--red-500)', padding: '16px 18px', boxShadow: 'none' }}>
      <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 10.5, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--steel-400)', marginBottom: 6 }}>Note from the bench</div>
      <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.55, color: 'var(--steel-200)' }}>{note.text}</p>
      {note.author && <div style={{ marginTop: 8, fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 11, letterSpacing: '0.06em', color: 'var(--red-400)' }}>— {note.author.toUpperCase()}</div>}
    </StatusCard>
  );
}

function StatusNumbers({ job }) {
  if (!(job.type === 'dyno' && job.stage >= 4 && job.numbers)) return null;
  const n = job.numbers;
  const rows = [
    ['Peak HP', n.baseHp, n.tunedHp, gainDelta(n.baseHp, n.tunedHp)],
    ['Peak torque', n.baseTq, n.tunedTq, gainDelta(n.baseTq, n.tunedTq)],
  ];
  return (
    <StatusCard label="The numbers" style={{ padding: 20 }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 12, marginBottom: 14 }}>
        <StatusH2>The numbers</StatusH2>
        <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 10.5, letterSpacing: '0.06em', color: 'var(--steel-500)' }}>SAE · REAR WHEEL</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', borderTop: '1px solid var(--ink-600)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr 0.9fr', gap: 8, padding: '8px 0 6px', alignItems: 'baseline' }}>
          <span />
          {['Baseline', 'Tuned', 'Gain'].map((h, i) => (
            <span key={h} style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--steel-500)', textAlign: i === 2 ? 'right' : 'left' }}>{h}</span>
          ))}
        </div>
        {rows.map(([label, base, tuned, gain]) => (
          <div key={label} style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr 0.9fr', gap: 8, padding: '9px 0', borderTop: '1px solid var(--ink-700)', alignItems: 'baseline' }}>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 12, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--steel-300)' }}>{label}</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 16, color: 'var(--steel-400)' }}>{base || '—'}</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 16, color: 'var(--red-400)' }}>{tuned || '—'}</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 13, color: 'var(--green-500)', textAlign: 'right' }}>{gain || '—'}</span>
          </div>
        ))}
      </div>
      <p style={{ margin: '12px 0 0', fontSize: 13, lineHeight: 1.5, color: 'var(--steel-400)' }}>You get the full dyno sheet at pickup — every pull, every trace. We&rsquo;ll walk you through exactly what we did and why.</p>
    </StatusCard>
  );
}

function StatusBill({ job }) {
  if (!job.bill || !job.bill.length) return null;
  return (
    <StatusCard label="The bill" style={{ padding: 20 }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 12, marginBottom: 12 }}>
        <StatusH2>The bill</StatusH2>
        <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 10.5, letterSpacing: '0.06em', color: 'var(--steel-500)' }}>NO SURPRISES</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', borderTop: '1px solid var(--ink-600)' }}>
        {job.bill.map((row, i) => {
          const included = /^incl/i.test(row.amount || '');
          return (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12, padding: '10px 0', borderBottom: '1px solid var(--ink-700)' }}>
              <span style={{ fontSize: 14, color: 'var(--steel-300)' }}>{row.label}</span>
              <span style={included
                ? { fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 11, letterSpacing: '0.06em', color: 'var(--green-500)' }
                : { fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 14, color: 'var(--steel-200)' }}>{included ? 'INCLUDED' : row.amount}</span>
            </div>
          );
        })}
        {job.due && (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12, padding: '12px 0 2px' }}>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--white)' }}>Due at pickup</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 20, color: 'var(--white)' }}>{job.due}</span>
          </div>
        )}
      </div>
      <p style={{ margin: '10px 0 0', fontSize: 13, lineHeight: 1.5, color: 'var(--steel-400)' }}>The price we agreed at drop-off is the price. Card or cash at pickup.</p>
    </StatusCard>
  );
}

function StatusContact({ go }) {
  const { Button } = window.DS;
  return (
    <StatusCard label="Contact" style={{ padding: 20 }}>
      <StatusH2>Questions? Talk to Rob.</StatusH2>
      <p style={{ margin: '4px 0 16px', fontSize: 14, lineHeight: 1.5, color: 'var(--steel-400)' }}>You&rsquo;ll get a text the second it&rsquo;s ready. Until then, this page is the truth.</p>
      <div style={{ display: 'flex', gap: 10 }}>
        <div style={{ flex: 1 }}><Button variant="primary" size="lg" block onClick={() => window.open('tel:+16077038311')}>Call the shop</Button></div>
        <div style={{ flex: 1 }}><Button variant="secondary" size="lg" block onClick={() => window.open('sms:+16077038311')}>Text us</Button></div>
      </div>
      <div style={{ marginTop: 10 }}>
        <Button variant="ghost" size="md" block onClick={() => go('book')}>Book your next service</Button>
      </div>
      <div style={{ marginTop: 16, paddingTop: 14, borderTop: '1px solid var(--ink-600)', display: 'flex', flexWrap: 'wrap', gap: '6px 24px', fontFamily: 'var(--font-mono)', fontSize: 11.5, letterSpacing: '0.03em', color: 'var(--steel-400)' }}>
        <span>609 COLUMBIA ST, UTICA NY</span>
        <span>TUE–FRI 9–6 · SAT 9–3</span>
        <span>(607) 703-8311</span>
      </div>
    </StatusCard>
  );
}

/* Shown when there's no token or the token doesn't match a job. */
function StatusGate({ state }) {
  const { Button } = window.DS;
  const copy = state === 'notfound'
    ? { title: 'Link not found', sub: 'That status link doesn\u2019t match an active job. Double-check the link from your drop-off text, or call the shop and we\u2019ll sort it out.' }
    : state === 'error'
      ? { title: 'Can\u2019t reach the shop', sub: 'The status feed is being stubborn. This page keeps retrying on its own — or call us and we\u2019ll tell you where your bike\u2019s at.' }
      : { title: 'Track your bike', sub: 'When you drop a bike with us you get a private link by text — open it here to watch your tune or storage status live.' };
  return (
    <StatusCard label="Status link" style={{ boxShadow: 'var(--shadow-md)', padding: '26px 22px 24px' }}>
      <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--red-400)' }}>Live job status</span>
      <h1 style={{ margin: '10px 0 6px', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(30px, 8vw, 40px)', lineHeight: 1.05, letterSpacing: '-0.01em', textTransform: 'uppercase', color: 'var(--white)' }}>{copy.title}</h1>
      <p style={{ margin: '0 0 18px', fontSize: 15, lineHeight: 1.55, color: 'var(--steel-300)' }}>{copy.sub}</p>
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        <Button variant="primary" size="md" onClick={() => window.open('tel:+16077038311')}>Call (607) 703-8311</Button>
        <Button variant="secondary" size="md" onClick={() => window.open('sms:+16077038311')}>Text the shop</Button>
      </div>
    </StatusCard>
  );
}

function Status({ go }) {
  /* Token is read after mount so the pre-rendered HTML and the first client
   * render agree (the build machine has no query string). */
  const [token, setToken] = React.useState(null);
  const [job, setJob] = React.useState(null);
  const [gate, setGate] = React.useState('boot');

  React.useEffect(() => {
    const t = statusToken();
    setToken(t);
    if (!t) setGate('empty');
  }, []);

  React.useEffect(() => {
    if (!token) return undefined;
    setGate((g) => (g === 'ok' ? g : 'loading'));
    let alive = true;
    let timer = null;

    const load = async () => {
      try {
        const res = await fetch('/api/status?t=' + encodeURIComponent(token), { headers: { Accept: 'application/json' } });
        if (!alive) return;
        if (res.status === 404 || res.status === 400) { setGate('notfound'); setJob(null); return; }
        if (!res.ok) throw new Error('HTTP ' + res.status);
        const data = await res.json();
        if (!alive) return;
        setJob(data.job);
        setGate('ok');
      } catch (err) {
        if (!alive) return;
        setGate((g) => (g === 'ok' ? 'ok' : 'error'));
      }
    };

    const tick = () => { load(); timer = setTimeout(tick, STATUS_POLL_MS); };
    tick();
    const onVis = () => { if (document.visibilityState === 'visible') load(); };
    document.addEventListener('visibilitychange', onVis);
    return () => { alive = false; if (timer) clearTimeout(timer); document.removeEventListener('visibilitychange', onVis); };
  }, [token]);

  const live = gate === 'ok' && job && job.stage < job.stages.length - 1;

  return (
    <div className="th-dark" style={{ minHeight: '100vh', background: 'var(--ink-900)', fontFamily: 'var(--font-body)', color: 'var(--steel-200)' }}>
      <div style={{ maxWidth: 620, margin: '0 auto', padding: '20px 18px 0', display: 'flex', flexDirection: 'column', gap: 14 }}>

        <header style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '6px 2px 2px' }}>
          <img src={window.ASSET + 'thunderhorse-badge-cream.png'} alt="Thunderhorse Tuning" style={{ height: 46, width: 'auto', filter: 'drop-shadow(0 0 10px rgba(209,10,17,0.35))' }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 17, letterSpacing: '0.02em', textTransform: 'uppercase', color: 'var(--white)', lineHeight: 1 }}>Thunderhorse Tuning</div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 10.5, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--red-400)' }}>Live {job && job.type === 'storage' ? 'storage' : 'tune'} status</div>
          </div>
          <div style={{ flex: 1 }} />
          {live && (
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, height: 26, padding: '0 10px', border: '1px solid var(--ink-500)', borderRadius: 'var(--radius-sm)', background: 'var(--ink-800)' }}>
              <LivePulseDot />
              <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 10.5, letterSpacing: '0.1em', color: 'var(--steel-200)' }}>LIVE</span>
            </div>
          )}
        </header>

        {gate === 'ok' && job ? (
          <>
            <StatusHero job={job} />
            <p style={{ margin: '-6px 2px 0', fontFamily: 'var(--font-mono)', fontSize: 10.5, letterSpacing: '0.04em', color: 'var(--steel-500)' }}>This page updates automatically as your {job.type === 'storage' ? 'bike is looked after' : 'tune progresses'}. No need to refresh.</p>
            <StatusBike job={job} />
            <StatusTimeline job={job} />
            <StatusNote note={job.note} />
            <StatusNumbers job={job} />
            <StatusBill job={job} />
            <StatusContact go={go} />
          </>
        ) : gate === 'boot' || gate === 'loading' ? (
          <StatusCard label="Loading" style={{ padding: '26px 22px' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.06em', color: 'var(--steel-400)' }}>PULLING UP YOUR BIKE…</span>
          </StatusCard>
        ) : (
          <StatusGate state={gate} />
        )}
      </div>

      <footer style={{ marginTop: 28 }}>
        <div style={{ maxWidth: 620, margin: '0 auto', padding: '0 18px 22px', display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'center', textAlign: 'center' }}>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 12, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--steel-400)' }}>No guesswork. No compromise. Just results.</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.05em', color: 'var(--steel-600)' }}>© 2026 THUNDERHORSE TUNING · DAWSON MOTORING LLC · UTICA, NY</span>
        </div>
        <div style={{ height: 6, background: 'var(--hazard)' }} />
      </footer>
    </div>
  );
}

Object.assign(window, { Status });
