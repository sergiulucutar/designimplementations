import * as PIXI from 'pixi.js';

export default class Slider {
  constructor() {
    this.bounds = [
      window.innerWidth,
      window.innerHeight
    ];
    this.renderer = new PIXI.autoDetectRenderer(this.bounds[0], this.bounds[1]);
    document.querySelector('#slider').appendChild(this.renderer.view);
  }

}
