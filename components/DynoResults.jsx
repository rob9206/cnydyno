/* DynoAI session dashboard — power curve, live stats, run history. */
function DynoResults() {
  const { StatReadout, Tabs, Badge, Button, Card } = window.DS;
  const { isMobile } = useViewport();
  const [tab, setTab] = React.useState('Power');
  const [run, setRun] = React.useState(0);
  const canvasRef = React.useRef();

  const runs = [
    { id: 0, name: 'Pull 04 · Final', whp: 118, tq: 132, afr: 13.2, status: 'pass' },
    { id: 1, name: 'Pull 03', whp: 115, tq: 129, afr: 13.0, status: 'pass' },
    { id: 2, name: 'Pull 02', whp: 109, tq: 121, afr: 12.4, status: 'warn' },
    { id: 3, name: 'Baseline', whp: 91, tq: 108, afr: 14.1, status: 'base' },
  ];
  const active = runs[run];
  const AXIS = 160; // hp/tq axis max

  React.useEffect(() => {
    const cv = canvasRef.current; if (!cv) return;
    const dpr = window.devicePixelRatio || 1;
    const W = cv.clientWidth, H = cv.clientHeight;
    cv.width = W * dpr; cv.height = H * dpr;
    const ctx = cv.getContext('2d'); ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, W, H);

    const padL = 40, padB = 28, padT = 14, padR = 14;
    const plotW = W - padL - padR, plotH = H - padB - padT;
    ctx.strokeStyle = 'rgba(255,255,255,0.06)'; ctx.lineWidth = 1;
    ctx.font = '10px "JetBrains Mono", monospace'; ctx.fillStyle = 'rgba(255,255,255,0.4)';
    for (let i = 0; i <= 4; i++) {
      const y = padT + (plotH / 4) * i;
      ctx.beginPath(); ctx.moveTo(padL, y); ctx.lineTo(W - padR, y); ctx.stroke();
      ctx.fillText(String(AXIS - i * 40), 6, y + 3);
    }
    for (let i = 0; i <= 5; i++) {
      const x = padL + (plotW / 5) * i;
      ctx.fillText(String(2 + i) + 'k', x - 6, H - 8);
    }
    const factor = run === 3 ? 0.78 : run === 2 ? 0.92 : run === 1 ? 0.975 : 1;
    const curve = (peak, peakAt, fall, color, fill) => {
      ctx.beginPath();
      for (let i = 0; i <= 60; i++) {
        const t = i / 60;
        const shape = Math.pow(Math.sin(Math.min(t / peakAt, 1) * Math.PI / 2), 0.9) * (t > peakAt ? (1 - (t - peakAt) * fall) : 1);
        const v = Math.max(0, peak * shape * factor);
        const x = padL + plotW * t;
        const y = padT + plotH * (1 - v / AXIS);
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.strokeStyle = color; ctx.lineWidth = 2.5; ctx.stroke();
      if (fill) {
        ctx.lineTo(W - padR, padT + plotH); ctx.lineTo(padL, padT + plotH); ctx.closePath();
        const g = ctx.createLinearGradient(0, padT, 0, padT + plotH);
        g.addColorStop(0, 'rgba(209,10,17,0.28)'); g.addColorStop(1, 'rgba(209,10,17,0)');
        ctx.fillStyle = g; ctx.fill();
      }
    };
    if (tab === 'Power') { curve(118, 0.82, 0.35, '#D10A11', true); curve(132, 0.55, 0.28, '#E8920C', false); }
    else if (tab === 'AFR') { curve(132, 0.5, 0.08, '#18A957', true); }
    else { curve(124, 0.62, 0.2, '#E8920C', true); }
  }, [tab, run]);

  return (
    <div>
      {/* PHOTO STRIP */}
      <section className="th-dark" style={{ position: 'relative', height: 180, overflow: 'hidden' }}>
        <img src={window.PHOTO + 'tuner-fence.jpg'} alt="Thunderhorse Tuning — dialing in the calibration" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 28%', display: 'block', filter: 'brightness(0.45)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(8,8,12,0.92) 0%, rgba(8,8,12,0.4) 70%, transparent)' }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', padding: '0 44px', gap: 24 }}>
          <img src={window.ASSET + 'thunderhorse-badge-cream.png'} alt="" style={{ height: 56, opacity: 0.85 }} />
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--red-400)', marginBottom: 6 }}>Dyno Cell 1 · Utica</div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 34, textTransform: 'uppercase', color: 'var(--white)', lineHeight: 1 }}>Live Session</div>
          </div>
        </div>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 5, background: 'var(--hazard)' }} />
      </section>

      <Section dark style={{ minHeight: 500, paddingTop: 36 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 20, flexWrap: 'wrap', gap: 16 }}>
        <div>
          <Eyebrow>DynoAI · Cell 1 · Utica</Eyebrow>
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 38, textTransform: 'uppercase', color: 'var(--white)', margin: '6px 0 0' }}>M8 117 · Stage 1</h1>
        </div>
        <Button variant="primary" size="lg" iconLeft={<Ico n="Play" s={18} />}>Start Pull</Button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 280px', gap: 16 }}>
        <Card padding="0" style={{ background: 'var(--ink-800)', borderColor: 'var(--ink-600)', overflow: 'hidden' }}>
          <div style={{ padding: '12px 18px', borderBottom: '1px solid var(--ink-700)' }}>
            <Tabs value={tab} onChange={setTab} tabs={['Power', 'AFR', 'Torque']} />
          </div>
          <div style={{ padding: 14 }}>
            <canvas ref={canvasRef} style={{ width: '100%', height: 300, display: 'block' }} />
            <div style={{ display: 'flex', gap: 20, padding: '6px 8px 0' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--steel-300)' }}><i style={{ width: 12, height: 3, background: '#D10A11', display: 'inline-block' }} /> Power (whp)</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--steel-300)' }}><i style={{ width: 12, height: 3, background: '#E8920C', display: 'inline-block' }} /> Torque (lb-ft)</span>
            </div>
          </div>
        </Card>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Card padding="18px 20px" style={{ background: 'var(--black)', borderColor: 'var(--ink-600)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
              <StatReadout label="Power" value={active.whp} unit="whp" />
              <StatReadout label="Torque" value={active.tq} unit="lb-ft" tone="warning" />
              <StatReadout label="AFR" value={active.afr} unit="λ" tone="strong" />
              <StatReadout label="Knock" value="0.0" unit="°" tone="success" />
            </div>
          </Card>
          <Card padding="14px 16px" style={{ background: 'var(--ink-800)', borderColor: 'var(--ink-600)' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--steel-400)', marginBottom: 10 }}>Runs</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {runs.map((r) => (
                <button key={r.id} onClick={() => setRun(r.id)} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '9px 11px', border: `1px solid ${run === r.id ? 'var(--red-500)' : 'var(--ink-600)'}`,
                  background: run === r.id ? 'rgba(209,10,17,0.12)' : 'transparent',
                  borderRadius: 'var(--radius-sm)', cursor: 'pointer', textAlign: 'left',
                }}>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--bone)' }}>{r.name}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 13, color: 'var(--red-400)' }}>{r.whp}</span>
                    <Badge tone={r.status === 'pass' ? 'success' : r.status === 'warn' ? 'warning' : 'neutral'}>{r.status === 'base' ? 'Base' : r.status === 'warn' ? 'Rich' : 'Pass'}</Badge>
                  </span>
                </button>
              ))}
            </div>
          </Card>
          <Card padding="14px 16px" style={{ background: 'var(--ink-800)', borderColor: 'var(--ink-600)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--steel-400)' }}>VE table accuracy</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 16, color: 'var(--green-500)' }}>97.5%</span>
            </div>
          </Card>
        </div>
      </div>
    </Section>
  </div>
  );
}
Object.assign(window, { DynoResults });
