/* Top navigation — forge black, badge mark, hamburger on mobile. */
function Nav({ route, go }) {
  const { isMobile } = useViewport();
  const [menuOpen, setMenuOpen] = React.useState(false);

  const links = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'dynoai', label: 'DynoAI' },
    { id: 'dyno', label: 'Dyno' },
  ];

  const navigate = (id) => { go(id); setMenuOpen(false); };

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
        padding: isMobile ? '0 18px' : '0 32px',
        display: 'flex', alignItems: 'center', gap: isMobile ? 0 : 28,
      }}>
        {/* logo */}
        <button onClick={() => navigate('home')} style={{
          display: 'flex', alignItems: 'center', gap: 10,
          border: 'none', background: 'none', cursor: 'pointer', padding: 0,
        }}>
          <img src={window.ASSET + 'thunderhorse-badge-cream.png'} alt="Thunderhorse Tuning" style={{ height: isMobile ? 34 : 42, width: 'auto' }} />
          {!isMobile && (
            <span style={{
              fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 17, letterSpacing: '0.04em',
              textTransform: 'uppercase', color: 'var(--bone)', lineHeight: 1, textAlign: 'left',
            }}>Thunderhorse<br /><span style={{ fontSize: 11, color: 'var(--steel-400)', fontWeight: 500, letterSpacing: '0.22em' }}>Tuning</span></span>
          )}
        </button>

        {/* desktop: nav links + CTA */}
        {!isMobile && (
          <>
            <nav style={{ display: 'flex', gap: 4, marginLeft: 12 }}>
              {links.map((l) => (
                <button key={l.id} onClick={() => navigate(l.id)} style={{
                  padding: '8px 14px', border: 'none', background: 'none', cursor: 'pointer',
                  fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 13,
                  letterSpacing: '0.06em', textTransform: 'uppercase',
                  color: route === l.id ? 'var(--bone)' : 'var(--steel-400)',
                  borderBottom: `2px solid ${route === l.id ? 'var(--red-500)' : 'transparent'}`,
                }}>{l.label}</button>
              ))}
            </nav>
            <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 16 }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 7, color: 'var(--steel-300)', fontFamily: 'var(--font-mono)', fontSize: 12.5 }}>
                <Ico n="Phone" s={14} color="var(--red-400)" /> (607) 621-6885
              </span>
              <window.DS.Button variant="primary" size="md" onClick={() => navigate('book')} iconLeft={<Ico n="Calendar" s={16} />}>Book Your Tune</window.DS.Button>
            </div>
          </>
        )}

        {/* mobile: book + hamburger */}
        {isMobile && (
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 10 }}>
            <window.DS.Button variant="primary" size="sm" onClick={() => navigate('book')}>Book</window.DS.Button>
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

      {/* ── mobile dropdown ── */}
      {isMobile && menuOpen && (
        <nav style={{ background: 'var(--ink-900)', borderTop: '1px solid var(--ink-700)', display: 'flex', flexDirection: 'column' }}>
          {links.map((l) => (
            <button key={l.id} onClick={() => navigate(l.id)} style={{
              padding: '16px 22px', border: 'none', borderBottom: '1px solid var(--ink-800)',
              background: route === l.id ? 'var(--ink-800)' : 'transparent',
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 16,
              letterSpacing: '0.06em', textTransform: 'uppercase',
              color: route === l.id ? 'var(--bone)' : 'var(--steel-400)',
            }}>
              {l.label}
              {route === l.id && <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--red-500)' }} />}
            </button>
          ))}
          <div style={{ padding: '14px 20px' }}>
            <window.DS.Button block variant="primary" size="md" onClick={() => navigate('book')} iconLeft={<Ico n="Calendar" s={16} />}>Book Your Tune</window.DS.Button>
          </div>
          <div style={{ padding: '10px 22px 16px', display: 'flex', alignItems: 'center', gap: 8, borderTop: '1px solid var(--ink-800)' }}>
            <Ico n="Phone" s={14} color="var(--red-400)" />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--steel-300)' }}>(607) 621-6885</span>
          </div>
        </nav>
      )}
    </header>
  );
}
Object.assign(window, { Nav });
