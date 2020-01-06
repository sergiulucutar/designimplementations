import { random, isPointInCircle } from "./utils";
import { TweenLite, Power4 } from "gsap";

class Shot {
  constructor(position) {
    this.position = position;
    this.aniamtion = {
      rotation: -Math.PI / 2,
      lineWidth: 100,
      size: 100
    };
  }

  update() {
    if (this.aniamtion.rotation < 0) {
      this.aniamtion.rotation += 0.1;
      this.aniamtion.lineWidth -= 10;
    } else {
      this.aniamtion.rotation = 0;
    }
  }

  draw(ctx) {
    if (this.aniamtion.rotation < 0) {
      ctx.save();
      ctx.translate(this.position[0], this.position[1]);
      ctx.rotate(this.aniamtion.rotation);
      ctx.lineWidth = this.aniamtion.lineWidth;
      ctx.strokeStyle = `white`;
      ctx.strokeRect(
        -this.aniamtion.size / 2,
        -this.aniamtion.size / 2,
        this.aniamtion.size,
        this.aniamtion.size
      );
      ctx.restore();
    }
  }
}

class Enemy {
  constructor(position) {
    this.position = position;
    this.speed = random(2, 4);
    this.alive = true;
    this.r = 30;

    this.deathTriggered = false;
  }

  update() {
    if (!this.deathTriggered) {
      this.position[1] += this.speed;
    }
  }

  draw(ctx) {
    if (!this.deathTriggered) {
      ctx.beginPath();
      ctx.arc(this.position[0], this.position[1], this.r / 3, 0, 2 * Math.PI);
      ctx.fill();
    }

    ctx.beginPath();
    ctx.arc(this.position[0], this.position[1], this.r, 0, 2 * Math.PI);
    ctx.stroke();
  }

  triggerDeath() {
    this.deathTriggered = true;
    TweenLite.to(this, 0.3, {
      r: 200,
      ease: Power4.easeOut,
      onComplete: () => (this.alive = false)
    });
  }
}

export default class Shooter {
  constructor(game) {
    this.game = game;
    this.ctx = this.game.ctx;

    this.enemies = null;
    this.enemiesCount = 7;

    this.isShooting = false;

    this.shots = null;
  }

  createEnemies() {
    this.enemies = [];
    this.shots = [];
    for (let i = 0; i < this.enemiesCount; i++) {
      this.enemies.push(
        new Enemy([random(100, this.game.bounds.width - 100), -50])
      );
    }
  }

  update() {
    if (!this.isShooting) {
      return;
    }
    this.enemies = this.enemies.filter(enemy => enemy.alive);
    this.shots = this.shots.filter(shot => shot.aniamtion.rotation < 0);

    if (!this.enemies.length && !this.shots.length) {
      this.isShooting = false;
      this.game.isAccendingPaused = false;
      this.game.ball._host.c_light = 100;
    } else {
      for (let enemy of this.enemies) {
        enemy.update();
        if (enemy.position[1] > this.game.bounds.height) {
          enemy.alive = false;
        }
      }
      for (let shot of this.shots) {
        shot.update();
      }
    }
  }

  draw() {
    if (!this.isShooting) {
      return;
    }
    this.ctx.strokeStyle = "red";
    this.ctx.fillStyle = "red";
    for (let enemy of this.enemies) {
      if (enemy.alive) {
        enemy.draw(this.ctx);
      }
    }

    for (let shot of this.shots) {
      shot.draw(this.ctx);
    }
  }

  start() {
    this.createEnemies();
    this.isShooting = true;
  }

  handleClick(event) {
    const coords = [event.offsetX, event.offsetY];
    this.shots.push(new Shot(coords));
    for (let enemy of this.enemies) {
      if (isPointInCircle(coords, enemy)) {
        enemy.triggerDeath();
        this.game.shakeScreen();
        this.game.audio.play("pop");
        this.game.updateScore();
      }
    }
  }
}
