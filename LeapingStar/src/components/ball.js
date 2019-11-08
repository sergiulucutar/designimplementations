export default class Ball {
  constructor(ctx) {
    this.ctx = ctx;

    this.position = [0, 0];
    this.radius = 50;
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.position[0], this.position[1], this.radius, 0, 2 * Math.PI);
    this.ctx.fillStyle = 'red';
    this.ctx.fill();
  }
}