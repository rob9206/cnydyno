/* GET /api/status?t=<token> — customer-facing job status.
 * Token is an unguessable capability key generated at job creation; the
 * customer gets it in the link we text them. No listing endpoint exists,
 * so a valid token is the only way to reach a job.
 */
import { jobsStore } from './lib/store.mjs';
import { JOBS_STORE, jobKey, publicView } from './lib/jobs.mjs';

const NO_STORE = { 'Cache-Control': 'no-store' };

export default async function handler(req) {
  if (req.method !== 'GET') {
    return Response.json({ error: 'method_not_allowed' }, { status: 405, headers: NO_STORE });
  }
  const url = new URL(req.url);
  const token = String(url.searchParams.get('t') || '').trim().toLowerCase();
  if (!/^[a-z0-9-]{8,40}$/.test(token)) {
    return Response.json({ error: 'bad_token' }, { status: 400, headers: NO_STORE });
  }

  const store = jobsStore(JOBS_STORE);
  const job = await store.getJSON(jobKey(token));
  if (!job || job.archived) {
    return Response.json({ error: 'not_found' }, { status: 404, headers: NO_STORE });
  }
  return Response.json(
    { job: publicView(job), now: new Date().toISOString() },
    { headers: NO_STORE },
  );
}

export const config = { path: '/api/status' };
