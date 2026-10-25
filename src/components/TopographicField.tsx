'use client';

import { useEffect, useRef, useState } from 'react';
import { LottieLight, type LottieHandle } from 'lottie-react';

type Props = {
  className?: string;
  tone?: 'ink' | 'paper';
};

export function TopographicField({ className, tone = 'ink' }: Props) {
  const hostRef = useRef<HTMLDivElement>(null);
  const lottieRef = useRef<LottieHandle>(null);
  const [visible, setVisible] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches);

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '400px 0px' },
    );
    observer.observe(host);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={hostRef}
      className={['topo', `topo--${tone}`, className].filter(Boolean).join(' ')}
      aria-hidden="true"
    >
      {visible ? (
        <LottieLight
          lottieRef={lottieRef}
          src="/lottie/topographic.json"
          loop={false}
          autoplay={!reduced}
          subscriptions={{
            ready: () => {
              if (reduced) lottieRef.current?.seek(124);
            },
          }}
          rendererSettings={{ preserveAspectRatio: 'xMidYMid slice' }}
        />
      ) : null}
    </div>
  );
}
