export default class Stage {
  constructor(game) {
    this.game = game;
  }

  update() {
    this.game.ball.update();
    this.game.platforms.update();
    this.game.shooter.update();
  }

  draw() {
    this.game.ball.draw(this.game.camera.position[1]);

    if (this.game.introFinished) {
      for (let platform of this.game.platforms.platforms) {
        if (this.game.camera.isPointInCameraView(platform.position)) {
          platform.draw(
            this.game.camera.position[1],
            this.game.platforms.alpha
          );
        }
      }
    }

    this.game.shooter.draw();

    this.game.ground.draw(this.game.camera.position[1]);
  }
}
