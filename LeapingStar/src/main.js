import "./main.scss";

import Ball from "./components/ball";
import { Platforms, ShootingPlatform } from "./components/platforms";
import { TweenLite } from "gsap/gsap-core";
import { Power4 } from "gsap/gsap-core";
import Camera from "./components/camera";
import { TimelineLite } from "gsap/gsap-core";
import Stage from "./components/stage";
import Sound from "./components/sound";
import { Ground } from "./components/ground";
import Background from "./components/background";
import Shooter from "./components/shooter";
import { TweenMax } from "gsap/src/all";

const continueBtn = document.querySelector(".button-continue");
const overlayEl = document.querySelector(".overlay");

const domCanvas = document.querySelector("#game");
const domCtx = domCanvas.getContext("2d");

// Off-screen canvas
const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");

class Game {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.bounds = {};

    this.audio = new Sound();
    this.camera = new Camera(this);
    this.stage = new Stage(this);

    this.ball = new Ball(this, [0, -100]);
    this.platforms = new Platforms(this);
    this.ground = null;

    this.cameraSpeed = 0.5;
    this.isAccendingPaused = true;

    this.isGameOver = false;
    this.introFinished = false;

    this.background = new Background(this);
    // TODO: rethink this
    this.vCanvasPosition = [0, 0];

    this.shooter = new Shooter(this);
  }

  init() {
    this.score = 0;
    this.scoreEl = document.querySelector(".score span");
    this.scoreEl.innerText = this.score;

    this.ball.init();
    this.platforms.init();
    this.camera.position[1] = 0;
    this.ground = new Ground(this);

    this.isGameOver = false;
    this.introFinished = false;

    this.maxHeight = -this.platforms.maxHeight - this.bounds.height / 2;

    this.background.init();

    overlayEl.classList.remove("overlay-on");

    // Set intro
    TweenLite.to(this.ball.position, 1, {
      1: this.bounds.height - this.groudHeight,
      ease: Power4.easeIn,
      onComplete: () => {
        this.shakeScreen();

        // set the ball position as the start of it's tail
        this.ball.tail.push([
          this.bounds.width / 2,
          this.bounds.height - this.groudHeight
        ]);
        this.ball._host = {
          position: [
            this.bounds.width / 2,
            this.bounds.height - this.groudHeight
          ]
        };
      }
    });

    this.audio.init();
  }

  update() {
    if (!this.isGameOver) {
      // Game state checks
      this.checkGameOver();
      this.checkForLevelFinished();

      if (!this.isAccendingPaused) {
        this.camera.moveUp();
        this.background.update();
      }
    }
    this.stage.update();
  }

  shakeScreen() {
    this.background.shake();
    new TimelineLite({
      onComplete: () => {
        this.introFinished = true;
        TweenLite.to(this.platforms, 1, { alpha: 3, ease: Power4.easeOut });
      }
    })
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
    this.audio.play("magic");
    this.shakeScreen();

    if (this.camera.isPointOutsideInnerBounds(this.ball.position) < 0) {
      TweenLite.to(this.camera.position, 2, {
        1: this.camera.position[1] - this.bounds.height / 2,
        ease: Power4.easeOut,
        onUpdate: () => this.background.update()
      });
    }

    if (this.ball.host instanceof ShootingPlatform && !this.ball.host.visited) {
      this.isAccendingPaused = true;
      this.shooter.start();
    }

    if (!this.ball.host.visited) {
      this.updateScore();
      this.ball.host.visited = true;
    }
  }

  checkGameOver() {
    if (
      !this.isAccendingPaused &&
      this.ball.position[1] > this.camera.position[1] + this.bounds.height
    ) {
      this.isAccendingPaused = true;
      this.isGameOver = true;
      document.body.classList.add("dead");
      this.ball.destroy();
      TweenLite.to(this.platforms, 0.5, { alpha: 0, ease: Power4.easeInOut });
    }
  }

  checkForLevelFinished() {
    if (this.ball.host === this.platforms.lastPlatform && !this.ball.isInAir) {
      this.playEndGameAnimation();
      this.platforms.lastPlatform.isAnimated = true;
      this.isAccendingPaused = true;
      this.isGameOver = true;
    }
  }

  playEndGameAnimation() {
    const foreGround = document.querySelector(".foreground");
    foreGround.style = "opacity: 1";
    TweenLite.to(foreGround.style, 2, { opacity: 0, ease: Power4.easeIn });
    this.camera.position[1] = this.maxHeight + this.bounds.height / 8;
    continueBtn.classList.add("show");
  }

  updateScore() {
    this.score += 1;
    this.scoreEl.innerText = this.score;
    TweenMax.set(".score", { fontSize: 90 });
    TweenMax.to(".score", 0.4, { fontSize: 48, ease: Power4.easeOut });
  }
}

var game = new Game(canvas, ctx);
game.resize();

const interval = 1000 / 60;
let then = Date.now();
let now;
let delta;
function loop() {
  now = Date.now();
  delta = now - then;
  if (delta > interval) {
    then = now - (delta % interval);
    game.update();
    game.draw();
  }

  requestAnimationFrame(loop);
}

window.addEventListener("load", () => {
  game.init();
  loop();
});
window.addEventListener("resize", () => game.resize());

document.addEventListener("click", event => {
  if (game.ball.isInAir) {
    return;
  }

  if (game.shooter.isShooting) {
    game.shooter.handleClick(event);
    return;
  }

  const nextHost = game.platforms.isPointInPlatform([
    event.clientX,
    event.clientY + game.camera.position[1]
  ]);
  if (nextHost && nextHost !== game.ball.host && game.introFinished) {
    game.isAccendingPaused = false;
    game.ball.host = nextHost;
  }
});

continueBtn.addEventListener("click", () => {
  // document.body.style.background = "#011638";
  continueBtn.classList.remove("show");
  overlayEl.classList.add("overlay-on");

  // Wait for overlay transition to be finished
  setTimeout(() => {
    game.init();
  }, 2000);
});
