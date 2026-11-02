import type { Metadata } from 'next';
import Link from 'next/link';
import { Arrow } from '@/components/Arrow';
import { JsonLd } from '@/components/JsonLd';
import PageReady from '@/components/PageReady';
import { TopographicField } from '@/components/TopographicField';
import { WorkIndex } from '@/components/WorkIndex';
import { otherWork, projects, projectsByKind, site } from '@/data/site';
import { workSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Work',
  description:
    'Products, open source and client work by GenrecAI: Tabble, LuminaIQ, SelectStar, HailBrowser, VSB Feedback and Mobile Agent.',
  keywords: [
    'GenrecAI work',
    'GenRec AI products',
    'Tabble',
    'LuminaIQ',
    'SelectStar',
    'HailBrowser',
    'open source browser agent',
    'VSB Feedback',
  ],
  alternates: { canonical: '/work' },
  openGraph: {
    type: 'website',
    title: 'Products and open source — GenrecAI',
    description:
      'Tabble and LuminaIQ, open-source SelectStar and HailBrowser, plus client systems and experiments by GenrecAI.',
    url: '/work',
    images: [
      {
        url: '/og/work.png',
        width: 1200,
        height: 630,
        alt: 'Products and open source by GenrecAI',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Products and open source — GenrecAI',
    description:
      'Tabble, LuminaIQ, SelectStar and HailBrowser, built by GenrecAI.',
    images: ['/og/work.png'],
  },
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
            {' '}
            builds<span className="dot">.</span>
          </h1>
          <div className="work-hero__side">
            <p className="work-hero__note" data-reveal="up" data-intro data-delay="0.15">
              Two products we run ourselves, two open-source tools anyone can fork, and the client
              systems and experiments that taught us how to build them.
            </p>
            <dl className="work-hero__stats" data-reveal="fade" data-intro data-delay="0.3">
              <div>
                <dt>Products</dt>
                <dd>{String(projectsByKind('product').length).padStart(2, '0')}</dd>
              </div>
              <div>
                <dt>Open source</dt>
                <dd>{String(projectsByKind('open-source').length).padStart(2, '0')}</dd>
              </div>
              <div>
                <dt>Since</dt>
                <dd>2023</dd>
              </div>
            </dl>
          </div>
        </div>
        <div className="work-hero__ticker" aria-hidden="true">
          {[...projects.map((p) => p.title), ...otherWork.map((w) => w.title)].map((title) => (
            <span key={title}>{title}</span>
          ))}
        </div>
      </section>

      <section className="work-page" aria-label="Products, open source and other work">
        <WorkIndex priorityFirst level={2} />
      </section>

      <section className="work-end">
        <p className="label">Next</p>
        <p className="work-end__line">
          Have a product that has to hold? <a href={`mailto:${site.email}`}>Tell us about it.</a>
        </p>
        <Link href="/studio" className="text-link arrow-link">
          Meet the studio
          <Arrow />
        </Link>
      </section>
      <JsonLd data={workSchema} />
      <PageReady />
    </>
  );
}
