import "./main.scss";
import Slider from "./slider/slider";

const slider = new Slider();

slider.init();

const interval = 1000 / 60;
let then = Date.now();
let now, delta;
function loop() {
  // now = Date.now();
  // delta = now - then;
  // if (delta > interval) {
  //   then = now - (delta % interval);
  // }
  slider.draw();
  requestAnimationFrame(loop);
}

loop();
