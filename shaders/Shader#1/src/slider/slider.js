import * as PIXI from "pixi.js";

const vertexShader = ``;
const fragmentShader = `precision mediump float;uniform float time;void main() {gl_FragColor = vec4(time, 0.0, 0.0, 1.0);}`;

export default class Slider {
  constructor() {
    this.bounds = [window.innerWidth, window.innerHeight];
    this.renderer = new PIXI.autoDetectRenderer({
      width: this.bounds[0],
      height: this.bounds[1]
    });
    document.querySelector("#slider").appendChild(this.renderer.view);
    this.stage = new PIXI.Container();

    this.uniforms = {
      time: {
        type: "f",
        value: 1.0
      }
    };

    this.shaderFilter = new PIXI.Filter(null, fragmentShader, {
      time: { type: "f", value: 0.4 }
    });

    this.stage.filters = [this.shaderFilter];
  }

  init() {
    const sprite = PIXI.Sprite.from("img/main_01.jpg");
    sprite.x = 0;
    sprite.y = 0;

    this.stage.addChild(sprite);
  }

  draw() {
    // this.stage.filters[0].uniforms.u_time.value += 0.1;
    // this.uniforms.u_time.value += 0.1;
    this.shaderFilter.uniforms.time = 0.5;
    // console.log(this.stage.filters[0].uniforms.time);

    this.renderer.render(this.stage);
  }
}
