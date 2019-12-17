import "./main.scss";

import Ball from "./components/ball";
import Platforms from "./components/platforms";
import { TweenLite } from "gsap/gsap-core";
import { Power4 } from "gsap/gsap-core";
import Camera from "./components/camera";
import { TimelineLite } from "gsap/gsap-core";
import Stage from "./components/stage";
import { Ground } from "./components/ground";

const domCanvas = document.querySelector("canvas");
const domCtx = domCanvas.getContext("2d");

// Off-screen canvas
const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");

class Game {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.bounds = {};

    this.camera = new Camera(this);
    this.stage = new Stage(this);

    this.ball = new Ball(this, [0, 0]);
    this.platforms = new Platforms(this);
    this.ground = null;

    this.cameraSpeed = 0.5;
    this.isAccendingPaused = true;

    this.height = 0;

    this.isGameOver = false;
    this.introFinished = false;

    // TODO: rethink this
    this.vCanvasPosition = [0, 0];
  }

  init() {
    this.ground = new Ground(this);
    this.platforms.init();

    // Set intro
    TweenLite.to(this.ball.position, 1, {
      1: this.bounds.height - this.groudHeight,
      ease: Power4.easeIn,
      onComplete: () => {
        this.shakeScreen();
        this.introFinished = true;
      }
    });
  }

  update() {
    if (!this.isGameOver) {
      // Game state checks
      this.checkGameOver();
      this.checkForLevelFinished();

      this.stage.update();

      if (!this.isAccendingPaused) {
        this.platforms.moveDown(this.camera.speed);
        this.height -= this.camera.speed;
      }
      if (
        this.camera.speed > 0.5 &&
        this.camera.isPointOutsideInnerBounds(this.ball.position) === 1
      ) {
        this.camera.speed = 0.5;
      }
    }
  }

  shakeScreen() {
    new TimelineLite()
      .to(this.vCanvasPosition, 0.1, { 0: -10 })
      .to(this.vCanvasPosition, 0.1, { 0: 8 })
      .to(this.vCanvasPosition, 0.1, { 0: -6 })
      .to(this.vCanvasPosition, 0.1, { 0: 4 })
      .to(this.vCanvasPosition, 0.1, { 0: -2 })
      .to(this.vCanvasPosition, 0.1, { 0: 0 });
  }

  draw() {
    this.ctx.clearRect(0, 0, this.bounds.width, this.bounds.height);
    domCtx.clearRect(0, 0, this.bounds.width, this.bounds.height);

    // this.ball.draw();
    // this.platforms.draw();
    // this.drawGround();
    this.stage.draw();

    domCtx.drawImage(canvas, this.vCanvasPosition[0], this.vCanvasPosition[1]);
  }

  resize() {
    this.bounds = {
      width: window.innerWidth,
      height: window.innerHeight
    };

    canvas.width = this.bounds.width;
    canvas.height = this.bounds.height;
    domCanvas.width = this.bounds.width;
    domCanvas.height = this.bounds.height;

    //  TODO: Move this from here - Initial ball position
    this.ball.position[0] = this.bounds.width / 2;
    this.ball.position[1] = -this.ball.radius * 3;

    this.camera.setInnerBound(this.bounds.height);

    // TODO Move this out
    this.groudHeight = this.bounds.height * 0.1;
  }

  ballMoveFinished() {
    if (this.camera.isPointOutsideInnerBounds(this.ball.position) < 0) {
      this.camera.speed = 5;
    } else {
      this.camera.speed = 0.5;
    }
  }

  checkGameOver() {
    if (!this.isAccendingPaused && this.ball.position[1] > this.bounds.height) {
      this.isAccendingPaused = true;
      this.isGameOver = true;
      document.body.classList.add("dead");
      this.ball.destroy();
      TweenLite.to(this.platforms, 1, { alpha: 0, ease: Power4.easeInOut });
    }
  }

  checkForLevelFinished() {
    if (this.ball.host === this.platforms.lastPlatform) {
      this.camera.speed = 0;
    }
  }
}

const game = new Game(canvas, ctx);
game.resize();
game.init();

const interval = 1000 / 60;
let then = Date.now();
(function loop() {
  requestAnimationFrame(loop);

  const now = Date.now();
  const delta = now - then;
  if (delta > interval) {
    then = now - (delta % interval);
    game.update();
    game.draw();
  }
})();

window.addEventListener("resize", () => game.resize());

document.addEventListener("click", event => {
  const hasHost = game.platforms.isPointInPlatform([
    event.clientX,
    event.clientY
  ]);
  if (hasHost && game.introFinished) {
    game.isAccendingPaused = false;
    game.ball.host = hasHost;
  }
});
