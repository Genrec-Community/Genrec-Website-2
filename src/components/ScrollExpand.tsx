'use client';

import { useRef, type ReactNode } from 'react';
import { gsap } from 'gsap';
import { usePage } from '@/engine/next';
import { prefersReducedMotion } from '@/engine';

export function ScrollExpand({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  usePage(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    gsap.set(el, { transformPerspective: 1400, transformOrigin: '50% 100%' });
    const tween = gsap.fromTo(
      el,
      { scale: 0.955, rotateX: 5, y: 44 },
      {
        scale: 1,
        rotateX: 0,
        y: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top 92%',
          end: 'top 42%',
          scrub: 0.6,
        },
      },
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  });

  return (
    <div ref={ref} className={['scroll-expand', className].filter(Boolean).join(' ')}>
      {children}
    </div>
  );
}
