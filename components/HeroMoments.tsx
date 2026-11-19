'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { gsap, EASE, prefersReducedMotion } from '@/lib/gsap';
import Split from './Split';
import type { Moment } from '@/lib/data';
import { Signature } from './motion';


const HOLD = 6.5; // seconds each moment stays
const FADE = 1.6;

/**
 * Full-bleed hero (GSAP). Each moment is one timeline: 1.6 s cross-fade, a slow drift (scale 1 → 1.06)
 * and the progress bar; the bar finishing advances to the next moment. Pause button (WCAG 2.2.2) pauses the
 * timeline; GSAP's ticker also stops in background tabs. Reduced motion: no drift, no auto-advance.
 */
export default function HeroMoments({ moments }: { moments: Moment[] }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const slides = useRef<(HTMLDivElement | null)[]>([]);
  const bars = useRef<(HTMLSpanElement | null)[]>([]);
  const tl = useRef<gsap.core.Timeline | null>(null);
  const first = useRef(true);

  useEffect(() => {
    const reduced = prefersReducedMotion();
    const all = slides.current.filter(Boolean) as HTMLDivElement[];
    const cur = slides.current[i];
    if (!cur) return;
    const img = cur.querySelector('img');

    gsap.to(all.filter(s => s !== cur), { autoAlpha: 0, duration: reduced ? 0 : FADE, ease: EASE.standard, overwrite: 'auto' });
    gsap.to(cur, { autoAlpha: 1, duration: reduced || first.current ? 0 : FADE, ease: EASE.standard, overwrite: 'auto' });
    first.current = false;
    bars.current.forEach((b, n) => b && gsap.set(b, { scaleX: n < i ? 1 : 0 }));
    if (reduced) return;

    const t = gsap.timeline({ paused });
    t.fromTo(img, { scale: 1 }, { scale: 1.06, duration: HOLD + FADE, ease: 'none' }, 0)
      .fromTo(bars.current[i], { scaleX: 0 }, { scaleX: 1, duration: HOLD, ease: 'none', onComplete: () => setI(n => (n + 1) % moments.length) }, 0);
    tl.current = t;
    return () => { t.kill(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i]);

  useEffect(() => { tl.current?.paused(paused); }, [paused]);

  const m = moments[i];
  if (!m) return null;
  return (
    <>
      <section className="moments" aria-roledescription="carousel" aria-label="Moments from Ovi’s journal">
        {moments.map((s, n) => (
          <div key={n} ref={el => { slides.current[n] = el; }} className="moment" aria-hidden={n !== i}>
            <Image src={s.src} alt={s.alt} fill priority={n === 0} sizes="100vw" style={{ objectPosition: s.pos }} />
          </div>
        ))}
        <div className="moments-shade" aria-hidden />
        <div className="wrap moments-inner">
          <div className="moments-head">
            <div className="moments-sig"><Signature size={60} color="var(--paper)" /></div>
            <Split as="h1" className="moments-title" load delay={250}>{'Slow living, travel\nand the things I love.'}</Split>
          </div>
          <div className="moments-meta">
            <Link href={m.href} className="moments-place" aria-live="polite" key={m.place}>
              <span className="label">Now showing</span><span className="caption">{m.place} →</span>
            </Link>
            <div className="moments-controls">
              <span className="label moments-count">{String(i + 1).padStart(2, '0')} / {String(moments.length).padStart(2, '0')}</span>
              <div className="moments-bars">
                {moments.map((s, n) => (
                  <button key={n} className="bar" onClick={() => setI(n)} aria-label={`Show ${s.place}`} aria-current={n === i}>
                    <span ref={el => { bars.current[n] = el; }} />
                  </button>
                ))}
              </div>
              <button className="moments-pause" onClick={() => setPaused(p => !p)} aria-label={paused ? 'Play slideshow' : 'Pause slideshow'} aria-pressed={paused}>
                {paused
                  ? <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden><path d="M3 1.5l7 4.5-7 4.5z" fill="currentColor" /></svg>
                  : <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden><path d="M3 1.5h2v9H3zM7 1.5h2v9H7z" fill="currentColor" /></svg>}
              </button>
            </div>
          </div>
        </div>
      </section>
      <section className="moments-intro">
        <div className="wrap moments-intro-row" data-reveal>
          <p className="body-l">Hi, I’m Ovi. I write slowly about places worth staying longer, and the few things I actually use.</p>
          <div className="hero-ctas">
            <Link href="/chronicles" className="btn">Read Chronicles</Link>
            <Link href="/shop" className="link link-arrow">Shop My Picks</Link>
          </div>
        </div>
      </section>
    </>
  );
}
