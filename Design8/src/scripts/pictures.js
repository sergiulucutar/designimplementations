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
  }

  init(htmlEls) {
    const container = new PIXI.Container();
    htmlEls.forEach((el, index) => {
      const bounds = el.getBoundingClientRect();
      let sprite;

      if (index === 0) {
        sprite = this.createDisplacementMesh(
          el.offsetLeft,
          el.offsetTop,
          Math.round(bounds.width),
          Math.round(bounds.height),
          PIXI.Loader.shared.resources['image0'].texture
        );
      } else {
        sprite = this.createMesh(
          el.offsetLeft,
          el.offsetTop,
          Math.round(bounds.width),
          Math.round(bounds.height),
          PIXI.Loader.shared.resources[`image${index}`]
            ? PIXI.Loader.shared.resources[`image${index}`].texture
            : PIXI.Loader.shared.resources['image5'].texture
        );
      }

      container.addChild(sprite);

      this.addEventListener(el, sprite);
    });
    this.images = container;

    return container;
  }

  resize(htmlEls) {
    htmlEls.forEach((el, index) => {
      const bounds = el.getBoundingClientRect();
      const sprite = this.images.getChildAt(index);
      sprite.x = el.offsetLeft;
      sprite.y = el.offsetTop;
      sprite.width = Math.round(bounds.width);
      sprite.height = Math.round(bounds.height);
    });
  }

  createMesh(x, y, width, height, texture) {
    const uniforms = {
      uTexture: texture,
      uSize: [width, height],
      uTime: 0
    };

    const shader = PIXI.Shader.from(vertexShader, fragmentShader_default, uniforms);
    const mesh = new PIXI.Mesh(this.getGeom(width, height), shader);
    mesh.position.x = x;
    mesh.position.y = y;
    return mesh;
  }

  createDisplacementMesh(x, y, width, height, texture) {
    const uniforms = {
      uDisplacement: PIXI.Loader.shared.resources['displacement'].texture,
      uTexture: texture,
      uSize: [width, height],
      uTime: 0,
      uTimeLoop: 1
    };

    const shader = PIXI.Shader.from(
      vertexShader,
      fragmentShader_displacement,
      uniforms
    );
    const mesh = new PIXI.Mesh(this.getGeom(width, height), shader);
    mesh.position.x = x;
    mesh.position.y = y;
    return mesh;
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
      gsap.to(image.material.uniforms, 1, {
        uTime: 1,
        ease: 'power2.out'
      });
    });

    el.addEventListener('mouseleave', () => {
      gsap.killTweensOf(image.material.uniforms);
      gsap.to(image.material.uniforms, 0.6, {
        uTime: 0,
        ease: 'power2.out'
      });
    });
  }
}
