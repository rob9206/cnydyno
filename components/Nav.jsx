/* Top navigation — forge black, badge mark, hamburger on mobile. */
function Nav({ route, go }) {
  const { isMobile, width } = useViewport();
  const [menuOpen, setMenuOpen] = React.useState(false);
  const isTabletNav = !isMobile && width < 1080;

  const links = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'dynoai', label: 'DynoAI' },
    { id: 'dyno', label: 'Dyno' },
  ];

  React.useEffect(() => {
    if (!isMobile && menuOpen) setMenuOpen(false);
  }, [isMobile, menuOpen]);

  const hrefFor = (id) => {
    const map = window.ROUTE_PATHS || {};
    if (map[id]) return map[id];
    return id === 'home' ? '/' : '/' + id + '/';
  };

  const routeClick = (e, id) => {
    if (e.defaultPrevented) return;
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    go(id);
    setMenuOpen(false);
  };

  return (
    <header className="th-dark" style={{
      position: 'sticky', top: 0, zIndex: 50,
      background: 'rgba(15,15,20,0.96)', backdropFilter: 'blur(8px)',
      borderBottom: '1px solid var(--ink-700)',
    }}>
      {/* ── main bar ── */}
      <div style={{
        maxWidth: 1180, margin: '0 auto',
        height: isMobile ? 58 : 68,
        padding: isMobile ? '0 18px' : (isTabletNav ? '0 20px' : '0 32px'),
        display: 'flex', alignItems: 'center', gap: isMobile ? 0 : (isTabletNav ? 14 : 28),
      }}>
        {/* logo */}
        <a href={hrefFor('home')} onClick={(e) => routeClick(e, 'home')} style={{
          display: 'flex', alignItems: 'center', gap: 10,
          textDecoration: 'none',
        }}>
          <img src={window.ASSET + 'thunderhorse-badge-cream.png'} alt="Thunderhorse Tuning" style={{ height: isMobile ? 34 : 42, width: 'auto' }} />
          {!isMobile && (
            <span style={{
              fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: isTabletNav ? 15 : 17, letterSpacing: '0.04em',
              textTransform: 'uppercase', color: 'var(--bone)', lineHeight: 1, textAlign: 'left',
            }}>Thunderhorse<br /><span style={{ fontSize: 11, color: 'var(--steel-400)', fontWeight: 500, letterSpacing: '0.22em' }}>Tuning</span></span>
          )}
        </a>

        {/* desktop: nav links + CTA */}
        {!isMobile && (
          <>
            <nav style={{ display: 'flex', gap: isTabletNav ? 2 : 4, marginLeft: isTabletNav ? 4 : 12 }}>
              {links.map((l) => (
                <a
                  key={l.id}
                  href={hrefFor(l.id)}
                  onClick={(e) => routeClick(e, l.id)}
                  style={{
                    padding: isTabletNav ? '8px 10px' : '8px 14px',
                    textDecoration: 'none',
                    fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 13,
                    letterSpacing: '0.06em', textTransform: 'uppercase',
                    color: route === l.id ? 'var(--bone)' : 'var(--steel-400)',
                    borderBottom: `2px solid ${route === l.id ? 'var(--red-500)' : 'transparent'}`,
                  }}
                >
                  {l.label}
                </a>
              ))}
            </nav>
            <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: isTabletNav ? 10 : 16 }}>
              {!isTabletNav && (
                <span style={{ display: 'flex', alignItems: 'center', gap: 7, color: 'var(--steel-300)', fontFamily: 'var(--font-mono)', fontSize: 12.5, whiteSpace: 'nowrap' }}>
                  <Ico n="Phone" s={14} color="var(--red-400)" /> (607) 703-8311
                </span>
              )}
              <window.DS.Button variant="primary" size={isTabletNav ? 'sm' : 'md'} onClick={() => go('book')} iconLeft={<Ico n="Calendar" s={16} />}>Book Your Tune</window.DS.Button>
            </div>
          </>
        )}

        {/* mobile: book + hamburger */}
        {isMobile && (
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 10 }}>
            <window.DS.Button variant="primary" size="sm" onClick={() => go('book')}>Book</window.DS.Button>
            <button
              onClick={() => setMenuOpen(o => !o)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                width: 40, height: 40, border: '1px solid var(--ink-600)',
                background: 'transparent', borderRadius: 'var(--radius-md)',
                cursor: 'pointer', color: 'var(--bone)', flexShrink: 0,
              }}
            >
              <Ico n={menuOpen ? 'X' : 'Menu'} s={20} />
            </button>
          </div>
        )}
      </div>

      {/* Brand motif — keep hazard stripe in one consistent place */}
      <div style={{ height: 4, background: 'var(--hazard)' }} />

      {/* ── mobile dropdown ── */}
      {isMobile && menuOpen && (
        <nav style={{ background: 'var(--ink-900)', borderTop: '1px solid var(--ink-700)', display: 'flex', flexDirection: 'column' }}>
          {links.map((l) => (
            <a
              key={l.id}
              href={hrefFor(l.id)}
              onClick={(e) => routeClick(e, l.id)}
              style={{
                padding: '16px 22px', borderBottom: '1px solid var(--ink-800)',
                background: route === l.id ? 'var(--ink-800)' : 'transparent',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                textDecoration: 'none',
                fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 16,
                letterSpacing: '0.06em', textTransform: 'uppercase',
                color: route === l.id ? 'var(--bone)' : 'var(--steel-400)',
              }}
            >
              {l.label}
              {route === l.id && <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--red-500)' }} />}
            </a>
          ))}
          <div style={{ padding: '14px 20px' }}>
            <window.DS.Button block variant="primary" size="md" onClick={() => go('book')} iconLeft={<Ico n="Calendar" s={16} />}>Book Your Tune</window.DS.Button>
          </div>
          <div style={{ padding: '10px 22px 16px', display: 'flex', alignItems: 'center', gap: 8, borderTop: '1px solid var(--ink-800)' }}>
            <Ico n="Phone" s={14} color="var(--red-400)" />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--steel-300)' }}>(607) 703-8311</span>
          </div>
        </nav>
      )}
    </header>
  );
}
Object.assign(window, { Nav });
