import * as PIXI from 'pixi.js';
import { fragmentShader, vertexShader } from '../../shaders/deformation';

export class SlideShaded {
  static geom = null;
  static offset = 150;

  set transitionTime(value) {
    this.mesh.material.uniforms.uTime = value;
  }

  set transitionDirection(value) {
    this.mesh.material.uniforms.uOffset[1] = value * SlideShaded.offset;
  }

  constructor(bounds, texture) {
    this.bounds = bounds;
    this.texture = texture;

    this.init();
  }

  init() {
    let { width, height } = this.bounds;
    width /= 2;

    const uniforms = {
      uTexture: this.texture, //PIXI.Texture.from(picture),
      uOffset: [0, -SlideShaded.offset],
      uSize: [width, height],
      uTime: 0
    };

    if (!SlideShaded.geom) {
      SlideShaded.geom = new PIXI.PlaneGeometry(width, height, 32, 32);
    }

    const shader = PIXI.Shader.from(vertexShader, fragmentShader, uniforms);
    this.mesh = new PIXI.Mesh(SlideShaded.geom, shader);
  }
}
