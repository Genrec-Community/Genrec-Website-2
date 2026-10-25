'use client';

import { useEffect } from 'react';

export default function PageReady() {
  useEffect(() => {
    const w = window as typeof window & { __genrecPageReady?: boolean };
    w.__genrecPageReady = true;
    window.dispatchEvent(new Event('genrec:page-ready'));
  }, []);

  return null;
}
