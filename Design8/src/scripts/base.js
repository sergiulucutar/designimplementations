import * as PIXI from 'pixi.js';
import { canvas } from './canvas';

const loaderEl = document.querySelector('.loader_overlay');

window.onload = () => {
  PIXI.Loader.shared.onComplete.add(() => {
    canvas.init();
    setTimeout(() => {
      loaderEl.classList.remove('loader_overlay-show');
    }, 600);
  });
};

window.onresize = () => canvas.resize();
