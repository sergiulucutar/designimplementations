import * as THREE from 'three';
import { World } from './objets/world';
import { Utils } from '../utils';
import { ReflectiveSphere } from './objets/sphere';

export class Interaction3d {
  constructor(domEl) {
    this.domEl = domEl;
    this.bounds = [this.domEl.offsetWidth, this.domEl.offsetHeight];

    this.cameraSize = 50;
    this.camera = new THREE.OrthographicCamera(
      -this.bounds[0] / this.cameraSize,
      this.bounds[0] / this.cameraSize,
      this.bounds[1] / this.cameraSize,
      -this.bounds[1] / this.cameraSize,
      0.1,
      60
    );
    this.camera.position.set(0, 0, 50);

    this.scene = new THREE.Scene();

    const ambLight = new THREE.AmbientLight(0xffffff, 1);
    this.scene.add(ambLight);
    const spotLight = new THREE.SpotLight(0xffffff, 1);
    spotLight.position.set(0, 20, 70);
    spotLight.castShadow = true;

    this.scene.add(spotLight);
    this.renderer = new THREE.WebGLRenderer({
      alpha: 1,
      antialias: true
    });
    this.renderer.setSize(this.bounds[0], this.bounds[1]);
    domEl.appendChild(this.renderer.domElement);

    this.physiscs = new World(this.bounds, this.cameraSize);

    this.spheres = [];
  }

  addSphere(sphere) {
    this.spheres.push(sphere);

    sphere.body.position.x = Utils.random(
      -this.bounds[0] / this.cameraSize,
      this.bounds[0] / this.cameraSize
    );

    sphere.body.position.y = Utils.random(
      -this.bounds[1] / this.cameraSize,
      this.bounds[1] / this.cameraSize
    );

    this.scene.add(sphere.mesh);
    this.physiscs.world.add(sphere.body);

    if (sphere instanceof ReflectiveSphere) {
      this.scene.add(sphere.cubeCam);
    }
  }

  draw() {
    this.renderer.render(this.scene, this.camera);
  }

  update() {
    for (let sphere of this.spheres) {
      sphere.update();

      if (sphere instanceof ReflectiveSphere) {
        sphere.mesh.visible = false;
        sphere.cubeCam.update(this.renderer, this.scene);
        sphere.mesh.visible = true;
      }
    }
  }

  reseize() {
    this.bounds[0] = document.body.clientWidth;
    this.bounds[1] = window.innerHeight;

    this.renderer.setSize(this.bounds[0], this.bounds[1]);

    this.camera.left = -this.bounds[0] / this.cameraSize;
    this.camera.right = this.bounds[0] / this.cameraSize;
    this.camera.top = this.bounds[1] / this.cameraSize;
    this.camera.bottom = -this.bounds[1] / this.cameraSize;
    this.camera.updateProjectionMatrix();
  }
}
