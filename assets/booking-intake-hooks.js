/* Booking route intake placements.
 * Adds a subtle intake link on /book and enhances the request-sent state
 * with intake CTA + confirmation/reminder copy. Runs as a DOM enhancer so it
 * works on static pre-rendered pages and SPA route transitions. */
(function () {
  'use strict';
  var INTAKE_URL = '/intake/';

  function findByText(selector, text) {
    var nodes = document.querySelectorAll(selector);
    for (var i = 0; i < nodes.length; i += 1) {
      if ((nodes[i].textContent || '').trim() === text) return nodes[i];
    }
    return null;
  }

  function ensureSoftLink() {
    if (document.getElementById('intake-soft-link')) return;
    var heading = findByText('h1', 'Reserve Dyno Time');
    if (!heading) return;

    var p = document.createElement('p');
    p.id = 'intake-soft-link';
    p.style.margin = '-14px 0 22px';
    p.style.fontFamily = 'var(--font-body)';
    p.style.fontSize = '14px';
    p.style.color = 'var(--text-muted)';
    p.innerHTML = 'Already booked? <a href="' + INTAKE_URL + '" style="color:var(--red-500);text-decoration:none;font-weight:600">Complete your intake</a>.';
    heading.insertAdjacentElement('afterend', p);
  }

  function ensureSuccessBlock() {
    var heading = findByText('h2', 'Request Sent');
    if (!heading) return;
    if (document.getElementById('intake-success-block')) return;

    var intro = heading.nextElementSibling;
    if (!intro || intro.tagName !== 'P') return;

    var block = document.createElement('div');
    block.id = 'intake-success-block';
    block.style.margin = '0 0 20px';
    block.innerHTML = '' +
      '<div style="height:1px;background:var(--divider);margin:8px 0 18px"></div>' +
      '<div style="font-family:var(--font-display);font-weight:600;font-size:11px;letter-spacing:0.16em;text-transform:uppercase;color:var(--text-faint);margin-bottom:10px">Next step</div>' +
      '<p style="font-family:var(--font-body);font-size:14px;color:var(--text-muted);margin:0 0 12px">Complete your 5-minute bike intake before drop-off.</p>' +
      '<a href="' + INTAKE_URL + '" style="display:inline-flex;align-items:center;justify-content:center;gap:8px;height:var(--control-md);padding:0 20px;font-family:var(--font-display);font-weight:600;font-size:13.5px;letter-spacing:0.06em;text-transform:uppercase;color:var(--text-on-accent);background:var(--accent);border:1px solid transparent;border-radius:var(--radius-md);text-decoration:none">Complete Bike Intake (5 min)</a>' +
      '<p style="font-family:var(--font-body);font-size:13px;color:var(--text-muted);margin:12px 0 0">Your confirmation message includes this intake link, and we include it again in your 24-hour reminder if intake is still missing.</p>';
    intro.insertAdjacentElement('afterend', block);
  }

  function runEnhancements() {
    ensureSoftLink();
    ensureSuccessBlock();
  }

  function start() {
    runEnhancements();
    var root = document.getElementById('root');
    if (!root || window.__thIntakeEnhancerObserver) return;
    var observer = new MutationObserver(function () { runEnhancements(); });
    observer.observe(root, { childList: true, subtree: true });
    window.__thIntakeEnhancerObserver = observer;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
  window.addEventListener('load', start);
})();
