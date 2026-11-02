import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Arrow } from '@/components/Arrow';
import { JsonLd } from '@/components/JsonLd';
import PageReady from '@/components/PageReady';
import { ProjectCard } from '@/components/ProjectCard';
import { projectBySlug, serviceBySlug, services, site, type Project } from '@/data/site';
import { serviceSchema } from '@/lib/seo';

type Props = { params: Promise<{ slug: string }> };

export const instant = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = serviceBySlug(slug);
  if (!service) return { title: 'Not found' };
  const path = `/services/${service.slug}`;
  return {
    title: service.seoTitle,
    description: service.seoDescription,
    keywords: [...service.keywords, site.name, 'GenRec AI'],
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      title: `${service.seoTitle} — ${site.name}`,
      description: service.seoDescription,
      url: path,
      images: [{ url: '/og.png', width: 1200, height: 630, alt: `${service.seoTitle} by GenrecAI` }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${service.seoTitle} — ${site.name}`,
      description: service.seoDescription,
      images: ['/og.png'],
    },
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = serviceBySlug(slug);
  if (!service) notFound();

  const index = services.findIndex((s) => s.slug === service.slug);
  const proof = service.proof.map(projectBySlug).filter((p): p is Project => Boolean(p));
  const others = services.filter((s) => s.slug !== service.slug);

  return (
    <>
      <section className="work-hero svc-hero" aria-labelledby="service-title">
        <p className="label work-hero__label">
          <Link href="/services" className="svc-back">
            Services
          </Link>{' '}
          / {String(index + 1).padStart(2, '0')}
        </p>
        <div className="work-hero__grid">
          <h1 id="service-title" className="svc-hero__title" data-reveal="up" data-intro>
            {service.short}
            <span className="dot">.</span>
            <span className="sr-only"> {service.seoTitle} by {site.name}</span>
          </h1>
          <div className="work-hero__side">
            <p className="svc-hero__headline" data-reveal="up" data-intro data-delay="0.1">
              {service.headline}
            </p>
            <p className="work-hero__note" data-reveal="up" data-intro data-delay="0.2">
              {service.lede}
            </p>
            <a className="btn btn--accent svc-hero__cta" href={`mailto:${site.email}?subject=${encodeURIComponent(service.short)}`} data-fill>
              <span className="btn__fill" aria-hidden="true" />
              <span>Start a project</span>
              <Arrow />
            </a>
          </div>
        </div>
        <div className="work-hero__ticker" aria-hidden="true">
          {service.keywords.slice(0, 5).map((k) => (
            <span key={k}>{k}</span>
          ))}
        </div>
      </section>

      <section className="svc-section" aria-labelledby="get-title">
        <div className="section-head">
          <p className="label section-head__label">01 / What you get</p>
          <h2 className="section-head__title" id="get-title" data-reveal="up">
            What you get<span className="dot">.</span>
          </h2>
          <p className="section-head__note">{service.text}</p>
        </div>
        <ol className="process-list">
          {service.deliverables.map((d, i) => (
            <li className="process-step" key={d.title} data-reveal="up">
              <span className="process-step__num">{String(i + 1).padStart(2, '0')}</span>
              <h3>{d.title}</h3>
              <p>{d.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="svc-section svc-section--dark" aria-labelledby="steps-title">
        <div className="section-head">
          <p className="label section-head__label">02 / How it runs</p>
          <h2 className="section-head__title" id="steps-title" data-reveal="up">
            Four steps<span className="dot">.</span>
          </h2>
          <p className="section-head__note">A working link early, real data as soon as possible, and no handoff in the middle.</p>
        </div>
        <ol className="svc-steps">
          {service.steps.map((st, i) => (
            <li key={st.title} data-reveal="up" data-delay={String(i * 0.06)}>
              <span className="svc-steps__num">{String(i + 1).padStart(2, '0')}</span>
              <h3>{st.title}</h3>
              <p>{st.text}</p>
            </li>
          ))}
        </ol>
        <div className="svc-fit">
          <p className="label">A good fit for</p>
          <ul>
            {service.fit.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        </div>
      </section>

      {proof.length ? (
        <section className="svc-section" aria-labelledby="proof-title">
          <div className="section-head">
            <p className="label section-head__label">03 / Proof</p>
            <h2 className="section-head__title" id="proof-title" data-reveal="up">
              We have built this<span className="dot">.</span>
            </h2>
            <p className="section-head__note">Our own products and client systems, each with a case study.</p>
          </div>
          <div className="work-grid">
            {proof.map((p, i) => (
              <ProjectCard key={p.slug} project={p} index={i} headingLevel={3} />
            ))}
          </div>
        </section>
      ) : null}

      <section className="svc-section" aria-labelledby="faq-title">
        <div className="section-head">
          <p className="label section-head__label">04 / Questions</p>
          <h2 className="section-head__title" id="faq-title" data-reveal="up">
            Questions<span className="dot">.</span>
          </h2>
        </div>
        <div className="svc-faq">
          {service.faqs.map((f) => (
            <details key={f.q}>
              <summary>
                <h3>{f.q}</h3>
                <span className="svc-faq__mark" aria-hidden="true" />
              </summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="svc-section" aria-labelledby="others-title">
        <div className="section-head">
          <p className="label section-head__label">More</p>
          <h2 className="section-head__title" id="others-title">
            Other services<span className="dot">.</span>
          </h2>
        </div>
        <ul className="svc-index svc-index--small">
          {others.map((s) => (
            <li key={s.slug}>
              <Link href={`/services/${s.slug}`} className="svc-row">
                <span className="svc-row__num">{String(services.indexOf(s) + 1).padStart(2, '0')}</span>
                <span className="svc-row__title">{s.short}</span>
                <span className="svc-row__text">{s.text}</span>
                <span className="svc-row__arrow">
                  <Arrow />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <JsonLd data={serviceSchema(service)} />
      <PageReady />
    </>
  );
}
