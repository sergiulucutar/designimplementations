import "./home.scss";

import React from "react";

import Tree from "../../components/tree";

export default class Home extends React.Component {
  constructor() {
    super();

    this.canvasRef = React.createRef();

    this.loopState = {
      then: Date.now(),
      interval: 1000 / 30
    };

    this.l = 0;
  }

  componentDidMount() {
    this.canvas = this.canvasRef.current;
    this.ctx = this.canvas.getContext("2d");

    this.canvas.width = this.rootEl.clientWidth;
    this.canvas.height = this.rootEl.clientHeight;

    this.tree = new Tree(this.canvas);

    this.loop();
    // this.update();
    // this.draw();
  }

  update() {
    this.tree.update();
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.fillStyle = "red";

    this.tree.leaves.forEach(leaf => {
      this.ctx.beginPath();
      this.ctx.arc(leaf.pos[0], leaf.pos[1], 2, 0, 2 * Math.PI);
      this.ctx.fill();
    });

    this.tree.draw();
  }

  loop() {
    requestAnimationFrame(this.loop.bind(this));

    const now = Date.now();
    const delta = now - this.loopState.then;

    if (delta > this.loopState.interval) {
      this.loopState.then = now - (delta % this.loopState.interval);
      this.update();
      this.draw();
    }
  }

  render() {
    return (
      <section className="home" ref={rootEl => (this.rootEl = rootEl)}>
        <canvas ref={this.canvasRef}></canvas>;
      </section>
    );
  }
}
