import { random, isPointInCircle } from "./utils";

class Platform {
  /**
   * @param {number} value
   */
  set radius(value) {
    this.r = value;
    this.a_r1 = 0;
    this.a_r2 = this.r / 2;
  }

  constructor(ctx, position) {
    this.ctx = ctx;

    this.position = position;
    this.r = 20;
    this.c_light = 100;

    // Animation
    this.a_speed = Math.max(Math.random() / this.r, 0.04);
    this.a_r1 = 0;
    this.a_r2 = this.r / 2;

    this.visited = false;
  }

  draw(offset, alpha) {
    this.a_r1 = (this.a_r1 > this.r ? 0 : this.a_r1) + this.a_speed;
    this.a_r2 = (this.a_r2 > this.r ? 0 : this.a_r2) + this.a_speed;

    this.ctx.strokeStyle = `hsla(1, 100%, ${this.c_light}%, ${alpha})`;
    this.ctx.lineWidth = 1;

    this.ctx.beginPath();
    this.ctx.arc(
      this.position[0],
      this.position[1] - offset,
      this.r + 10,
      0,
      2 * Math.PI
    );

    this.ctx.fillStyle = `hsla(1, 100%, ${this.c_light}%, ${0.1})`;
    this.ctx.fill();

    this.ctx.beginPath();
    this.ctx.arc(
      this.position[0],
      this.position[1] - offset,
      this.a_r1,
      0,
      2 * Math.PI
    );
    this.ctx.stroke();

    this.ctx.beginPath();
    this.ctx.arc(
      this.position[0],
      this.position[1] - offset,
      this.a_r2,
      0,
      2 * Math.PI
    );
    this.ctx.stroke();
  }
}

class LastPlatform extends Platform {
  constructor(ctx, position) {
    super(ctx, position);

    this.isAnimated = false;

    this._animation = {
      r_smallRotation: 0,
      r_bigRotation: 0,
      c_radius: 300
    };
  }

  update() {
    if (this.isAnimated) {
      // Change the radius, once the star is in place
      if (this.r !== 300) {
        this.radius = 300;
        this.a_speed = 0.4;
      }

      this._animation.r_bigRotation += 0.001;
      this._animation.r_smallRotation += 0.005;
    }

    if (this._animation.r_bigRotation >= 1) {
      this._animation.r_bigRotation -= 1;
    }

    if (this._animation.r_smallRotation >= 1) {
      this._animation.r_smallRotation -= 1;
    }
  }

  draw(offset, alpha) {
    super.draw(offset, alpha);

    // Smallest rectangle
    this.ctx.beginPath();
    this.ctx.rect(
      this.position[0] - 50,
      this.position[1] - 50 - offset,
      100,
      100
    );
    this.ctx.lineWidth = 1;
    this.ctx.stroke();

    // Small rectangle
    // this.ctx.save();
    this.ctx.beginPath();
    this.ctx.translate(this.position[0], this.position[1] - offset);
    this.ctx.rotate(2 * Math.PI * this._animation.r_smallRotation);
    this.ctx.rect(-150, -150, 300, 300);
    this.ctx.lineWidth = 1;
    this.ctx.stroke();
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    // this.ctx.restore();

    // Big rectangle
    // this.ctx.save();
    this.ctx.translate(this.position[0], this.position[1] - offset);
    this.ctx.rotate(2 * Math.PI * -this._animation.r_bigRotation);
    this.ctx.beginPath();
    this.ctx.rect(-200, -200, 400, 400);
    this.ctx.lineWidth = 1;
    this.ctx.stroke();
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    // this.ctx.restore();

    // Last circle
    this.ctx.beginPath();
    this.ctx.arc(
      this.position[0],
      this.position[1] - offset,
      this._animation.c_radius,
      0,
      2 * Math.PI
    );
    this.ctx.stroke();
  }
}

export class ShootingPlatform extends Platform {
  constructor(ctx, position) {
    super(ctx, position);

    this.c_light = 50;
  }
}

export class Platforms {
  constructor(game) {
    this.game = game;

    this.platforms = [];
    this.platformsCount = 60;

    this.padding = 500;
    this.alpha = 1;

    this.lastPlatform = null;
    this.maxHeight = 0;
  }

  init() {
    const { bounds, ctx } = this.game;
    this.platforms = [];
    this.maxHeight = this.platformsCount * 150 - this.game.bounds.height;

    this.lastPlatform = new LastPlatform(ctx, [
      bounds.width / 2,
      -this.maxHeight
    ]);
    this.platforms.push(this.lastPlatform);

    const offset = bounds.height / 4;
    for (let i = 1; i <= (bounds.height + this.maxHeight) / offset; i++) {
      let platform;
      if (i === 8) {
        platform = new ShootingPlatform(ctx, [
          random(this.padding, bounds.width - this.padding),
          bounds.height - i * offset
        ]);
      } else {
        platform = new Platform(ctx, [
          random(this.padding, bounds.width - this.padding),
          bounds.height - i * offset
        ]);
      }
      this.platforms.push(platform);
    }

    for (let i = this.platforms.length; i < this.platformsCount; i++) {
      let platform;
      if (random(1, 3) == 1) {
        platform = new ShootingPlatform(ctx, [
          random(this.padding, bounds.width - this.padding),
          bounds.height - i * offset
        ]);
      } else {
        platform = new Platform(ctx, [
          random(this.padding, bounds.width - this.padding),
          bounds.height - random(0, this.maxHeight)
        ]);
      }
      this.platforms.push(platform);
    }
    debugger;
  }

  update() {
    this.lastPlatform.update();
  }

  isPointInPlatform(point) {
    for (let platform of this.platforms) {
      if (isPointInCircle(point, platform)) {
        return platform;
      }
    }
    return false;
  }
}
