import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Arrow } from '@/components/Arrow';
import { JsonLd } from '@/components/JsonLd';
import PageReady from '@/components/PageReady';
import { needs, site, team } from '@/data/site';
import { studioSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Studio',
  description:
    'GenRec AI is a product studio in Tamil Nadu, India. Three people who scope, design and engineer one build at a time, from first sketch to final deploy.',
  keywords: [
    'GenRec AI studio',
    'product studio Tamil Nadu',
    'product strategy',
    'interface design',
    'full-stack engineering',
    'AI systems',
    'software rescue',
  ],
  alternates: { canonical: '/studio' },
  openGraph: {
    type: 'website',
    title: 'Small by design — the GenRec AI studio',
    description:
      'Three people who stay on the build from the first sketch to the last deploy. Product strategy, interface design, engineering and AI systems.',
    url: '/studio',
    images: [
      {
        url: '/og/studio.png',
        width: 1200,
        height: 630,
        alt: 'The GenRec AI studio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Small by design — the GenRec AI studio',
    description:
      'Three people who scope, design and engineer one build at a time, from first sketch to final deploy.',
    images: ['/og/studio.png'],
  },
};

const process = [
  {
    title: 'Find the failure.',
    text: 'A week of questions, one page of failure modes. We agree on what the system has to survive before anyone opens a design file.',
  },
  {
    title: 'Cut the scope.',
    text: 'We remove until only the load-bearing parts remain. The first release is the smallest thing that can carry real work.',
  },
  {
    title: 'Build in the open.',
    text: 'A working link from the first week. You see the real thing on a real screen, not a status update.',
  },
  {
    title: 'Stay for the test.',
    text: 'Launch is the start of the hard part. We watch the first weeks, fix what the demo hid, and leave the system runnable.',
  },
];

export default function StudioPage() {
  return (
    <>
      <section className="studio-hero" aria-labelledby="studio-title">
        <div className="studio-hero__media" aria-hidden="true">
          <Image
            src="/img/studio.jpg"
            alt=""
            fill
            priority
            sizes="(max-width: 900px) 100vw, 55vw"
            className="studio-hero__img"
          />
          <span className="studio-hero__veil" />
        </div>
        <p className="label studio-hero__label">Studio / {site.location}</p>
        <div className="studio-hero__main">
          <h1 id="studio-title" data-reveal="fade" data-intro>
            Small by
            <br />
            {' '}
            design<span className="dot">.</span>
          </h1>
          <div className="studio-hero__foot">
            <p data-reveal="up" data-intro data-delay="0.2">
              GenRec AI is a product studio in Tamil Nadu. Three people who stay on the build from
              the first sketch to the last deploy.
            </p>
            <dl data-reveal="fade" data-intro data-delay="0.35">
              <div>
                <dt>Team</dt>
                <dd>03</dd>
              </div>
              <div>
                <dt>Model</dt>
                <dd>Product studio</dd>
              </div>
              <div>
                <dt>Base</dt>
                <dd>{site.location}</dd>
              </div>
              <div>
                <dt>Since</dt>
                <dd>2023</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <section className="studio-manifesto" aria-label="About the studio">
        <p className="label">01 / The room</p>
        <p className="studio-manifesto__lead" data-reveal="up">
          We are three people because the work is one build at a time.
        </p>
        <div className="studio-manifesto__cols">
          <p data-reveal="up">
            We scope, design and engineer in the same room. The person who draws the screen also
            knows what it costs to run it. There is no account layer and no handoff between the
            strategy deck and the code.
          </p>
          <p data-reveal="up" data-delay="0.1">
            When a project ends, we leave a system and the reasoning behind it: the decisions, the
            trade-offs, the parts we expect to break first. A handover should be a conversation, not
            a folder.
          </p>
        </div>
        <div className="studio-manifesto__stats" data-reveal="fade">
          <div>
            <b>03</b>
            <span>people, no bench</span>
          </div>
          <div>
            <b>04</b>
            <span>products in the world</span>
          </div>
          <div>
            <b>01</b>
            <span>build at a time</span>
          </div>
        </div>
      </section>

      <section className="studio-team" aria-labelledby="team-title">
        <div className="section-head">
          <p className="label section-head__label">02 / The people</p>
          <h2 className="section-head__title" id="team-title" data-reveal="up">
            The people
            <br />
            {' '}
            on the build<span className="dot">.</span>
          </h2>
          <p className="section-head__note">
            No account layer. The people below are the people you talk to and the people who write
            the code.
          </p>
        </div>
        <ul className="team-grid">
          {team.map((t, i) => (
            <li className="team-card" key={t.name} data-reveal="up">
              <span className="team-card__num">{String(i + 1).padStart(2, '0')}</span>
              <h3>{t.name}</h3>
              <p className="team-card__role">{t.role}</p>
              <p className="team-card__line">{t.line}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="studio-process" aria-labelledby="process-title">
        <div className="section-head">
          <p className="label section-head__label">03 / How a build runs</p>
          <h2 className="section-head__title" id="process-title" data-reveal="up">
            Four moves,
            <br />
            {' '}
            no theatre<span className="dot">.</span>
          </h2>
          <p className="section-head__note">
            The shape is the same whether the build is six weeks or six months. Only the depth
            changes.
          </p>
        </div>
        <ol className="process-list">
          {process.map((p, i) => (
            <li className="process-step" key={p.title} data-reveal="up">
              <span className="process-step__num">{String(i + 1).padStart(2, '0')}</span>
              <h3>{p.title}</h3>
              <p>{p.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="studio-needs" aria-labelledby="needs-title">
        <div className="section-head">
          <p className="label section-head__label">04 / Engagement</p>
          <h2 className="section-head__title" id="needs-title" data-reveal="up">
            What we need
            <br />
            {' '}
            from you<span className="dot">.</span>
          </h2>
          <p className="section-head__note">
            Four things that make a build go well. If one is missing, we will say so before we start.
          </p>
        </div>
        <div className="needs">
          {needs.map((n, i) => (
            <div className="need" key={n.title} data-reveal="up">
              <span className="need__num">{String(i + 1).padStart(2, '0')}</span>
              <h3>{n.title}</h3>
              <p>{n.text}</p>
            </div>
          ))}
        </div>
        <div className="studio-needs__cta">
          <Link href="/work" className="text-link text-link--big arrow-link">
            See the work
            <Arrow />
          </Link>
          <a href={`mailto:${site.email}`} className="text-link text-link--big arrow-link">
            Start a project
            <Arrow />
          </a>
        </div>
      </section>
      <JsonLd data={studioSchema} />
      <PageReady />
    </>
  );
}
