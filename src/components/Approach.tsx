'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePage } from '@/engine/next';
import { prefersReducedMotion } from '@/engine';
import { principles } from '@/data/site';

const POINTS = [0.14, 0.5, 0.86];

export function Approach() {
  const stageRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLSpanElement>(null);
  const numRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLParagraphElement>(null);
  const pointRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLOListElement>(null);

  usePage(() => {
    const stage = stageRef.current;
    const track = trackRef.current;
    const dot = dotRef.current;
    const list = listRef.current;
    if (!stage || !track || !dot || !list) return;

    const items = [...list.querySelectorAll<HTMLLIElement>('.chapter')];

    const place = (i: number, animate = true) => {
      const p = POINTS[i];
      const w = track.clientWidth;
      const h = track.clientHeight;
      const yn = (1 - p) * (1 - p) * 0.45 + 2 * (1 - p) * p * 1.0 + p * p * 0.45;
      const x = p * w;
      const y = h * yn;

      if (!animate || prefersReducedMotion()) gsap.set(dot, { x, y });
      else gsap.to(dot, { x, y, duration: 0.7, ease: 'expo.out' });

      items.forEach((el, j) => {
        el.dataset.active = String(j === i);
      });
      if (numRef.current) numRef.current.textContent = `0${i + 1} / 03`;
      if (titleRef.current) titleRef.current.textContent = principles[i].title;
      if (pointRef.current) pointRef.current.textContent = `${Math.round(p * 100)}%`;
    };

    place(0, false);

    const triggers = items.map((el, i) =>
      ScrollTrigger.create({
        trigger: el,
        start: 'top 58%',
        end: 'bottom 58%',
        onToggle: (self) => {
          if (self.isActive) place(i);
        },
      }),
    );

    const onResize = () => {
      const active = items.findIndex((el) => el.dataset.active === 'true');
      place(active < 0 ? 0 : active, false);
    };
    window.addEventListener('resize', onResize);

    return () => {
      triggers.forEach((t) => t.kill());
      window.removeEventListener('resize', onResize);
    };
  });

  return (
    <section className="approach" id="approach" aria-labelledby="approach-title">
      <div className="section-head">
        <p className="label section-head__label">Approach</p>
        <h2 className="section-head__title" id="approach-title" data-reveal="up">
          How we hold.
        </h2>
        <p className="section-head__note">
          Three rules that decide what we build and what we leave out. They do not change with the
          size of the project.
        </p>
      </div>

      <div className="approach__grid">
        <div className="approach__stage" ref={stageRef}>
          <div className="stage__top">
            <span>Load stage</span>
            <span ref={numRef}>01 / 03</span>
          </div>
          <div className="stage__track" ref={trackRef}>
            <svg className="stage__svg" viewBox="0 0 100 60" preserveAspectRatio="none" aria-hidden="true">
              <line className="stage__ghost" x1="0" y1="27" x2="100" y2="27" />
              <path className="stage__curve" d="M0 27 Q 50 60 100 27" />
            </svg>
            <span className="stage__dot" ref={dotRef} aria-hidden="true" />
          </div>
          <div className="stage__bottom">
            <p className="stage__title" ref={titleRef}>
              {principles[0].title}
            </p>
            <div className="stage__readout">
              <span>Load point</span>
              <b ref={pointRef}>14%</b>
            </div>
          </div>
        </div>

        <ol className="chapters" ref={listRef}>
          {principles.map((p, i) => (
            <li className="chapter" key={p.title} data-active={i === 0}>
              <span className="chapter__num">{String(i + 1).padStart(2, '0')}</span>
              <h3>{p.title}</h3>
              <p>{p.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
