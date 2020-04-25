import * as CANNON from 'cannon';
import * as THREE from 'three';
import { Sphere, CanvasSphere } from './objets/sphere';
import { CanvasTextureText } from './objets/canvas-texture';
import { Utils } from '../utils';

import { TimelineLite, Power4, Power2 } from 'gsap';

export class Interaction3d {
  constructor() {
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

    spotLight.shadow.mapSize.width = 1024;
    spotLight.shadow.mapSize.height = 1024;

    spotLight.shadow.camera.near = 100;
    spotLight.shadow.camera.far = 4000;
    spotLight.shadow.camera.fov = 30;

    this.scene.add(spotLight);

    this.renderer = new THREE.WebGLRenderer({
      alpha: 1,
      antialias: true,
    });
    this.renderer.setSize(this.bounds[0], this.bounds[1]);
    document
      .querySelector('.interaction')
      .appendChild(this.renderer.domElement);

    // CannonJS
    this.world = new CANNON.World();
    this.world.gravity.z = -9.8;

    const bounds = {
      top: new CANNON.Body({
        mass: 0,
      }),
      bottom: new CANNON.Body({
        mass: 0,
      }),
      left: new CANNON.Body({
        mass: 0,
      }),
      right: new CANNON.Body({
        mass: 0,
      }),
      floor: new CANNON.Body({
        mass: 0,
      }),
    };

    var groundShape = new CANNON.Plane();
    bounds.top.addShape(groundShape);
    bounds.bottom.addShape(groundShape);
    bounds.left.addShape(groundShape);
    bounds.right.addShape(groundShape);
    bounds.floor.addShape(groundShape);

    bounds.bottom.position.y = -this.bounds[1] / this.cameraSize;
    bounds.bottom.quaternion.setFromAxisAngle(
      new CANNON.Vec3(1, 0, 0),
      -Math.PI / 2
    );

    bounds.top.position.y = this.bounds[1] / this.cameraSize;
    bounds.top.quaternion.setFromAxisAngle(
      new CANNON.Vec3(1, 0, 0),
      Math.PI / 2
    );

    bounds.left.position.x = -this.bounds[0] / this.cameraSize;
    bounds.left.quaternion.setFromAxisAngle(
      new CANNON.Vec3(0, 1, 0),
      Math.PI / 2
    );

    bounds.right.position.x = this.bounds[0] / this.cameraSize;
    bounds.right.quaternion.setFromAxisAngle(
      new CANNON.Vec3(0, 1, 0),
      -Math.PI / 2
    );

    bounds.floor.position.z -= 5;

    this.world.addBody(bounds.bottom);
    this.world.addBody(bounds.top);
    this.world.addBody(bounds.left);
    this.world.addBody(bounds.right);
    this.world.addBody(bounds.floor);

    this.balls = [];

    // Intro timeline
    this.timeline = new TimelineLite();
    this.isIntroFinished = false;
  }

  init() {
    const sphere3 = new CanvasSphere(new CanvasTextureText());
    // sphere3.mesh.scale.set(0, 0, 0);
    this.balls.push(sphere3);
    this.scene.add(sphere3.mesh);
    this.world.add(sphere3.body);

    document.querySelector('h1').classList.remove('hidden');
    document.querySelector('nav ul').classList.remove('hidden');
    this.isIntroFinished = true;
    this.addBalls();
  }

  addBalls() {
    // let sphere = new Sphere(Utils.paletteArray[Utils.random(0, 3)]); //new CanvasSphere(new CanvasTextureHL());
    // sphere.body.position.x -= 3;
    // sphere.body.position.y = 5;
    // this.balls.push(sphere);

    // sphere = new Sphere(Utils.paletteArray[Utils.random(0, 3)]); //new CanvasSphere(new CanvasTextureVL());
    // sphere.mesh.rotation.z = Math.PI;
    // this.balls.push(sphere);

    const initalPositionBounds = this.bounds.map((value) => (value -= 5));

    for (let i = 0; i < 6; i++) {
      this.balls.push(new Sphere(Utils.paletteArray[Utils.random(0, 3)]));
    }

    for (let i = 1; i < this.balls.length; i++) {
      this.balls[i].body.position.x = Utils.random(
        -initalPositionBounds[0] / this.cameraSize,
        initalPositionBounds[0] / this.cameraSize
      );
      this.balls[i].body.position.y = Utils.random(
        -initalPositionBounds[1] / this.cameraSize,
        initalPositionBounds[1] / this.cameraSize
      );

      this.scene.add(this.balls[i].mesh);
      this.world.add(this.balls[i].body);
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
