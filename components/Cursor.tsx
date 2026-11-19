'use client';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { gsap, prefersReducedMotion } from '@/lib/gsap';

type Mode = 'dot' | 'link' | 'label' | 'text' | 'hidden';

/**
 * A quiet custom cursor (GSAP quickTo): a sage dot that trails the pointer.
 * - data-cursor="Read" on cards → labelled circle.
 * - data-cursor-image="/x.jpg" on list rows → a floating photo that follows with a soft lag and tilts with speed.
 * - Links/buttons → ring; buttons lean towards it (magnetic, max 6 px).
 * Never on touch: it only mounts on hover-capable fine pointers, and hides itself the moment a
 * touch or pen is used (e.g. touch-screen laptops), returning when a mouse moves again.
 */
export default function Cursor() {
  const pathname = usePathname();
  const ref = useRef<HTMLDivElement>(null);
  const preview = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [state, setState] = useState<{ mode: Mode; label?: string }>({ mode: 'hidden' });

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
    const update = () => setEnabled(mq.matches && !prefersReducedMotion());
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  useEffect(() => { setState(s => (s.mode === 'hidden' ? s : { mode: 'dot' })); }, [pathname]);

  useEffect(() => {
    const root = document.documentElement;
    if (!enabled) { root.classList.remove('has-cursor'); return; }
    const el = ref.current!;
    const xTo = gsap.quickTo(el, 'x', { duration: 0.45, ease: 'power3' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.45, ease: 'power3' });
    let magnet: HTMLElement | null = null;
    let usingMouse = false;

    // floating photo preview for list rows: slower follow, tilts with horizontal speed
    const pv = preview.current!;
    const frame = pv.firstElementChild as HTMLElement;
    gsap.set(pv, { xPercent: -50, yPercent: -50 }); // photo is centred on the pointer
    const pxTo = gsap.quickTo(pv, 'x', { duration: 0.9, ease: 'power3' });
    const pyTo = gsap.quickTo(pv, 'y', { duration: 0.9, ease: 'power3' });
    const rotTo = gsap.quickTo(pv, 'rotation', { duration: 0.8, ease: 'power3' });
    let lastX = 0, settle: number | undefined, current: string | null = null, shown = false;
    const showPreview = (src: string) => {
      if (src === current) return;
      current = src;
      const img = document.createElement('img');
      img.src = src; img.alt = '';
      frame.appendChild(img);
      gsap.fromTo(img, { autoAlpha: 0, scale: 1.12 }, { autoAlpha: 1, scale: 1, duration: 0.8, ease: 'power3.out',
        onComplete: () => { while (frame.children.length > 1) frame.firstElementChild!.remove(); } });
      if (!shown) {
        shown = true;
        gsap.killTweensOf(pv, 'clipPath');
        gsap.set(pv, { visibility: 'visible' });
        gsap.fromTo(pv, { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.7, ease: 'power4.out' });
      }
    };
    const hidePreview = () => {
      if (!shown) return;
      shown = false; current = null;
      gsap.to(pv, { clipPath: 'inset(0% 0% 100% 0%)', duration: 0.45, ease: 'power3.in', onComplete: () => { if (!shown) { gsap.set(pv, { visibility: 'hidden' }); frame.replaceChildren(); } } });
    };

    const release = () => {
      if (!magnet) return;
      gsap.to(magnet, { '--mx': '0px', '--my': '0px', duration: 0.6, ease: 'power3.out' });
      magnet = null;
    };
    const touchMode = () => { usingMouse = false; root.classList.remove('has-cursor'); setState({ mode: 'hidden' }); release(); hidePreview(); };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') { touchMode(); return; }
      if (!usingMouse) { usingMouse = true; root.classList.add('has-cursor'); gsap.set(el, { x: e.clientX, y: e.clientY }); gsap.set(pv, { x: e.clientX, y: e.clientY }); lastX = e.clientX; setState(s => (s.mode === 'hidden' ? { mode: 'dot' } : s)); }
      xTo(e.clientX); yTo(e.clientY);
      pxTo(e.clientX); pyTo(e.clientY);
      rotTo(Math.max(-7, Math.min(7, (e.clientX - lastX) * 0.35)));
      lastX = e.clientX;
      window.clearTimeout(settle); settle = window.setTimeout(() => rotTo(0), 90);
      if (magnet) {
        const r = magnet.getBoundingClientRect();
        const dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
        const dy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
        gsap.to(magnet, { '--mx': `${dx * 6}px`, '--my': `${dy * 4}px`, duration: 0.4, ease: 'power3.out' });
      }
    };
    const onOver = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      const t = e.target as HTMLElement;
      const img = t.closest<HTMLElement>('[data-cursor-image]');
      const lab = t.closest<HTMLElement>('[data-cursor]');
      const btn = t.closest<HTMLElement>('.btn');
      const field = t.closest('input, textarea, select');
      const link = t.closest('a, button, summary, label');
      if (magnet && magnet !== btn) release();
      if (img && img.dataset.cursorImage) showPreview(img.dataset.cursorImage); else hidePreview();
      if (btn) magnet = btn;
      if (field) setState({ mode: 'text' });
      else if (btn) setState({ mode: 'link' });
      else if (img) setState({ mode: 'dot' });
      else if (lab) setState({ mode: 'label', label: lab.dataset.cursor });
      else if (link) setState({ mode: 'link' });
      else setState({ mode: 'dot' });
    };
    const onDown = (e: PointerEvent) => { if (e.pointerType !== 'mouse') touchMode(); else gsap.to(el.firstElementChild, { scale: 0.85, duration: 0.15 }); };
    const onUp = () => gsap.to(el.firstElementChild, { scale: 1, duration: 0.3, ease: 'power3.out' });
    const onLeave = () => { setState({ mode: 'hidden' }); release(); hidePreview(); };

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerover', onOver);
    window.addEventListener('pointerdown', onDown);
    window.addEventListener('pointerup', onUp);
    window.addEventListener('touchstart', touchMode, { passive: true });
    root.addEventListener('pointerleave', onLeave);
    return () => {
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerover', onOver);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('touchstart', touchMode);
      root.removeEventListener('pointerleave', onLeave);
      root.classList.remove('has-cursor');
      release();
      window.clearTimeout(settle);
    };
  }, [enabled]);

  if (!enabled) return null;
  return (
    <>
      <div ref={preview} className="hover-preview" aria-hidden><div className="frame" /></div>
      <div ref={ref} className={`cursor cursor--${state.mode}`} aria-hidden>
        <div className="cursor-shape">
          <span className="cursor-label">{state.label}</span>
        </div>
      </div>
    </>
  );
}
