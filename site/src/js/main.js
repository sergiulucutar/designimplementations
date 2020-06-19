import { gsap } from 'gsap/gsap-core';
import { CSSPlugin, Power2, TimelineLite } from 'gsap';
import LocomotiveScroll from 'locomotive-scroll';

function startIntro() {
  gsap.registerPlugin(CSSPlugin);
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
    onStart: () => {
      document.querySelector('.loader').classList.add('hide');
    }
  });

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
    );
}
window.onload = () => startIntro();

// Images
[...document.querySelectorAll('.work li:not(:last-of-type) .project')].forEach(
  el => {
    el.addEventListener('mouseenter', setupSelectedImage.bind(this));
    el.addEventListener('mousemove', updateImagePosition.bind(this));
  }
);

let hoveredElImage;
function setupSelectedImage(event) {
  hoveredElImage = event.currentTarget.querySelector('.project_image_wrapper');
}
function updateImagePosition(event) {
  hoveredElImage.style['transform'] = `translate3d(${
    event.offsetX - hoveredElImage.offsetWidth / 2
  }px, ${event.offsetY - hoveredElImage.offsetHeight / 2}px, 0)`;
}

// Scroll
const SCROLL = {
  ways: {
    enter: 'enter',
    leave: 'leave'
  }
};
const scroll = new LocomotiveScroll({
  el: document.querySelector('[data-scroll-container]'),
  smooth: true
});
// Fix a locomotive-scroll bug
setTimeout(() => window.dispatchEvent(new Event('resize')), 10);

scroll.on('call', (value, way) => {
  if (!interactinWorker) {
    return;
  }

  if (value === 'interact3D') {
    if (way === SCROLL.ways.enter) {
      interactinWorker.postMessage({
        message: 'homeInView',
        payload: true
      });
    } else {
      interactinWorker.postMessage({
        message: 'homeInView',
        payload: false
      });
    }
  }
  if (value === 'interaction-contact') {
    if (way === SCROLL.ways.enter) {
      interactinWorker.postMessage({
        message: 'contactInView',
        payload: true
      });
    } else {
      interactinWorker.postMessage({
        message: 'contactInView',
        payload: false
      });
    }
  }
});

window.scrollToSection = className => {
  scroll.scrollTo(document.querySelector(`.${className}`));
};
