import { gsap } from 'gsap/gsap-core';
import { CSSPlugin, Power2, TweenLite, TimelineLite } from 'gsap';

const loaderChars = {
  primary: [...document.querySelectorAll('.loader_text:nth-child(1) span')],
  secondary: [...document.querySelectorAll('.loader_text:nth-child(2) span')]
};
const transitionTime = 0.4;
let isWindowLoaded = false;

// Loading animation - middle (loop)
const loaderTimeline = new TimelineLite();
loaderTimeline.pause();
loaderTimeline
  .to(loaderChars.primary, 0, {
    opacity: 0,
    rotateX: -90,
    yPercent: 100,
    stagger: transitionTime / 10,
    ease: Power2.easeOut
  })
  .set(
    loaderChars.secondary,
    {
      yPercent: -100
    },
    0
  )
  .to(
    loaderChars.secondary,
    transitionTime,
    {
      opacity: 1,
      rotateX: 0,
      yPercent: 0,
      stagger: transitionTime / 10,
      ease: Power2.easeOut
    },
    0
  );

// Loader animation start
TweenLite.from(loaderChars.primary, transitionTime, {
  opacity: 0,
  rotateX: 90,
  yPercent: -100,
  stagger: transitionTime / 10,
  ease: Power2.easeOut,
  onComplete: () =>
    document.querySelector('.loader_text:nth-of-type(1)').classList.add('shown')
});

const int = setInterval(() => {
  if (isWindowLoaded) {
    // Kill the middle;
    loaderTimeline.progress(0);
    loaderTimeline.kill();

    // Loader animation end
    TweenLite.to(loaderChars.primary, transitionTime, {
      opacity: 0,
      rotateX: -90,
      yPercent: 100,
      stagger: transitionTime / 10,
      ease: Power2.easeOut,
      onComplete: () => {
        clearInterval();
        startIntro();
      }
    });
    clearInterval(int);
  } else {
    loaderTimeline.restart();
  }
}, 800);

function startIntro() {
  gsap.registerPlugin(CSSPlugin);
  const chars = [...document.querySelectorAll('.char')];
  const loaderEl = document.querySelector('.loader');

  loaderEl.classList.add('hide');

  const timeline = new TimelineLite();
  timeline
    .from(chars, transitionTime, {
      opacity: 0,
      rotateX: 90,
      yPercent: -100,
      stagger: transitionTime / 10,
      ease: Power2.easeOut
    })
    .call(() => document.querySelector('nav ul').classList.remove('hidden'), [])
    .call(() => startInteraction(), [], 1);
}
window.onload = () => (isWindowLoaded = true);

// setTimeout(() => (isWindowLoaded = true), 8000);
