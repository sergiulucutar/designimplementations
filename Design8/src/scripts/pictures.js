import { gsap } from 'gsap/gsap-core';
import * as PIXI from 'pixi.js';
import {
  fragmentShader_displacement
} from '../shaders/displacement.shader';
import { fragmentShader_default } from '../shaders/default.shader';
import { vertexShader } from '../shaders/vertex.shader';

export class Pictures {
  constructor() {
    this.geoms = {};

    this.container = new PIXI.Container();
  }

  init(htmlEls) {
    htmlEls.forEach((el, index) => {
      const bounds = el.getBoundingClientRect();
      let sprite;

      const imageData = [
        Math.round(bounds.width),
        Math.round(bounds.height),
        PIXI.Loader.shared.resources[`image${index}`].texture
      ]

      if (index === 0) {
        sprite = this.createDisplacementMesh(...imageData);
      } else {
        sprite = this.createMesh(...imageData);
      }

      sprite.position.x = el.offsetLeft;
      sprite.position.y = el.offsetTop;
      this.container.addChild(sprite);

      this.addEventListener(el, sprite);
    });
  }

  resize(htmlEls) {
    htmlEls.forEach((el, index) => {
      const bounds = el.getBoundingClientRect();
      const sprite = this.container.getChildAt(index);
      sprite.x = el.offsetLeft;
      sprite.y = el.offsetTop;
      sprite.width = Math.round(bounds.width);
      sprite.height = Math.round(bounds.height);
    });
  }

  createMesh(width, height, texture) {
    const uniforms = {
      uTexture: texture,
      uSize: [width, height],
      uTime: 0,
      uAlpha: 0
    };

    const shader = PIXI.Shader.from(vertexShader, fragmentShader_default, uniforms);
    return new PIXI.Mesh(this.getGeom(width, height), shader);
  }

  createDisplacementMesh(width, height, texture) {
    const uniforms = {
      uDisplacement: PIXI.Loader.shared.resources['displacement'].texture,
      uTexture: texture,
      uSize: [width, height],
      uTime: 0
    };

    const shader = PIXI.Shader.from(
      vertexShader,
      fragmentShader_displacement,
      uniforms
    );
    return new PIXI.Mesh(this.getGeom(width, height), shader);
  }

  getGeom(width, height) {
    const key = `${width}-${height}`;
    if (this.geoms[key]) {
      return this.geoms[key];
    }

    this.geoms[key] = new PIXI.PlaneGeometry(width, height, 32, 32);
    return this.geoms[key];
  }

  addEventListener(el, image) {
    el.addEventListener('mouseenter', () => {
      gsap.killTweensOf(image.material.uniforms);
      gsap.to(image.material.uniforms, {
        uTime: 1,
        duration: 1,
        ease: 'power2.out'
      });
    });

    el.addEventListener('mouseleave', () => {
      gsap.killTweensOf(image.material.uniforms);
      gsap.to(image.material.uniforms, {
        uTime: 0,
        duration: 0.6,
        ease: 'power2.out'
      });
    });
  }
}
