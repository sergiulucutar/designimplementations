import { HomeInteraction } from './components/interaction/home-interaction';
import { ContactInteraction } from './components/interaction/contact-interaction';
import { SphereProto } from './components/interaction/objets/sphere';

const fixedTimeStep = 1.0 / 90.0;
const fps = 100 / 9;
const homeInterationState = {
  obj: null,
  isInView: true
};
const contactInteractionState = {
  obj: null,
  isInView: false
};
let isBlurred = false,
  now,
  then = Date.now();

function loop() {
  if (isBlurred) {
    return;
  }
  now = Date.now();
  if (now - then > fps) {
    then = now;
    if (homeInterationState.isInView) {
      homeInterationState.obj.physiscs.world.step(fixedTimeStep);
      homeInterationState.obj.update();
      homeInterationState.obj.draw();
    }

    if (contactInteractionState.isInView) {
      contactInteractionState.obj.physiscs.world.step(fixedTimeStep);
      contactInteractionState.obj.update();
      contactInteractionState.obj.draw();
    }
  }

  requestAnimationFrame(loop);
}

function startInteraction() {
  homeInterationState.obj.showObjects();
  contactInteractionState.obj.showObjects();
  loop();
}

function setupInteractions({ homeInteraction, contactInteraction }) {
  SphereProto.setShapeSize(
    2 + (homeInteraction.bounds[0] / homeInteraction.bounds[1]) * 2
  );

  homeInterationState.obj = new HomeInteraction(
    homeInteraction.canvas,
    homeInteraction.textCanvas,
    homeInteraction.bounds
  );
  homeInterationState.obj.init();

  // Contact interaction start
  contactInteractionState.obj = new ContactInteraction(
    contactInteraction.canvas,
    contactInteraction.textCanvas,
    contactInteraction.bounds
  );
  contactInteractionState.obj.init();

  startInteraction();
}

onmessage = event => {
  switch (event.data.message) {
    case 'setup':
      setupInteractions(event.data.payload);
      break;
    case 'homeInView':
      homeInterationState.isInView = event.data.payload;
      break;
    case 'contactInView':
      contactInteractionState.isInView = event.data.payload;
      break;
    case 'homeMouseDown':
      homeInterationState.obj.selectSphere(event.data.payload);
      break;
    case 'homeMouseMove':
      homeInterationState.obj.moveSphere(event.data.payload);
      break;
    case 'homeMouseUp':
      homeInterationState.obj.leaveSphere();
      break;
    case 'contactMouseDown':
      contactInteractionState.obj.selectSphere(event.data.payload);
      break;
    case 'contactMouseMove':
      contactInteractionState.obj.moveSphere(event.data.payload);
      break;
    case 'contactMouseUp':
      contactInteractionState.obj.leaveSphere();
      break;
    case 'stopLoop':
      isBlurred = true;
      break;
    case 'startLoop':
      isBlurred = false;
      loop();
      break;
  }
};
