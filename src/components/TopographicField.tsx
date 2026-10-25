'use client';

import { useEffect, useRef, useState } from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import type { DotLottie } from '@lottiefiles/dotlottie-react';

type Props = {
  className?: string;
  tone?: 'ink' | 'paper';
};

export function TopographicField({ className, tone = 'ink' }: Props) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches);

    const show = () => {
      const idle = window.requestIdleCallback;
      if (idle) idle(() => setVisible(true), { timeout: 1800 });
      else window.setTimeout(() => setVisible(true), 900);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          show();
          observer.disconnect();
        }
      },
      { rootMargin: '250px 0px' },
    );
    observer.observe(host);

    return () => observer.disconnect();
  }, []);

  const onRef = (instance: DotLottie | null) => {
    if (!instance || !reduced) return;
    const settle = () => instance.setFrame(instance.totalFrames - 1);
    if (instance.isLoaded) settle();
    else instance.addEventListener('load', settle);
  };

  return (
    <div
      ref={hostRef}
      className={['topo', `topo--${tone}`, className].filter(Boolean).join(' ')}
      aria-hidden="true"
    >
      {visible ? (
        <DotLottieReact
          src="/lottie/topographic.lottie"
          loop={false}
          autoplay={!reduced}
          dotLottieRefCallback={onRef}
          layout={{ fit: 'cover', align: [0.5, 0.5] }}
          renderConfig={{ autoResize: true, freezeOnOffscreen: true, quality: 75, devicePixelRatio: 1.5 }}
        />
      ) : null}
    </div>
  );
}
