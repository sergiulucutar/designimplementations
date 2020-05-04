import * as THREE from 'three';
import { Sphere } from './objets/sphere';
import { Utils } from '../utils';
import { World } from './objets/world';

export class Interaction3d {
  constructor(domEl) {
    this.domEl = domEl;
    this.cameraSize = 50;

    this.bounds = [document.body.clientWidth, window.innerHeight];

    this.camera = new THREE.OrthographicCamera(
      -this.bounds[0] / this.cameraSize,
      this.bounds[0] / this.cameraSize,
      this.bounds[1] / this.cameraSize,
      -this.bounds[1] / this.cameraSize,
      5,
      100
    );
    this.camera.position.set(0, 0, 50);

    this.scene = new THREE.Scene();

    const ambLight = new THREE.AmbientLight(0xffffff, 0.2);
    this.scene.add(ambLight);
    const spotLight = new THREE.SpotLight(0xffffff, 1);
    spotLight.position.set(0, 80, 70);
    spotLight.castShadow = true;
    this.scene.add(spotLight);

    this.renderer = new THREE.WebGLRenderer({
      alpha: 1,
      antialias: true,
    });
    this.renderer.setSize(this.bounds[0], this.bounds[1]);
    domEl.appendChild(this.renderer.domElement);

    this.physiscs = new World(this.bounds, this.cameraSize);

    this.balls = [];
    this.isIntroFinished = true;
  }

  init(spheresCount) {
    this.addBalls(spheresCount);
  }

  addBalls(spheresCount) {
    for (let i = 0; i < spheresCount; i++) {
      this.balls.push(new Sphere(Utils.paletteArray[Utils.random(0, 3)]));
    }

    for (let i = 0; i < this.balls.length; i++) {
      this.balls[i].body.position.x = Utils.random(
        -this.bounds[0] / this.cameraSize,
        this.bounds[0] / this.cameraSize
      );
      this.balls[i].body.position.y = Utils.random(
        -this.bounds[1] / this.cameraSize,
        this.bounds[1] / this.cameraSize
      );

      this.scene.add(this.balls[i].mesh);
      this.physiscs.world.add(this.balls[i].body);
    }
  }

  draw() {
    this.renderer.render(this.scene, this.camera);
  }

  update() {
    for (let ball of this.balls) {
      ball.update();
    }
  }

  reseize() {
    this.bounds[0] = document.body.clientWidth;
    this.bounds[1] = document.body.clientHeight;

    this.renderer.setSize(this.bounds[0], this.bounds[1]);

    this.camera.left = -this.bounds[0] / this.cameraSize;
    this.camera.right = this.bounds[0] / this.cameraSize;
    this.camera.top = this.bounds[1] / this.cameraSize;
    this.camera.bottom = -this.bounds[1] / this.cameraSize;
    this.camera.updateProjectionMatrix();
  }
}
