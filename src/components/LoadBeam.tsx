'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePage } from '@/engine/next';
import { ease, isTouch, onScroll, prefersReducedMotion } from '@/engine';

const W = 1000;
const BASE_Y = 62;
const MAX_SAG = 120;
const BASE_LOAD = 0.34;

function curve(point: number, load: number) {
  const x = point * W;
  const sag = 24 + load * MAX_SAG;
  const y = BASE_Y + sag;
  const c1 = x * 0.34;
  const c2 = x * 0.66;
  const c3 = x + (W - x) * 0.34;
  const c4 = x + (W - x) * 0.66;
  const d =
    `M0 ${BASE_Y} C ${c1.toFixed(2)} ${BASE_Y}, ${c2.toFixed(2)} ${y.toFixed(2)}, ${x.toFixed(2)} ${y.toFixed(2)} ` +
    `C ${c3.toFixed(2)} ${y.toFixed(2)}, ${c4.toFixed(2)} ${BASE_Y}, ${W} ${BASE_Y}`;
  return { d, x, y, sag };
}

const DEFAULT = curve(0.5, BASE_LOAD);

const ticks = Array.from({ length: 11 }, (_, i) => i * 100);

export function LoadBeam() {
  const rootRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const needleRef = useRef<SVGLineElement>(null);
  const dotRef = useRef<SVGCircleElement>(null);
  const readoutRef = useRef<HTMLDivElement>(null);
  const loadRef = useRef<HTMLElement>(null);
  const deflRef = useRef<HTMLElement>(null);
  const statusRef = useRef<HTMLSpanElement>(null);
  const hintRef = useRef<HTMLSpanElement>(null);

  usePage(({ intro }) => {
    const root = rootRef.current;
    const frame = frameRef.current;
    if (!root || !frame) return;

    const hero = root.closest('.hero') as HTMLElement | null;
    const title = hero?.querySelector<HTMLElement>('.hero__title') ?? null;
    const path = pathRef.current;
    const needle = needleRef.current;
    const dot = dotRef.current;

    const state = {
      load: BASE_LOAD,
      point: 0.5,
      targetLoad: BASE_LOAD,
      targetPoint: 0.5,
      hovering: false,
      pressed: false,
    };

    const render = (load: number, point: number) => {
      const c = curve(point, load);
      path?.setAttribute('d', c.d);
      needle?.setAttribute('x1', c.x.toFixed(2));
      needle?.setAttribute('x2', c.x.toFixed(2));
      needle?.setAttribute('y2', c.y.toFixed(2));
      dot?.setAttribute('cx', c.x.toFixed(2));
      dot?.setAttribute('cy', c.y.toFixed(2));
      if (title) gsap.set(title, { y: Math.max(0, load - BASE_LOAD) * 10 });
      if (loadRef.current) loadRef.current.textContent = load.toFixed(2);
      if (deflRef.current) deflRef.current.textContent = `${Math.round((load * 0.78 + 0.22) * 100)}%`;
    };

    if (prefersReducedMotion()) {
      render(0.42, 0.5);
      if (statusRef.current) statusRef.current.textContent = 'STATIC';
      return;
    }

    if (isTouch() && hintRef.current) hintRef.current.textContent = 'SCROLL TO LOAD.';
    frame.style.cursor = 'crosshair';

    const onMove = (e: PointerEvent) => {
      if (!hero) return;
      const r = hero.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;
      state.hovering = true;
      state.targetPoint = gsap.utils.clamp(0.07, 0.93, x);
      state.targetLoad = BASE_LOAD + gsap.utils.clamp(0, 1, y) * 0.16;
    };
    const onLeave = () => {
      state.hovering = false;
      state.targetLoad = BASE_LOAD;
    };
    const onDown = (e: PointerEvent) => {
      if (e.button !== 0) return;
      state.pressed = true;
      state.targetLoad = 0.98;
    };
    const onUp = () => {
      state.pressed = false;
      state.targetLoad = BASE_LOAD;
    };

    const touch = isTouch();

    if (hero && !touch) {
      hero.addEventListener('pointermove', onMove);
      hero.addEventListener('pointerleave', onLeave);
    }
    if (!touch) {
      frame.addEventListener('pointerdown', onDown);
      window.addEventListener('pointerup', onUp);
    }

    const offScroll = onScroll(({ velocity }) => {
      if (!state.pressed && !state.hovering) {
        state.targetLoad = BASE_LOAD + Math.min(0.18, Math.abs(velocity) * 0.004);
      }
    });

    const tick = (time: number) => {
      state.load += (state.targetLoad - state.load) * 0.09;
      state.point += (state.targetPoint - state.point) * 0.09;
      if (!state.pressed && !state.hovering && state.targetLoad !== BASE_LOAD) {
        state.targetLoad += (BASE_LOAD - state.targetLoad) * 0.02;
      }
      const load = gsap.utils.clamp(0, 1, state.load + Math.sin(time * 0.55) * 0.012);
      const point = gsap.utils.clamp(0.04, 0.96, state.point + Math.sin(time * 0.21) * 0.004);
      render(load, point);
    };

    gsap.ticker.add(tick);

    const st = ScrollTrigger.create({
      trigger: hero ?? root,
      start: 'top top',
      end: 'bottom top',
      onToggle: (self) => {
        if (self.isActive) gsap.ticker.add(tick);
        else gsap.ticker.remove(tick);
      },
    });

    if (!prefersReducedMotion()) {
      intro.add(
        gsap.fromTo(
          frame,
          { clipPath: 'inset(0% 100% 0% 0%)' },
          { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.5, ease: ease.out },
        ),
        0.35,
      );
      if (readoutRef.current) {
        intro.fromTo(readoutRef.current, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.8 }, 0.95);
      }
    }

    return () => {
      gsap.ticker.remove(tick);
      st.kill();
      offScroll();
      if (hero && !touch) {
        hero.removeEventListener('pointermove', onMove);
        hero.removeEventListener('pointerleave', onLeave);
      }
      if (!touch) {
        frame.removeEventListener('pointerdown', onDown);
        window.removeEventListener('pointerup', onUp);
      }
    };
  });

  return (
    <div className="beam" ref={rootRef} aria-hidden="true">
      <div className="beam__frame" ref={frameRef}>
        <svg className="beam__svg" viewBox={`0 0 ${W} 220`} preserveAspectRatio="none" focusable="false">
          <line className="beam__top" x1="0" y1="8" x2={W} y2="8" />
          {ticks.map((x) => (
            <line key={x} className="beam__tick" x1={x} y1="8" x2={x} y2={x % 200 === 0 ? 20 : 14} />
          ))}
          <line className="beam__ghost" x1="0" y1={BASE_Y} x2={W} y2={BASE_Y} />
          <path className="beam__curve" ref={pathRef} d={DEFAULT.d} />
          <line
            className="beam__needle"
            ref={needleRef}
            x1={DEFAULT.x}
            y1="8"
            x2={DEFAULT.x}
            y2={DEFAULT.y}
          />
          <circle className="beam__dot" ref={dotRef} cx={DEFAULT.x} cy={DEFAULT.y} r="5" />
        </svg>
      </div>
      <div className="beam__readout" ref={readoutRef}>
        <span className="beam__live">
          <i className="beam__pulse" />
          <span ref={statusRef}>Live</span>
        </span>
        <span>
          Load <b ref={loadRef}>{BASE_LOAD.toFixed(2)}</b>
        </span>
        <span>
          Deflection <b ref={deflRef}>48%</b>
        </span>
        <span className="beam__hint" ref={hintRef}>
          Move to load. Press to test.
        </span>
      </div>
    </div>
  );
}
