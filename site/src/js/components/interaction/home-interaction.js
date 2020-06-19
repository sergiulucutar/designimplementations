import * as THREE from 'three';
import { Interaction3d } from './interaction';
import { ReflectiveSphere, Sphere } from './objets/sphere';
import { Utils } from '../utils';

export class HomeInteraction extends Interaction3d {
  constructor(canvas, textCanvas, bounds) {
    super(canvas, bounds);
    this.textCanvas = textCanvas;
  }

  init() {
    this.createReflextionText();

    let sphere;
    for (let i = 0; i < 2; i++) {
      sphere = new Sphere();
      this.addSphere(sphere);
      sphere.body.position.x = Utils.random(
        -this.bounds[0] / this.cameraSize + 10,
        this.bounds[0] / this.cameraSize - 10
      );

      sphere.body.position.y = Utils.random(
        -this.bounds[1] / this.cameraSize + 10,
        this.bounds[1] / this.cameraSize - 10
      );
    }

    sphere = new ReflectiveSphere();
    this.addSphere(sphere);
    sphere.body.position.x = this.bounds[0] / this.cameraSize / 2;
    sphere.body.position.y = 0;
  }

  createReflextionText() {
    const ctx = this.textCanvas.getContext('2d');

    const canvasSize = 2048;
    this.textCanvas.width = canvasSize;
    this.textCanvas.height = canvasSize;

    const fontSize = 80;
    ctx.fillStyle = '#e0e2db';
    ctx.font = `${fontSize}px sans-serif`;
    ctx.textAlign = 'center';

    const gap = fontSize;
    for (let i = 0; i < canvasSize; i += gap) {
      for (let j = 0; j < canvasSize; j += gap) {
        ctx.fillText('☻', i, j);
      }
    }

    const maxBound = Math.max.apply(Math, this.bounds);
    const planeSize =
      (maxBound / this.cameraSize) * (4 - this.bounds[0] / this.bounds[1]);

    const planeGeom = new THREE.PlaneGeometry(planeSize, planeSize);
    const texture = new THREE.CanvasTexture(ctx.canvas);
    const mat = new THREE.MeshBasicMaterial({
      map: texture
    });
    const plane = new THREE.Mesh(planeGeom, mat);
    plane.scale.x = -1;
    plane.position.z = -50;

    this.scene.add(plane);
  }
}
