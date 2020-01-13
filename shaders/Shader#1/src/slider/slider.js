import * as PIXI from "pixi.js";
import { TimelineLite, TweenLite } from "gsap";
import { Power4 } from "gsap/src/all";
import Shape from "./shape";
import { Timeline } from "gsap/src/gsap-core";

const vertexShader = `

`;
const fragmentShader = `
uniform float time;

varying vec2 vTextureCoord;

uniform sampler2D uSampler;
uniform sampler2D pattern;

uniform sampler2D texture1;
uniform sampler2D texture2;

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
  
  // gl_FragColor = vec4(1.0, 1.0, 0.0, 0.0);
}`;

export default class Slider {
  constructor() {
    this.bounds = [window.innerWidth, window.innerHeight];
    this.renderer = new PIXI.autoDetectRenderer({
      width: this.bounds[0],
      height: this.bounds[1],
      antialias: false,
      transparent: true
    });
    document.querySelector("#slider").appendChild(this.renderer.view);
    this.stage = new PIXI.Container();

    this.sprites = new PIXI.Container();

    this.stage.addChild(this.sprites);

    this.index = 1;
    this.timeline = null;
  }

  init() {
    for (let i = 1; i <= 3; i++) {
      const sprite = PIXI.Sprite.from(`img/img${i}.jpg`);
      sprite.anchor.set(0.5);
      sprite.x = this.bounds[0] / 2;
      sprite.y = this.bounds[1] / 2;
      sprite.filters = [
        new PIXI.Filter(null, fragmentShader, {
          time: 1.0,
          pattern: PIXI.Sprite.from("img/pattern.png")
        })
      ];
      sprite.alpha = 0;

      this.sprites.addChild(sprite);
    }

    this.sprites.getChildAt(0).alpha = 1;

    this.timeline = new Timeline({
      onUpdate: () => {
        console.log(this.sprites.getChildAt(this.index).alpha);
      }
    });
    this.timeline
      // .to(this.sprites.getChildAt(this.index - 1).filters[0].uniforms, 1, {
      //   time: 1,
      //   ease: Power4.easeInOut,
      //   onComplete: () => {
      //     this.sprites.getChildAt(this.index).alpha = 1;
      //   }
      // })
      .to(
        this.sprites.getChildAt(this.index - 1),
        3,
        { alpha: 0, ease: Power4.easeInOut },
        0
      )
      // .to(this.sprites.getChildAt(this.index).filters[0].uniforms, 1, {
      //   time: 0,
      //   ease: Power4.easeInOut
      // })
      .to(
        this.sprites.getChildAt(this.index),
        3,
        { alpha: 1, ease: Power4.easeInOut },
        1
      );

    document.addEventListener("click", () => this.handleClick());
  }

  draw() {
    this.renderer.render(this.stage);
  }

  handleClick() {
    this.index += 1;
    this.timeline.restart();
  }
}
