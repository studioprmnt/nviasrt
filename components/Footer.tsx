import Link from 'next/link';
import { Signature } from './motion';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-top">
          <Link href="/" aria-label="nviasrt home" className="footer-sig"><Signature size={56} onView /></Link>
          <div className="footer-cols">
            <div><p className="label taupe">Read</p><ul><li><Link href="/chronicles">Chronicles</Link></li><li><Link href="/guides">Guides</Link></li><li><Link href="/about">About Ovi</Link></li></ul></div>
            <div><p className="label taupe">Shop</p><ul><li><Link href="/shop">Shop My Picks</Link></li><li><Link href="/affiliate-disclosure">Affiliate Disclosure</Link></li><li><Link href="/contact">Contact</Link></li></ul></div>
            <div><p className="label taupe">Elsewhere</p><ul><li><a href="https://instagram.com/nviasrt">Instagram</a></li><li><a href="#">Pinterest</a></li><li><a href="#">Threads</a></li><li><a href="#">LinkedIn</a></li></ul></div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>Some links are affiliate links. I only share what I use. · <Link href="/privacy">Privacy</Link> · <Link href="/terms">Terms</Link></span>
          <span className="label">EN / ID</span>
        </div>
      </div>
    </footer>
  );
}
