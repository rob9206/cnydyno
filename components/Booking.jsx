/* Booking flow — bike + service form, then confirmation.
 * Submit POSTs to Netlify Forms (hidden static form in book/index.html is
 * detected at deploy time; field names must match). Also offers direct
 * booking via Square Appointments and a free consult via Calendly. */
const SQUARE_URL = 'https://book.squareup.com/appointments/xue8icpm57kptx/location/L2V4BHTQFX0AX/services';
const CALENDLY_URL = 'https://calendly.com/dawsonmotoring/30min';
const SHOP_EMAIL = 'dawsonmotoring@gmail.com';
const FORM_ENDPOINT = '/book/'; // path where the hidden Netlify form lives

function Booking({ go }) {
  const { Input, Select, Checkbox, Switch, Button, Card, CardTitle, Badge } = window.DS;
  const { isMobile } = useViewport();
  const [done, setDone] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [f, setF] = React.useState({
    bike: '2021 Harley Street Glide', make: 'Harley-Davidson', email: '', service: 'Full Dyno Tune',
    diag: false, mobile: false, notes: '',
  });
  const set = (k) => (e) => setF((s) => ({ ...s, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }));
  const price = f.service === 'Full Dyno Tune' ? '650' : f.service === 'Diagnostic & Correction' ? '300' : 'Quote';

  async function submit() {
    setSubmitting(true);
    setError(null);
    const body = new URLSearchParams({
      'form-name': 'booking-request',
      bike: f.bike,
      make: f.make,
      email: f.email,
      service: f.service,
      diag: f.diag ? 'Yes (+$300)' : 'No',
      mobile: f.mobile ? 'Yes' : 'No',
      notes: f.notes || '(none)',
      'bot-field': '',
    }).toString();
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body,
      });
      if (!res.ok) throw new Error('HTTP ' + res.status);
      setDone(true);
    } catch (err) {
      // Fallback: open a pre-filled email so the request still reaches the shop.
      const subject = 'Dyno tune request — ' + f.service + ' — ' + f.bike;
      const bodyText = [
        'Service: ' + f.service,
        'Bike: ' + f.bike,
        'Make: ' + f.make,
        'Email: ' + f.email,
        'Diagnostic pull: ' + (f.diag ? 'Yes (+$300)' : 'No'),
        'Group / event: ' + (f.mobile ? 'Yes' : 'No'),
        'Notes: ' + (f.notes || '(none)'),
      ].join('\n');
      setError('Could not submit online. Your email app will open with the request pre-filled.');
      window.location.href = 'mailto:' + SHOP_EMAIL + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(bodyText);
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <Section style={{ minHeight: 560, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Card padding="44px 48px" style={{ maxWidth: 560, textAlign: 'center' }}>
          <span style={{ display: 'inline-flex', width: 64, height: 64, alignItems: 'center', justifyContent: 'center', background: 'var(--green-50)', borderRadius: 'var(--radius-pill)', color: 'var(--green-500)', marginBottom: 18 }}>
            <Ico n="Check" s={34} />
          </span>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 32, textTransform: 'uppercase', color: 'var(--text-strong)', margin: 0 }}>Request Sent</h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 16, color: 'var(--text-muted)', margin: '12px 0 24px' }}>
            We’ll confirm your <strong style={{ color: 'var(--text-brand)' }}>{f.service}</strong> for the <strong>{f.bike}</strong> within 24 hours. {f.mobile ? 'Include your location in the notes for mobile/event service.' : ''}
          </p>
          <div style={{ height: 1, background: 'var(--divider)', margin: '8px 0 22px' }} />
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--text-faint)', marginBottom: 12 }}>Or book directly</div>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button variant="primary" onClick={() => window.open(SQUARE_URL, '_blank', 'noopener')} iconLeft={<Ico n="Calendar" s={16} />}>Book via Square</Button>
            <Button variant="secondary" onClick={() => window.open(CALENDLY_URL, '_blank', 'noopener')} iconLeft={<Ico n="MessageSquare" s={16} />}>Free Consultation</Button>
          </div>
          <div style={{ marginTop: 22, display: 'flex', gap: 12, justifyContent: 'center' }}>
            <Button variant="ghost" size="sm" onClick={() => go('home')}>Back Home</Button>
            <Button variant="ghost" size="sm" onClick={() => setDone(false)}>Edit Request</Button>
          </div>
        </Card>
      </Section>
    );
  }

  return (
    <Section style={{ paddingTop: 56 }}>
      <Eyebrow>Book your tune</Eyebrow>
      <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 44, textTransform: 'uppercase', letterSpacing: '-0.01em', color: 'var(--text-strong)', margin: '8px 0 28px' }}>Reserve Dyno Time</h1>

      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.4fr 0.9fr', gap: 24, alignItems: 'start' }}>
        <Card padding="28px 30px">
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 18 }}>
            <Input label="Year / Make / Model" value={f.bike} onChange={set('bike')} iconLeft={<Ico n="Bike" s={16} />} />
            <Input label="Email" type="email" value={f.email} onChange={set('email')} placeholder="you@email.com" iconLeft={<Ico n="Mail" s={16} />} />
            <Select label="Make" value={f.make} onChange={set('make')} options={['Harley-Davidson', 'Indian', 'Ducati', 'Metric / Sport', 'Other']} />
            <Select label="Service" value={f.service} onChange={set('service')} options={['Full Dyno Tune', 'Diagnostic & Correction', 'Performance Build']} />
          </div>
          <div style={{ height: 1, background: 'var(--divider)', margin: '22px 0' }} />
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 12, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 14 }}>Options</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <Checkbox checked={f.diag} onChange={set('diag')} label="Add baseline diagnostic pull (+$300)" />
            <Switch checked={f.mobile} onChange={set('mobile')} label="Group / event service (5+ bikes, CNY)" />
          </div>
          <div style={{ marginTop: 22 }}>
            <Input label="Mods & Notes" value={f.notes} onChange={set('notes')} placeholder="Exhaust, air cleaner, cams, big bore…" iconLeft={<Ico n="StickyNote" s={16} />} />
          </div>
        </Card>

        <Card padding="0" rail style={{ overflow: 'hidden' }}>
          <div className="th-dark" style={{ background: 'var(--ink-900)', padding: '22px 24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <CardTitle style={{ color: 'var(--white)' }}>Summary</CardTitle>
              <Badge tone="brand" solid>{f.make.split(' ')[0]}</Badge>
            </div>
          </div>
          <div style={{ padding: '20px 24px' }}>
            {[
              ['Bike', f.bike],
              ['Service', f.service],
              ['Diagnostic pull', f.diag ? 'Yes (+$300)' : 'No'],
              ['Group / event', f.mobile ? 'Yes' : 'No'],
            ].map(([k, v]) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '9px 0', borderBottom: '1px solid var(--divider)', gap: 12 }}>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--text-muted)', flexShrink: 0 }}>{k}</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 500, color: 'var(--text-strong)', textAlign: 'right' }}>{v}</span>
              </div>
            ))}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginTop: 16 }}>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 13, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Est. From</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 28, color: 'var(--text-brand)' }}>{price === 'Quote' ? 'Quote' : '$' + (f.diag && price !== 'Quote' ? (parseInt(price) + 300).toLocaleString() : price)}</span>
            </div>
            <Button block size="lg" style={{ marginTop: 18 }} onClick={submit} disabled={submitting} iconRight={submitting ? null : <Ico n="ArrowRight" s={18} />}>{submitting ? 'Sending…' : 'Submit Request'}</Button>
            {error && <p style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--red-500)', textAlign: 'center', margin: '10px 0 0' }}>{error}</p>}
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--text-faint)', textAlign: 'center', margin: '12px 0 0' }}>No charge until your appointment is confirmed.</p>

            <div style={{ height: 1, background: 'var(--divider)', margin: '18px 0' }} />
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--text-faint)', marginBottom: 10 }}>Or book directly</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <Button block variant="secondary" size="sm" onClick={() => window.open(SQUARE_URL, '_blank', 'noopener')} iconLeft={<Ico n="Calendar" s={15} />}>Book via Square</Button>
              <Button block variant="ghost" size="sm" onClick={() => window.open(CALENDLY_URL, '_blank', 'noopener')} iconLeft={<Ico n="MessageSquare" s={15} />}>Free 30-min Consultation</Button>
            </div>
          </div>
        </Card>
      </div>
    </Section>
  );
}
Object.assign(window, { Booking });
