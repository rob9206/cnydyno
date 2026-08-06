/* Shared job model for the live status portal.
 * Jobs live in Netlify Blobs as one JSON document per job, keyed by an
 * unguessable token that doubles as the customer's capability URL.
 */

export const JOBS_STORE = 'thunderhorse-jobs';

export function jobKey(token) {
  return 'job/' + token;
}

/* Stage definitions per job type. Index into these with job.stage. */
export const STAGES = {
  dyno: [
    { label: 'Checked in', desc: 'Walk-around done, keys tagged, strapped into the queue.' },
    { label: 'Baseline pulls', desc: 'Stock numbers on the drum before we touch anything.' },
    { label: 'DynoAI modeling', desc: 'One WOT pull builds the full VE model — 98% cell coverage.' },
    { label: 'Tune + verification pulls', desc: 'Corrected map flashed. AFR verified against target on the drum.' },
    { label: 'Final quality check', desc: 'Heat cycle, decel check, throttle response, test ride.' },
    { label: 'Ready for pickup', desc: 'Dyno sheet printed, paperwork ready. Come get it.' },
  ],
  storage: [
    { label: 'Checked in', desc: 'Walk-around done, keys tagged, spot assigned.' },
    { label: 'Prepped for storage', desc: 'Fuel stabilized, battery on the tender, tires at spec.' },
    { label: 'In storage', desc: 'Tucked in and covered. Battery tended, checked on schedule.' },
    { label: 'Ready for pickup', desc: 'Rolled up front, paperwork ready. Come get it.' },
  ],
};

export const JOB_TYPES = Object.keys(STAGES);

function cleanString(v, max) {
  return String(v == null ? '' : v).replace(/[\u0000-\u001f\u007f]/g, '').trim().slice(0, max || 200);
}

function cleanInt(v, min, max, dflt) {
  const n = Math.round(Number(v));
  if (!Number.isFinite(n)) return dflt;
  return Math.max(min, Math.min(max, n));
}

/* Normalize an incoming job patch from the admin console. Only whitelisted
 * fields survive, everything is length-capped and type-coerced. */
export function sanitizePatch(input) {
  const src = input && typeof input === 'object' ? input : {};
  const out = {};

  if (src.type !== undefined && JOB_TYPES.includes(src.type)) out.type = src.type;
  if (src.owner !== undefined) out.owner = cleanString(src.owner, 80);
  if (src.bike !== undefined) out.bike = cleanString(src.bike, 120);
  if (src.package !== undefined) out.package = cleanString(src.package, 120);
  if (src.bay !== undefined) out.bay = cleanString(src.bay, 40);
  if (src.eta !== undefined) out.eta = cleanString(src.eta, 80);
  if (src.stage !== undefined) out.stage = cleanInt(src.stage, 0, 9, 0);
  if (src.pullsTotal !== undefined) out.pullsTotal = cleanInt(src.pullsTotal, 0, 12, 4);
  if (src.pullsDone !== undefined) out.pullsDone = cleanInt(src.pullsDone, 0, 12, 0);
  if (src.archived !== undefined) out.archived = !!src.archived;

  if (src.note !== undefined) {
    out.note = src.note && (src.note.text || src.note.author)
      ? { text: cleanString(src.note.text, 600), author: cleanString(src.note.author, 60) }
      : null;
  }

  if (src.numbers !== undefined) {
    const n = src.numbers || {};
    const hasAny = ['baseHp', 'tunedHp', 'baseTq', 'tunedTq'].some((k) => cleanString(n[k], 10) !== '');
    out.numbers = hasAny
      ? {
          baseHp: cleanString(n.baseHp, 10),
          tunedHp: cleanString(n.tunedHp, 10),
          baseTq: cleanString(n.baseTq, 10),
          tunedTq: cleanString(n.tunedTq, 10),
        }
      : null;
  }

  if (src.bill !== undefined) {
    const rows = Array.isArray(src.bill) ? src.bill.slice(0, 12) : [];
    out.bill = rows
      .map((r) => ({ label: cleanString(r && r.label, 120), amount: cleanString(r && r.amount, 24) }))
      .filter((r) => r.label !== '');
  }
  if (src.due !== undefined) out.due = cleanString(src.due, 24);

  return out;
}

/* Build a fresh job document from a sanitized patch. */
export function newJob(patch) {
  const token = (globalThis.crypto && crypto.randomUUID ? crypto.randomUUID() : String(Date.now()) + '-' + Math.random().toString(36).slice(2))
    .toLowerCase();
  const wo = 'WO-' + String(Math.floor(1000 + Math.random() * 9000));
  const now = new Date().toISOString();
  const type = patch.type || 'dyno';
  const job = {
    token,
    wo,
    type,
    owner: patch.owner || '',
    bike: patch.bike || '',
    package: patch.package || (type === 'dyno' ? 'Full dyno tune · DynoAI' : 'Winter storage'),
    bay: patch.bay || (type === 'dyno' ? 'BAY 1' : 'STORAGE'),
    eta: patch.eta || '',
    stage: 0,
    stageTimes: STAGES[type].map((_, i) => (i === 0 ? now : null)),
    pullsTotal: patch.pullsTotal !== undefined ? patch.pullsTotal : 4,
    pullsDone: 0,
    note: patch.note || null,
    numbers: patch.numbers || null,
    bill: patch.bill || [],
    due: patch.due || '',
    archived: false,
    createdAt: now,
    updatedAt: now,
  };
  return job;
}

/* Apply a sanitized patch to an existing job, stamping stage times. */
export function applyPatch(job, patch) {
  const next = { ...job, ...patch, token: job.token, wo: job.wo, createdAt: job.createdAt };
  const stages = STAGES[next.type] || STAGES.dyno;

  if (!Array.isArray(next.stageTimes) || next.stageTimes.length !== stages.length) {
    const old = Array.isArray(next.stageTimes) ? next.stageTimes : [];
    next.stageTimes = stages.map((_, i) => old[i] || null);
  }
  next.stage = Math.max(0, Math.min(stages.length - 1, next.stage || 0));

  const now = new Date().toISOString();
  for (let i = 0; i <= next.stage; i++) {
    if (!next.stageTimes[i]) next.stageTimes[i] = now;
  }
  for (let i = next.stage + 1; i < stages.length; i++) {
    next.stageTimes[i] = null;
  }

  next.updatedAt = now;
  return next;
}

/* The customer-facing view of a job. */
export function publicView(job) {
  const stages = STAGES[job.type] || STAGES.dyno;
  return {
    wo: job.wo,
    type: job.type,
    owner: job.owner,
    bike: job.bike,
    package: job.package,
    bay: job.bay,
    eta: job.eta,
    stage: Math.max(0, Math.min(stages.length - 1, job.stage || 0)),
    stageTimes: job.stageTimes,
    stages: stages,
    pullsTotal: job.pullsTotal,
    pullsDone: job.pullsDone,
    note: job.note,
    numbers: job.numbers,
    bill: job.bill,
    due: job.due,
    updatedAt: job.updatedAt,
  };
}
