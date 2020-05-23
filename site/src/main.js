import { HomeInteraction } from './components/interaction/home-interaction';
import LocomotiveScroll from 'locomotive-scroll';
import { TweenLite, Elastic } from 'gsap';
import { ContactInteraction } from './components/interaction/contact-interaction';

// let interaction, homeEl, contactEl;
// let isInteractionInView = true;

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

const fixedTimeStep = 1.0 / 60.0;
function loop() {
  requestAnimationFrame(loop);

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

scroll.on('call', (value, way, obj) => {
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

window.startInteraction = () => {
  [...document.querySelectorAll('.work .project')].forEach(el => {
    el.addEventListener('mouseenter', setupSelectedImage.bind(this));
    el.addEventListener('mousemove', updateImagePosition.bind(this));
  });

  // Home interaction start
  homeInteraction.el = document.querySelector('#home');
  homeInteraction.interactionObj = new HomeInteraction(
    homeInteraction.el.querySelector('#home .interaction')
  );
  homeInteraction.interactionObj.init();

  // Contact interaction start
  contactInteraction.el = document.querySelector('#contact');
  contactInteraction.interactionObj = new ContactInteraction(
    contactInteraction.el.querySelector('#contact .interaction')
  );
  contactInteraction.interactionObj.init();

  loop();
};

let hoveredElImage;
function setupSelectedImage(event) {
  hoveredElImage = event.currentTarget.querySelector('.project_image_wrapper');
  TweenLite.from(hoveredElImage.querySelector('.project_image'), 0.6, {
    scale: 0,
    ease: Elastic.easeOut
  });
}
function updateImagePosition(event) {
  hoveredElImage.style['transform'] = `translate3d(${
    event.offsetX - hoveredElImage.offsetWidth / 2
  }px, ${event.offsetY - hoveredElImage.offsetHeight / 2}px, 0)`;
}

window.scrollToSection = id => {
  scroll.scrollTo(document.getElementById(id));
};

window.onresize = () => {
  homeInteraction.interactionObj.reseize();
};
