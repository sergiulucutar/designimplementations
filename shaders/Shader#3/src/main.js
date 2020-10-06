import * as THREE from 'three';
import { TweenLite, Power2 } from 'gsap';

import { Wall } from './components/wall';
// import { Wall } from './components/sea_blue';
import { Boat } from './components/boat';

class App {
  constructor() {
    this.domEl = document.querySelector('.wrapper');
    this.bounds = [this.domEl.offsetWidth, this.domEl.offsetHeight];

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75,
      this.bounds[0] / this.bounds[1],
      1,
      50
    );
    this.camera.position.set(0, 0, 10);
    this.raycaster = new THREE.Raycaster();

    this.renderer = new THREE.WebGLRenderer({
      alpha: 1,
      antialias: 1
    });
    this.renderer.setSize(this.bounds[0], this.bounds[1]);
    document.querySelector('.wrapper').appendChild(this.renderer.domElement);

    // Light
    const ambientList = new THREE.AmbientLight('white', 0.7);
    this.scene.add(ambientList);

    const directionalLight = new THREE.DirectionalLight('white');
    directionalLight.position.set(3, -1, 10);

    this.scene.add(directionalLight);

    // Custom
    this.boat = new Boat();
    this.scene.add(this.boat.mesh);
    this.cursorPosition = new THREE.Vector2();
  }

  init() {
    this.wall = new Wall();
    this.wall.mesh.position.z = -10;
    this.scene.add(this.wall.mesh);

    this.boat.mesh.position.z = -9;
    this.boat.mesh.scale.setScalar(0.8);

    this.addEventListeners();
  }

  draw() {
    this.renderer.render(this.scene, this.camera);
  }

  update(time) {
    this.wall.update(time);
    this.boat.mesh.rotation.y += Math.sin(time / 2) * 0.005;

    // Camera moveemnt;
    if (distance(this.camera.position, this.cursorPosition) > 0.05) {
      this.camera.position.x +=
        (this.cursorPosition.x - this.camera.position.x) * 0.05;
      this.camera.position.y +=
        (this.cursorPosition.y - this.camera.position.y) * 0.05;
    }
  }

  addEventListeners() {
    this.domEl.addEventListener('click', event => {
      this.cursorPosition.x = -1 + 2 * (event.offsetX / this.bounds[0]);
      this.cursorPosition.y = 1 - 2 * (event.offsetY / this.bounds[1]);

      this.raycaster.setFromCamera(this.cursorPosition, this.camera);
      const intersations = this.raycaster.intersectObject(this.wall.mesh);
      if (intersations.length) {
        this.moveBoat(intersations[0]);
        this.rotateBoatOnMovement(intersations[0]);
      }
    });
  }

  rotateBoatOnMovement(intersection) {
    let angle =
      (Math.atan2(
        intersection.point.y - this.boat.mesh.position.y,
        intersection.point.x - this.boat.mesh.position.x
      ) *
        180) /
      Math.PI;

    angle = (angle / 360) * 2 * Math.PI;
    TweenLite.to(this.boat.mesh.rotation, 0.2, {
      z: angle - Math.PI / 2,
      ease: Power2.easeInOut
    });
  }

  moveBoat(intersection) {
    if (this.boat.queuedMovement) {
      this.boat.queuedMovement.kill();
    }
    this.queuedMovement = TweenLite.from(this.boat, 2, {
      movementTime: 0,
      ease: Power2.easeInOut,
      onUpdate: () => {
        this.boat.mesh.position.x = lerp(
          this.boat.mesh.position.x,
          intersection.point.x,
          this.boat.movementTime
        );
        this.boat.mesh.position.y = lerp(
          this.boat.mesh.position.y,
          intersection.point.y,
          this.boat.movementTime
        );
      }
    });
  }
}

function distance(pos1, pos2) {
  return Math.sqrt(Math.pow(pos1.x - pos2.x, 2) + Math.pow(pos1.y - pos2.y, 2));
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

let time = 0,
  app;
function loop() {
  requestAnimationFrame(loop);

  time += 0.1;
  app.update(time);
  app.draw();
}

window.onload = () => {
  app = new App();
  app.init();

  loop();
};
