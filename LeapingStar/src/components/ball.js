export default class Ball {
  constructor(game, position) {
    this.game = game;
    this.ctx = game.ctx;

    this.position = position;
    this.radius = 30;

    this.isInAir = false;
    this.velocity = 0;
  }

  update() {
    if(this.position[1] > this.game.bounds.height && this.velocity < 0) {
      this.isInAir = false;
    }

    if(this.isInAir) {
      this.position[1] -= this.velocity;
      this.velocity -= this.game.gravity;
    }
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.position[0], this.position[1], this.radius, 0, 2 * Math.PI);
    this.ctx.fillStyle = 'white';
    this.ctx.fill();
  }

  jump() {
    if(!this.isInAir) {
      this.velocity = 30;
      this.isInAir = true;
    }
  }

  collide() {
    if(this.isInAir && this.velocity < 0) {
      this.velocity = 0;
      this.isInAir = false;
    }
  }
}