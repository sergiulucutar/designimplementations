import * as THREE from 'three';
import { Interaction3d } from './interaction';
import { ReflectiveSphere, Sphere, shapeSize } from './objets/sphere';
import { Utils } from '../utils';

export class HomeInteraction extends Interaction3d {
  constructor(domEl) {
    super(domEl);
  }

  init() {
    super.init();
    this.createReflextionText();

    let sphere;
    for (let i = 0; i < 2; i++) {
      sphere = new Sphere();
      this.addSphere(sphere);
      sphere.body.position.x = Utils.random(
        -this.bounds[0] / this.cameraSize + shapeSize,
        this.bounds[0] / this.cameraSize - shapeSize
      );

      sphere.body.position.y = Utils.random(
        -this.bounds[1] / this.cameraSize + shapeSize,
        this.bounds[1] / this.cameraSize - shapeSize
      );
    }

    sphere = new ReflectiveSphere();
    this.addSphere(sphere);
    sphere.body.position.x = this.bounds[0] / this.cameraSize / 2;
    sphere.body.position.y = 0;
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

    ctx.fillText('SERGIU', canvasSize / 2, canvasSize / 2 - fontSize);
    ctx.fillText('LUCUȚAR', canvasSize / 2, canvasSize / 2);
    ctx.fillText('DEVELOPER', canvasSize / 2, canvasSize / 2 + fontSize);

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
