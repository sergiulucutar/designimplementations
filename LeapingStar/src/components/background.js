import { random } from './utils';

export default class Background {
  constructor(game) {
    this.game = game;

    this.layers = null;
    this.progres = 0;
  }

  init() {
    this.progres = 0;

    this.paralax = document.querySelector('.paralax');
    this.layers = [...document.querySelectorAll('path')];
    this.bushLayer = document.querySelector('.b_bush');

    this.canvasEl = this.paralax.querySelector('canvas');

    this.resize();
    this.drawStars();
    this.update();
  }

  resize() {
    this.canvasEl.width = this.game.bounds.width;
    this.canvasEl.height = this.game.bounds.height;
  }

  drawStars() {
    const ctx = this.canvasEl.getContext('2d');
    ctx.fillStyle = 'white';
    for (let i = 0; i < 100; i++) {
      ctx.beginPath();
      ctx.arc(
        random(0, this.canvasEl.width),
        random(0, this.canvasEl.height),
        1,
        0,
        2 * Math.PI
      );
      ctx.fill();
    }
  }

  update() {
    this.progres = this.game.camera.position[1] / this.game.maxHeight;
    this.layers[0].style.transform = `translate3d(0, ${this.progres * 50}%, 0)`;
    this.layers[1].style.transform = `translate3d(0, ${
      this.progres * 140
    }%, 0)`;
    this.layers[2].style.transform = `translate3d(0, ${
      this.progres * 250
    }%, 0)`;
    this.bushLayer.style.transform = `translate3d(0, ${
      this.progres * 500
    }%, 0)`;

    document.body.style.background = `linear-gradient(#e66465, ${
      (0.1 + this.progres) * 70
    }%, #f09d51)`;
  }

  shake() {
    this.paralax.classList.add('shake');
    setTimeout(() => this.paralax.classList.remove('shake'), 600);
  }
}
