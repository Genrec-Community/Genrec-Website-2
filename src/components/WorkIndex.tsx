import { otherWork, projectGroups, projectsByKind } from '@/data/site';
import { Arrow } from './Arrow';
import { ProjectCard } from './ProjectCard';

type Level = 2 | 3;

// Work grouped as products, open source and other work. `level` is the heading level of the
// group titles, so the outline stays ordered on both the home page (under an h2) and /work.
export function WorkIndex({ priorityFirst = false, level = 2 }: { priorityFirst?: boolean; level?: Level }) {
  const GroupTitle = `h${level}` as 'h2' | 'h3';
  const cardLevel = (level + 1) as 3 | 4;
  const firstKind = projectGroups.find((g) => projectsByKind(g.kind).length)?.kind;

  return (
    <div className="work-groups">
      {projectGroups.map((group) => {
        const items = projectsByKind(group.kind);
        const extra = group.kind === 'other' ? otherWork : [];
        if (!items.length && !extra.length) return null;
        const id = `group-${group.kind}`;
        return (
          <section className={`work-group work-group--${group.kind}`} key={group.kind} aria-labelledby={id}>
            <div className="work-group__head">
              <p className="label work-group__label">
                {group.label} / {String(items.length + extra.length).padStart(2, '0')}
              </p>
              <GroupTitle className="work-group__title" id={id}>
                {group.title}
                <span className="dot">.</span>
              </GroupTitle>
              <p className="work-group__note">{group.note}</p>
            </div>

            {items.length ? (
              <div className="work-grid">
                {items.map((project, i) => (
                  <ProjectCard
                    key={project.slug}
                    project={project}
                    index={i}
                    priority={priorityFirst && group.kind === firstKind && i === 0}
                    headingLevel={cardLevel}
                  />
                ))}
              </div>
            ) : null}

            {extra.length ? (
              <ul className="work-other">
                {extra.map((item) => (
                  <li key={item.href}>
                    <a className="work-other__row" href={item.href} target="_blank" rel="noopener noreferrer">
                      <span className="work-other__meta">
                        {item.sector} / {item.year}
                      </span>
                      <span className="work-other__title">{item.title}</span>
                      <span className="work-other__text">{item.text}</span>
                      <span className="work-other__link">
                        {item.linkLabel}
                        <Arrow />
                        <span className="sr-only"> (opens in a new tab)</span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
          </section>
        );
      })}
    </div>
  );
}
