import { TweenLite } from "gsap/gsap-core";
import { Power4 } from "gsap/gsap-core";

export default class Ball {
  get host() {
    return this._host;
  }

  set host(host) {
    this._lastHost = this._host;
    this._host = host;
    this.moveTo(host.position);
  }

  constructor(game, position) {
    this.game = game;
    this.ctx = game.ctx;

    this.position = position;
    this.radius = 12;

    this.isInAir = false;

    this._host = null; //{ position };

    // animations
    this.a_maxRaySize = 100;
    this.a_rays = [0, 33, 66];

    this.tail = [];
  }

  init() {
    this._host = null;
    this.position[1] = 0;
    this.tail = [];
  }

  update() {
    if (this._host && !this.isInAir) {
      this.position[0] = this._host.position[0];
      this.position[1] = this._host.position[1];
    }

    for (let i = 0; i < this.a_rays.length; i++) {
      if (this.a_rays[i] > this.a_maxRaySize) {
        this.a_rays[i] = 0;
      }
      this.a_rays[i] += 0.5;
    }
  }

  draw(offset) {
    if (!this.dead) {
      this.ctx.beginPath();
      this.ctx.arc(
        this.position[0],
        this.position[1] - offset,
        this.radius,
        0,
        2 * Math.PI
      );
      this.ctx.fillStyle = "white";
      this.ctx.fill();

      // Shine
      for (let ray of this.a_rays) {
        this.ctx.translate(this.position[0], this.position[1] - offset);
        this.ctx.rotate(2 * Math.PI * (ray / this.a_maxRaySize));
        this.ctx.rect(-ray / 2, -ray / 2, ray, ray);
        this.ctx.strokeStyle = "white";
        this.ctx.lineWidth = 0.5;
        this.ctx.stroke();
        this.ctx.setTransform(1, 0, 0, 1, 0, 0);
      }

      // TAIL
      for (let i = 1; i < this.tail.length; i++) {
        this.ctx.beginPath();
        this.ctx.moveTo(this.tail[i - 1][0], this.tail[i - 1][1] - offset);
        this.ctx.lineTo(this.tail[i][0], this.tail[i][1] - offset);
        this.ctx.stroke();
      }

      if (this.isInAir && this._lastHost) {
        this.ctx.beginPath();
        this.ctx.moveTo(this.position[0], this.position[1] - offset);
        this.ctx.lineTo(
          this._lastHost.position[0],
          this._lastHost.position[1] - offset
        );
        this.ctx.stroke();
      }
    }

    // Draw flash
    if (this._flash) {
      this.ctx.beginPath();
      this.ctx.arc(
        this.position[0],
        this.position[1] - offset,
        this._flash.radius,
        0,
        2 * Math.PI
      );
      this.ctx.lineWidth = this._flash.width;
      this.ctx.strokeStyle = `white`;
      this.ctx.stroke();
    }
  }

  fireFlash() {
    TweenLite.to(this._flash, 0.5, {
      radius: this._flash.maxRadius,
      width: 0,
      ease: Power4.easeInOut,
      onComplete: () => (this._flash = null)
    });
  }

  setDefaultFLash() {
    this._flash = {
      width: 100,
      radius: 1,
      maxRadius: 250
    };
  }

  moveTo(position) {
    this.isInAir = true;
    TweenLite.to(this.position, 0.6, {
      0: position[0],
      1: position[1],
      ease: Power4.easeOut,
      onComplete: () => {
        this.game.ballMoveFinished();
        this.tail.push(this.host.position);
        this.setDefaultFLash();
        this.fireFlash();
        this.isInAir = false;
      }
    });
  }

  destroy() {
    this.setDefaultFLash();
    this._flash.maxRadius = 500;
    setTimeout(() => {
      this.fireFlash();
      this.dead = true;
    }, 300);
  }
}
