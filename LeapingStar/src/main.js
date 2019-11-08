import './main.scss';

import Ball from './components/ball';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

class Game {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.bounds = {};

    this.ball = new Ball(this.ctx);
  }

  update() { }

  draw() {
    this.ball.draw();
  }

  resize() {
    this.bounds = {
      width: window.innerWidth,
      height: window.innerHeight
    }

    canvas.width = this.bounds.width;
    canvas.height = this.bounds.height;
  }
}

const game = new Game(canvas, ctx);
game.resize();

(function loop() {
  requestAnimationFrame(loop);

  game.draw();
})();

window.addEventListener('resize', () => game.resize());
