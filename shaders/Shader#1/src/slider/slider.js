import * as PIXI from "pixi.js";
import { TweenLite } from "gsap";
import { Power4 } from "gsap/src/all";
import { Timeline } from "gsap/src/gsap-core";

const fragmentShader = `
uniform float u_progress;

varying vec2 vTextureCoord;
uniform sampler2D uSampler;

mat2 getRotM(float angle) {
  float s = sin(angle);
  float c = cos(angle);
  return mat2(-c, s, s, c);
}

const float PI = 3.1415;
const float angle = PI * 0.25;

void main() {
  vec4 fromColor = texture2D( uSampler, vTextureCoord );
  vec4 toColor = vec4( 0.0, 0.0, 0.0, 0.0 );

  vec2 dispVec = vec2(fromColor.r, fromColor.g);

  vec4 disp = texture2D(uSampler, vTextureCoord - dispVec * getRotM(angle) * u_progress * 0.1);
  
  gl_FragColor = mix(disp, toColor, u_progress);
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

    this.index = 0;
    this.timeline = null;

    this.isTransitioning = false;
  }

  init() {
    for (let i = 1; i <= 3; i++) {
      const sprite = PIXI.Sprite.from(`img/img${i}.jpg`);
      sprite.anchor.set(0.5);
      sprite.x = this.bounds[0] / 2;
      sprite.y = this.bounds[1] / 2;
      sprite.alpha = 0;
      sprite.filters = [
        new PIXI.Filter(null, fragmentShader, {
          u_progress: 0.0
        })
      ];

      this.sprites.addChild(sprite);
    }

    this.sprites.getChildAt(this.index).alpha = 1;

    document.addEventListener("click", () => this.handleClick());
  }

  draw() {
    this.renderer.render(this.stage);
  }

  handleClick() {
    const nextSlide = (this.index + 1) % 3;
    if (this.isTransitioning) {
      return;
    }
    this.isTransitioning = true;
    this.timeline = new Timeline({
      onComplete: () => {
        this.sprites.getChildAt(this.index).filters[0].uniforms.u_progress = 0;
        this.sprites.getChildAt(this.index).alpha = 0;
        this.index = nextSlide;
        this.sprites.getChildAt(this.index).alpha = 1;
        this.isTransitioning = false;
      }
    });
    this.timeline
      .to(this.sprites.getChildAt(this.index).filters[0].uniforms, 1, {
        u_progress: 1,
        ease: Power4.easeInOut
      }, 0)
      .to(
      this.sprites.getChildAt(nextSlide),
      0.5,
      { alpha: 1, ease: Power4.easeInOut },
      0)
      .fromTo(this.sprites.getChildAt(nextSlide).filters[0].uniforms, 1, { u_progress: 1 }, {
        u_progress: 0,
        ease: Power4.easeInOut
      }, 0);
  }
}
