import { WorkInteraction } from './components/interaction/work-interaction';
import { HomeInteraction } from './components/interaction/home-interaction';

const wrapperEl = document.querySelector('.wrapper');

let interaction, workInteraction;
let boundingBox;
const fixedTimeStep = 1.0 / 60.0;
function loop() {
  requestAnimationFrame(loop);

  if (isInteractionInView(interaction)) {
    if (interaction.isIntroFinished) {
      interaction.physiscs.world.step(fixedTimeStep);
    }
    interaction.update();
    interaction.draw();
  }

  if (isInteractionInView(workInteraction)) {
    if (workInteraction.isIntroFinished) {
      workInteraction.physiscs.world.step(fixedTimeStep);
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

window.startInteraction = () => {
  window.addEventListener('scroll', () => {
    wrapperEl.style = `transform: translateY(${-window.scrollY / 4}px)`;
  });

  interaction = new HomeInteraction(
    document.querySelector('#home .interaction')
  );
  interaction.init();

  workInteraction = new WorkInteraction(
    document.querySelector('#work .interaction')
  );
  workInteraction.init(3);

  loop();
};
