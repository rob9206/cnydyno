/* Marketing homepage — hero, dyno stat panel, services grid, DynoAI process, CTA. */
function Home({ go }) {
  const { Button, StatReadout, Card, CardTitle, Badge } = window.DS;
  const { isMobile } = useViewport();

  const services = [
    { icon: 'Target', title: 'Precision Calibration', body: 'Custom ECU tuning for your specific bike, mods, and riding conditions — not copy-pasted from someone else’s build.' },
    { icon: 'ShieldAlert', title: 'Real-Time Knock Detection', body: 'DynoAI watches knock, AFR and torque live. If something’s wrong, the pull aborts before your engine gets hurt.' },
    { icon: 'Cpu', title: 'Custom Software', body: 'Proprietary tuning tools built in-house — physics and data instead of trial-and-error guesswork.' },
    { icon: 'Users', title: 'Group & Event Tuning', body: 'Rallies, MC club meets and shop events across Central New York (5+ bikes).' },
  ];

  return (
    <div>
      {/* HERO */}
      <section className="th-dark" style={{ position: 'relative', background: 'var(--ink-900)', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(900px 500px at 78% 25%, rgba(209,10,17,0.18), transparent 60%)' }} />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 6, background: 'var(--hazard)' }} />
        <div style={{ maxWidth: 1180, margin: '0 auto', padding: isMobile ? '52px 20px 56px' : '84px 32px 92px', position: 'relative', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.15fr 0.85fr', gap: isMobile ? 32 : 48, alignItems: 'center' }}>
          <div>
            <Eyebrow>Utica, NY — Shop &amp; Mobile Service</Eyebrow>
            <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: isMobile ? 40 : 62, lineHeight: 0.98, letterSpacing: '-0.01em', textTransform: 'uppercase', color: 'var(--white)', margin: '14px 0 0' }}>
              Precision<br /><span style={{ color: 'var(--red-500)' }}>V-Twin</span> Performance
            </h1>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 14, letterSpacing: '0.04em', color: 'var(--steel-300)', margin: '18px 0 0' }}>Tuned by Thunder. Powered by Intelligence.</p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 18, lineHeight: 1.55, color: 'var(--steel-300)', maxWidth: 520, margin: '14px 0 30px' }}>
              <strong style={{ color: 'var(--bone)' }}>V-twin specialists. All bikes welcome.</strong> Professional motorcycle dyno tuning in Central New York — where iron meets algorithm.
            </p>
            <div style={{ display: 'flex', gap: 14 }}>
              <Button variant="primary" size="lg" onClick={() => go('book')} iconLeft={<Ico n="Calendar" s={18} />}>Book Your Tune</Button>
              <Button variant="inverse" size="lg" onClick={() => go('services')} iconRight={<Ico n="ArrowRight" s={18} />}>Services &amp; Pricing</Button>
            </div>
            <div style={{ display: 'flex', gap: 18, marginTop: 26, flexWrap: 'wrap' }}>
              {['Proprietary Tuning Software', 'V-Twin Specialists', 'Full Dyno Sheets Included'].map((t) => (
                <span key={t} style={{ display: 'flex', alignItems: 'center', gap: 7, fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--steel-400)' }}>
                  <Ico n="Zap" s={13} color="var(--red-500)" /> {t}
                </span>
              ))}
            </div>
          </div>
          <div style={{ position: 'relative' }}>
            <div style={{ position: 'relative', border: '1px solid var(--ink-600)', borderRadius: 'var(--radius-md)', overflow: 'hidden', boxShadow: '0 24px 60px -20px rgba(0,0,0,0.7), 0 0 0 1px rgba(209,10,17,0.18)' }}>
              <div style={{ height: 5, background: 'var(--hazard)' }} />
              <img src={window.PHOTO + 'dyno-rider-plaid.jpg'} alt="Customer bike strapped to the dyno at Thunderhorse Tuning" style={{ display: 'block', width: '100%', height: isMobile ? 260 : 460, objectFit: 'cover', objectPosition: '60% center' }} />
              <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: '28px 16px 12px', background: 'linear-gradient(transparent, rgba(8,8,12,0.92))', display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--red-500)', boxShadow: '0 0 8px var(--red-500)' }} />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11.5, letterSpacing: '0.06em', color: 'var(--steel-200)' }}>ON THE DYNO · 609 COLUMBIA ST, UTICA NY</span>
              </div>
            </div>
          </div>
        </div>
        {/* dyno result strip */}
        <div className="th-dark" style={{ borderTop: '1px solid var(--ink-700)', background: 'var(--black)' }}>
          <div style={{ maxWidth: 1180, margin: '0 auto', padding: isMobile ? '16px 20px' : '22px 32px', display: 'flex', gap: isMobile ? 20 : 52, alignItems: 'center', flexWrap: 'wrap' }}>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 12, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--steel-500)' }}>Last pull · M8 117 · Stage 1</span>
            <StatReadout label="Peak Power" value="118" unit="whp" delta="+27" />
            <StatReadout label="Torque" value="132" unit="lb-ft" delta="+24" />
            <StatReadout label="AFR" value="13.2" unit="λ" tone="strong" />
            <StatReadout label="Knock" value="0.0" unit="°" tone="success" />
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <Section>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 32 }}>
          <div>
            <Eyebrow>What we do</Eyebrow>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 40, textTransform: 'uppercase', letterSpacing: '-0.01em', color: 'var(--text-strong)', margin: '8px 0 0' }}>Built Different</h2>
          </div>
          <Button variant="ghost" onClick={() => go('services')} iconRight={<Ico n="ArrowRight" s={16} />}>All services & pricing</Button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: 16 }}>
          {services.map((s) => (
            <Card key={s.title} rail hover padding="var(--space-6)">
              <div style={{ display: 'flex', gap: 16 }}>
                <span style={{ flexShrink: 0, width: 46, height: 46, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: 'var(--red-50)', borderRadius: 'var(--radius-md)', color: 'var(--red-600)' }}>
                  <Ico n={s.icon} s={24} />
                </span>
                <div>
                  <CardTitle>{s.title}</CardTitle>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: 15, lineHeight: 1.5, color: 'var(--text-muted)', margin: '6px 0 0' }}>{s.body}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* DYNOAI PROCESS */}
      <Section dark>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 36, flexWrap: 'wrap', gap: 16 }}>
          <div>
            <Eyebrow>How we tune · DynoAI</Eyebrow>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 40, textTransform: 'uppercase', color: 'var(--white)', margin: '8px 0 0' }}>Stop guessing. Start modeling.</h2>
          </div>
          <Button variant="ghost" onClick={() => go('dynoai')} iconRight={<Ico n="ArrowRight" s={16} />}>About DynoAI</Button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2,1fr)' : 'repeat(4,1fr)', gap: 1, background: 'var(--ink-700)', border: '1px solid var(--ink-700)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
          {[
            { n: '01', t: 'One-Pull Baseline', d: 'A single WOT pull captures AFR across the whole RPM range.' },
            { n: '02', t: 'AI VE Table', d: 'Physics fills the entire VE table — even cruise cells most shops skip.' },
            { n: '03', t: 'Real-Time Safety', d: 'Knock, AFR and torque watched live; the pull aborts if it’s wrong.' },
            { n: '04', t: 'Refine & Validate', d: '2–4 pulls dial it in. You leave with the full data.' },
          ].map((p) => (
            <div key={p.n} style={{ background: 'var(--ink-800)', padding: '24px 22px' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 30, color: 'var(--red-500)' }}>{p.n}</div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 17, textTransform: 'uppercase', color: 'var(--bone)', margin: '8px 0 6px' }}>{p.t}</div>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--steel-400)', margin: 0, lineHeight: 1.5 }}>{p.d}</p>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 56, marginTop: 36, flexWrap: 'wrap' }}>
          <StatReadout label="VE Accuracy · 1 pull" value="97.5" unit="%" />
          <StatReadout label="Less Dyno Time" value="60-70" unit="%" tone="strong" />
          <StatReadout label="Bikes / Day" value="2-3x" tone="strong" />
          <StatReadout label="VE Cell Coverage" value="98" unit="%" />
        </div>
      </Section>

      {/* SHOP FLOOR GALLERY */}
      <Section>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 40, flexWrap: 'wrap', gap: 12 }}>
          <div>
            <Eyebrow>From the shop floor</Eyebrow>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 40, lineHeight: 1.05, textTransform: 'uppercase', letterSpacing: '-0.01em', color: 'var(--text-strong)', margin: '8px 0 0' }}>Real bikes. Real pulls.</h2>
          </div>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12.5, color: 'var(--text-muted)' }}>Utica, NY · V-twin specialists</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)', gridAutoRows: isMobile ? 160 : 240, gap: 4, background: 'var(--ink-900)', padding: 4, borderRadius: 'var(--radius-md)' }}>
          {[
            { src: 'dyno-pull.jpg', cap: 'Wide-open pull on the Dynojet', span: 2, pos: 'center 38%' },
            { src: 'dyno-ve-map.jpg', cap: 'Live VE map — DynoAI', span: 1, pos: 'center 30%' },
            { src: 'laptop-tuning.jpg', cap: 'Datalogging a build', span: 1, pos: '40% center' },
            { src: 'shop-front-609.jpg', cap: '609 Columbia St', span: 1, pos: 'center 65%' },
            { src: 'tuner-fence.jpg', cap: 'Dialing it in', span: 1, pos: 'center 30%' },
          ].map((p) => (
            <figure key={p.src} className="gtile" style={{ gridColumn: p.span === 2 && !isMobile ? 'span 2' : 'span 1', position: 'relative', margin: 0, overflow: 'hidden', borderRadius: 'var(--radius-sm)' }}>
              <img src={window.PHOTO + p.src} alt={p.cap} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: p.pos, display: 'block', transition: 'transform var(--dur-slow) var(--ease-out)' }} />
              <figcaption style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: '24px 12px 9px', background: 'linear-gradient(transparent, rgba(8,8,12,0.88))', fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.04em', color: 'var(--steel-200)' }}>{p.cap}</figcaption>
            </figure>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <section style={{ background: 'var(--surface-page)', padding: '0 32px 80px' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto', position: 'relative', overflow: 'hidden', background: 'var(--red-600)', borderRadius: 'var(--radius-lg)', padding: isMobile ? '36px 24px' : '52px 48px', display: 'flex', alignItems: isMobile ? 'flex-start' : 'center', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between', gap: isMobile ? 20 : 32 }}>
          <div style={{ position: 'absolute', inset: 0, background: 'repeating-linear-gradient(-45deg, transparent 0 18px, rgba(0,0,0,0.06) 18px 36px)' }} />
          <div style={{ position: 'relative' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 38, textTransform: 'uppercase', color: '#fff', margin: 0, lineHeight: 1 }}>No guesswork. No compromise. Just results.</h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 17, color: 'rgba(255,255,255,0.88)', margin: '12px 0 0' }}>Full dyno tunes from $650. Book online — we’ll confirm within 24 hours.</p>
          </div>
          <div style={{ position: 'relative' }}>
            <Button variant="inverse" size="lg" onClick={() => go('book')} iconLeft={<Ico n="Calendar" s={18} />}>Book Your Tune</Button>
          </div>
        </div>
      </section>
    </div>
  );
}
Object.assign(window, { Home });
