'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState, type CSSProperties } from 'react';
import type { Category, Collection, Post } from '@/lib/data';
import { nav } from '@/lib/site';
import Logo from './Logo';

type Menu = 'chronicles' | 'shop' | null;

const Chevron = () => (
  <svg className="chev" width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden><path d="M2 3.5l3 3 3-3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
);
const SearchIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden><circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.5" /><path d="m20 20-3.5-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
);

export default function Header({ categories, collections, latest }: { categories: Category[]; collections: Collection[]; latest?: Post }) {
  const pathname = usePathname() || '/';
  const [menu, setMenu] = useState<Menu>(null);
  const [mobile, setMobile] = useState(false);
  const [acc, setAcc] = useState<Menu>(null); // all mobile sections start closed
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isArticle, setIsArticle] = useState(false);
  const closeTimer = useRef<number>(undefined);
  const headerRef = useRef<HTMLElement>(null);

  // On Home the header floats transparently over the hero until the reader scrolls
  const overlay = pathname === '/' && !scrolled && !menu && !mobile;
  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href));

  // close menus on navigation
  useEffect(() => { setMenu(null); setMobile(false); setIsArticle(!!document.querySelector('[data-article]')); }, [pathname]);

  // header hide on scroll down / show on scroll up, reading progress
  useEffect(() => {
    let last = window.scrollY; let ticking = false;
    const onScroll = () => {
      if (ticking) return; ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        setScrolled(y > 40);
        if (Math.abs(y - last) > 6) { setHidden(y > last && y > 120); last = y; }
        const h = document.documentElement.scrollHeight - window.innerHeight;
        setProgress(h > 0 ? Math.min(1, y / h) : 0);
        ticking = false;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Esc closes everything; lock scroll when mobile menu is open
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') { setMenu(null); setMobile(false); } };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);
  useEffect(() => {
    if (!mobile) setAcc(null); // collapse sections whenever the menu closes
    if (mobile) document.body.style.overflow = 'hidden'; else document.body.style.removeProperty('overflow');
    if (mobile) window.__lenis?.stop(); else window.__lenis?.start();
  }, [mobile]);

  const open = (m: Menu) => { window.clearTimeout(closeTimer.current); setMenu(m); };
  const scheduleClose = () => { closeTimer.current = window.setTimeout(() => setMenu(null), 160); };

  return (
    <>
      <header ref={headerRef} className={`site-header${hidden && !menu && !mobile ? ' is-hidden' : ''}${scrolled ? ' is-scrolled' : ''}${overlay ? ' is-overlay' : ''}`} onMouseLeave={scheduleClose}>
        <div className="wrap header-row">
          <button className="icon-btn menu-toggle" aria-label="Open menu" aria-expanded={mobile} onClick={() => setMobile(true)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden><path d="M3 8h18M3 16h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
          </button>
          <Link href="/" className="brand" aria-label="nviasrt, home"><Logo title="nviasrt" /></Link>
          <nav className="header-desktop" aria-label="Main">
            {nav.map(item => item.menu ? (
              <Link key={item.href} href={item.href} className={`nav-item${menu === item.menu ? ' is-open' : ''}`}
                aria-current={isActive(item.href) ? 'page' : undefined} aria-expanded={menu === item.menu} aria-haspopup="true"
                onMouseEnter={() => open(item.menu!)} onFocus={() => open(item.menu!)}>
                {item.label}<Chevron />
              </Link>
            ) : (
              <Link key={item.href} href={item.href} className="nav-item" aria-current={isActive(item.href) ? 'page' : undefined} onMouseEnter={() => open(null)}>{item.label}</Link>
            ))}
          </nav>
          <div className="header-utils">
            <span className="label taupe lang">EN / ID</span>
            <Link href="/search" className="icon-btn" aria-label="Search"><SearchIcon /></Link>
          </div>
        </div>

        {/* Chronicles dropdown */}
        <div className={`dropdown${menu === 'chronicles' ? ' is-open' : ''}`} onMouseEnter={() => open('chronicles')} onMouseLeave={scheduleClose} aria-hidden={menu !== 'chronicles'}>
          <div className="wrap dropdown-inner">
            <div style={{ flex: 1 }}>
              <p className="label taupe reveal-item">Chronicles</p>
              <div className="dd-cats" style={{ marginTop: 28 }}>
                {categories.map((c, n) => (
                  <Link key={c.slug} href={`/chronicles/${c.slug}`} className="reveal-item" style={{ '--i': n + 1 } as CSSProperties} tabIndex={menu === 'chronicles' ? 0 : -1}>
                    <p className="h3">{c.name}</p><p className="body-m taupe">{c.blurb}</p>
                  </Link>
                ))}
              </div>
              <Link href="/chronicles" className="link link-arrow reveal-item" style={{ display: 'inline-block', marginTop: 28, '--i': 5 } as CSSProperties} tabIndex={menu === 'chronicles' ? 0 : -1}>All Chronicles</Link>
            </div>
            {latest && <div className="dd-latest reveal-item" style={{ '--i': 3 } as CSSProperties}>
              <p className="label taupe">Latest story</p>
              <Link href={`/chronicles/${latest.slug}`} className="dd-latest-card hover-zoom" tabIndex={menu === 'chronicles' ? 0 : -1}>
                <div className="media ratio-45" style={{ width: 160, flex: 'none' }}><Image src={latest.image} alt="" fill sizes="160px" /></div>
                <div><p className="label taupe">{latest.categoryName} · {latest.readMin} min read</p><p className="h3" style={{ marginTop: 8 }}>{latest.title}</p><p className="body-m taupe" style={{ marginTop: 8 }}>{latest.date}</p></div>
              </Link>
            </div>}
          </div>
        </div>

        {/* Shop dropdown */}
        <div className={`dropdown${menu === 'shop' ? ' is-open' : ''}`} onMouseEnter={() => open('shop')} onMouseLeave={scheduleClose} aria-hidden={menu !== 'shop'}>
          <div className="wrap dropdown-inner">
            <div className="stack reveal-item" style={{ width: 300, '--gap': '16px' } as CSSProperties}>
              <p className="label taupe">Shop My Picks</p>
              <p className="h3">Things I actually use</p>
              <p className="body-m taupe">Pieces from my home, my suitcase and my wardrobe. Every link goes to Shopee.</p>
              <Link href="/shop" className="btn" tabIndex={menu === 'shop' ? 0 : -1}>Shop all picks</Link>
            </div>
            <div className="dd-tiles">
              {collections.map((c, n) => (
                <Link key={c.slug} href={`/shop/${c.slug}`} className={`collection-tile tint-${c.tint} hover-zoom reveal-item`} style={{ padding: 16, '--i': n + 1 } as CSSProperties} tabIndex={menu === 'shop' ? 0 : -1}>
                  <div className="media ratio-45"><Image src={c.image} alt="" fill sizes="200px" /></div>
                  <p className="h4" style={{ marginTop: 12 }}>{c.name}</p>
                  <p className="label count">{c.count} picks</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
        {isArticle && <div className="progress" style={{ '--p': progress } as CSSProperties} aria-hidden />}
      </header>
      <div className={`scrim${menu ? ' is-on' : ''}`} onClick={() => setMenu(null)} aria-hidden />

      {/* Mobile menu */}
      <div className={`mmenu${mobile ? ' is-open' : ''}`} data-lenis-prevent role="dialog" aria-modal="true" aria-label="Menu" aria-hidden={!mobile}>
        <div className="wrap header-row">
          <button className="icon-btn" aria-label="Close menu" onClick={() => setMobile(false)} tabIndex={mobile ? 0 : -1}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
          </button>
          <span className="brand"><Logo title="nviasrt" /></span>
          <Link href="/search" className="icon-btn" aria-label="Search" style={{ justifySelf: 'end' }} tabIndex={mobile ? 0 : -1}><SearchIcon /></Link>
        </div>
        <nav aria-label="Mobile">
          {nav.map((item, n) => {
            const sub = item.menu === 'chronicles' ? categories.map(c => ({ href: `/chronicles/${c.slug}`, label: c.name }))
              : item.menu === 'shop' ? collections.map(c => ({ href: `/shop/${c.slug}`, label: c.name })) : null;
            return (
              <div key={item.href} className="mm-item" style={{ '--i': n } as CSSProperties}>
                {sub ? (
                  <>
                    <button className="mm-row" aria-expanded={acc === item.menu} onClick={() => setAcc(acc === item.menu ? null : item.menu!)} tabIndex={mobile ? 0 : -1}
                      aria-current={isActive(item.href) ? 'page' : undefined}>
                      {item.label}<span className="pm" aria-hidden>{acc === item.menu ? '–' : '+'}</span>
                    </button>
                    <div className={`mm-sub${acc === item.menu ? ' is-open' : ''}`}><div>
                      <Link href={item.href} tabIndex={mobile && acc === item.menu ? 0 : -1}>All {item.label}</Link>
                      {sub.map(s => <Link key={s.href} href={s.href} tabIndex={mobile && acc === item.menu ? 0 : -1}>{s.label}</Link>)}
                    </div></div>
                  </>
                ) : (
                  <Link href={item.href} className="mm-row" aria-current={isActive(item.href) ? 'page' : undefined} tabIndex={mobile ? 0 : -1}>
                    {item.label}{isActive(item.href) && <span className="dot" aria-hidden />}
                  </Link>
                )}
              </div>
            );
          })}
        </nav>
        <div className="mm-bottom label">
          <span className="taupe" style={{ display: 'flex', gap: 16 }}><a href="https://instagram.com/nviasrt" tabIndex={mobile ? 0 : -1}>Instagram</a><span>Pinterest</span><span>Threads</span></span>
          <span>EN / ID</span>
        </div>
      </div>
    </>
  );
}
