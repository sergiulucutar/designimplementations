import * as THREE from 'three';
import { Interaction3d } from './interaction';
import { ReflectiveSphere, Sphere } from './objets/sphere';

export class ContactInteraction extends Interaction3d {
  constructor(domEl) {
    super(domEl);
  }

  init() {
    super.init();

    this.createReflextionText();

    const shape = new ReflectiveSphere();
    this.addSphere(shape);
    shape.body.position.x = (this.bounds[0] / this.cameraSize) * 3;
    shape.body.position.y = (-this.bounds[1] / this.cameraSize) * 3;
    // shape.body.position.z = 5;
    // this.addSphere(new ReflectiveSphere());

    this.showObjects();
  }

  createReflextionText() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    const canvasSize = 1024;
    canvas.width = canvasSize;
    canvas.height = canvasSize;

    this.spotLight = null;

    const fontSize = 80;
    ctx.font = `${fontSize}px Syne Extra`;
    ctx.textAlign = 'center';
    ctx.fillStyle = '#e0e2db';

    const gap = fontSize * 4;
    let parity = 0;
    for (let i = 0; i < canvasSize; i += gap) {
      let j = 0;
      if (parity % 2 !== 0) {
        j = gap / 4;
      }

      for (; j < canvasSize; j += gap / 2) {
        ctx.fillText('BYE', i, j);
      }
      parity++;
    }

    const planeGeom = new THREE.PlaneGeometry(
      (this.bounds[0] / this.cameraSize) * 2,
      (this.bounds[0] / this.cameraSize) * 2
    );
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
