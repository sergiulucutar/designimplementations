export class Ground {
  constructor(game) {
    this.game = game;
    this.height = game.bounds.height * 0.1;
    this.position = [0, game.bounds.height - this.height];
  }

  draw() {
    const { bounds, ctx, height } = this.game;
    ctx.beginPath();
    ctx.rect(
      0,
      -height + bounds.height - this.height,
      bounds.width,
      this.height * 2
    );
    ctx.fillStyle = "#A44200";
    ctx.fill();
  }
}
