import Link from 'next/link';
import { nav, site } from '@/data/site';
import { Arrow } from './Arrow';

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer__grid">
        <p className="label footer__eyebrow">Contact</p>
        <h2 className="footer__title">Tell us what has to hold.</h2>
        <a className="footer__email" href={`mailto:${site.email}`}>
          {site.email}
        </a>
        <p className="footer__note">A sentence is enough. We will ask the rest.</p>
        <div className="footer__meta">
          <a className="footer__cta" href={`mailto:${site.email}`}>
            Start a project
            <Arrow />
          </a>
          {nav.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
          <a href={site.socials[0].href} target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          <span>{site.location}</span>
        </div>
      </div>
      <div className="footer__word" aria-hidden="true">
        {site.wordmark}
        <span className="dot">.</span>
      </div>
      <div className="footer__bottom">
        <span>© {site.name}</span>
        <span>Clash Display, General Sans, Martian Mono</span>
        <span>Built in Next.js</span>
      </div>
    </footer>
  );
}
