import LocomotiveScroll from 'locomotive-scroll';
import { HomeInteraction } from './components/interaction/home-interaction';
import { ContactInteraction } from './components/interaction/contact-interaction';

const homeInteraction = {
  el: null,
  isInView: false,
  interactionObj: null,
  scrollValue: 'interact3D'
};
const contactInteraction = {
  el: null,
  isInView: false,
  interactionObj: null,
  scrollValue: 'interaction-contact'
};

const fixedTimeStep = 1.0 / 90.0;
const fps = 100 / 6;
let now,
  then = Date.now();
function loop() {
  requestAnimationFrame(loop);

  now = Date.now();
  if (now - then > fps) {
    then = now;
    if (homeInteraction.isInView) {
      homeInteraction.interactionObj.physiscs.world.step(fixedTimeStep);
      homeInteraction.interactionObj.update();
      homeInteraction.interactionObj.draw();
    }

    if (contactInteraction.isInView) {
      contactInteraction.interactionObj.physiscs.world.step(fixedTimeStep);
      contactInteraction.interactionObj.update();
      contactInteraction.interactionObj.draw();
    }
  }
}

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
  if (value === homeInteraction.scrollValue) {
    if (way === SCROLL.ways.enter) {
      homeInteraction.isInView = true;
    } else {
      homeInteraction.isInView = false;
    }
  }

  if (value === contactInteraction.scrollValue) {
    if (way === SCROLL.ways.enter) {
      contactInteraction.isInView = true;
    } else {
      contactInteraction.isInView = false;
    }
  }
});

window.startInteraction = loop;

window.setupInteractions = () => {
  [...document.querySelectorAll('.work .project')].forEach(el => {
    el.addEventListener('mouseenter', setupSelectedImage.bind(this));
    el.addEventListener('mousemove', updateImagePosition.bind(this));
  });

  window.onresize = () => {
    homeInteraction.interactionObj.reseize();
  };

  // Home interaction start
  homeInteraction.el = document.querySelector('.home');
  homeInteraction.interactionObj = new HomeInteraction(
    homeInteraction.el.querySelector('.home .interaction')
  );
  homeInteraction.interactionObj.init();

  // Contact interaction start
  contactInteraction.el = document.querySelector('.contact');
  contactInteraction.interactionObj = new ContactInteraction(
    contactInteraction.el.querySelector('.contact .interaction')
  );
  contactInteraction.interactionObj.init();
};

let hoveredElImage;
function setupSelectedImage(event) {
  hoveredElImage = event.currentTarget.querySelector('.project_image_wrapper');
}
function updateImagePosition(event) {
  hoveredElImage.style['transform'] = `translate3d(${
    event.offsetX - hoveredElImage.offsetWidth / 2
  }px, ${event.offsetY - hoveredElImage.offsetHeight / 2}px, 0)`;
}

window.scrollToSection = className => {
  scroll.scrollTo(document.querySelector(`.${className}`));
};
