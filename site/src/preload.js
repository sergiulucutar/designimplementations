import { TimelineMax, gsap } from 'gsap/gsap-core';
import { CSSPlugin, Elastic } from 'gsap';

window.onload = () => {
  gsap.registerPlugin(CSSPlugin);
  const chars = [...document.querySelectorAll('.char')];

  const timeline = new TimelineMax();
  timeline
    .from(chars, 1.8, {
      opacity: 0,
      rotateX: 90,
      yPercent: -100,
      stagger: 0.03,
      ease: Elastic.easeOut
    })
    .call(() => document.querySelector('nav ul').classList.remove('hidden'), [])
    .call(() => startInteraction(), [], 1.8);
};
