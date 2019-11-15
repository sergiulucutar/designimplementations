import './main.scss';

import Ball from './components/ball';
import Platforms from './components/platforms';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

class Game {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.bounds = {};

    this.ball = new Ball(this, [0, 0]);
    this.platforms = new Platforms(this);

    this.gravity = 1;
  }

  init() {
    this.platforms.init();
  }

  update() {
    this.ball.update();
    this.platforms.update();
    this.platforms.checkForPlatformCollisions(this.ball);
  }

  draw() {
    this.ctx.clearRect(0, 0, this.bounds.width, this.bounds.height);
    this.ball.draw();
    this.platforms.draw();
  }

  resize() {
    this.bounds = {
      width: window.innerWidth,
      height: window.innerHeight
    }

    canvas.width = this.bounds.width;
    canvas.height = this.bounds.height;

    this.ball.position[0] = this.bounds.width / 2;
    this.ball.position[1] = this.bounds.height;
  }
}

const game = new Game(canvas, ctx);
game.resize();
game.init();

const interval = 1000/60;
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

window.addEventListener('resize', () => game.resize());

document.addEventListener('click', () => {
  game.ball.jump();
})