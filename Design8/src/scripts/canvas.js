import gsap from 'gsap/gsap-core';
import * as PIXI from 'pixi.js';

import { Pictures } from './pictures';

class Canvas {
  static PROPS = {
    width: window.innerWidth,
    height: window.innerHeight
  };

  constructor() {
    this.app = new PIXI.Application({
      width: Canvas.PROPS.width,
      height: Canvas.PROPS.height,
      antialias: true,
      resizeTo: window,
      transparent: true
    });

    this.images = new Pictures();
    this.app.stage.addChild(this.images.container);

    document.getElementById('canvas').appendChild(this.app.view);
  }

  init() {
    this.images.init(document.querySelectorAll('.image_placeholder'));
  }

  resize() {
    this.images.resize(document.querySelectorAll('.image_placeholder'));
  }

  updareImagePositions(pos) {
    this.images.container.position.y = pos;
  }

  showImage(imageIndex) {
    if(this.images.container.children.length) {
      gsap.to(this.images.container.getChildAt(imageIndex).material.uniforms, {
        uAlpha: 1,
        duration: 0.6
      });
    }
  }
}

export const canvas = new Canvas();
