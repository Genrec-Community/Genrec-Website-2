// Primary buttons fill from the pointer's entry point. The fill is ink; the label inverts.
import { gsap } from 'gsap';
import { ease, isTouch, onPage, prefersReducedMotion } from '@/engine';

export const buttonFill = () =>
  onPage(() => {
    if (isTouch() || prefersReducedMotion()) return;
    const off: (() => void)[] = [];

    document.querySelectorAll<HTMLElement>('[data-fill]').forEach((btn) => {
      const fill = btn.querySelector<HTMLElement>('.btn__fill');
      if (!fill) return;

      const at = (e: PointerEvent) => {
        const r = btn.getBoundingClientRect();
        return `${e.clientX - r.left}px ${e.clientY - r.top}px`;
      };

      let closed = true;
      const open = (point: string) => {
        if (closed) gsap.set(fill, { clipPath: `circle(0% at ${point})` });
        closed = false;
        btn.classList.add('is-filled');
        gsap.to(fill, {
          clipPath: `circle(150% at ${point})`,
          duration: 0.6,
          ease: ease.soft,
          overwrite: true,
        });
      };
      const close = (point: string) => {
        btn.classList.remove('is-filled');
        gsap.to(fill, {
          clipPath: `circle(0% at ${point})`,
          duration: 0.5,
          ease: ease.soft,
          overwrite: true,
          onComplete: () => { closed = true; },
        });
      };

      const enter = (e: PointerEvent) => open(at(e));
      const leave = (e: PointerEvent) => close(at(e));
      const focus = () => { if (btn.matches(':focus-visible')) open('50% 50%'); };
      const blur = () => close('50% 50%');

      btn.addEventListener('pointerenter', enter);
      btn.addEventListener('pointerleave', leave);
      btn.addEventListener('focus', focus);
      btn.addEventListener('blur', blur);
      off.push(() => {
        btn.removeEventListener('pointerenter', enter);
        btn.removeEventListener('pointerleave', leave);
        btn.removeEventListener('focus', focus);
        btn.removeEventListener('blur', blur);
      });
    });

    return () => off.forEach((fn) => fn());
  });
