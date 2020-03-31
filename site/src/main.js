import { Interaction3d } from './components/interaction/interaction';

var interaction; //= new Interaction3d();

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

window.onload = () => {
  interaction = new Interaction3d();
  interaction.init();
  loop();
};
