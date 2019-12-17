import { TweenLite } from "gsap/gsap-core";
import { Power2 } from "gsap/gsap-core";
import { Power4 } from "gsap/gsap-core";

export default class Ball {
  get host() {
    return this._host;
  }

  set host(host) {
    this._host = host;
    this.moveTo(host.position);
  }

  constructor(game, position) {
    this.game = game;
    this.ctx = game.ctx;

    this.position = position;
    this.radius = 12;

    this.isInAir = false;

    this._host = null;

    // animations
    this.a_maxRaySize = 100;
    this.a_rays = [0, 50, 75];
  }

  update() {
    if (this._host && !this.isInAir) {
      this.position = [...this._host.position];
    }

    this.a_rays = this.a_rays.map(ray =>
      ray > this.a_maxRaySize ? 0 : (ray += 0.5)
    );
  }

  draw() {
    if (!this.dead) {
      this.ctx.beginPath();
      this.ctx.arc(
        this.position[0],
        this.position[1],
        this.radius,
        0,
        2 * Math.PI
      );
      this.ctx.fillStyle = "white";
      this.ctx.fill();

      // this.ctx.beginPath();
      // this.ctx.arc(
      //   this.position[0],
      //   this.position[1],
      //   this.radius * 3,
      //   0,
      //   2 * Math.PI
      // );
      // this.ctx.strokeStyle = `hsla(1, 100%, 100%, 0.5)`;
      // this.ctx.fillStyle = `hsla(1, 100%, 100%, 0.1)`;
      // this.ctx.fill();
      // this.ctx.stroke();

      // Shine
      for (let ray of this.a_rays) {
        this.ctx.save();

        this.ctx.translate(this.position[0], this.position[1]);
        this.ctx.rotate(2 * Math.PI * (ray / this.a_maxRaySize));
        this.ctx.rect(-ray / 2, -ray / 2, ray, ray);
        this.ctx.strokeStyle = "white";
        this.ctx.lineWidth = 0.5;
        this.ctx.stroke();
        this.ctx.restore();
      }
    }

    // Draw flash
    if (this._flash) {
      this.ctx.beginPath();
      this.ctx.arc(
        this.position[0],
        this.position[1],
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
      maxRadius: 150
    };
  }

  moveTo(position) {
    this.isInAir = true;
    TweenLite.to(this.position, 0.6, {
      0: position[0],
      1: position[1] + 18,
      ease: Power4.easeOut,
      onComplete: () => {
        this.isInAir = false;
        this.setDefaultFLash();
        this.fireFlash();
        this.game.ballMoveFinished();
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
