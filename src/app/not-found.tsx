import Link from 'next/link';
import { Arrow } from '@/components/Arrow';

export default function NotFound() {
  return (
    <section className="notfound" aria-labelledby="notfound-title">
      <div className="notfound__meta">
        <span>Error / 404</span>
        <span>
          <b>No load</b> / structural failure
        </span>
      </div>

      <h1 id="notfound-title">No load.</h1>

      <div className="notfound__body">
        <p>
          This page is not carrying anything. The address may have moved, or it never held weight.
        </p>
        <Link href="/" className="btn" data-fill>
          <span className="btn__fill" aria-hidden="true" />
          <span>Back to the index</span>
          <Arrow />
        </Link>
      </div>

      <div className="notfound__beam" aria-hidden="true">
        <svg viewBox="0 0 1000 120" preserveAspectRatio="none" focusable="false">
          <line className="notfound__ghost" x1="0" y1="20" x2="1000" y2="20" />
          <path className="notfound__snap" d="M0 20 H400 Q 500 100 600 20 H1000" />
          <circle cx="500" cy="60" r="4" fill="#E23A1F" />
        </svg>
      </div>
    </section>
  );
}
