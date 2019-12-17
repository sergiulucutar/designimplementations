export default class Stage {
  constructor(game) {
    this.game = game;
  }

  update() {
    this.game.ball.update();
  }

  draw() {
    this.game.ball.draw();

    if (this.game.introFinished) {
      if (
        this.game.camera.isPointInCameraView(
          this.game.platforms.platforms[0].position
        )
      ) {
        this.game.platforms.drawLastStarFluf();
      }

      for (let platform of this.game.platforms.platforms) {
        if (this.game.camera.isPointInCameraView(platform.position)) {
          platform.draw(this.game.platforms.alpha);
        }
      }
    }

    this.game.ground.draw(this.game.camera.position[1]);
  }
}
