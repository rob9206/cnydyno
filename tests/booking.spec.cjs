const { test, expect } = require('@playwright/test');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const origin = 'http://booking.test';

// Entire site and React are served from disk. Every external request is aborted;
// form POSTs are mocked here, so no Netlify notification or booking can be sent.
async function site(page, routePath = '/book/', respond = route => route.fulfill({ status: 200, body: 'Accepted (mock)' })) {
  const posts = [];
  const errors = [];
  page.on('pageerror', err => errors.push(err.message));
  page.on('console', msg => { if (msg.type() === 'error' && msg.text().includes('Minified React error')) errors.push(msg.text()); });
  await page.clock.install({ time: new Date('2026-10-13T12:00:00Z') });
  await page.route('**/*', async route => {
    const req = route.request();
    const url = new URL(req.url());
    if (url.origin === origin && req.method() === 'POST') {
      posts.push({ path: url.pathname, data: Object.fromEntries(new URLSearchParams(req.postData())) });
      return respond(route);
    }
    let file;
    if (url.hostname === 'unpkg.com') {
      if (url.pathname.includes('react-dom@')) file = 'node_modules/react-dom/umd/react-dom.production.min.js';
      else if (url.pathname.includes('react@')) file = 'node_modules/react/umd/react.production.min.js';
    } else if (url.origin === origin) {
      file = url.pathname.slice(1);
      if (!file || file.endsWith('/')) file += 'index.html';
    }
    if (!file || !fs.existsSync(path.join(root, file))) return route.abort();
    const type = file.endsWith('.html') ? 'text/html' : file.endsWith('.js') ? 'application/javascript' : file.endsWith('.css') ? 'text/css' : undefined;
    return route.fulfill({ path: path.join(root, file), contentType: type });
  });
  await page.goto(origin + routePath);
  await page.waitForFunction(() => !!window.BookingSchedule);
  return { posts, errors };
}
async function validFields(page, email = 'rider+dyno@example.com') {
  await page.locator('#booking-email').fill(email);
  await page.locator('#booking-date').fill('2026-10-27');
}

test('prerender keeps submit disabled until JavaScript validation is ready', () => {
  const html = fs.readFileSync(path.join(root, 'book/index.html'), 'utf8');
  expect(html).toMatch(/<button[^>]*type="submit"[^>]*disabled=""/);
  expect(html).toContain('name="booking-request"');
  expect(html).toContain('netlify-honeypot="bot-field"');
});

test('empty and malformed email cannot send; inline errors are linked and focused', async ({ page }) => {
  const { posts, errors } = await site(page);
  await page.locator('#booking-date').fill('2026-10-27');
  for (const email of ['', 'where areyou', 'rider@', 'rider@example', 'rider@@example.com', 'rider name@example.com', '.rider@example.com', 'rider..name@example.com', 'rider@-example.com']) {
    await page.locator('#booking-email').fill(email);
    await page.getByRole('button', { name: 'Submit Request', exact: true }).click();
    await expect(page.locator('#booking-email-error')).toBeVisible();
    await expect(page.locator('#booking-email')).toBeFocused();
    await expect(page.locator('#booking-email')).toHaveAttribute('aria-invalid', 'true');
    await expect(page.locator('#booking-email')).toHaveAttribute('aria-describedby', 'booking-email-error');
  }
  expect(posts).toHaveLength(0);
  expect(errors).toEqual([]);
});

test('email helper accepts normal variations without domain allowlists', async ({ page }) => {
  await site(page);
  const results = await page.evaluate(() => [' rider+dyno@example.com ', "o'brien@example.co.uk", 'RIDER@EXAMPLE.COM', 'rider@sub.example.motorcycles'].map(window.assessBookingEmail));
  expect(results.every(x => x.error === null)).toBe(true);
  expect(results[0].email).toBe('rider+dyno@example.com');
  expect(await page.evaluate(() => window.assessBookingEmail('a'.repeat(65) + '@example.com').error)).toBeTruthy();
});

