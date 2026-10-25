'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ease, onScroll, prefersReducedMotion, scrollState, startScroll, stopScroll } from '@/engine';
import { nav, site } from '@/data/site';

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const firstRun = useRef(true);
  const restoreFocus = useRef(false);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;
    gsap.set(bar, { scaleX: scrollState().progress });
    return onScroll(({ progress }) => {
      gsap.set(bar, { scaleX: progress });
    });
  }, []);

  useEffect(() => {
    gsap.set(barRef.current, { scaleX: 0 });
  }, [pathname]);

  useEffect(() => {
    const menu = menuRef.current;
    if (!menu) return;
    if (firstRun.current) {
      firstRun.current = false;
      menu.style.visibility = 'hidden';
      return;
    }

    const lines = menu.querySelectorAll<HTMLElement>('.menu__line');
    gsap.killTweensOf([menu, ...lines]);

    if (open) {
      restoreFocus.current = false;
      menu.style.visibility = 'visible';
      stopScroll();
      if (prefersReducedMotion()) {
        gsap.set(menu, { clipPath: 'inset(0% 0% 0% 0%)' });
        gsap.set(lines, { yPercent: 0 });
      } else {
        gsap
          .timeline()
          .to(menu, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.7, ease: ease.inOut })
          .fromTo(lines, { yPercent: 110 }, { yPercent: 0, duration: 0.85, stagger: 0.07, ease: ease.out }, '-=0.35');
      }
      const first = linksRef.current?.querySelector<HTMLElement>('a');
      window.setTimeout(() => first?.focus(), prefersReducedMotion() ? 0 : 260);
    } else {
      const finish = () => {
        menu.style.visibility = 'hidden';
        startScroll();
        if (restoreFocus.current) buttonRef.current?.focus();
        restoreFocus.current = false;
      };
      if (prefersReducedMotion()) {
        finish();
      } else {
        gsap.to(menu, {
          clipPath: 'inset(0% 0% 100% 0%)',
          duration: 0.5,
          ease: ease.inOut,
          onComplete: finish,
        });
      }
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        restoreFocus.current = true;
        setOpen(false);
        return;
      }
      if (e.key !== 'Tab') return;
      const focusables = menuRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])',
      );
      if (!focusables || !focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  const close = () => {
    restoreFocus.current = true;
    setOpen(false);
  };

  return (
    <>
      <header className="site-header">
        <Link href="/" className="brand" aria-label={`${site.name} home`}>
          {site.wordmark}
          <span className="brand__dot" aria-hidden="true" />
        </Link>
        <nav className="site-nav" aria-label="Primary">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={pathname === item.href ? 'page' : undefined}
            >
              {item.label}
            </Link>
          ))}
          <a className="nav-cta" href={`mailto:${site.email}`}>
            Start a project
            <span className="nav-cta__dot" aria-hidden="true" />
          </a>
        </nav>
        <button
          ref={buttonRef}
          type="button"
          className="menu-btn"
          aria-expanded={open}
          aria-controls="menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? 'Close' : 'Menu'}
        </button>
      </header>
      <div className="scroll-load" aria-hidden="true">
        <div ref={barRef} className="scroll-load__fill" />
      </div>

      <div id="menu" ref={menuRef} className="menu" inert={!open} aria-hidden={!open}>
        <div className="menu__top">
          <Link href="/" className="brand" onClick={() => setOpen(false)}>
            {site.wordmark}
            <span className="brand__dot" aria-hidden="true" />
          </Link>
          <button type="button" className="menu__close" onClick={close}>
            Close
          </button>
        </div>
        <div className="menu__links" ref={linksRef}>
          {nav.map((item) => (
            <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>
              <span className="menu__line">{item.label}</span>
            </Link>
          ))}
          <a href={`mailto:${site.email}`} onClick={() => setOpen(false)}>
            <span className="menu__line">Start a project</span>
          </a>
        </div>
        <div className="menu__foot">
          <span>{site.location}</span>
          <a href={`mailto:${site.email}`}>{site.email}</a>
          <a href={site.socials[0].href} target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
        </div>
      </div>
    </>
  );
}
