import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Arrow } from '@/components/Arrow';
import { BrowserFrame, PhoneFrame } from '@/components/BrowserFrame';
import { ReportVisual } from '@/components/ReportVisual';
import { nextProject, projectBySlug, projects } from '@/data/site';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projectBySlug(slug);
  if (!project) return { title: 'Not found' };
  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: {
      title: project.title,
      description: project.summary,
      url: `/work/${project.slug}`,
      type: 'article',
      images: [
        {
          url: '/og.png',
          width: 1200,
          height: 630,
          alt: `${project.title}, a case study by GenRec AI`,
        },
      ],
    },
  };
}

export default async function CasePage({ params }: Props) {
  const { slug } = await params;
  const project = projectBySlug(slug);
  if (!project) notFound();

  const index = projects.findIndex((p) => p.slug === project.slug);
  const next = nextProject(project.slug);
  const num = String(index + 1).padStart(2, '0');

  const style = {
    '--accent': project.accent,
    '--accent-rgb': project.accentRgb,
    '--accent-ink': project.accentInk,
  } as React.CSSProperties;

  const nextStyle = {
    '--accent': next.accent,
    '--accent-rgb': next.accentRgb,
    '--accent-ink': next.accentInk,
  } as React.CSSProperties;

  return (
    <article className="case" style={style}>
      <header className="case-head">
        <div className="case-head__top">
          <Link href="/work" className="case-head__back">
            <Arrow className="case-head__back-arrow" />
            Work
          </Link>
          <span>Case {num} / 04</span>
          <span>
            {project.sector} / {project.year}
          </span>
        </div>

        <div className="case-head__main">
          <h1 className="case-head__title" data-reveal="fade" data-intro>
            {project.wordmark}
            <span className="case-head__dot">.</span>
          </h1>
          <p className="case-head__tagline" data-reveal="up" data-intro data-delay="0.2">
            {project.tagline}
          </p>
        </div>

        <div className="case-head__grid">
          <p className="case-head__summary" data-reveal="up" data-intro data-delay="0.3">
            {project.summary}
          </p>
          <dl className="case-facts" data-reveal="fade" data-intro data-delay="0.4">
            <div>
              <dt>Role</dt>
              <dd>{project.role}</dd>
            </div>
            <div>
              <dt>Stack</dt>
              <dd>{project.stack}</dd>
            </div>
            <div>
              <dt>Status</dt>
              <dd>{project.status}</dd>
            </div>
            {project.live ? (
              <div className="case-facts__link">
                <dt>Live</dt>
                <dd>
                  <a href={project.live.href} target="_blank" rel="noopener noreferrer">
                    {project.live.label}
                    <Arrow />
                  </a>
                </dd>
              </div>
            ) : null}
          </dl>
        </div>
      </header>

      <div className="case-cover">
        {project.visual === 'report' ? (
          <ReportVisual />
        ) : project.cover ? (
          <BrowserFrame
            src={project.cover.src}
            alt={project.cover.alt}
            url={project.live?.href.replace(/^https?:\/\//, '').replace(/\/$/, '')}
            priority
            sizes="92vw"
            className="case-cover__frame"
          />
        ) : null}
        {project.cover ? <p className="case-cover__cap">{project.cover.caption}</p> : null}
      </div>

      <section className="case-metrics" aria-label="Key numbers">
        {project.metrics.map((m) => (
          <div className="case-metric" key={m.label}>
            <b>{m.value}</b>
            <p>{m.label}</p>
          </div>
        ))}
      </section>

      <div className="case-body">
        <aside className="case-rail">
          <p className="label">Contents</p>
          <ol>
            {project.sections.map((s, i) => (
              <li key={s.kicker}>
                <span>{String(i + 1).padStart(2, '0')}</span>
                {s.title}
              </li>
            ))}
          </ol>
          {project.live ? (
            <a className="case-rail__link" href={project.live.href} target="_blank" rel="noopener noreferrer">
              Open the live product
              <Arrow />
            </a>
          ) : null}
        </aside>

        <div className="case-prose">
          {project.sections.map((s, i) => (
            <section className="case-block" key={s.kicker} id={`section-${i + 1}`}>
              <p className="label case-block__kicker">{s.kicker}</p>
              <h2>{s.title}</h2>
              <p className="case-block__body">{s.body}</p>
              {s.points ? (
                <ul className="case-list">
                  {s.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}
        </div>
      </div>

      {project.gallery.length > 0 ? (
        <section className="case-gallery" aria-label="Screens">
          {project.gallery.map((shot, i) => (
            <figure
              className={`case-figure ${i === 0 ? 'case-figure--wide' : ''} ${
                shot.frame === 'phone' ? 'case-figure--phone' : ''
              }`}
              key={shot.src}
            >
              {shot.frame === 'phone' ? (
                <PhoneFrame src={shot.src} alt={shot.alt} />
              ) : (
                <BrowserFrame
                  src={shot.src}
                  alt={shot.alt}
                  sizes={i === 0 ? '92vw' : '(max-width: 900px) 100vw, 46vw'}
                />
              )}
              <figcaption>{shot.caption}</figcaption>
            </figure>
          ))}
        </section>
      ) : null}

      <section className="case-outcome">
        <p className="label">The outcome</p>
        <blockquote>{project.outcome}</blockquote>
      </section>

      <Link
        className="case-next"
        href={`/work/${next.slug}`}
        style={nextStyle}
        aria-label={`Next case: ${next.title}`}
      >
        <span className="case-next__label">Next case</span>
        <span className="case-next__title">{next.title}</span>
        <Arrow className="case-next__arrow" />
        <span className="case-next__tagline">{next.tagline}</span>
      </Link>
    </article>
  );
}
