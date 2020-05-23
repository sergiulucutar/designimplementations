import * as THREE from 'three';
import { Interaction3d } from './interaction';
import { ReflectiveSphere, Sphere } from './objets/sphere';

export class HomeInteraction extends Interaction3d {
  constructor(domEl) {
    super(domEl);
  }

  init() {
    super.init();
    this.createReflextionText();

    this.addSphere(new Sphere());
    this.addSphere(new Sphere());
    this.addSphere(new ReflectiveSphere());

    this.showObjects();
  }

  createReflextionText() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    const canvasSize = 2048;
    canvas.width = canvasSize;
    canvas.height = canvasSize;

    const fontSize = 80;
    ctx.fillStyle = '#e0e2db';
    ctx.font = `${fontSize}px Syne Extra`;
    ctx.textAlign = 'center';

    // const gap = canvasSize / 20;
    // for (let i = 0; i < canvasSize; i += gap) {
    //   for (let j = 0; j < canvasSize; j += gap) {
    //     ctx.fillText('|', i, j);
    //   }
    // }

    ctx.fillText('SERGIU', canvasSize / 2, canvasSize / 2 - fontSize);
    ctx.fillText('LUCUȚAR', canvasSize / 2, canvasSize / 2);
    ctx.fillText('DEVELOPER', canvasSize / 2, canvasSize / 2 + fontSize);

    // document.body.appendChild(canvas);

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
