import "./main.scss";
import "../../reset.scss";
import { TweenLite, Power4, Circ, Linear } from "gsap";

const canvasEl = document.querySelector("canvas");
const ctx = canvasEl.getContext("2d");

// Hold info about canvas objects
const shapeState = {
  position: [canvasEl.offsetWidth * 0.6, canvasEl.offsetHeight * 0.5]
};
// Hold info about animation
const animation = {
  intro: {
    angle: -Math.PI,
    intensity: 0,
    isFinished: false
  },
  angle: Math.PI / 2 / 20,
  rotatetionAngle: 0,
  shadows: {
    current: 1,
    max: 30
  }
};

// Initialize canvas and start animation
function init() {
  canvasEl.width = canvasEl.offsetWidth;
  canvasEl.height = canvasEl.offsetHeight;
  ctx.font = "bold 110px Arial";

  TweenLite.to(shapeState, 5, {
    r: canvasEl.offsetHeight * 0.5,
    ease: Power4.easeOut
  });
}

function update() {
  animation.rotatetionAngle += animation.angle / 10;
  if (animation.rotatetionAngle > animation.angle) {
    animation.rotatetionAngle = 0;
  }
  if (
    animation.intro.isFinished &&
    animation.shadows.current < animation.shadows.max
  ) {
    animation.shadows.current += 1;
  }
}

function drawTrail() {
  ctx.save();
  ctx.translate(0, 100);
  ctx.rotate(animation.rotatetionAngle);

  ctx.fillStyle = `hsla(0, 0%, 0%, 0.9)`;
  ctx.fillText("undertones", 0, 0);

  for (let i = 0; i < animation.shadows.current; i++) {
    ctx.rotate(animation.angle);
    ctx.fillStyle = `hsla(0, 0%, 0%, ${0.9 - i / animation.shadows.max})`;
    ctx.fillText("undertones", 0, 0);
  }
  ctx.restore();
}

function draw() {
  ctx.clearRect(0, 0, canvasEl.offsetWidth, canvasEl.offsetHeight);

  if (animation.intro.isFinished) {
    drawTrail();
    ctx.fillStyle = `hsla(0, 0%, 0%, 1)`;
    ctx.fillText("undertones", 0, 100);
  } else {
    ctx.save();
    ctx.translate(0, 100);
    ctx.rotate(animation.intro.angle);
    ctx.fillStyle = `hsla(0, 0%, ${100 - animation.intro.intensity * 100}%, ${
      animation.intro.intensity
    })`;
    ctx.fillText("undertones", 0, 0);
    ctx.restore();
  }
}

function loop() {
  requestAnimationFrame(loop);

  update();
  draw();
}

init();
loop();

var h1El = document.querySelector("header");
h1El.classList.add("show");
TweenLite.to(animation.intro, 1, {
  angle: 0,
  intensity: 1,
  ease: Linear.easeIn,
  onComplete: () => {
    animation.intro.isFinished = true;
  }
});
