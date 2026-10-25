// Global motion for GenRec AI. Runs once on the client, before the first page initializes.
import { gsap } from 'gsap';
import { ease, onScroll, setTransition } from '@/engine';
import { buttonFill } from './buttonFill';

export function setupMotion() {
  // A press test: the page is compressed to a seam, then released.
  setTransition({
    leave: (c) => {
      const panel = c.querySelector('.curtain__panel');
      const needle = c.querySelector('.curtain__needle');
      return gsap
        .timeline()
        .set(c, { autoAlpha: 1 })
        .set(panel, { clipPath: 'inset(50% 0% 50% 0%)' })
        .fromTo(needle, { scaleX: 0, autoAlpha: 1 }, { scaleX: 1, duration: 0.28, ease: ease.inOut })
        .to(
          panel,
          { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.55, ease: ease.inOut },
          '-=0.06',
        )
        .to(needle, { autoAlpha: 0, duration: 0.18 }, '-=0.2');
    },
    enter: (c) => {
      const panel = c.querySelector('.curtain__panel');
      const needle = c.querySelector('.curtain__needle');
      return gsap
        .timeline()
        .set(needle, { scaleX: 1, autoAlpha: 1 })
        .to(panel, { clipPath: 'inset(50% 0% 50% 0%)', duration: 0.6, ease: ease.inOut })
        .to(needle, { scaleX: 0, duration: 0.32, ease: ease.inOut }, '-=0.15')
        .set(c, { autoAlpha: 0 });
    },
  });

  gsap.set('.scroll-load__fill', { scaleX: 0 });
  onScroll(({ progress }) => {
    gsap.set('.scroll-load__fill', { scaleX: progress });
  });

  buttonFill();
}
