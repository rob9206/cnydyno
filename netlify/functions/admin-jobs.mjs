/* /api/admin/jobs — shop-side job management.
 *   GET               list jobs (newest first)
 *   POST              create a job            { patch }
 *   PUT ?t=<token>    update a job            { patch }
 * Every request must carry the shop key in the X-Admin-Key header. The key
 * lives in the STATUS_ADMIN_KEY environment variable on Netlify — it is never
 * shipped to the browser or committed to the repo.
 */
import { createHash, timingSafeEqual } from 'node:crypto';
import { jobsStore } from './lib/store.mjs';
import { JOBS_STORE, jobKey, sanitizePatch, newJob, applyPatch } from './lib/jobs.mjs';

const NO_STORE = { 'Cache-Control': 'no-store' };

function keyMatches(provided, expected) {
  if (typeof provided !== 'string' || typeof expected !== 'string' || expected.length < 8) return false;
  const a = createHash('sha256').update(provided).digest();
  const b = createHash('sha256').update(expected).digest();
  return timingSafeEqual(a, b);
}

export default async function handler(req) {
  const expected = process.env.STATUS_ADMIN_KEY;
  if (!expected) {
    return Response.json({ error: 'not_configured', hint: 'Set the STATUS_ADMIN_KEY environment variable on Netlify.' }, { status: 503, headers: NO_STORE });
  }
  if (!keyMatches(req.headers.get('x-admin-key') || '', expected)) {
    return Response.json({ error: 'unauthorized' }, { status: 401, headers: NO_STORE });
  }

  const store = jobsStore(JOBS_STORE);
  const url = new URL(req.url);

  if (req.method === 'GET') {
    const keys = await store.listKeys('job/');
    const jobs = [];
    for (const key of keys) {
      const job = await store.getJSON(key);
      if (job) jobs.push(job);
    }
    jobs.sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt)));
    return Response.json({ jobs }, { headers: NO_STORE });
  }

  if (req.method === 'POST') {
    let body;
    try {
      body = await req.json();
    } catch {
      return Response.json({ error: 'bad_json' }, { status: 400, headers: NO_STORE });
    }
    const job = newJob(sanitizePatch(body && body.patch));
    await store.setJSON(jobKey(job.token), job);
    return Response.json({ job }, { status: 201, headers: NO_STORE });
  }

  if (req.method === 'PUT') {
    const token = String(url.searchParams.get('t') || '').trim().toLowerCase();
    if (!/^[a-z0-9-]{8,40}$/.test(token)) {
      return Response.json({ error: 'bad_token' }, { status: 400, headers: NO_STORE });
    }
    const existing = await store.getJSON(jobKey(token));
    if (!existing) {
      return Response.json({ error: 'not_found' }, { status: 404, headers: NO_STORE });
    }
    let body;
    try {
      body = await req.json();
    } catch {
      return Response.json({ error: 'bad_json' }, { status: 400, headers: NO_STORE });
    }
    const job = applyPatch(existing, sanitizePatch(body && body.patch));
    await store.setJSON(jobKey(token), job);
    return Response.json({ job }, { headers: NO_STORE });
  }

  return Response.json({ error: 'method_not_allowed' }, { status: 405, headers: NO_STORE });
}

export const config = { path: '/api/admin/jobs' };
