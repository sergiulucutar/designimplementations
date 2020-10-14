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

    this.wrapperContainer = new PIXI.Container();
    this.app.stage.addChild(this.wrapperContainer);

    document.getElementById('canvas').appendChild(this.app.view);
  }

  init() {
    this.images = new Pictures();
    this.wrapperContainer.addChild(
      this.images.init(document.querySelectorAll('.image_placeholder'))
    );
  }

  resize() {
    const imageEls = document.querySelectorAll('.image_placeholder');
    this.images.resize(imageEls);
  }

  setWrapperYPosition(pos) {
    this.wrapperContainer.y = pos;
  }
}

export const canvas = new Canvas();
