/* Services / pricing — real Thunderhorse offerings, filterable. */
function Services({ go }) {
  const { Card, CardTitle, Button, Badge, Tag } = window.DS;
  const { isMobile } = useViewport();
  const [filter, setFilter] = React.useState('all');

  const tiers = [
    { id: 'tune', cat: 'shop', name: 'Full Dyno Tune', price: '650', suffix: 'starting at', popular: true, blurb: 'Complete ECU calibration on our in-house dyno. Fueling, timing, idle — dialed in for your motor and your mods, not copy-pasted from someone else’s bike.', feats: ['In-house dyno session', 'DynoAI calibration', 'Knock & AFR targeting', 'V-twin specialty, all bikes', 'Full dyno sheets included'] },
    { id: 'diag', cat: 'shop', name: 'Diagnostic & Correction', price: '300', suffix: 'starting at', popular: false, blurb: 'ECU scan plus a baseline dyno pull to see where your bike actually sits. Also covers fixing a bad tune from another shop — lean cruise, rich idle, bad timing.', feats: ['ECU scan', 'Baseline dyno pull', 'Bad-tune correction', 'We show you the data', 'Fixed right'] },
    { id: 'build', cat: 'build', name: 'Performance Builds', price: 'Quote', suffix: 'per build', popular: false, blurb: 'Parts, install and calibration — Stage 1 upgrades through big bore, strokers and forced induction. Quoted individually because no two builds are the same.', feats: ['Stage 1 → forced induction', 'Big bore & strokers', 'Parts + install + tune', 'Free consultation', 'Built to your goals'] },
  ];
  const event = { name: 'Group & Event Tuning', area: 'Central New York', blurb: 'Club rides, rallies and shop events across CNY — Utica, Rome, Syracuse, Cooperstown, Oneonta. We bring the operation to you. Five-bike minimum makes the move worth it.' };

  const filters = [['all', 'All'], ['shop', 'Shop'], ['build', 'Builds'], ['event', 'Group / Event']];
  const showTier = (t) => filter === 'all' || t.cat === filter;
  const showEvent = filter === 'all' || filter === 'event';

  return (
    <div>
      {/* PHOTO HERO STRIP */}
      <section className="th-dark" style={{ position: 'relative', height: 260, overflow: 'hidden' }}>
        <img src={window.PHOTO + 'dyno-rider-plaid.jpg'} alt="Customer bike on the Thunderhorse Tuning dyno" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: '60% 35%', display: 'block', filter: 'brightness(0.55)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(8,8,12,0.85) 0%, rgba(8,8,12,0.3) 60%, transparent)' }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', padding: '0 44px' }}>
          <div>
            <Eyebrow style={{ marginBottom: 8 }}>Utica, NY · All bikes welcome</Eyebrow>
            <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 52, lineHeight: 0.97, textTransform: 'uppercase', color: 'var(--white)', margin: 0 }}>Services<br />&amp; Pricing</h1>
          </div>
        </div>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 6, background: 'var(--hazard)' }} />
      </section>

      <Section style={{ paddingBottom: 24 }}>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 17, color: 'var(--text-muted)', maxWidth: 640, margin: '0 0 24px' }}>Full dyno tuning at our Utica shop. We specialize in V-twins — Harley-Davidson, Indian, Ducati — and tune everything else too. Most tunes run $650–$850 depending on mods.</p>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {filters.map(([id, lab]) => (
            <Tag key={id} selected={filter === id} onClick={() => setFilter(id)}>{lab}</Tag>
          ))}
        </div>
      </Section>

      <section style={{ background: 'var(--surface-page)', padding: '0 32px 40px' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3,1fr)', gap: 16 }}>
          {tiers.filter(showTier).map((t) => (
            <Card key={t.id} rail={t.popular} padding="0" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              <div style={{ padding: '24px 24px 18px', borderBottom: '1px solid var(--border)', background: t.popular ? 'var(--ink-900)' : 'var(--surface-card)' }} className={t.popular ? 'th-dark' : ''}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                  <CardTitle style={{ color: t.popular ? 'var(--white)' : 'var(--text-strong)' }}>{t.name}</CardTitle>
                  {t.popular && <Badge tone="brand" solid>Most Booked</Badge>}
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                  {t.price !== 'Quote' && <span style={{ fontFamily: 'var(--font-mono)', fontSize: 16, color: t.popular ? 'var(--steel-400)' : 'var(--text-muted)' }}>$</span>}
                  <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: t.price === 'Quote' ? 30 : 42, lineHeight: 1, color: t.popular ? 'var(--red-400)' : 'var(--text-strong)' }}>{t.price}</span>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: t.popular ? 'var(--steel-400)' : 'var(--text-muted)', marginLeft: 4 }}>{t.suffix}</span>
                </div>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, lineHeight: 1.5, color: t.popular ? 'var(--steel-300)' : 'var(--text-muted)', margin: '12px 0 0' }}>{t.blurb}</p>
              </div>
              <div style={{ padding: '18px 24px 22px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 9, flex: 1 }}>
                  {t.feats.map((f) => (
                    <li key={f} style={{ display: 'flex', gap: 9, alignItems: 'center', fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--text-body)' }}>
                      <Ico n="Check" s={15} color="var(--red-500)" /> {f}
                    </li>
                  ))}
                </ul>
                <Button block variant={t.popular ? 'primary' : 'secondary'} style={{ marginTop: 20 }} onClick={() => go('book')}>{t.price === 'Quote' ? 'Request Quote' : 'Book Now'}</Button>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {showEvent && (
        <Section style={{ paddingTop: 24 }}>
          <Card padding="0" rail style={{ overflow: 'hidden' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'center', gap: 24, padding: '26px 30px' }}>
              <div style={{ display: 'flex', gap: 18, alignItems: 'flex-start' }}>
                <span style={{ flexShrink: 0, width: 50, height: 50, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: 'var(--red-50)', borderRadius: 'var(--radius-md)', color: 'var(--red-600)' }}>
                  <Ico n="Users" s={26} />
                </span>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <CardTitle>{event.name}</CardTitle>
                    <Badge tone="neutral">5+ bikes</Badge>
                  </div>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: 15, lineHeight: 1.5, color: 'var(--text-muted)', margin: '6px 0 0', maxWidth: 680 }}>{event.blurb}</p>
                </div>
              </div>
              <Button variant="secondary" onClick={() => go('book')} iconRight={<Ico n="ArrowRight" s={16} />}>Request Event Quote</Button>
            </div>
          </Card>
        </Section>
      )}
    </div>
  );
}
Object.assign(window, { Services });
