/* Booking flow — bike + service form, then confirmation.
 * Submit POSTs to Netlify Forms (hidden static form in book/index.html is
 * detected at deploy time; field names must match). Also offers direct
 * booking via Square Appointments and a free consult via Calendly. */
const SQUARE_URL = 'https://book.squareup.com/appointments/xue8icpm57kptx/location/L2V4BHTQFX0AX/services';
const CALENDLY_URL = 'https://calendly.com/dawsonmotoring/30min';
const SHOP_EMAIL = 'dawsonmotoring@gmail.com';
const FORM_ENDPOINT = '/book/'; // path where the hidden Netlify form lives

/* Scheduling policy — dyno time books at least two weeks out, and the shop
 * floor is closed Sunday & Monday (Saturday runs short hours). Date math is
 * local-time on purpose: "two weeks out" means the rider's wall calendar. */
const MIN_LEAD_DAYS = 14;
const MAX_LEAD_DAYS = 180;
const CLOSED_DAYS = [0, 1]; // Sun, Mon
const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function startOfDay(d) { const x = new Date(d); x.setHours(0, 0, 0, 0); return x; }
function addDays(d, n) { const x = new Date(d); x.setDate(x.getDate() + n); return x; }
function toISODate(d) {
  const p = (n) => String(n).padStart(2, '0');
  return d.getFullYear() + '-' + p(d.getMonth() + 1) + '-' + p(d.getDate());
}
function parseISODate(s) {
  const [y, m, d] = String(s).split('-').map(Number);
  return new Date(y, m - 1, d);
}
function isClosedDay(d) { return CLOSED_DAYS.includes(d.getDay()); }
function nextOpenDay(d) { let x = d; while (isClosedDay(x)) x = addDays(x, 1); return x; }
// Earliest bookable slot: two weeks from today, rolled forward past closed days.
function earliestSlot(now) { return nextOpenDay(addDays(startOfDay(now || new Date()), MIN_LEAD_DAYS)); }
function prettyDate(d) { return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }); }

/* Classify a chosen ISO date against the scheduling policy. Returns
 * { ok, error, hint, suggest } — `suggest` is a Date offered as a one-click fix. */
function assessDate(iso, now) {
  const today = startOfDay(now || new Date());
  const min = earliestSlot(today);
  if (!iso) return { ok: false, error: 'Pick a preferred date — we book at least two weeks out.', suggest: min };
  const d = parseISODate(iso);
  if (isNaN(d.getTime())) return { ok: false, error: "That date doesn't look right — try the calendar picker.", suggest: min };
  if (d < today) return { ok: false, error: 'That date has already passed.', suggest: min };
  if (d < min) {
    const daysOut = Math.round((d - today) / 86400000);
    const lead = daysOut === 0 ? "That's today" : daysOut === 1 ? "That's tomorrow" : "That's only " + daysOut + ' days out';
    return { ok: false, error: lead + ' — dyno time books at least two weeks ahead. Earliest: ' + prettyDate(min) + '.', suggest: min };
  }
  if (isClosedDay(d)) {
    const s = nextOpenDay(d);
    return { ok: false, error: "We're closed " + DAY_NAMES[d.getDay()] + 's — nearest open day is ' + prettyDate(s) + '.', suggest: s };
  }
  if (d > addDays(today, MAX_LEAD_DAYS)) {
    return { ok: false, error: "That's more than 6 months out — pick something closer and we'll lock it in.", suggest: min };
  }
  if (d.getDay() === 6) return { ok: true, hint: 'Saturdays run 9am–3pm — earlier is better for full tunes.' };
  return { ok: true };
}

