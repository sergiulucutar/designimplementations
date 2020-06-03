import { gsap } from 'gsap/gsap-core';
import { CSSPlugin, Power2, TimelineLite } from 'gsap';

function startIntro() {
  gsap.registerPlugin(CSSPlugin);
  setupInteractions();
  const charsFirstWord = [
    ...document.querySelectorAll('h1 > span:nth-of-type(1) .char')
  ];
  const charsSecondWord = [
    ...document.querySelectorAll('h1 > span:nth-of-type(2) .char')
  ];
  const charsThirdWord = [
    ...document.querySelectorAll('h1 > span:nth-of-type(3) .char')
  ];
  const timeline = new TimelineLite({
    onStart: () => document.querySelector('.loader').classList.add('hide')
  });

  setTimeout(() => {
    timeline
      .from(charsFirstWord, 0.8, {
        opacity: 0,
        rotateX: 90,
        yPercent: -100,
        stagger: 0.04,
        ease: Power2.easeOut
      })
      .from(
        charsSecondWord,
        0.8,
        {
          opacity: 0,
          rotateX: 90,
          yPercent: -100,
          stagger: 0.04,
          ease: Power2.easeOut
        },
        0
      )
      .from(
        charsThirdWord,
        0.8,
        {
          opacity: 0,
          rotateX: 90,
          yPercent: -100,
          stagger: 0.04,
          ease: Power2.easeOut
        },
        0
      )
      .call(() => startInteraction());
  }, 0);
}
window.onload = () => startIntro();
