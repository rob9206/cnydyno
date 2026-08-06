/* DynoAI product page — stats, how it works, live VE calculator, business case. */
function DynoAI({ go }) {
  const { StatReadout, Card, CardTitle, Button, Badge, Tabs } = window.DS;
  const { isMobile } = useViewport();
  const [audience, setAudience] = React.useState('Customers');

  // VE calculator state
  const [cur, setCur] = React.useState(85);
  const [target, setTarget] = React.useState(13.2);
  const [measured, setMeasured] = React.useState(14.5);
  const correction = target / measured;
  const newVE = cur * correction;
  const lean = measured > target;

  const Slider = ({ label, value, min, max, step, onChange, fmt }) => (
    <div style={{ marginBottom: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--steel-400)' }}>{label}</span>
        <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 14, color: 'var(--red-400)' }}>{fmt ? fmt(value) : value}</span>
      </div>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(parseFloat(e.target.value))}
        style={{ width: '100%', accentColor: 'var(--red-500)', height: 4 }} />
    </div>
  );

  const sectionTitle = {
    fontFamily: 'var(--font-display)',
    fontWeight: 700,
    fontSize: 'var(--fs-section-title)',
    textTransform: 'uppercase',
    color: 'var(--text-strong)',
    margin: '8px 0 0',
  };

  return (
    <div>
      {/* HERO */}
      <section className="th-dark" style={{ position: 'relative', background: 'var(--ink-900)', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(800px 460px at 30% 10%, rgba(209,10,17,0.16), transparent 60%)' }} />
        <div style={{ maxWidth: 1180, margin: '0 auto', padding: isMobile ? '44px 20px 40px' : '64px 32px 52px', position: 'relative', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.15fr 0.85fr', gap: isMobile ? 28 : 44, alignItems: 'center' }}>
          <div>
            <Eyebrow>Our Technology</Eyebrow>
            <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: isMobile ? '4rem' : '4.75rem', lineHeight: 0.95, textTransform: 'uppercase', color: 'var(--white)', margin: '10px 0 0' }}>Dyno<span style={{ color: 'var(--red-500)' }}>AI</span></h1>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 15, color: 'var(--steel-300)', margin: '14px 0 0' }}>AI-Powered ECU Calibration. Built for the Real World.</p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 18, lineHeight: 1.55, color: 'var(--steel-300)', maxWidth: 560, margin: '16px 0 0' }}>
              Proprietary tuning software developed in-house. It uses <strong style={{ color: 'var(--bone)' }}>physics-based modeling and real-time data analysis</strong> to generate accurate VE tables from minimal dyno pulls — replacing the slow trial-and-error most shops still rely on.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginTop: 36, maxWidth: 480 }}>
              <StatReadout label="VE accuracy · 1 WOT pull" value="97.5" unit="%" />
              <StatReadout label="Less dyno time / bike" value="60-70" unit="%" tone="strong" />
              <StatReadout label="More bikes / day" value="2-3x" tone="strong" />
              <StatReadout label="VE cell coverage" value="98" unit="%" />
            </div>
          </div>
          <div style={{ position: 'relative', border: '1px solid var(--ink-600)', borderRadius: 'var(--radius-md)', overflow: 'hidden', boxShadow: '0 24px 60px -20px rgba(0,0,0,0.7), 0 0 0 1px rgba(209,10,17,0.18)' }}>
            <Photo
              name="dyno-ve-map.jpg"
              alt="DynoAI volumetric-efficiency map on the dyno screen"
              sizes={isMobile ? '100vw' : '(max-width: 1180px) 40vw, 420px'}
              loading="eager"
              fetchPriority="high"
              style={{ display: 'block', width: '100%', height: 440, objectFit: 'cover', objectPosition: 'center 32%' }}
            />
            <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: '28px 14px 11px', background: 'linear-gradient(transparent, rgba(8,8,12,0.92))', display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--green-500)', boxShadow: '0 0 8px var(--green-500)' }} />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11.5, letterSpacing: '0.05em', color: 'var(--steel-200)' }}>DYNOAI · LIVE VE TABLE, RUNNING IN THE SHOP</span>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <Section>
        <Eyebrow>How it works</Eyebrow>
        <h2 style={{ ...sectionTitle, marginBottom: 28 }}>Math &amp; data, not guesswork</h2>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2,1fr)', gap: 16 }}>
          {[
            { n: '01', t: 'One-Pull Baseline™', d: 'A single wide-open-throttle pull captures AFR across the entire RPM range. DynoAI builds a physics model of how your engine breathes from that data alone.' },
            { n: '02', t: 'AI-Generated VE Table', d: 'Instead of correcting only the cells you tested, DynoAI predicts and fills the entire VE table — including part-throttle and cruise cells most shops never touch.' },
            { n: '03', t: 'Real-Time Safety', d: 'Every pull, DynoAI monitors knock, AFR deviation and torque. If something looks wrong, the pull aborts before your engine gets hurt.' },
            { n: '04', t: 'Refine & Validate', d: '2–4 refinement pulls dial in the calibration. You get full dyno sheets, before/after numbers, and an explanation of every change.' },
          ].map((s) => (
            <Card key={s.n} rail padding="22px 24px">
              <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 26, color: 'var(--red-500)', lineHeight: 1 }}>{s.n}</span>
                <div>
                  <CardTitle>{s.t}</CardTitle>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: 15, lineHeight: 1.5, color: 'var(--text-muted)', margin: '6px 0 0' }}>{s.d}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* VE CALCULATOR */}
      <Section dark>
        <Eyebrow>Try the VE calculator</Eyebrow>
        <h2 style={{ ...sectionTitle, color: 'var(--white)', marginBottom: 24 }}>See VE correction in real time</h2>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 16 }}>
          <Card padding="24px 26px" style={{ background: 'var(--ink-800)', borderColor: 'var(--ink-600)' }}>
            <Slider label="Current VE" value={cur} min={50} max={120} step={0.5} onChange={setCur} fmt={(v) => v + '%'} />
            <Slider label="Target AFR" value={target} min={11} max={15} step={0.1} onChange={setTarget} fmt={(v) => v.toFixed(1)} />
            <Slider label="Measured AFR" value={measured} min={11} max={16} step={0.1} onChange={setMeasured} fmt={(v) => v.toFixed(1)} />
          </Card>
          <Card padding="24px 26px" style={{ background: 'var(--black)', borderColor: 'var(--ink-600)' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--steel-400)', marginBottom: 16 }}>The Math</div>
            {[['Correction Factor', correction.toFixed(3)], ['Target ÷ Measured', `${target.toFixed(1)} / ${measured.toFixed(1)}`]].map(([k, v]) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--ink-700)' }}>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--steel-400)' }}>{k}</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 14, fontWeight: 500, color: 'var(--bone)' }}>{v}</span>
              </div>
            ))}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', margin: '18px 0 14px' }}>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 13, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--steel-400)' }}>New VE</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 34, color: 'var(--red-400)' }}>{newVE.toFixed(1)}%</span>
            </div>
            <Badge tone={lean ? 'warning' : 'info'} solid>{lean ? 'Running LEAN — add fuel' : 'Running RICH — pull fuel'}</Badge>
          </Card>
        </div>
      </Section>

      {/* BUSINESS CASE */}
      <Section>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 16, marginBottom: 20 }}>
          <div>
            <Eyebrow>Who it’s for</Eyebrow>
            <h2 style={sectionTitle}>The business case</h2>
          </div>
          <Tabs value={audience} onChange={setAudience} tabs={['Customers', 'Shops & Partners']} />
        </div>
        <Card padding="0" style={{ overflow: 'hidden' }}>
          <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'var(--font-body)' }}>
            <thead>
              <tr style={{ background: 'var(--surface-sunken)' }}>
                {['Metric', 'Traditional', 'With DynoAI'].map((h, i) => (
                  <th key={h} style={{ textAlign: i === 0 ? 'left' : 'right', padding: '12px 20px', fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase', color: i === 2 ? 'var(--text-brand)' : 'var(--text-muted)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ['Dyno pulls per tune', '15-20', '3-5'],
                ['Time per tune', '5-6 hours', '2-3 hours'],
                ['Bikes per day', '1-2', '2-3'],
                ['VE map coverage', '~80%', '~98%'],
                ['Result consistency', 'Operator-dependent', 'Repeatable, data-driven'],
              ].map((r) => (
                <tr key={r[0]} style={{ borderTop: '1px solid var(--divider)' }}>
                  <td style={{ padding: '12px 20px', fontSize: 14, color: 'var(--text-body)' }}>{r[0]}</td>
                  <td style={{ padding: '12px 20px', textAlign: 'right', fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--text-muted)' }}>{r[1]}</td>
                  <td style={{ padding: '12px 20px', textAlign: 'right', fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 700, color: 'var(--text-strong)' }}>{r[2]}</td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </Card>
        <div style={{ display: 'flex', gap: 14, marginTop: 24 }}>
          <Button variant="primary" size="lg" onClick={() => go('book')} iconLeft={<Ico n="Calendar" s={18} />}>Book a Tune</Button>
          <Button variant="secondary" size="lg" onClick={() => go('book')} iconRight={<Ico n="ArrowRight" s={18} />}>Schedule a Consultation</Button>
        </div>
      </Section>
    </div>
  );
}
Object.assign(window, { DynoAI });
