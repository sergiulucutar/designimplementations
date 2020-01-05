export class Ground {
  constructor(game) {
    this.game = game;
    this.height = game.bounds.height * 0.1;
    this.position = [0, game.bounds.height - this.height];
  }

  draw(offset) {
    this.game.ctx.beginPath();
    this.game.ctx.rect(
      0,
      -offset + this.game.bounds.height - this.height,
      this.game.bounds.width,
      this.height * 2
    );
    this.game.ctx.fillStyle = "#32936F";
    this.game.ctx.fill();
  }
}
