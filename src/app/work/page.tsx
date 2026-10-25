import type { Metadata } from 'next';
import Link from 'next/link';
import { Arrow } from '@/components/Arrow';
import { TopographicField } from '@/components/TopographicField';
import { WorkIndex } from '@/components/WorkIndex';
import { projects } from '@/data/site';

export const metadata: Metadata = {
  title: 'Work',
  description:
    'Four systems built by GenRec AI: SelectStar, LuminaIQ, Tabble and the VSB faculty feedback system.',
  alternates: { canonical: '/work' },
};

export default function WorkPage() {
  return (
    <>
      <section className="work-hero" aria-labelledby="work-title">
        <TopographicField className="work-hero__topo" tone="paper" />
        <p className="label work-hero__label">Work index / 2024 to 2026</p>
        <div className="work-hero__grid">
          <h1 id="work-title" data-reveal="up" data-intro>
            Selected
            <br />
            builds<span className="dot">.</span>
          </h1>
          <div className="work-hero__side">
            <p className="work-hero__note" data-reveal="up" data-intro data-delay="0.15">
              Four products with real users and real failure modes. Two are open for anyone to use.
              One runs a college department. One is opening its first fifty restaurants.
            </p>
            <dl className="work-hero__stats" data-reveal="fade" data-intro data-delay="0.3">
              <div>
                <dt>Builds</dt>
                <dd>04</dd>
              </div>
              <div>
                <dt>Live</dt>
                <dd>03</dd>
              </div>
              <div>
                <dt>Since</dt>
                <dd>2023</dd>
              </div>
            </dl>
          </div>
        </div>
        <div className="work-hero__ticker" aria-hidden="true">
          {projects.map((p) => (
            <span key={p.slug}>{p.title}</span>
          ))}
        </div>
      </section>

      <section className="work-page" aria-label="Case studies">
        <WorkIndex />
      </section>

      <section className="work-end">
        <p className="label">Next</p>
        <p className="work-end__line">
          Have a product that has to hold? <a href="mailto:hello@genrecai.com">Tell us about it.</a>
        </p>
        <Link href="/studio" className="text-link arrow-link">
          Meet the studio
          <Arrow />
        </Link>
      </section>
    </>
  );
}
