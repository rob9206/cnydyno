/* ================================================================
   SEO.jsx — Thunderhorse Tuning
   Manages <head> meta tags dynamically as the SPA route changes.
   Injects:
     · <title> + description + robots + canonical
     · Open Graph (og:*) + Twitter Card
     · LocalBusiness JSON-LD (once, all routes)
     · FAQPage JSON-LD (dynoai route only)
   ================================================================ */

const SITE_URL = 'https://thunderhorsetuning.com';
const OG_IMAGE  = SITE_URL + '/assets/photos/dyno-rider-plaid.jpg';

/* ── Per-route copy ─────────────────────────────────────────── */
const PAGE_META = {
  home: {
    title: 'Thunderhorse Tuning | Precision V-Twin Dyno Tuning — Utica, NY',
    description: 'Professional motorcycle dyno tuning in Utica, NY. V-twin specialists for Harley-Davidson, Indian & Ducati. Powered by DynoAI — 97.5% VE accuracy. Full tunes from $650.',
    path: '/',
  },
  services: {
    title: 'Dyno Tuning Services & Pricing | Thunderhorse Tuning — Utica, NY',
    description: 'Full dyno tunes from $650, diagnostic & tune correction from $300. V-twin performance builds, Stage 1 through forced induction. Group & event tuning across Central New York.',
    path: '/services/',
  },
  dynoai: {
    title: 'DynoAI — Proprietary Motorcycle ECU Calibration | Thunderhorse Tuning',
    description: 'DynoAI uses physics-based volumetric-efficiency modeling for 97.5% VE accuracy from one WOT pull. 60–70% less dyno time. Written in-house by Rob Dawson.',
    path: '/dynoai/',
  },
  book: {
    title: 'Book a Dyno Tune | Thunderhorse Tuning — Utica, NY',
    description: 'Schedule your motorcycle dyno tune online. Free 30-min consult. Full tunes from $650. Confirmed within 24 hours. V-twin specialists.',
    path: '/book/',
  },
  dyno: {
    title: 'Dyno Results Dashboard | Thunderhorse Tuning',
    description: 'Live dyno results — peak power, torque, AFR, and knock monitoring. Powered by DynoAI proprietary calibration software.',
    path: '/dyno/',
  },
};

/* ── LocalBusiness JSON-LD ──────────────────────────────────── */
const LOCAL_BUSINESS_LD = {
  '@context': 'https://schema.org',
  '@type': ['LocalBusiness', 'AutoRepair'],
  '@id': SITE_URL + '/#business',
  name: 'Thunderhorse Tuning',
  legalName: 'Dawson Motoring LLC',
  description: 'Precision V-twin motorcycle dyno tuning in Utica, NY. Harley-Davidson, Indian & Ducati specialists. Proprietary DynoAI calibration software — 97.5% VE accuracy.',
  url: SITE_URL,
  telephone: '+16076216885',
  logo: SITE_URL + '/assets/logos/thunderhorse-badge-red.png',
  image: OG_IMAGE,
  address: {
    '@type': 'PostalAddress',
    streetAddress: '609 Columbia St',
    addressLocality: 'Utica',
    addressRegion: 'NY',
    postalCode: '13501',
    addressCountry: 'US',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 43.100921,
    longitude: -75.232738,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Saturday'],
      opens: '09:00',
      closes: '15:00',
    },
  ],
  priceRange: '$$',
  currenciesAccepted: 'USD',
  areaServed: [
    'Utica, NY', 'Rome, NY', 'Syracuse, NY',
    'Cooperstown, NY', 'Oneonta, NY', 'Herkimer, NY',
  ].map(function(name) { return { '@type': 'City', name: name }; }),
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Motorcycle Dyno Tuning Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Full Dyno Tune',
          description: 'Custom ECU calibration via DynoAI — physics-based VE modeling, real-time knock/AFR monitoring, full dyno sheets included.',
          provider: { '@id': SITE_URL + '/#business' },
        },
        priceSpecification: {
          '@type': 'UnitPriceSpecification',
          priceCurrency: 'USD',
          minPrice: 650,
          maxPrice: 850,
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Diagnostic & Tune Correction',
          description: 'Identify and correct existing tune issues — AFR analysis, knock review, VE table correction.',
          provider: { '@id': SITE_URL + '/#business' },
        },
        priceSpecification: {
          '@type': 'UnitPriceSpecification',
          priceCurrency: 'USD',
          price: 300,
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Performance Build Tuning',
          description: 'Stage 1 through big bore, stroker and forced induction — quoted individually.',
          provider: { '@id': SITE_URL + '/#business' },
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Group & Event Tuning',
          description: 'Motorcycle rallies, MC club meets and shop events across Central New York. 5-bike minimum.',
          provider: { '@id': SITE_URL + '/#business' },
        },
      },
    ],
  },
  sameAs: ['https://www.thunderhorsetuning.com'],
};

