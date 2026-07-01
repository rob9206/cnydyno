/* Shared helpers for the Thunderhorse web UI kit. Exports to window. */
const DS = window.ThunderhorseTuningDesignSystem_fe7e73;

// Lucide icon helper
function Ico({ n, s = 18, color, style }) {
  const ref = React.useRef();
  React.useEffect(() => {
    if (ref.current && window.lucide && window.lucide[n]) {
      ref.current.innerHTML = '';
      const el = window.lucide.createElement(window.lucide[n]);
      el.setAttribute('width', s); el.setAttribute('height', s);
      el.setAttribute('stroke-width', '2');
      ref.current.appendChild(el);
    }
  }, [n, s]);
  return <span ref={ref} style={{ display: 'inline-flex', color: color || 'currentColor', ...style }} />;
}

const ASSET = '/assets/logos/';
const PHOTO = '/assets/photos/';

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

Object.assign(window, { DS, Ico, ASSET, PHOTO, Section, Eyebrow, HazardRule, useViewport });
