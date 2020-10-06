import * as PIXI from 'pixi.js';
import { fragmentShader, vertexShader } from '../shaders/deformation';

export class Image {
  static geoms = {};

  set transitionTime(value) {
    this.mesh.material.uniforms.uTime = value;
  }

  set transitionDirection(value) {
    this.mesh.material.uniforms.uOffset[1] = value * this.offset;
  }

  set transitionOffset(offset) {
    this.offset = offset;
  }

  constructor(bounds, texture, offset = 150) {
    this.bounds = bounds;
    this.texture = texture;
    this.offset = offset;

    this.init();
  }

  init() {
    let { width, height } = this.bounds;

    const uniforms = {
      uTexture: this.texture,
      uOffset: [0, -this.offset],
      uSize: [width, height],
      uTime: 0
    };

    if (!Image.geoms[`${width}-${height}`]) {
      Image.geoms[`${width}-${height}`] = new PIXI.PlaneGeometry(
        width,
        height,
        32,
        32
      );
    }

    const shader = PIXI.Shader.from(vertexShader, fragmentShader, uniforms);
    this.mesh = new PIXI.Mesh(Image.geoms[`${width}-${height}`], shader);
  }
}
