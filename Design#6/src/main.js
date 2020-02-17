import "./styles/main.scss";

import Slider from "./components/slider";
import Textures from "./components/textures";

const textures = new Textures();
let sliderIndex = 4;

const sliderEl = document.querySelector("#slider");
const slider = new Slider(sliderEl, textures);
sliderEl.appendChild(slider.init());

slider.draw();
textures.load().then(() => {
  slider.next();
});

document.addEventListener("click", () => {
  slider.next();
});
