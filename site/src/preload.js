import { TimelineLite } from 'gsap/gsap-core';

window.onload = () => {
  const timeline = new TimelineLite();
  timeline
    .call(() => document.querySelector('h1').classList.remove('hidden'), [])
    .call(
      () => document.querySelector('nav ul').classList.remove('hidden'),
      [],
      1
    )
    .call(() => startInteraction(), [], 2);
};
