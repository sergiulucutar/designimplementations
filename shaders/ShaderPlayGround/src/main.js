import './main.scss';

import * as PIXI from "pixi.js";

class Canvas {
  constructor() {
     // Setup canvas
     this.bounds = [window.innerWidth, window.innerHeight];
     this.renderer = new PIXI.autoDetectRenderer({
       width: this.bounds[0],
       height: this.bounds[1],
       antialias: false,
       transparent: true
     });
     document.querySelector("main").appendChild(this.renderer.view);
     this.stage = new PIXI.Container();
  }
}

new Canvas();
