import { Interaction3d } from './components/interaction/interaction';

const wrapperEl = document.querySelector('.wrapper');

var interaction;
var fixedTimeStep = 1.0 / 60.0;
function loop() {
  requestAnimationFrame(loop);

  // if (lastTime !== undefined) {
  //   dt = (time - lastTime) / 1000;
  if (interaction.isIntroFinished) {
    interaction.world.step(fixedTimeStep);
  }
  interaction.update();
  interaction.draw();
  // }

  // lastTime = time;
}

window.onresize = () => {
  interaction.reseize();
};

var scroll = 0;
window.onload = () => {
  window.addEventListener('scroll', (event) => {
    wrapperEl.style = `transform: translateY(${-window.scrollY / 4}px)`;
  });

  interaction = new Interaction3d();
  interaction.init();
  loop();
};
