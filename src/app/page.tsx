import Image from 'next/image';
import Link from 'next/link';
import { Arrow } from '@/components/Arrow';
import { Approach } from '@/components/Approach';
import { JsonLd } from '@/components/JsonLd';
import PageReady from '@/components/PageReady';
import { LoadBeam } from '@/components/LoadBeam';
import { WorkIndex } from '@/components/WorkIndex';
import { founders, otherWork, projects, services, site } from '@/data/site';
import { homeSchema } from '@/lib/seo';

export default function HomePage() {
  return (
    <>
      <section className="hero hero--dark" aria-labelledby="hero-title">
        <div className="hero__bg" aria-hidden="true">
          <Image
            src="/img/structure.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="hero__bg-img"
          />
          <span className="hero__bg-veil" />
        </div>

        <div className="hero__meta">
          <span>
            {site.name} / {site.role}
          </span>
          <span className="hero__meta-r">{site.location} / Working worldwide</span>
        </div>

        <div className="hero__side" aria-hidden="true">
          {projects.map((p) => (
            <span key={p.slug}>{p.title}</span>
          ))}
        </div>

        <div className="hero__inner">
          <p className="hero__kicker" data-reveal="fade" data-intro>
            <i className="hero__pulse" />
            Websites, software, AI workflows and agents
          </p>
          <h1 className="hero__title" id="hero-title" data-reveal="fade" data-intro data-delay="0.1">
            <span className="sr-only">{site.name}: </span>
            We build
            <br />
            {' '}
            <span className="hero__line">
              what holds<span className="hero__dot">.</span>
            </span>
          </h1>
          <div className="hero__foot">
            <p className="hero__lede" data-reveal="up" data-intro data-delay="0.3">
              {site.name} is a software and AI studio. We build stunning websites, custom software,
              AI workflows, AI agents and CRMs, and we run our own products.
            </p>
            <div className="hero__actions" data-reveal="fade" data-intro data-delay="0.45">
              <Link href="/work" className="btn btn--accent" data-fill>
                <span className="btn__fill" aria-hidden="true" />
                <span>See the work</span>
                <Arrow />
              </Link>
              <a className="text-link" href={`mailto:${site.email}`}>
                Start a project
              </a>
            </div>
          </div>
        </div>

        <LoadBeam />
      </section>

      <section className="section work" id="work" aria-labelledby="work-title">
        <div className="section-head section-head--wide">
          <p className="label section-head__label">01 / Selected work</p>
          <h2 className="section-head__title section-head__title--xl" id="work-title" data-reveal="up">
            Made to be
            <br />
            {' '}
            depended on<span className="dot">.</span>
          </h2>
          <p className="section-head__note">
            Two products we run ourselves, two open-source tools anyone can fork, and the client
            systems and experiments in between. Each one tested against the day it was built for.
          </p>
        </div>
        <WorkIndex level={3} />
        <div className="work__foot">
          <Link href="/work" className="text-link text-link--big arrow-link">
            All work
            <Arrow />
          </Link>
          <p className="work__count">
            {String(projects.length + otherWork.length).padStart(2, '0')} builds / 2024 to 2026
          </p>
        </div>
      </section>

      <section className="capabilities" id="capabilities" aria-labelledby="capabilities-title">
        <div className="cap-marquee" aria-hidden="true">
          <div className="cap-marquee__track">
            {Array.from({ length: 2 }).map((_, i) => (
              <span key={i}>
                {services.map((service) => (
                  <span key={service.short}>
                    {service.short} <i>·</i>{' '}
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>
        <div className="cap__inner">
          <div className="cap__head">
            <p className="label">02 / Services</p>
            <h2 className="cap__title" id="capabilities-title" data-reveal="up">
              Five services.
              <br />
              {' '}
              One team<span className="dot">.</span>
            </h2>
            <p className="cap__note">
              No handoff between a strategy deck and the people writing the code. The team that built
              Tabble, LuminaIQ and HailBrowser builds yours, from the first sketch to the last deploy.
            </p>
          </div>
          <ol className="cap__list">
            {services.map((c, i) => (
              <li key={c.title} className="cap__item" data-reveal="up">
                <span className="cap__num">{String(i + 1).padStart(2, '0')}</span>
                <h3>{c.title}</h3>
                <p>{c.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <Approach />

      <section className="studio-teaser" aria-labelledby="studio-teaser-title">
        <div className="studio-teaser__media" data-parallax="0.08">
          <Image
            src="/img/studio.jpg"
            alt="A quiet studio room with a long table and large windows"
            fill
            sizes="(max-width: 900px) 100vw, 50vw"
            className="studio-teaser__img"
          />
          <span className="studio-teaser__tag">The room / Tamil Nadu</span>
        </div>
        <div className="studio-teaser__body">
          <p className="label">03 / The studio</p>
          <h2 className="studio-teaser__title" id="studio-teaser-title" data-reveal="up">
            Small by design<span className="dot">.</span>
          </h2>
          <p className="studio-teaser__lede" data-reveal="up">
            Founded by Shyamnath Sankar and Jai Samyukth B U. One build at a time, close enough to the
            code that the handover is a conversation, not a document.
          </p>
          <div className="founders">
            {founders.map((f) => (
              <a key={f.url} className="founder-link" href={f.url} target="_blank" rel="noopener">
                {f.name}
                <Arrow />
                <span className="sr-only"> (personal site, opens in a new tab)</span>
              </a>
            ))}
          </div>
          <Link href="/studio" className="text-link text-link--big arrow-link">
            Meet the studio
            <Arrow />
          </Link>
        </div>
      </section>
      <JsonLd data={homeSchema} />
      <PageReady />
    </>
  );
}
