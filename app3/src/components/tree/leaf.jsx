export default class Leaf {
  constructor(canvas) {
    // console.log(random);
    // debugger;

    this.pos = [this.random(0, canvas.width), this.random(0, canvas.height)];
    this.reached = false;
  }

  random(min = 0, max) {
    return Math.floor(Math.random() * max) + min;
  }
}
