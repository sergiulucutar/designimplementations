import './main.scss';

import * as CANNON from 'cannon';
import * as THREE from 'three';
import { Sphere, CanvasSphere } from './components/interaction/objets/sphere';
import {
  CanvasTextureHL,
  CanvasTextureVL
} from './components/interaction/objets/canvas-texture';
import { Utils } from './components/utils';

const interactionEl = document.querySelector('.interaction');

class Interaction3d {
  constructor() {
    this.cameraSize = 50;

    this.bounds = [window.innerWidth, window.innerHeight];

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
      antialias: true
    });
    this.renderer.setSize(this.bounds[0], this.bounds[1]);
    interactionEl.appendChild(this.renderer.domElement);

    // CannonJS
    this.world = new CANNON.World();
    this.world.gravity.y = -9.8;
    console.log(this.world);

    // var groundBody = new CANNON.Body({
    //   mass: 0
    // });

    const bounds = {
      top: new CANNON.Body({
        mass: 0
      }),
      bottom: new CANNON.Body({
        mass: 0
      }),
      left: new CANNON.Body({
        mass: 0
      }),
      right: new CANNON.Body({
        mass: 0
      })
    };

    var groundShape = new CANNON.Plane();
    bounds.top.addShape(groundShape);
    bounds.bottom.addShape(groundShape);
    bounds.left.addShape(groundShape);
    bounds.right.addShape(groundShape);

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

    this.world.addBody(bounds.bottom);
    this.world.addBody(bounds.top);
    this.world.addBody(bounds.left);
    this.world.addBody(bounds.right);

    this.balls = [];
  }

  init() {
    this.sphere = new CanvasSphere(new CanvasTextureHL());
    this.sphere.body.position.x -= 3;
    this.sphere.body.position.y = 5;
    this.balls.push(this.sphere);

    this.sphere2 = new CanvasSphere(new CanvasTextureVL());
    this.sphere2.mesh.rotation.z = Math.PI;
    this.balls.push(this.sphere2);

    for (let i = 0; i < 9; i++) {
      this.balls.push(new Sphere(Utils.paletteArray[Utils.random(0, 4)]));
    }

    // const sphere4 = new Sphere(Utils.paletteArray[Utils.random(0, 4)]);
    // this.scene.add(sphere4.mesh);
    // this.world.add(sphere4.body);

    // const sphere5 = new Sphere(Utils.paletteArray[Utils.random(0, 4)]);
    // this.scene.add(sphere5.mesh);
    // this.world.add(sphere5.body);

    // const sphere6 = new Sphere(Utils.paletteArray[Utils.random(0, 4)]);
    // this.scene.add(sphere6.mesh);
    // this.world.add(sphere6.body);

    // const sphere7 = new Sphere(Utils.paletteArray[Utils.random(0, 4)]);
    // this.scene.add(sphere7.mesh);
    // this.world.add(sphere7.body);

    for (let ball of this.balls) {
      this.scene.add(ball.mesh);
      this.world.add(ball.body);
    }
  }

  draw() {
    this.renderer.render(this.scene, this.camera);
  }

  update() {
    // this.sphere.update();
    // this.sphere2.update();

    for (let ball of this.balls) {
      ball.update();
    }

    // console.log(this.sphere2.body.position);
    // console.log(this.sphere.body.position);

    // this.sphere2.mesh.rotation.y += 0.01;
  }

  reseize() {
    this.bounds[0] = window.innerWidth;
    this.bounds[1] = window.innerHeight;

    this.renderer.setSize(this.bounds[0], this.bounds[1]);

    this.camera.left = -this.bounds[0] / this.cameraSize;
    this.camera.right = this.bounds[0] / this.cameraSize;
    this.camera.top = this.bounds[1] / this.cameraSize;
    this.camera.bottom = -this.bounds[1] / this.cameraSize;
    this.camera.updateProjectionMatrix();
  }
}

const interaction = new Interaction3d();
interaction.init();

var fixedTimeStep = 1.0 / 60.0;
var lastTime,
  dt,
  time = Date.now();
function loop() {
  requestAnimationFrame(loop);

  // if (lastTime !== undefined) {
  //   dt = (time - lastTime) / 1000;
  interaction.world.step(fixedTimeStep);
  interaction.update();
  interaction.draw();
  // }

  lastTime = time;
}
loop();

window.onresize = () => {
  interaction.reseize();
};
