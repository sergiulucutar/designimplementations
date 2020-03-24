import { Utils } from '../../utils';

const vCanvasSize = 1024;

export class CanvasTexture {
  constructor() {
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');

    this.canvas.width = vCanvasSize;
    this.canvas.height = vCanvasSize;

    this.bgColor = '#011936';
  }
}

/**
 * Horizontal Lines (HL)
 */
export class CanvasTextureHL extends CanvasTexture {
  constructor() {
    super();

    this.lines = [];
    this.createLines();
  }

  createLines() {
    for (let i = 0; i < 10; i++) {
      this.lines.push({
        x: Utils.random(0, vCanvasSize),
        y: Utils.random(0, vCanvasSize),
        width: Utils.random(10, 700),
        height: Utils.random(10, 200),
        velocity: Utils.random(1, 5)
      });
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, vCanvasSize, vCanvasSize);

    this.ctx.fillStyle = this.bgColor;
    this.ctx.beginPath();
    this.ctx.rect(0, 0, vCanvasSize, vCanvasSize);
    this.ctx.fill();

    this.ctx.fillStyle = '#F4FFFD';
    for (let line of this.lines) {
      this.ctx.beginPath();
      this.ctx.rect(line.x, line.y, line.width, line.height);
      this.ctx.fill();
    }

    // this.ctx.font = '120px Arial';
    // this.ctx.fillText('Projects', 10, vCanvasSize / 2 + 40);
  }

  update() {
    for (let line of this.lines) {
      line.x -= line.velocity;

      if (line.x + line.width < 0) {
        line.x = vCanvasSize;
      }
    }

    this.draw();
  }
}

/**
 * Vertical Lines (VL)
 */
export class CanvasTextureVL extends CanvasTexture {
  constructor() {
    super();

    this.bgColor = '#011936';

    this.lines = [];
    this.createLines();
  }

  createLines() {
    for (let i = 0; i < 10; i++) {
      this.lines.push({
        x: 100 * i,
        y: 0,
        height: 0,
        velocity: Utils.random(1, 5)
      });
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, vCanvasSize, vCanvasSize);

    this.ctx.fillStyle = this.bgColor;
    this.ctx.beginPath();
    this.ctx.rect(0, 0, vCanvasSize, vCanvasSize);
    this.ctx.fill();

    this.ctx.lineWidth = 8;
    this.ctx.strokeStyle = '#E1073E';
    this.ctx.fillStyle = '#E1073E';
    for (let line of this.lines) {
      this.ctx.beginPath();
      this.ctx.moveTo(line.x, line.y);
      this.ctx.lineTo(line.x, line.y + line.height);
      this.ctx.stroke();

      const dotsCount = Math.floor(line.height / 100);
      for (let d = 1; d <= dotsCount; d++) {
        this.ctx.beginPath();
        this.ctx.arc(line.x, line.y + d * 100, 10, 0, 2 * Math.PI);
        this.ctx.fill();
      }
    }

    // this.ctx.font = '120px Arial';
    // this.ctx.fillText('Projects', 10, vCanvasSize / 2 + 40);
  }

  update() {
    for (let line of this.lines) {
      if (line.height < vCanvasSize) {
        line.height += line.velocity;
      } else {
        if (line.y < vCanvasSize) {
          line.y += line.velocity;
        } else {
          line.y = 0;
          line.height = 0;
        }
      }
    }

    this.draw();
  }
}
