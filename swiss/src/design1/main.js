import "./main.scss";
import "../../reset.scss";
import { TweenLite, Power4, TweenMax } from "gsap";

const canvasEl = document.querySelector("canvas");
const ctx = canvasEl.getContext("2d");

// Hold info about canvas objects
const shapeState = {
  position: [canvasEl.offsetWidth * 0.6, canvasEl.offsetHeight * 0.5],
  r: 0,
  rHeight: 45,
  angle: (2 * Math.PI) / 18,
  color: ["#CF246C", "#DBB215", "#00A8A8"]
};
const animation = {
  rotatetionAngle: 0
};

// Initialize canvas and start animation
function init() {
  canvasEl.width = canvasEl.offsetWidth;
  canvasEl.height = canvasEl.offsetHeight;
  ctx.globalCompositeOperation = "darken";

  TweenLite.to(shapeState, 5, {
    r: canvasEl.offsetHeight * 0.5,
    ease: Power4.easeOut
  });
}

// Draw flower
function draw() {
  ctx.clearRect(0, 0, canvasEl.offsetWidth, canvasEl.offsetHeight);

  ctx.save();
  ctx.translate(shapeState.position[0], shapeState.position[1]);
  // ctx.globalAlpha = 0.8;
  for (let i = 0; i < 9; i++) {
    ctx.rotate(shapeState.angle + animation.rotatetionAngle);
    ctx.beginPath();
    ctx.rect(
      -shapeState.r,
      -shapeState.rHeight / 2,
      shapeState.r * 2,
      shapeState.rHeight
    );
    ctx.fillStyle = shapeState.color[i % 3];
    ctx.fill();
  }
  ctx.restore();
}

// Update flowerroatation
function update() {
  animation.rotatetionAngle += 0.001;
}

function loop() {
  requestAnimationFrame(loop);

  update();
  draw();
}

init();
loop();

// Text animation
var h1El = document.querySelector("header");
setTimeout(() => {
  h1El.classList.add("show");
}, 2000);