function Booking({ go }) {
  const { Input, Select, Checkbox, Switch, Button, Card, CardTitle, Badge } = window.DS;
  const { isMobile } = useViewport();
  const [done, setDone] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [f, setF] = React.useState({
    bike: '2021 Harley Street Glide', make: 'Harley-Davidson', email: '', service: 'Full Dyno Tune',
    date: '', diag: false, mobile: false, notes: '',
  });
  const set = (k) => (e) => setF((s) => ({ ...s, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }));
  const price = f.service === 'Full Dyno Tune' ? '650' : f.service === 'Diagnostic & Correction' ? '300' : 'Quote';

  /* The pages are pre-rendered to static HTML, so anything derived from
   * "today" must wait for mount — otherwise the build machine's date gets
   * baked into the markup and fights hydration. */
  const [now, setNow] = React.useState(null);
  React.useEffect(() => { setNow(new Date()); }, []);
  const [dateTouched, setDateTouched] = React.useState(false);
  const check = now ? assessDate(f.date, now) : null;
  const minISO = now ? toISODate(earliestSlot(now)) : undefined;
  const maxISO = now ? toISODate(addDays(startOfDay(now), MAX_LEAD_DAYS)) : undefined;
  const showDateError = !!(check && !check.ok && (dateTouched || f.date));
  const pickDate = (e) => { setDateTouched(true); set('date')(e); };
  const applySuggestion = (d) => { setDateTouched(true); setF((s) => ({ ...s, date: toISODate(d) })); };
  const dateLabel = (iso, opts) => parseISODate(iso).toLocaleDateString('en-US', opts || { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });

  async function submit() {
    // Re-validate against a fresh clock (the page may have sat open for days)
    // and sync `now` so the field-level message agrees with this verdict.
    const t = new Date();
    const c = assessDate(f.date, t);
    if (!c.ok) {
      setNow(t);
      setDateTouched(true);
      setError('Fix the preferred date above to send your request.');
      return;
    }
    setSubmitting(true);
    setError(null);
    const body = new URLSearchParams({
      'form-name': 'booking-request',
      bike: f.bike,
      make: f.make,
      email: f.email,
      service: f.service,
      preferred_date: dateLabel(f.date) + ' (' + f.date + ')',
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
        'Preferred date: ' + dateLabel(f.date) + ' (' + f.date + ')',
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
            We’ll confirm your <strong style={{ color: 'var(--text-brand)' }}>{f.service}</strong> for the <strong>{f.bike}</strong>{f.date ? <> — requested for <strong>{dateLabel(f.date, { weekday: 'long', month: 'long', day: 'numeric' })}</strong> —</> : ''} within 24 hours. {f.mobile ? 'Include your location in the notes for mobile/event service.' : ''}
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
      <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--fs-section-title)', textTransform: 'uppercase', letterSpacing: '-0.01em', color: 'var(--text-strong)', margin: '8px 0 28px' }}>Reserve Dyno Time</h1>

      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.4fr 0.9fr', gap: 24, alignItems: 'start' }}>
        <Card padding="28px 30px">
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 18 }}>
            <Input label="Year / Make / Model" value={f.bike} onChange={set('bike')} iconLeft={<Ico n="Bike" s={16} />} />
            <Input label="Email" type="email" value={f.email} onChange={set('email')} placeholder="you@email.com" iconLeft={<Ico n="Mail" s={16} />} />
            <Select label="Make" value={f.make} onChange={set('make')} options={['Harley-Davidson', 'Indian', 'Ducati', 'Metric / Sport', 'Other']} />
            <Select label="Service" value={f.service} onChange={set('service')} options={['Full Dyno Tune', 'Diagnostic & Correction', 'Performance Build']} />
          </div>
          <div style={{ marginTop: 18 }}>
            <Input
              label="Preferred Date"
              type="date"
              value={f.date}
              onChange={pickDate}
              min={minISO}
              max={maxISO}
              iconLeft={<Ico n="CalendarDays" s={16} />}
              error={showDateError ? check.error : null}
              hint={check && check.ok ? (check.hint || dateLabel(f.date, { weekday: 'long', month: 'long', day: 'numeric' }) + ' works — we’ll confirm the exact slot by email.') : 'Dyno time books at least 2 weeks out. Closed Sun & Mon.'}
            />
            {now && (!f.date || showDateError) && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginTop: 10 }}>
                <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-faint)' }}>Quick pick</span>
                {(showDateError && check.suggest ? [['Nearest open', check.suggest]] : [
                  ['Earliest', earliestSlot(now)],
                  ['Week after', nextOpenDay(addDays(earliestSlot(now), 7))],
                  ['A month out', nextOpenDay(addDays(startOfDay(now), 30))],
                ]).map(([tag, d]) => (
                  <Button key={tag} variant="secondary" size="sm" onClick={() => applySuggestion(d)}>{tag + ' · ' + prettyDate(d)}</Button>
                ))}
              </div>
            )}
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
              ['Preferred date', f.date ? dateLabel(f.date, { weekday: 'short', month: 'short', day: 'numeric' }) : '—'],
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
Object.assign(window, { Booking, BookingSchedule: { MIN_LEAD_DAYS, MAX_LEAD_DAYS, CLOSED_DAYS, earliestSlot, assessDate, toISODate, parseISODate } });
