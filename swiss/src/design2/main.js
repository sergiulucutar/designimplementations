import "./main.scss";
import "../../reset.scss";
import { TweenLite, Power4 } from "gsap";

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
  rotatetionAngle: 0,
  angle: Math.PI / 2 / 20
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

function update() {
  animation.rotatetionAngle += animation.angle / 10;
  if (animation.rotatetionAngle > animation.angle) {
    animation.rotatetionAngle = 0;
  }
}

function draw() {
  ctx.clearRect(0, 0, canvasEl.offsetWidth, canvasEl.offsetHeight);

  ctx.font = "bold 110px Arial";
  ctx.fillText("undertones", 0, 100);

  ctx.save();
  ctx.translate(0, 100);

  ctx.rotate(animation.rotatetionAngle);
  ctx.font = "bold 110px Arial";
  ctx.fillStyle = `hsla(0, 0%, 0%, 0.9)`;
  ctx.fillText("undertones", 0, 0);

  for (let i = 0; i < 30; i++) {
    ctx.rotate(animation.angle);
    ctx.fillStyle = `hsla(0, 0%, 0%, ${0.9 - i / 30})`;
    ctx.fillText("undertones", 0, 0);
  }
  ctx.restore();
}

init();

function loop() {
  requestAnimationFrame(loop);

  update();
  draw();
}

loop();
