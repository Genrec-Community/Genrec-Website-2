'use client';

import Link from 'next/link';
import { useRef, type PointerEvent } from 'react';
import type { Project } from '@/data/site';
import { BrowserFrame } from './BrowserFrame';
import { ReportVisual } from './ReportVisual';
import { Arrow } from './Arrow';

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const mediaRef = useRef<HTMLDivElement>(null);
  const onMove = (event: PointerEvent<HTMLAnchorElement>) => {
    const media = mediaRef.current;
    if (!media) return;
    const rect = media.getBoundingClientRect();
    media.style.setProperty('--sx', `${event.clientX - rect.left}px`);
    media.style.setProperty('--sy', `${event.clientY - rect.top}px`);
  };
  const style = {
    '--accent': project.accent,
    '--accent-rgb': project.accentRgb,
    '--accent-ink': project.accentInk,
  } as React.CSSProperties;

  return (
    <Link
      href={`/work/${project.slug}`}
      className={`pcard ${index % 2 ? 'pcard--offset' : ''}`}
      style={style}
      onPointerMove={onMove}
      data-reveal="up"
      data-delay={String(index * 0.07)}
      aria-label={`${project.title}, ${project.sector}, ${project.year}`}
    >
      <div className="pcard__media" ref={mediaRef}>
        <span className="pcard__index">{String(index + 1).padStart(2, '0')}</span>
        {project.visual === 'report' ? (
          <div className="pcard__report">
            <ReportVisual compact />
          </div>
        ) : project.cover ? (
          <BrowserFrame
            src={project.cover.src}
            alt={project.cover.alt}
            url={project.live?.href.replace(/^https?:\/\//, '').replace(/\/$/, '')}
            sizes="(max-width: 900px) 100vw, 46vw"
          />
        ) : null}
        <span className="pcard__status">{project.status}</span>
      </div>
      <div className="pcard__body">
        <div className="pcard__meta">
          <span>{project.sector}</span>
          <span>{project.year}</span>
        </div>
        <div className="pcard__title-row">
          <h2 className="pcard__title">{project.title}</h2>
          <span className="pcard__arrow">
            <Arrow />
          </span>
        </div>
        <p className="pcard__summary">{project.summary}</p>
        <span className="pcard__more">View case</span>
      </div>
    </Link>
  );
}
