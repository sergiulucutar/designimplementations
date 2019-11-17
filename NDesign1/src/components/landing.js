import { TweenLite } from "gsap";

const mainEl = document.querySelector("main");
const videoWrapperEl = mainEl.querySelector(".video");
const videoCaptureEl = mainEl.querySelector(".video_capture");
const bannerWrapper = mainEl.querySelector(".banner_wrapper:last-of-type");

const state = {
  width: 0
};
let animation;

mainEl.addEventListener("wheel", event => {
  if (animation) {
    animation.kill();
  }
  animation = TweenLite.to(state, 2, {
    width: `+=${Math.sign(event.deltaY) * 50}`,
    onUpdate: () => {
      state.width = Math.min(state.width, 100);
      state.width = Math.max(state.width, 0);
      videoWrapperEl.style = `transform: translateX(-${state.width}%)`;
      videoCaptureEl.style = `transform: translateX(-${state.width * 2.8}%)`;
      bannerWrapper.style = `clip: rect(0px, ${50 -
        state.width / 2}vw, 100px, 0px);`;
    }
  });
});
