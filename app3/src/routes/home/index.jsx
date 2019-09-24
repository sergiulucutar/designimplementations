import "./home.scss";

import React from "react";

import Tree from "../../components/tree";

export default class Home extends React.Component {
  constructor() {
    super();

    this.canvasRef = React.createRef();
    // this.virtualCanvas = document.createElement('canvas');

    this.loopState = {
      then: Date.now(),
      interval: 1000 / 30
    };

    this.tree = {
      isGrowing: true
    };

    this.state = {
      showCanopy: false
    };

    this.setRoot = this.setRoot.bind(this);
    this.placeSeed = this.placeSeed.bind(this);
  }

  componentDidMount() {
    this.canvas = this.canvasRef.current;
    this.ctx = this.canvas.getContext("2d");

    this.canvas.width = this.canvas.clientWidth;
    this.canvas.height = this.canvas.clientHeight;

    this.tree = new Tree(this.canvas);
    this.tree.onTreeGrowthStop = this.handleTreeGrowthStop.bind(this);
  }

  update() {
    this.tree.update();
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // this.ctx.fillStyle = "red";

    // this.tree.leaves.forEach(leaf => {
    //   this.ctx.beginPath();
    //   this.ctx.arc(leaf.pos[0], leaf.pos[1], 2, 0, 2 * Math.PI);
    //   this.ctx.fill();
    // });

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

  handleTreeGrowthStop() {
    this.setState({
      showCanopy: true
    });
  }

  placeSeed(event) {
    const seed = document.querySelector('.seed');
    seed.style = `top: ${event.clientY}px; left:${event.clientX}px;`
    setTimeout(() => {
      seed.classList.add('plant');
    }, 10);
    setTimeout(() => {
      this.loop();
    }, 1010);
  }

  setRoot() {
    // this.tree.setRoot(event.clientX, event.clientY);
    // this.loop();
  }

  render() {
    return (
      <section className="home" ref={rootEl => (this.rootEl = rootEl)}>
        <div className="seed"></div>
        <main>
          <div className="left">
            <h2>Plant a tree</h2>
            <div className="seed_pot" onClick={this.placeSeed.bind(this)}></div>
          </div>
        </main>
        <div className="trees">
          <div className={`canopy ${this.state.showCanopy ? "" : "hide"}`}>
            <div className="canopy_layers">
              <div></div>
              <div></div>
              <div></div>
              {/* <div></div>
              <div></div>
              <div></div> */}
            </div>
          </div>
          <canvas
            ref={this.canvasRef}
            onClick={this.setRoot.bind(this)}
          ></canvas>
        </div>
      </section>
    );
  }
}
