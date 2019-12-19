export class Ground {
  constructor(game) {
    this.game = game;
    this.height = game.bounds.height * 0.1;
    this.position = [0, game.bounds.height - this.height];
  }

  draw() {
    this.game.ctx.beginPath();
    this.game.ctx.rect(
      0,
      -this.game.height + this.game.bounds.height - this.height,
      this.game.bounds.width,
      this.height * 2
    );
    this.game.ctx.fillStyle = "#A44200";
    this.game.ctx.fill();
  }
}
