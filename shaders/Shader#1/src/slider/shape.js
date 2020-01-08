import * as PIXI from "pixi.js";

export default class Shape {
  constructor(imgUrl, x, y, maskShape) {
    this.position = [x, y];


    this.sprite = PIXI.Sprite.from(imgUrl);
    this.sprite.x = this.position[0];
    this.sprite.y = this.position[1];

    this.sprite.anchor.x = this.sprite.anchor.y = 0.5;

    this.maskWrapper = new PIXI.Container();
    this.maskWrapper.addChild(this.sprite);

    this.ellipse = maskShape;

    // this.ellipse = new PIXI.Ellipse(this.position[0], this.position[1], , window.innerHeight / 2);

    this.mask = new PIXI.Graphics();
    // this.mask.addChild(this.ellipse);
    this.mask.beginFill();
    this.mask.drawEllipse(this.position[0], this.position[1], this.ellipse.width, this.ellipse.height);
    this.mask.endFill();

    this.maskWrapper.mask = this.mask;
  }

  update() {
    this.mask.clear();
    this.mask.beginFill();
    this.mask.drawEllipse(this.position[0], this.position[1], this.ellipse.width, this.ellipse.height);
    this.mask.endFill();
    // this.sprite.mask = this.mask;
  }
}