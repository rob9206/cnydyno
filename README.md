# Thunderhorse Tuning Website

V-twin specialists. All bikes welcome. Professional motorcycle dyno tuning
website for Thunderhorse Tuning (Dawson Motoring LLC) in Utica, NY. Powered by
DynoAI.

## About

Official website for Thunderhorse Tuning — a motorcycle performance tuning
shop offering in-house dyno tuning, mobile/event tuning across Central New
York, custom ECU calibration, and performance builds. Specialty is V-twins
(Harley-Davidson, Indian, Ducati); all bikes welcome.

## Architecture

This is a **pre-rendered static site** built from the Thunderhorse Tuning
Design System. Each route has its own `index.html` with fully rendered markup
and per-route `<title>`, meta tags, Open Graph, Twitter Card, and JSON-LD
structured data baked in at build time — so crawlers get complete content
without executing JavaScript. The same React components hydrate client-side
for interactivity (DynoAI VE calculator, booking form, dyno dashboard, SPA
navigation).

### Routes

| Path | Source | Notes |
|---|---|---|
| `/` | `index.html` | Home (pre-rendered) |
| `/services/` | `services/index.html` | Services & pricing (pre-rendered) |
| `/dynoai/` | `dynoai/index.html` | DynoAI explainer + FAQ JSON-LD (pre-rendered) |
| `/book/` | `book/index.html` | Booking flow (pre-rendered) |
| `/dyno/` | `dyno/index.html` | Dyno results dashboard (pre-rendered, `robots.txt` disallows) |
| `/worth-the-drive/` | `worth-the-drive/index.html` | Legacy SEO landing page (static HTML) |

### Runtime files

- `styles.css` + `tokens/*.css` — design-system tokens (Voltage Red, Forge
  Black, Oswald/Barlow/JetBrains Mono, spacing, effects).
- `_ds_bundle.js` — compiled design-system React components (Button, Card,
  Input, Switch, Badge, StatReadout, Tabs, …), exposed on
  `window.ThunderhorseTuningDesignSystem_fe7e73`.
- `components/*.jsx` — page components (Nav, Home, Services, DynoAI, Booking,
  DynoResults, SEO, shared helpers, App). Loaded by Babel standalone at
  runtime for hydration.
- `assets/logos/` — badge marks (red / cream / black / white).
- `assets/photos/` — real shop photography.

## Rebuilding the static HTML

The pre-render tooling lives in `_build/` (gitignored — local only). To
regenerate the route HTML after editing components:

```bash
cd _build
npm install
node prerender.js
```

This re-renders `index.html`, `services/index.html`, `dynoai/index.html`,
`book/index.html`, and `dyno/index.html` from the current component source.
Commit the regenerated HTML.

`node verify-deploy.js` runs a self-contained check that every route file,
asset, and referenced path is present and consistent.

## Deployment

Deployed on **Netlify** from this repo's `main` branch. `netlify.toml` sets
`publish = "."` with no server-side build step (HTML is pre-rendered locally
and committed). Clean-URL redirects (`/services` → `/services/`, etc.),
security headers (HSTS, X-Frame-Options, nosniff), and long-cache headers for
assets are configured there.

Other static hosts (Vercel, GitHub Pages, S3+CloudFront) work too — point
them at the repo root.

## Contact

**Thunderhorse Tuning** — Dawson Motoring LLC
609 Columbia St, Utica, NY 13501
Phone: (607) 621-6885
Website: https://thunderhorsetuning.com

## License

© 2026 Thunderhorse Tuning · Dawson Motoring LLC · Powered by DynoAI
