/* Shared helpers for the Thunderhorse web UI kit. Exports to window. */
const DS = window.ThunderhorseTuningDesignSystem_fe7e73;

// Inline icon helper so SVG renders in pre-rendered HTML (no client pop-in).
function Ico({ n, s = 18, color, style }) {
  const icon = (name) => {
    switch (name) {
      case 'ArrowRight':
        return (<><path d="M5 12h14" /><path d="m13 5 7 7-7 7" /></>);
      case 'Calendar':
        return (<><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></>);
      case 'CalendarDays':
        return (<><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01" /></>);
      case 'Phone':
        return <path d="M22 16.9v3a2 2 0 0 1-2.2 2A19.8 19.8 0 0 1 11.2 19a19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.7.6 2.5a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6.1 6.1l1.6-1.2a2 2 0 0 1 2.1-.5c.8.3 1.6.5 2.5.6A2 2 0 0 1 22 16.9z" />;
      case 'Menu':
        return <path d="M4 6h16M4 12h16M4 18h16" />;
      case 'X':
        return <path d="m18 6-12 12M6 6l12 12" />;
      case 'Zap':
        return <path d="M13 2 3 14h7l-1 8 12-14h-7z" />;
      case 'Target':
        return (<><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></>);
      case 'ShieldAlert':
        return (<><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="M12 8v4M12 16h.01" /></>);
      case 'Cpu':
        return (<><rect x="7" y="7" width="10" height="10" rx="2" /><path d="M9 1v3M15 1v3M9 20v3M15 20v3M1 9h3M1 15h3M20 9h3M20 15h3" /></>);
      case 'Users':
        return (<><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8" /></>);
      case 'Check':
        return <path d="M20 6 9 17l-5-5" />;
      case 'MessageSquare':
        return <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />;
      case 'Bike':
        return (<><circle cx="5.5" cy="17.5" r="3.5" /><circle cx="18.5" cy="17.5" r="3.5" /><path d="M5.5 17.5 9 10h4l3 7.5M10 10l2 4h4M15 6h3" /></>);
      case 'Mail':
        return (<><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>);
      case 'StickyNote':
        return (<><path d="M16 3H6a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h8l7-7V6a3 3 0 0 0-3-3z" /><path d="M14 21v-6h6" /></>);
      case 'Play':
        return <path d="M8 5v14l11-7z" />;
      case 'MapPin':
        return (<><path d="M12 22s7-4.4 7-11a7 7 0 1 0-14 0c0 6.6 7 11 7 11z" /><circle cx="12" cy="11" r="2.5" /></>);
      case 'Clock':
        return (<><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>);
      case 'Truck':
        return (<><path d="M3 7h11v8H3zM14 10h4l3 3v2h-2" /><circle cx="7.5" cy="17.5" r="2.5" /><circle cx="17.5" cy="17.5" r="2.5" /></>);
      case 'Star':
        return <path d="m12 2.5 3 6.1 6.7 1-4.8 4.7 1.1 6.7L12 17.8 6 21l1.1-6.7-4.8-4.7 6.7-1z" />;
      case 'Globe':
        return (<><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" /></>);
      default:
        return <circle cx="12" cy="12" r="8" />;
    }
  };

  return (
    <svg
      width={s}
      height={s}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={{ display: 'inline-flex', color: color || 'currentColor', ...style }}
    >
      {icon(n)}
    </svg>
  );
}

const ASSET = '/assets/logos/';
const PHOTO = '/assets/photos/';
const PHOTO_META = {
  'dyno-pull.jpg': { width: 1246, height: 780 },
  'dyno-rider-plaid.jpg': { width: 1125, height: 1500 },
  'dyno-ve-map.jpg': { width: 700, height: 1500 },
  'laptop-tuning.jpg': { width: 1000, height: 1500 },
  'shop-front-609.jpg': { width: 1200, height: 1600 },
  'tuner-fence.jpg': { width: 1125, height: 1500 },
};

function photoSrcSet(name) {
  const meta = PHOTO_META[name];
  const maxWidth = meta && meta.width ? meta.width : 1200;
  const base = name.replace(/\.[^.]+$/, '');
  const widths = [480, 768, 1200].filter((w) => w <= maxWidth);
  if (!widths.length) return undefined;
  return widths.map((w) => PHOTO + 'optimized/' + base + '-' + w + '.webp ' + w + 'w').join(', ');
}

function Photo({
  name,
  alt,
  style,
  sizes = '100vw',
  loading = 'lazy',
  decoding = 'async',
  fetchPriority,
  width,
  height,
}) {
  const meta = PHOTO_META[name] || {};
  const props = {
    src: PHOTO + name,
    srcSet: photoSrcSet(name),
    sizes,
    alt,
    style,
    loading,
    decoding,
    width: width || meta.width,
    height: height || meta.height,
  };
  if (!props.srcSet) delete props.srcSet;
  if (fetchPriority) props.fetchpriority = fetchPriority;
  return <img {...props} />;
}

// Responsive hook — subscribe to window width
function useViewport() {
  const [width, setWidth] = React.useState(window.innerWidth);
  React.useEffect(() => {
    const h = () => setWidth(window.innerWidth);
    window.addEventListener('resize', h);
    return () => window.removeEventListener('resize', h);
  }, []);
  return { isMobile: width < 768, isTablet: width < 1024, width };
}

// Section wrapper with max-width container
function Section({ children, dark = false, style = {}, id }) {
  const { isMobile } = useViewport();
  return (
    <section id={id} className={dark ? 'th-dark' : ''} style={{
      background: dark ? 'var(--ink-900)' : 'var(--surface-page)',
      padding: isMobile ? '48px 20px' : '72px 32px', ...style,
    }}>
      <div style={{ maxWidth: 1180, margin: '0 auto' }}>{children}</div>
    </section>
  );
}

function Eyebrow({ children, style = {} }) {
  return <div style={{
    fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 12,
    letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--text-brand)', ...style,
  }}>{children}</div>;
}

function HazardRule({ style = {} }) {
  return <div style={{ height: 6, background: 'var(--hazard)', ...style }} />;
}

Object.assign(window, { DS, Ico, ASSET, PHOTO, PHOTO_META, Photo, Section, Eyebrow, HazardRule, useViewport });