/* ── DynoAI FAQ JSON-LD ─────────────────────────────────────── */
const DYNOAI_FAQ_LD = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is DynoAI?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'DynoAI is Thunderhorse Tuning\'s proprietary ECU calibration software. It uses physics-based volumetric-efficiency (VE) modeling to achieve 97.5% VE accuracy from a single WOT pull — covering ~98% of the VE table versus ~80% with traditional methods.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much does a motorcycle dyno tune cost?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Full dyno tunes at Thunderhorse Tuning start at $650 (most $650–$850). Diagnostic & tune correction starts at $300. Performance build tuning is quoted individually. Book a free 30-minute consult online.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long does a dyno tune take with DynoAI?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'DynoAI uses 60–70% less dyno time than traditional methods, allowing 2–3× more bikes per day. A full tune typically requires only 2–4 pulls to dial in.',
      },
    },
    {
      '@type': 'Question',
      name: 'What motorcycles does Thunderhorse Tuning work on?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Thunderhorse Tuning specializes in V-twins — Harley-Davidson, Indian, and Ducati — but all bikes are welcome including sport, ADV, metric cruisers, and custom builds.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does Thunderhorse Tuning offer mobile or event tuning?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. In addition to in-house dyno tuning at 609 Columbia St, Utica NY, Thunderhorse Tuning offers group and event tuning at rallies, MC club meets, and shop events across Central New York. Minimum 5 bikes.',
      },
    },
  ],
};

/* ── DOM helpers ────────────────────────────────────────────── */
function setMeta(selector, attr, value) {
  var el = document.querySelector(selector);
  if (!el) {
    el = document.createElement('meta');
    var m = selector.match(/\[([^\]="]+)="([^"]+)"\]/);
    if (m) el.setAttribute(m[1], m[2]);
    document.head.appendChild(el);
  }
  el.setAttribute(attr, value);
}

function setLink(rel, href) {
  var el = document.querySelector('link[rel="' + rel + '"]');
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

function injectLD(id, data) {
  var el = document.getElementById(id);
  if (!el) {
    el = document.createElement('script');
    el.id = id;
    el.type = 'application/ld+json';
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}

function removeLD(id) {
  var el = document.getElementById(id);
  if (el) el.remove();
}

/* ── Hooks ──────────────────────────────────────────────────── */
function useSEOMeta(route) {
  React.useEffect(function() {
    var m   = PAGE_META[route] || PAGE_META.home;
    var url = SITE_URL + m.path;

    document.title = m.title;

    // Standard
    setMeta('meta[name="description"]', 'content', m.description);
    setMeta('meta[name="robots"]',      'content', 'index, follow');
    setLink('canonical', url);

    // Open Graph
    setMeta('meta[property="og:type"]',         'content', 'website');
    setMeta('meta[property="og:site_name"]',    'content', 'Thunderhorse Tuning');
    setMeta('meta[property="og:locale"]',       'content', 'en_US');
    setMeta('meta[property="og:title"]',        'content', m.title);
    setMeta('meta[property="og:description"]',  'content', m.description);
    setMeta('meta[property="og:url"]',          'content', url);
    setMeta('meta[property="og:image"]',        'content', OG_IMAGE);
    setMeta('meta[property="og:image:width"]',  'content', '1200');
    setMeta('meta[property="og:image:height"]', 'content', '630');
    setMeta('meta[property="og:image:alt"]',    'content', 'Thunderhorse Tuning — Precision V-Twin Dyno Tuning, Utica NY');

    // Twitter Card
    setMeta('meta[name="twitter:card"]',        'content', 'summary_large_image');
    setMeta('meta[name="twitter:title"]',       'content', m.title);
    setMeta('meta[name="twitter:description"]', 'content', m.description);
    setMeta('meta[name="twitter:image"]',       'content', OG_IMAGE);
    setMeta('meta[name="twitter:image:alt"]',   'content', 'Thunderhorse Tuning — Precision V-Twin Dyno Tuning');

    // Route-specific LD
    if (route === 'dynoai') {
      injectLD('ld-faq', DYNOAI_FAQ_LD);
    } else {
      removeLD('ld-faq');
    }
  }, [route]);
}

function useStructuredData() {
  React.useEffect(function() {
    injectLD('ld-local-business', LOCAL_BUSINESS_LD);
  }, []);
}

/* ── Component (renders nothing — head-only side-effects) ───── */
function SEOMeta(props) {
  useSEOMeta(props.route);
  useStructuredData();
  return null;
}

Object.assign(window, { SEOMeta, PAGE_META, LOCAL_BUSINESS_LD, DYNOAI_FAQ_LD });
