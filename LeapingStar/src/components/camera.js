export default class Camera {
  constructor(game) {
    this.game = game;

    this.innerBounds = 0;

    this.position = [0, 0];
    this.speed = 0.5;
  }

  moveUp() {
    this.position[1] -= this.speed;
  }

  isPointOutsideInnerBounds(point) {
    if (point[1] - this.position[1] < this.innerBounds) {
      return -1;
    }
    if (
      point[1] - this.position[1] >
      this.game.bounds.height - this.innerBounds
    ) {
      return 1;
    }
    return 0;
  }

  isPointInCameraView(point) {
    return (
      point[1] > this.position[1] &&
      point[1] < this.position[1] + this.game.bounds.height
    );
  }

  setInnerBound(height) {
    this.innerBounds = height / 4;
  }
}
