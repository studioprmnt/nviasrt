'use client';
import Image from 'next/image';
import { useEffect, useRef, useState, type CSSProperties, type FormEvent } from 'react';
import type { Product } from '@/lib/data';
import { sendMessage, subscribe } from '@/lib/actions';

export { MotionInit, Signature } from './motion';

/** Contents list: highlights the section being read. */
export function Toc({ items }: { items: { id: string; heading: string }[] }) {
  const [active, setActive] = useState(items[0]?.id);
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const line = window.innerHeight * 0.3;
        let current = items[0]?.id;
        for (const it of items) { const el = document.getElementById(it.id); if (el && el.getBoundingClientRect().top <= line) current = it.id; }
        setActive(current);
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(raf); };
  }, [items]);
  return (
    <>
      <nav className="toc" aria-label="Contents">
        <p className="label taupe">Contents</p>
        <ol>{items.map(it => <li key={it.id}><a href={`#${it.id}`} className={active === it.id ? 'is-active' : ''}>{it.heading}</a></li>)}</ol>
      </nav>
    </>
  );
}

/** Floating pill that appears once the reader passes the first product; opens a bottom sheet. */
export function ShopThisPost({ items }: { items: Product[] }) {
  const [on, setOn] = useState(false);
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const first = document.querySelector('.product-row, .top-pick');
    if (!first) return;
    const onScroll = () => {
      const r = first.getBoundingClientRect();
      const nearEnd = window.innerHeight + window.scrollY > document.documentElement.scrollHeight - 600;
      setOn(r.top < window.innerHeight * 0.6 && !nearEnd);
    };
    window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <>
      <button className={`stp-pill${on ? ' is-on' : ''}`} onClick={() => ref.current?.showModal()} aria-haspopup="dialog" tabIndex={on ? 0 : -1}>
        Shop this post <span>{items.length} picks</span>
      </button>
      <dialog ref={ref} className="sheet" data-lenis-prevent aria-label="Shop this post" onClick={e => { if (e.target === ref.current) ref.current?.close(); }}>
        <div className="sheet-head">
          <p className="h3">Shop this post</p>
          <button className="icon-btn" aria-label="Close" onClick={() => ref.current?.close()}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
          </button>
        </div>
        <div className="scroll-x" style={{ gap: 24 }}>
          {items.map(p => (
            <a key={p.slug} href={`/go/${p.slug}`} target="_blank" rel="sponsored nofollow noopener" className="hover-zoom" style={{ width: 200 }}>
              <div className="media ratio-45" style={{ background: 'var(--cream)' }}><Image src={p.image} alt={p.name} fill sizes="200px" /></div>
              <p className="h4" style={{ marginTop: 12 }}>{p.name}</p>
              <p className="label taupe" style={{ marginTop: 6 }}>{p.store} →</p>
            </a>
          ))}
        </div>
      </dialog>
    </>
  );
}

/** Newsletter: quiet 3-dot pulse, then a thank-you. (Wire to MailerLite/Kit in the real build.) */
export function Newsletter() {
  const [state, setState] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');
  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); setState('sending');
    const res = await subscribe(new FormData(e.currentTarget)).catch(() => ({ ok: false }));
    setState(res.ok ? 'done' : 'error');
  };
  return (
    <section className="newsletter section--m">
      <div className="wrap inner" data-reveal>
        <h2 className="h2">Letters from a slower life</h2>
        <p className="body-l taupe" style={{ marginTop: 12 }}>One quiet email a month. New Chronicles and a few good finds.</p>
        {state === 'done' ? (
          <p className="h3 thanks" style={{ marginTop: 28 }} role="status">Thank you. See you next month.</p>
        ) : (
          <form onSubmit={submit}>
            <label className="visually-hidden" htmlFor="nl-email">Email</label>
            <input id="nl-email" name="email" type="email" required placeholder="Your email" />
            <input name="website" tabIndex={-1} autoComplete="off" className="visually-hidden" aria-hidden />
            <button className="btn" disabled={state === 'sending'}>{state === 'sending' ? <span className="dots" aria-label="Sending"><span /><span /><span /></span> : 'Subscribe'}</button>
          </form>
        )}
        {state === 'error' && <p className="body-m" role="alert" style={{ marginTop: 12 }}>That did not go through. Check the email and try again.</p>}
      </div>
    </section>
  );
}

/** Contact / project form with a fake send (no backend in the prototype). */
export function ContactForm({ project = false }: { project?: boolean }) {
  const [state, setState] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');
  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); setState('sending');
    const res = await sendMessage(new FormData(e.currentTarget)).catch(() => ({ ok: false }));
    setState(res.ok ? 'done' : 'error');
  };
  if (state === 'done') return <div className="thanks" role="status"><p className="h3">Thank you, message received.</p><p className="body-l taupe" style={{ marginTop: 12 }}>I will reply within two working days.</p></div>;
  return (
    <form className="form" onSubmit={submit}>
      <input type="hidden" name="source" value={project ? 'work-with-me' : 'contact'} />
      <input name="website" tabIndex={-1} autoComplete="off" className="visually-hidden" aria-hidden />
      <div className="form-2">
        <div className="field"><label className="label" htmlFor="f-name">Your name</label><input id="f-name" name="name" required placeholder="Ovi" /></div>
        <div className="field"><label className="label" htmlFor="f-email">Email</label><input id="f-email" name="email" type="email" required placeholder="you@example.com" /></div>
      </div>
      {project ? (
        <div className="field"><label className="label" htmlFor="f-topic">What is it about?</label>
          <select id="f-topic" name="topic"><option>SEO & GEO consulting</option><option>Brand content</option><option>Something else</option></select></div>
      ) : (
        <div className="field"><label className="label" htmlFor="f-subject">Subject</label><input id="f-subject" name="topic" placeholder="A question about Sidemen" /></div>
      )}
      <div className="field"><label className="label" htmlFor="f-msg">Message</label><textarea id="f-msg" name="message" required placeholder={project ? 'Tell me a little about your project' : 'Write your message'} /></div>
      {!project && <label className="check"><input type="checkbox" required /> I agree to the Privacy Policy</label>}
      <div><button className="btn" disabled={state === 'sending'}>{state === 'sending' ? <span className="dots" aria-label="Sending"><span /><span /><span /></span> : 'Send message'}</button></div>
      {state === 'error' && <p className="body-m" role="alert">That did not go through. Check your details and try again.</p>}
      <p className="body-m taupe">Protected from spam. Your details are only used to reply.</p>
    </form>
  );
}

/** Category tint band that cross-fades between categories (lives in a persistent layout). */
export function TintBand({ tint, children, k }: { tint: string; children: React.ReactNode; k: string }) {
  const colors: Record<string, string> = { sand: 'var(--sand)', clay: 'var(--clay)', ocean: 'var(--ocean)', cream: 'var(--cream)', paper: 'var(--paper)' };
  return <section className="tint-band" style={{ background: colors[tint] } as CSSProperties}><div key={k} className="swap">{children}</div></section>;
}
