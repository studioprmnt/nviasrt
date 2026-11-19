'use client';
import Lenis from 'lenis';
import { usePathname } from 'next/navigation';
import { useEffect, useLayoutEffect, useRef, type ReactNode } from 'react';
import { gsap, ScrollTrigger, EASE, prefersReducedMotion } from '@/lib/gsap';
import Logo from './Logo';

declare global { interface Window { __lenis?: Lenis } }
const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

/** Lenis smooth scrolling, driven by GSAP's ticker so ScrollTrigger stays in sync.
 *  Wheel and trackpad only (touch keeps native momentum). Off with reduced motion. */
export function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const lenis = new Lenis({ duration: 1.15, easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true });
    window.__lenis = lenis;
    lenis.on('scroll', ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // in-page anchors (contents list, skip link) glide instead of jumping
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
      if (!a || a.getAttribute('href') === '#') return;
      const target = document.querySelector(a.getAttribute('href')!);
      if (!target) return;
      e.preventDefault();
      const header = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-h')) || 64;
      lenis.scrollTo(target as HTMLElement, { offset: -(header + 24) });
      history.replaceState(null, '', a.getAttribute('href'));
    };
    document.addEventListener('click', onClick);

    return () => { document.removeEventListener('click', onClick); gsap.ticker.remove(tick); lenis.destroy(); delete window.__lenis; };
  }, []);

  // new page: start at the top and re-measure every trigger
  useEffect(() => {
    window.__lenis?.scrollTo(0, { immediate: true, force: true });
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, [pathname]);
  return null;
}

/** Scroll reveals with GSAP + ScrollTrigger.
 *  - [data-reveal]: fades up 16 px; any .media inside uncovers from the bottom while the photo eases out of a 1.12 zoom.
 *  - .split headings: words rise from under a mask, 45 ms apart (.split--load ones run straight away).
 *  Initial hidden states live in CSS under html.js, so content is visible if scripts never run. */
export function MotionInit() {
  const pathname = usePathname();
  useEffect(() => {
    const done = (el: Element) => el.setAttribute('data-revealed', '');
    const pending = (sel: string) => gsap.utils.toArray<HTMLElement>(sel).filter(el => !el.hasAttribute('data-revealed'));

    if (prefersReducedMotion()) { document.querySelectorAll('[data-reveal], .split').forEach(done); return; }

    const triggers: ScrollTrigger[] = [];
    const words = (el: HTMLElement, delay = 0) =>
      gsap.to(el.querySelectorAll('.w > span'), { y: 0, yPercent: 0, duration: 1.1, ease: EASE.settle, stagger: 0.045, delay, onComplete() { done(el); gsap.set(el.querySelectorAll('.w > span'), { clearProps: 'transform' }); } });

    const reveal = (els: HTMLElement[]) => {
      els.forEach((el, n) => {
        const media = el.querySelectorAll<HTMLElement>('.media');
        const imgs = el.querySelectorAll<HTMLElement>('.media img');
        const tl = gsap.timeline({ delay: n * 0.06, onComplete() { done(el); gsap.set([el, ...media, ...imgs], { clearProps: 'opacity,transform,clipPath' }); } });
        tl.to(el, { opacity: 1, y: 0, duration: 0.9, ease: EASE.settle }, 0);
        if (media.length) tl.to(media, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.3, ease: EASE.settle }, 0.08)
          .to(imgs, { scale: 1, duration: 1.6, ease: 'power3.out' }, 0.08);
      });
    };

    const run = () => {
      pending('.split--load').forEach(el => words(el, (parseFloat(el.style.getPropertyValue('--d')) || 0) / 1000));
      pending('.split[data-reveal]').forEach(el => {
        triggers.push(ScrollTrigger.create({ trigger: el, start: 'top 94%', once: true, onEnter: () => words(el) }));
      });
      const blocks = pending('[data-reveal]:not(.split)').filter(el => !el.dataset.watched);
      blocks.forEach(el => { el.dataset.watched = '1'; });
      if (blocks.length) triggers.push(...ScrollTrigger.batch(blocks, { start: 'top 94%', once: true, onEnter: batch => reveal(batch as HTMLElement[]) }));
      // anything already on screen reveals now, even if the page never scrolls
      ScrollTrigger.refresh();
    };

    const raf = requestAnimationFrame(run);
    document.fonts?.ready.then(() => ScrollTrigger.refresh());
    window.addEventListener('load', () => ScrollTrigger.refresh(), { once: true });
    // content that appears later (category switch, form states) gets picked up too
    let t: number | undefined;
    const mo = new MutationObserver(() => { window.clearTimeout(t); t = window.setTimeout(run, 60); });
    mo.observe(document.getElementById('main') ?? document.body, { childList: true, subtree: true });
    return () => { cancelAnimationFrame(raf); mo.disconnect(); window.clearTimeout(t); triggers.forEach(tr => tr.kill()); };
  }, [pathname]);
  return null;
}

let firstPaint = true;
/** Each page settles in softly on client-side navigation (not on the very first load). */
export function PageIn({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useIsoLayoutEffect(() => {
    if (firstPaint) { firstPaint = false; return; }
    if (prefersReducedMotion() || !ref.current) return;
    gsap.fromTo(ref.current, { autoAlpha: 0, y: 8 }, { autoAlpha: 1, y: 0, duration: 0.6, ease: EASE.settle, clearProps: 'all' });
  }, []);
  return <div ref={ref}>{children}</div>;
}

/** The nviasrt logo as a signature that writes itself left to right.
 *  draw: once per session on mount. onView: every time it scrolls into view (footer). */
export function Signature({ size = 140, color = 'var(--ink)', draw = true, onView = false, className = '' }: {
  size?: number; color?: string; draw?: boolean; onView?: boolean; align?: 'middle' | 'start'; className?: string;
}) {
  const ref = useRef<SVGSVGElement>(null);
  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const write = () => gsap.fromTo(el, { clipPath: 'inset(-20% 100% -20% 0%)' }, { clipPath: 'inset(-20% 0% -20% 0%)', duration: 1.7, ease: EASE.standard, clearProps: 'clipPath' });
    if (onView) {
      gsap.set(el, { clipPath: 'inset(-20% 100% -20% 0%)' });
      const st = ScrollTrigger.create({ trigger: el, start: 'top 95%', once: true, onEnter: write });
      return () => st.kill();
    }
    if (!draw) return;
    try { if (sessionStorage.getItem('sig-drawn')) return; sessionStorage.setItem('sig-drawn', '1'); } catch { /* storage blocked */ }
    write();
  }, [draw, onView]);
  return <Logo ref={ref} className={`signature ${className}`} style={{ color, width: size * 3.2, maxWidth: '100%', height: 'auto' }} />;
}
