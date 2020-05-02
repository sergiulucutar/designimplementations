import { Interaction3d } from './components/interaction/interaction';
import { WorkInteraction } from './components/interaction/work-interaction';

const wrapperEl = document.querySelector('.wrapper');

let interaction, workInteraction;
let boundingBox;
const fixedTimeStep = 1.0 / 60.0;
function loop() {
  requestAnimationFrame(loop);

  if (isInteractionInView(interaction)) {
    if (interaction.isIntroFinished) {
      interaction.world.step(fixedTimeStep);
    }
    interaction.update();
    interaction.draw();
  }

  if (isInteractionInView(workInteraction)) {
    if (workInteraction.isIntroFinished) {
      workInteraction.world.step(fixedTimeStep);
    }
    workInteraction.update();
    workInteraction.draw();
  }
}

function isInteractionInView(interaction) {
  boundingBox = interaction.domEl.getBoundingClientRect();
  return (
    (boundingBox.top + window.scrollY >= window.pageYOffset &&
      boundingBox.top + window.scrollY <=
        window.pageYOffset + window.innerHeight) ||
    (boundingBox.bottom + window.scrollY > window.pageYOffset &&
      boundingBox.bottom + window.scrollY <
        window.pageYOffset + window.innerHeight)
  );
}

window.onresize = () => {
  interaction.reseize();
};

window.onload = () => {
  window.addEventListener('scroll', () => {
    wrapperEl.style = `transform: translateY(${-window.scrollY / 4}px)`;
  });

  interaction = new Interaction3d(document.querySelector('#home .interaction'));
  interaction.init(5);

  workInteraction = new WorkInteraction(
    document.querySelector('#work .interaction')
  );
  workInteraction.init(3);

  loop();
};
