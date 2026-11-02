import type { Metadata } from 'next';
import Link from 'next/link';
import { Arrow } from '@/components/Arrow';
import { JsonLd } from '@/components/JsonLd';
import PageReady from '@/components/PageReady';
import { services, site } from '@/data/site';
import { servicesSchema } from '@/lib/seo';

const description =
  'GenrecAI services: website design, custom software development, AI workflows, AI agents and custom CRM. One team from first sketch to production.';

export const metadata: Metadata = {
  title: 'Services',
  description,
  keywords: ['GenrecAI services', ...services.map((s) => s.seoTitle)],
  alternates: { canonical: '/services' },
  openGraph: {
    type: 'website',
    title: `Services — ${site.name}`,
    description,
    url: '/services',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'GenrecAI services' }],
  },
  twitter: { card: 'summary_large_image', title: `Services — ${site.name}`, description, images: ['/og.png'] },
};

export default function ServicesPage() {
  return (
    <>
      <section className="work-hero svc-hero" aria-labelledby="services-title">
        <p className="label work-hero__label">Services / {String(services.length).padStart(2, '0')}</p>
        <div className="work-hero__grid">
          <h1 id="services-title" data-reveal="up" data-intro>
            Five
            <br />
            {' '}
            services<span className="dot">.</span>
          </h1>
          <div className="work-hero__side">
            <p className="work-hero__note" data-reveal="up" data-intro data-delay="0.15">
              Websites, software, AI workflows, AI agents and custom CRMs. The team that built Tabble,
              LuminaIQ, SelectStar and HailBrowser builds yours.
            </p>
          </div>
        </div>
        <div className="work-hero__ticker" aria-hidden="true">
          {services.map((s) => (
            <span key={s.slug}>{s.short}</span>
          ))}
        </div>
      </section>

      <section className="svc-section" aria-label="All services">
        <ol className="svc-index">
          {services.map((s, i) => (
            <li key={s.slug}>
              <Link href={`/services/${s.slug}`} className="svc-row" data-reveal="up">
                <span className="svc-row__num">{String(i + 1).padStart(2, '0')}</span>
                <h2 className="svc-row__title">{s.short}</h2>
                <p className="svc-row__text">{s.text}</p>
                <span className="svc-row__arrow">
                  <Arrow />
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </section>

      <section className="work-end">
        <p className="label">Next</p>
        <p className="work-end__line">
          Not sure which one you need? <a href={`mailto:${site.email}`}>Tell us the problem.</a>
        </p>
        <Link href="/work" className="text-link arrow-link">
          See the work
          <Arrow />
        </Link>
      </section>
      <JsonLd data={servicesSchema} />
      <PageReady />
    </>
  );
}
