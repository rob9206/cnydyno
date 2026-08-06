/* GET /api/status/stream?t=<token> — SSE live job updates.
 * Netlify-friendly: short-lived stream (~8s) with retry hint so EventSource
 * reconnects; polls Blobs every ~1.5s and pushes when updatedAt changes.
 */
import { jobsStore } from './lib/store.mjs';
import { JOBS_STORE, jobKey, publicView } from './lib/jobs.mjs';

const SSE_HEADERS = {
  'Content-Type': 'text/event-stream',
  'Cache-Control': 'no-store',
  Connection: 'keep-alive',
};

const POLL_MS = 1500;
const MAX_MS = 8500;

function sseLine(text) {
  return text + '\n';
}

function jobFingerprint(job) {
  return job.updatedAt || JSON.stringify(publicView(job));
}

export default async function handler(req) {
  if (req.method !== 'GET') {
    return Response.json({ error: 'method_not_allowed' }, { status: 405, headers: { 'Cache-Control': 'no-store' } });
  }

  const url = new URL(req.url);
  const token = String(url.searchParams.get('t') || '').trim().toLowerCase();
  if (!/^[a-z0-9-]{8,40}$/.test(token)) {
    return Response.json({ error: 'bad_token' }, { status: 400, headers: { 'Cache-Control': 'no-store' } });
  }

  const store = jobsStore(JOBS_STORE);
  const key = jobKey(token);
  const started = Date.now();
  let lastFp = null;
  let closed = false;

  const stream = new ReadableStream({
    start(controller) {
      const enc = new TextEncoder();
      const send = (chunk) => {
        if (closed) return;
        controller.enqueue(enc.encode(chunk));
      };
      const close = () => {
        if (closed) return;
        closed = true;
        try {
          controller.close();
        } catch {
          /* already closed */
        }
      };

      send(sseLine('retry: 1000'));
      send('\n');

      const tick = async () => {
        if (closed || Date.now() - started >= MAX_MS) {
          send(': ping\n\n');
          close();
          return;
        }

        try {
          const job = await store.getJSON(key);
          if (!job || job.archived) {
            send(sseLine('event: gone'));
            send(sseLine('data: {}'));
            send('\n');
            close();
            return;
          }

          const fp = jobFingerprint(job);
          if (fp !== lastFp) {
            lastFp = fp;
            const payload = JSON.stringify({ job: publicView(job), now: new Date().toISOString() });
            send(sseLine('data: ' + payload));
            send('\n');
          }
        } catch {
          close();
          return;
        }

        setTimeout(tick, POLL_MS);
      };

      tick();
    },
  });

  return new Response(stream, { headers: SSE_HEADERS });
}

export const config = { path: '/api/status/stream' };
