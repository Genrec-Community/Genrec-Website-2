// Declarative motion through data attributes. Authoring happens in markup:
//   data-reveal="up|fade|clip|scale"  block reveal
//   data-intro                        play with the page intro instead of on scroll
//   data-delay="0.2"                  extra delay (seconds)
//   data-parallax="0.15"              scrubbed vertical drift (fraction of element height)
// Every effect is skipped under reduced motion. Without JS, nothing is hidden.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ease, prefersReducedMotion } from './env';

gsap.registerPlugin(ScrollTrigger);

function blockTween(el: HTMLElement, isIntro: boolean) {
  const kind = el.dataset.reveal || 'up';
  const delay = parseFloat(el.dataset.delay || '0');
  const from: gsap.TweenVars =
    kind === 'fade' ? { autoAlpha: 0 }
    : kind === 'clip' ? { clipPath: 'inset(100% 0% 0% 0%)', autoAlpha: 1 }
    : kind === 'scale' ? { scale: 1.15, clipPath: 'inset(12% 12% 12% 12%)', autoAlpha: 1 }
    : { y: 48, autoAlpha: 0 };
  const to: gsap.TweenVars =
    kind === 'clip' || kind === 'scale' ? { clipPath: 'inset(0% 0% 0% 0%)', scale: 1 } : {};

  return gsap.fromTo(el, from, {
    ...to,
    y: 0,
    autoAlpha: 1,
    duration: kind === 'fade' ? 1.1 : 1.3,
    ease: ease.out,
    delay,
    scrollTrigger: isIntro ? undefined : { trigger: el, start: 'top 90%', once: true },
  });
}

/** Wire every reveal inside `root`. Returns the intro timeline (paused) for the page entrance. */
export function initReveals(root: ParentNode = document) {
  const intro = gsap.timeline({ paused: true });
  if (prefersReducedMotion()) return intro;

  root.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
    const isIntro = el.hasAttribute('data-intro');
    const tween = blockTween(el, isIntro);
    if (isIntro) intro.add(tween, 0);
  });

  root.querySelectorAll<HTMLElement>('[data-parallax]').forEach((el) => {
    const amount = parseFloat(el.dataset.parallax || '0.15');
    gsap.fromTo(
      el,
      { yPercent: -amount * 100 },
      {
        yPercent: amount * 100,
        ease: 'none',
        scrollTrigger: {
          trigger: el.parentElement || el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      },
    );
  });

  return intro;
}
