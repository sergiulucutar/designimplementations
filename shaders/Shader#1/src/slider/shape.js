import * as PIXI from "pixi.js";

export default class Shape {
  constructor(imgUrl, x, y, maskShape) {
    this.initalPosition = [x, y];
    this.position = [x, y];
    this.ellipse = maskShape;

    this.sprite = PIXI.Sprite.from(imgUrl);
    this.sprite.anchor.set(0.5);
    this.sprite.scale.set(2, 2);
    // this.sprite.width = this.ellipse.width + 200;
    this.sprite.x = this.position[0];
    this.sprite.y = this.position[1];

    this.filterWrapper = new PIXI.Container();
    this.filterWrapper.addChild(this.sprite);

    this.maskWrapper = new PIXI.Container();
    this.maskWrapper.addChild(this.filterWrapper);

    // this.ellipse = new PIXI.Ellipse(this.position[0], this.position[1], , window.innerHeight / 2);

    this.mask = new PIXI.Graphics();
    // this.mask.addChild(this.ellipse);
    this.mask.beginTextureFill(this.sprite);
    this.mask.drawEllipse(
      this.position[0],
      this.position[1],
      this.ellipse.width,
      this.ellipse.height
    );
    this.mask.endFill();

    this.maskWrapper.mask = this.mask;
  }

  move(delta) {
    this.position[1] += Math.sign(delta) * 10;
    this.sprite.y += Math.sign(delta) * 10;
  }

  update(velocity) {
    // this.position[1] = this.initalPosition[1] + offset;
    // this.sprite.y = this.initalPosition[1] + offset;
    this.position[1] += velocity;
    this.sprite.y = this.position[1];
  }

  draw() {
    this.mask.clear();
    this.mask.beginTextureFill(this.sprite);
    this.mask.drawEllipse(
      this.position[0],
      this.position[1],
      this.ellipse.width,
      this.ellipse.height
    );
    this.mask.endFill();
  }
}
