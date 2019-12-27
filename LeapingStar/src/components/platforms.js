import { random, isPointInCircle } from "./utils";

class Platform {
  constructor(ctx, position) {
    this.ctx = ctx;

    this.position = position;
    this.r = 20;

    // Animation
    this.a_speed = Math.max(Math.random() / 20, 0.04);
    this.a_r1 = -10;
    this.a_r2 = 0;
  }

  moveDown(speed) {
    this.position[1] += speed;
  }

  draw(alpha) {
    this.a_r1 = (this.a_r1 > 20 ? 0 : this.a_r1) + this.a_speed;
    this.a_r2 = (this.a_r2 > 20 ? 0 : this.a_r2) + this.a_speed;

    this.ctx.strokeStyle = `hsla(1, 100%, 100%, ${alpha})`;
    this.ctx.lineWidth = 1;

    if (this.a_r1 > 0) {
      this.ctx.beginPath();
      this.ctx.arc(
        this.position[0],
        this.position[1],
        this.a_r1,
        0,
        2 * Math.PI
      );
      this.ctx.stroke();
    }

    this.ctx.beginPath();
    this.ctx.arc(this.position[0], this.position[1], this.a_r2, 0, 2 * Math.PI);
    this.ctx.stroke();
  }
}

export default class Platforms {
  constructor(game) {
    this.game = game;

    this.platforms = [];
    this.platformsCount = 30;

    this.padding = 500;
    this.alpha = 1;

    this.lastPlatform = null;
    // this.ctx.strokeStyle = `hsl(270, 100%, 50%)`;
  }

  init() {
    const { bounds, ctx } = this.game;

    this.lastPlatform = new Platform(ctx, [
      bounds.width / 2,
      bounds.height - this.platformsCount * 150
    ]);
    this.platforms.push(this.lastPlatform);

    for (let i = 0; i < this.platformsCount; i++) {
      const platform = new Platform(ctx, [
        random(this.padding, bounds.width - this.padding),
        bounds.height - (i + 1) * random(100, 200)
      ]);
      this.platforms.push(platform);
    }
  }

  drawLastStarFluf() {
    this.game.ctx.beginPath();
    this.game.ctx.rect(
      this.platforms[0].position[0] - 50,
      this.platforms[0].position[1] - 50,
      100,
      100
    );
    this.game.ctx.lineWidth = 1;
    this.game.ctx.stroke();

    this.game.ctx.beginPath();
    this.game.ctx.rect(
      this.platforms[0].position[0] - 150,
      this.platforms[0].position[1] - 150,
      300,
      300
    );
    this.game.ctx.lineWidth = 1;
    this.game.ctx.stroke();

    this.game.ctx.save();
    this.game.ctx.translate(this.platforms[0].position[0], this.platforms[0].position[1]);
    this.game.ctx.rotate(Math.PI / 4);
    this.game.ctx.beginPath();
    this.game.ctx.rect(-200, -200, 400, 400);
    this.game.ctx.lineWidth = 1;
    this.game.ctx.stroke();
    this.game.ctx.restore();

    this.game.ctx.beginPath();
    this.game.ctx.arc(
      this.platforms[0].position[0],
      this.platforms[0].position[1],
      300,
      0,
      2 * Math.PI
    );
    this.game.ctx.stroke();
  }

  moveDown(speed) {
    this.platforms.map(platform => platform.moveDown(speed));
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
