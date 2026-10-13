/* Focused rebuild for a repo whose original _build tooling is not tracked.
 * Preserve every other compiled component; replace Booking and its helpers,
 * render /book from the resulting app, and update app cache keys on all routes.
 */
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { createHash } = require('node:crypto');
const { transformSync } = require('@babel/core');
const React = require('react');
const { renderToString } = require('react-dom/server');
const root = path.resolve(__dirname, '..');
const read = name => fs.readFileSync(path.join(root, name), 'utf8');
const check = process.argv.includes('--check');
const startMarker = '/* BOOKING_BUILD_START */';
const endMarker = '/* BOOKING_BUILD_END */';
const current = read('app.js');
const marked = current.includes(startMarker);
const start = current.indexOf(marked ? startMarker : 'var SQUARE_URL=');
const end = marked ? current.indexOf(endMarker) + endMarker.length : current.indexOf('function DynoResults()');
if (start < 0 || end <= start) throw new Error('Booking bundle boundaries changed; review before rebuilding.');
const compiled = transformSync(read('components/Booking.jsx'), {
  presets: [['@babel/preset-react', { runtime: 'classic' }]],
  configFile: false, babelrc: false, comments: false, compact: true,
}).code;
const bundle = current.slice(0, start) + startMarker + compiled + endMarker + current.slice(end);
const hash = createHash('sha256').update(bundle).digest('hex').slice(0, 8);
const context = { React, ReactDOM: {}, console, URLSearchParams, innerWidth: 1280,
  document: { getElementById: () => null }, location: { pathname: '/book/' } };
context.window = context;
vm.createContext(context);
vm.runInContext(read('_ds_bundle.js'), context);
vm.runInContext(bundle, context);
const markup = renderToString(React.createElement(context.App, { route: 'book' }));
const outputs = new Map([['app.js', bundle]]);
for (const route of ['index.html', 'services/index.html', 'dynoai/index.html', 'book/index.html', 'dyno/index.html', 'status/index.html', 'status/admin/index.html']) {
  let html = read(route);
  if (route === 'book/index.html') {
    const rootStart = html.indexOf('<div id="root">');
    const rootEnd = html.lastIndexOf('</div>\n</body>');
    if (rootStart < 0 || rootEnd < rootStart) throw new Error('Booking HTML boundaries changed.');
    html = html.slice(0, rootStart) + '<div id="root">' + markup + html.slice(rootEnd);
    // This hidden form is Netlify's deploy-time schema, not a server validator.
    html = html.replace('<input type="hidden" name="email"/>', '<input type="email" name="email" required=""/>');
    html = html.replace('<input type="hidden" name="bot-field"/>', '<input type="text" name="bot-field" tabindex="-1" autocomplete="off"/>');
  }
  if (!/\/app\.js\?v=[^"\s]+/.test(html)) throw new Error('Missing app cache key: ' + route);
  outputs.set(route, html.replace(/\/app\.js\?v=[^"\s]+/g, '/app.js?v=' + hash));
}
let stale = false;
for (const [name, content] of outputs) {
  if (content === read(name)) continue;
  if (check) { console.error('Stale generated file: ' + name); stale = true; }
  else { fs.writeFileSync(path.join(root, name), content); console.log('Updated ' + name); }
}
if (stale) process.exitCode = 1;
else console.log('Booking source, HTML and bundle are in sync (' + hash + ').');
