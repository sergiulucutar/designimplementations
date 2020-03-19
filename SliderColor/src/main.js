import "./reset.scss";
import "./main.scss";

const sliderEl = document.querySelector(".slider");
const sliderIndexEl = document.querySelector(".controls_index");
const progressBarEl = document.querySelector(".progress-bar");

const state = {
  index: 0,
  slidesCount: 5
};

window.slide = (delta = 1) => {
  if (state.index === 0 && delta < 0) {
    return;
  }

  sliderEl
    .querySelector(`.slide:nth-child(${state.index + 1})`)
    .classList.remove("displayed");

  state.index = (state.index + delta) % state.slidesCount;

  sliderEl
    .querySelector(`.slide:nth-child(${state.index + 1})`)
    .classList.add("displayed");

  sliderEl.style = `transform: translateX(${state.index * -100}%)`;
  progressBarEl.style = `width: ${state.index * 20 + 20}%`;
  sliderIndexEl.style = `transform: translateY(${80 - state.index * 20}%)`;
};