test('autofilled email is read even without a React change event', async ({ page }) => {
  const { posts } = await site(page);
  await page.locator('#booking-date').fill('2026-10-27');
  await page.locator('#booking-email').focus();
  await page.locator('#booking-email').evaluate(el => {
    Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set.call(el, 'autofilled@example.com');
  });
  await page.getByRole('button', { name: 'Submit Request', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Request Sent' })).toBeVisible();
  expect(posts[0].data.email).toBe('autofilled@example.com');
});

test('corrected email clears its error and Enter sends the complete trimmed payload', async ({ page }) => {
  const { posts, errors } = await site(page);
  await page.locator('#booking-email').focus();
  await page.locator('#booking-date').focus();
  await expect(page.locator('#booking-email-error')).toBeVisible();
  await validFields(page, '  Rider+Tune@Example.com  ');
  await expect(page.locator('#booking-email-error')).toHaveCount(0);
  await page.getByLabel('Mods & Notes').fill('Intake, exhaust & cams');
  await page.getByLabel('Add baseline diagnostic pull (+$300)').check();
  await page.getByLabel('Group / event service (5+ bikes, CNY)').check();
  await page.locator('#booking-email').press('Enter');
  await expect(page.getByRole('heading', { name: 'Request Sent' })).toBeVisible();
  await expect(page.getByText('Your appointment is only booked once we confirm it.', { exact: false })).toBeVisible();
  expect(posts).toEqual([{ path: '/book/', data: {
    'form-name': 'booking-request', bike: '2021 Harley Street Glide', make: 'Harley-Davidson',
    email: 'Rider+Tune@Example.com', service: 'Full Dyno Tune',
    preferred_date: 'Tuesday, October 27, 2026 (2026-10-27)', diag: 'Yes (+$300)',
    mobile: 'Yes', notes: 'Intake, exhaust & cams', 'bot-field': '',
  } }]);
  expect(errors).toEqual([]);
});

test('real honeypot blocks submission without showing success', async ({ page }) => {
  const { posts } = await site(page);
  await validFields(page);
  await expect(page.locator('form:not([name]) input[name="bot-field"]')).toBeHidden();
  await page.locator('form:not([name]) input[name="bot-field"]').evaluate(el => { el.value = 'spam'; });
  await page.getByRole('button', { name: 'Submit Request', exact: true }).click();
  await expect(page.getByRole('alert')).toContainText('Could not send this request');
  expect(posts).toHaveLength(0);
  await expect(page.getByRole('heading', { name: 'Request Sent' })).toHaveCount(0);
});

test('rapid submissions make one request while pending', async ({ page }) => {
  let release;
  const pending = new Promise(resolve => { release = resolve; });
  const { posts } = await site(page, '/book/', async route => { await pending; await route.fulfill({ status: 200, body: 'Accepted (mock)' }); });
  await validFields(page);
  await page.locator('form:not([name])').evaluate(form => { form.requestSubmit(); form.requestSubmit(); });
  await expect(page.getByRole('button', { name: 'Sending…' })).toBeDisabled();
  expect(posts).toHaveLength(1);
  release();
  await expect(page.getByRole('heading', { name: 'Request Sent' })).toBeVisible();
});

test('existing scheduling rules still reject missing, early, closed and distant dates', async ({ page }) => {
  const { posts } = await site(page);
  await page.locator('#booking-email').fill('rider@example.com');
  for (const date of ['', '2026-10-12', '2026-10-26', '2026-11-01', '2026-11-02', '2027-04-13']) {
    await page.locator('#booking-date').fill(date);
    await page.getByRole('button', { name: 'Submit Request', exact: true }).click();
    await expect(page.locator('#booking-date-error')).toBeVisible();
    await expect(page.locator('#booking-date')).toBeFocused();
  }
  expect(posts).toHaveLength(0);
  await page.locator('#booking-date').fill('2026-10-31');
  await expect(page.getByText('Saturdays run 9am–3pm — earlier is better for full tunes.')).toBeVisible();
  await page.getByRole('button', { name: 'Submit Request', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Request Sent' })).toBeVisible();
  expect(posts).toHaveLength(1);
});

test('date is checked again when a page has been left open', async ({ page }) => {
  const { posts } = await site(page);
  await validFields(page);
  await page.clock.setSystemTime(new Date('2026-10-14T12:00:00Z'));
  await page.getByRole('button', { name: 'Submit Request', exact: true }).click();
  await expect(page.locator('#booking-date-error')).toContainText('two weeks');
  expect(posts).toHaveLength(0);
});

test('failed transport keeps request editable and offers the mailto fallback', async ({ page }) => {
  const { posts } = await site(page, '/book/', route => route.fulfill({ status: 503, body: 'Unavailable (mock)' }));
  await validFields(page);
  await page.getByRole('button', { name: 'Submit Request', exact: true }).click();
  await expect(page.getByRole('alert')).toContainText('Could not submit online');
  await expect(page.getByRole('button', { name: 'Submit Request', exact: true })).toBeEnabled();
  await expect(page.getByRole('heading', { name: 'Request Sent' })).toHaveCount(0);
  expect(posts).toHaveLength(1);
  await expect(page.locator('#booking-email')).toHaveValue('rider+dyno@example.com');
});

test('Square, consult and quick-pick controls never submit the request', async ({ page }) => {
  const { posts } = await site(page);
  await page.evaluate(() => { window.opened = []; window.open = (...args) => { window.opened.push(args); }; });
  await page.getByRole('button', { name: /Earliest ·/ }).click();
  await expect(page.locator('#booking-date')).toHaveValue('2026-10-27');
  await page.getByRole('button', { name: 'Book via Square', exact: true }).click();
  await page.getByRole('button', { name: 'Free 30-min Consultation', exact: true }).click();
  expect(posts).toHaveLength(0);
  expect(await page.evaluate(() => window.opened.map(x => x[0]))).toEqual([
    'https://book.squareup.com/appointments/xue8icpm57kptx/location/L2V4BHTQFX0AX/services',
    'https://calendly.com/dawsonmotoring/30min',
  ]);
});

test('mobile form and SPA navigation use the same validation without overflow', async ({ page }) => {
  const { posts, errors } = await site(page, '/');
  await page.locator('footer a[href="/book/"]').click();
  await expect(page.locator('#booking-date')).toHaveAttribute('min', '2026-10-27');
  // The unchanged homepage has a pre-existing SSR text mismatch (reproduced
  // on main b40ad90). Scope error checking to the now-mounted booking view.
  // The direct /book tests above separately require clean initial hydration.
  expect(errors.every(error => /Minified React error #(425|418|423);/.test(error))).toBe(true);
  errors.length = 0;
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole('button', { name: 'Submit Request', exact: true }).click();
  await expect(page.locator('#booking-email-error')).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  expect(posts).toHaveLength(0);
  expect(errors).toEqual([]);
});
