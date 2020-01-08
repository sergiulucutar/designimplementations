import * as PIXI from "pixi.js";
import { TimelineLite } from "gsap";
import { Power4 } from "gsap/src/all";
import Shape from "./shape";

const vertexShader = ``;
const fragmentShader = `
uniform float time;

varying vec2 vTextureCoord;

uniform sampler2D uSampler;
uniform sampler2D pattern;

mat2 getRotM(float angle) {
  float s = sin(angle);
  float c = cos(angle);
  return mat2(-c, s, s, c);
}

const float PI = 3.1415;
const float angle = PI *0.25;

void main() {
  vec4 d = texture2D(pattern, vTextureCoord);

  vec2 dispVec = vec2(d.g, d.b);

  gl_FragColor = texture2D(pattern, vTextureCoord + getRotM(angle) * dispVec * time * 0.1);
  
  // gl_FragColor = vec4(gl_FragColor.x, gl_FragColor.y, 0.0, 0.0);
}`;

export default class Slider {
  constructor() {
    this.bounds = [window.innerWidth, window.innerHeight];
    this.renderer = new PIXI.autoDetectRenderer({
      width: this.bounds[0],
      height: this.bounds[1],
      antialias: true
    });
    document.querySelector("#slider").appendChild(this.renderer.view);
    this.stage = new PIXI.Container();

    this.shaderFilter = new PIXI.Filter(null, fragmentShader, {
      time: 0.0, pattern: PIXI.Sprite.from('img/pattern.png')
    });

    this.ellipse = {
      width: window.innerHeight / 3.8,
      height: window.innerHeight / 3.8
    };
    this.padding = window.innerHeight / 4;
    this.shapes = [];
    // this.shapes = [new Shape(, this.bounds[0] / 2, 0, this.ellipse), new Shape("img/img2.jpg", this.bounds[0] / 2, this.bounds[1] / 2, this.ellipse), new Shape("img/img3.jpg", this.bounds[0] / 2, this.bounds[1], this.ellipse)];

    // this.shapes.map(shape => {
    //   shape.sprite.filters = [this.shaderFilter];
    //   this.stage.addChild(shape.maskWrapper);
    // });

    // Animation Timeline
    this.a_timeline = new TimelineLite();
    this.a_timeline
      .to(this.ellipse, .3, { width: '+=180', ease: Power4.easeIn })
      .to(this.ellipse, .3, { height: '-=100', ease: Power4.easeIn }, 0)
      .to(this.shaderFilter.uniforms, .3, { time: 1, ease: Power4.easeIn }, 0)
      .to(this.ellipse, .7, { width: '-=180', ease: Power4.easeOut })
      .to(this.ellipse, .7, { height: '+=100', ease: Power4.easeOut }, 0.3)
      .to(this.shaderFilter.uniforms, .7, { time: 0, ease: Power4.easeOut }, 0.3);
  }

  init() {
    this.addShape("img/img1.jpg");
    this.addShape("img/img2.jpg");
    this.addShape("img/img3.jpg");
    this.registerEventHandlers();
  }

  draw() {
    this.shapes.map(shape => shape.update());

    this.renderer.render(this.stage);
  }

  addShape(imgUrl) {
    const shape = new Shape(imgUrl, this.bounds[0] / 2, (this.bounds[0] / 4 + this.padding) * this.shapes.length, this.ellipse);
    shape.sprite.filters = [this.shaderFilter];
    this.stage.addChild(shape.maskWrapper);
    this.shapes.push(shape);
  }

  registerEventHandlers() {
    document.addEventListener('wheel', event => {
      // this.a_timeline.kill();
      this.a_timeline.restart();
    });
  }
}
