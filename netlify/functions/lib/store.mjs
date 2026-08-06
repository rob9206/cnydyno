/* Job persistence. On Netlify this is Netlify Blobs (site-wide store, survives
 * deploys). Outside Netlify (local preview via _build/serve-api.js) it falls
 * back to JSON files under _build/.local-blobs so the whole portal can be
 * exercised without a Netlify session.
 */
import { getStore } from '@netlify/blobs';

const onNetlify = !!process.env.NETLIFY || !!process.env.NETLIFY_BLOBS_CONTEXT;

function blobsStore(name) {
  const store = getStore(name);
  return {
    async getJSON(key) {
      return store.get(key, { type: 'json' });
    },
    async setJSON(key, value) {
      await store.setJSON(key, value);
    },
    async listKeys(prefix) {
      const { blobs } = await store.list({ prefix });
      return blobs.map((b) => b.key);
    },
  };
}

function fileStore(name) {
  /* Lazy imports keep node builtins out of the production bundle path. */
  return {
    async _dir() {
      const { mkdir } = await import('node:fs/promises');
      const path = await import('node:path');
      const dir = path.join(process.cwd(), '_build', '.local-blobs', name);
      await mkdir(dir, { recursive: true });
      return { dir, path };
    },
    _file(dir, path, key) {
      return path.join(dir, encodeURIComponent(key) + '.json');
    },
    async getJSON(key) {
      const { readFile } = await import('node:fs/promises');
      const { dir, path } = await this._dir();
      try {
        return JSON.parse(await readFile(this._file(dir, path, key), 'utf8'));
      } catch {
        return null;
      }
    },
    async setJSON(key, value) {
      const { writeFile } = await import('node:fs/promises');
      const { dir, path } = await this._dir();
      await writeFile(this._file(dir, path, key), JSON.stringify(value, null, 2), 'utf8');
    },
    async listKeys(prefix) {
      const { readdir } = await import('node:fs/promises');
      const { dir } = await this._dir();
      const names = await readdir(dir);
      return names
        .filter((n) => n.endsWith('.json'))
        .map((n) => decodeURIComponent(n.slice(0, -5)))
        .filter((k) => k.startsWith(prefix));
    },
  };
}

export function jobsStore(name) {
  return onNetlify ? blobsStore(name) : fileStore(name);
}
