import "./home.scss";

import React from "react";

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

    this.loop();
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.beginPath();
    this.ctx.moveTo(0, 0);
    this.ctx.lineTo(300, 150);
    this.ctx.stroke();
  }

  loop() {
    requestAnimationFrame(this.loop.bind(this));

    const now = Date.now();
    const delta = now - this.loopState.then;

    if (delta > this.loopState.interval) {
      this.loopState.then = now - (delta % this.loopState.interval);
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
