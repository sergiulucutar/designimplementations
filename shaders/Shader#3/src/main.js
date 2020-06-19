import * as THREE from 'three';
import { Wall } from './components/wall';
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
    const ambientList = new THREE.AmbientLight('white', 0.2);
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
    this.boat.mesh.rotation.y = Math.PI / 3;
    this.boat.mesh.scale.setScalar(0.6);

    this.addEventListeners();
  }

  draw() {
    this.renderer.render(this.scene, this.camera);
  }

  update(time) {
    this.wall.update(time);
    this.boat.mesh.rotation.y += Math.sin(time / 4) * 0.01;
    // this.boat.mesh.rotation.y += 0.01;
    // this.controls.update();

    // Camera moveemnt;
    if (distance(this.camera.position, this.cursorPosition) > 0.05) {
      this.camera.position.x +=
        (this.cursorPosition.x - this.camera.position.x) * 0.05;
      this.camera.position.y +=
        (this.cursorPosition.y - this.camera.position.y) * 0.05;
    }
  }

  addEventListeners() {
    const auxVec = new THREE.Vector3(0, 0, 0.1);
    this.domEl.addEventListener('mousemove', () => {
      this.cursorPosition.x = -1 + 2 * (event.offsetX / this.bounds[0]);
      this.cursorPosition.y = 1 - 2 * (event.offsetY / this.bounds[1]);

      auxVec.x = this.cursorPosition.x;
      auxVec.y = this.cursorPosition.y;
      auxVec.z = 0.5;
      auxVec.unproject(this.camera);
      const dir = auxVec.sub(this.camera.position).normalize();
      const pos = this.camera.position
        .clone()
        .add(dir.multiplyScalar(-this.camera.position.z / dir.z));
      this.boat.mesh.position.x = pos.x;
      this.boat.mesh.position.y = pos.y;
    });

    // this.domEl.addEventListener('mousedown', event => {
    // this.checkforCursorIntersections();
    // });
    // this.domEl.addEventListener('mouseleave', () => {
    //   this.cursorPosition.x = 0;
    //   this.cursorPosition.y = 0;
    // });
  }
}

function distance(pos1, pos2) {
  return Math.sqrt(Math.pow(pos1.x - pos2.x, 2) + Math.pow(pos1.y - pos2.y, 2));
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
