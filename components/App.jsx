/* App.jsx — Thunderhorse Tuning
   Loaded by the build step into app.js for client hydration, and imported by
   the pre-renderer for static HTML generation. Route is derived from
   the URL on the client (so each pre-rendered page hydrates with the right
   view) and from an explicit prop on the server. */
function Footer({ go }) {
  const { isMobile } = useViewport();
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
  };
  const socialLinks = [
    { label: 'Instagram', href: 'https://www.instagram.com/thunderhorsetuning/' },
    { label: 'Facebook', href: 'https://www.facebook.com/thunderhorsetuning' },
    { label: 'Google Business', href: 'https://maps.google.com/?q=Thunderhorse+Tuning+Utica+NY' },
  ];
  return (
    <footer className="th-dark" style={{ background: 'var(--black)', borderTop: '1px solid var(--ink-700)' }}>
      {/* FIND US strip */}
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', minHeight: isMobile ? 'auto' : 260 }}>
        {/* left — contact block */}
        <div style={{ padding: '40px 44px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 24, borderRight: '1px solid var(--ink-700)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <img src={window.ASSET + 'thunderhorse-badge-cream.png'} alt="Thunderhorse Tuning" style={{ height: 52 }} />
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 17, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--bone)' }}>Thunderhorse Tuning</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11.5, color: 'var(--steel-500)', marginTop: 2 }}>Dawson Motoring LLC · DynoAI</div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 18 }}>
            {[
              { icon: 'MapPin', lines: ['609 Columbia St', 'Utica, NY 13501'] },
              { icon: 'Phone', lines: ['(607) 703-8311', 'Call or text'] },
              { icon: 'Clock', lines: ['Tue – Fri  9am – 6pm', 'Sat  9am – 3pm'] },
              { icon: 'Truck', lines: ['Group / event service', '5+ bikes · CNY'] },
            ].map(({ icon, lines }) => (
              <div key={icon} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <span style={{ flexShrink: 0, marginTop: 1, color: 'var(--red-400)' }}><Ico n={icon} s={15} /></span>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, lineHeight: 1.6, color: 'var(--steel-300)' }}>
                  {lines.map(l => <div key={l}>{l}</div>)}
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <window.DS.Button variant="primary" size="sm" onClick={() => go('book')} iconLeft={<Ico n="Calendar" s={14} />}>Book Your Tune</window.DS.Button>
            <window.DS.Button variant="secondary" size="sm" iconLeft={<Ico n="Phone" s={14} />} onClick={() => window.open('tel:6077038311')}>Call Now</window.DS.Button>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {socialLinks.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 6, textDecoration: 'none', fontFamily: 'var(--font-mono)', fontSize: 11.5, color: 'var(--steel-400)' }}
              >
                <Ico n="Globe" s={12} />
                {s.label}
              </a>
            ))}
          </div>
        </div>

        {/* right — storefront photo */}
        <div style={{ position: 'relative', overflow: 'hidden' }}>
          <Photo
            name="shop-front-609.jpg"
            alt="Thunderhorse Tuning — 609 Columbia St, Utica NY"
            sizes={isMobile ? '100vw' : '(max-width: 1180px) 50vw, 590px'}
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 62%', display: 'block', filter: 'brightness(0.65)' }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(8,8,12,0.7) 0%, transparent 55%)' }} />
          <div style={{ position: 'absolute', bottom: 18, right: 18, fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.05em', color: 'var(--steel-400)' }}>609 COLUMBIA ST · UTICA, NY 13501</div>
        </div>
      </div>

      {/* bottom bar */}
      <div style={{ borderTop: '1px solid var(--ink-700)', padding: '16px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 14 }}>
        <div style={{ display: 'flex', gap: 22 }}>
          {[['Home','home'],['Services','services'],['DynoAI','dynoai'],['Dyno','dyno'],['Book','book']].map(([l,r]) => (
            <a
              key={r}
              className="lnk"
              href={hrefFor(r)}
              onClick={(e) => routeClick(e, r)}
              style={{ textDecoration: 'none', fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 12, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--steel-500)' }}
            >
              {l}
            </a>
          ))}
        </div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11.5, color: 'var(--steel-600)' }}>© 2026 Dawson Motoring LLC · Thunderhorse Tuning</div>
      </div>
    </footer>
  );
}

const ROUTE_PATHS = {
  home: '/',
  services: '/services/',
  dynoai: '/dynoai/',
  book: '/book/',
  dyno: '/dyno/',
  status: '/status/',
  statusadmin: '/status/admin/',
};

function pathToRoute(path) {
  const clean = path.replace(/^\/+|\/+$/g, '');
  if (!clean) return 'home';
  if (clean === 'services') return 'services';
  if (clean === 'dynoai') return 'dynoai';
  if (clean === 'book') return 'book';
  if (clean === 'dyno') return 'dyno';
  if (clean === 'status') return 'status';
  if (clean === 'status/admin') return 'statusadmin';
  return 'home';
}

function App({ route: routeProp }) {
  const initial = routeProp || (typeof window !== 'undefined' && window.location ? pathToRoute(window.location.pathname) : 'home');
  const [route, setRoute] = React.useState(initial);

  const go = (r) => {
    setRoute(r);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0 });
      const path = ROUTE_PATHS[r] || '/';
      if (window.location.pathname !== path && window.history && window.history.pushState) {
        window.history.pushState({ route: r }, '', path);
      }
    }
  };

  React.useEffect(() => {
    if (typeof window === 'undefined' || !window.addEventListener) return;
    const onPop = () => setRoute(pathToRoute(window.location.pathname));
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  /* The status portal is a standalone customer page — no site nav/footer. */
  if (route === 'status' || route === 'statusadmin') {
    return (
      <div>
        <SEOMeta route={route} />
        {route === 'status' ? <Status go={go} /> : <StatusAdmin />}
      </div>
    );
  }

  return (
    <div>
      <SEOMeta route={route} />
      <Nav route={route} go={go} />
      {route === 'home' && <Home go={go} />}
      {route === 'services' && <Services go={go} />}
      {route === 'dynoai' && <DynoAI go={go} />}
      {route === 'book' && <Booking go={go} />}
      {route === 'dyno' && <DynoResults go={go} />}
      <Footer go={go} />
    </div>
  );
}

Object.assign(window, { App, Footer, ROUTE_PATHS, pathToRoute });
