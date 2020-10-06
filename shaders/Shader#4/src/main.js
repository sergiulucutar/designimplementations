import * as THREE from 'three';
import { Shape, SHAPE_WIDTH } from './components/shape';

import OrbitControls from 'three-orbitcontrols';
import { interpolate } from 'gsap/gsap-core';

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
    this.camera.position.set(0, -5, 15);
    this.camera.rotation.x = Math.PI / 3;
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

    // OrbitControls.OrbitControls
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableZoom = false;

    // Custom
    this.cursorPosition = new THREE.Vector2();
    this.grid = new THREE.Object3D();
    this.shapes = [];
    this.lastZ = 0;
  }

  init() {
    this.createGrid();

    this.addEventListeners();
  }

  draw() {
    this.renderer.render(this.scene, this.camera);
  }

  update(time) {
    for (let shape of this.shapes) {
      // shape.position.y += Math.sin(time * 0.0001);
      shape.mesh.position.x -= 0.005;
      shape.mesh.position.z += 0.005;
      shape.mesh.position.y =
        shape.mesh.position.z * (-shape.mesh.position.z * 0.01);

      if (shape.mesh.position.z > 5) {
        shape.mesh.position.x = shape.initialPosition.x;
        shape.mesh.position.z = this.lastZ;
      }

      if (shape.mesh.material.uniforms.uHovered.value > 0) {
        shape.mesh.material.uniforms.uHovered.value -= 0.01;
      }
    }
  }

  createGrid() {
    const gridSize = 20;
    const gridGap = 1;
    for (let i = 0; i < gridSize * 2; i++) {
      for (let j = 0; j < gridSize; j++) {
        const shape = new Shape();
        shape.mesh.position.x = i * (SHAPE_WIDTH + gridGap);
        shape.mesh.position.z = j * -(SHAPE_WIDTH + gridGap);
        shape.mesh.position.y =
          shape.mesh.position.z * (-shape.mesh.position.z * 0.01);

        shape.initialPosition = shape.mesh.position.clone();

        shape.mesh.scale.multiplyScalar(0.5 + Math.random());
        this.grid.add(shape.mesh);
        this.shapes.push(shape);
      }
    }

    this.scene.add(this.grid);
    this.grid.position.y = 5;
    this.grid.position.x -= gridSize;
    this.grid.position.z = gridSize / 2;

    this.lastZ = (gridSize - 2) * -(SHAPE_WIDTH + gridGap);
  }

  addEventListeners() {
    this.domEl.addEventListener('mousemove', event => {
      this.cursorPosition.x = -1 + 2 * (event.offsetX / this.bounds[0]);
      this.cursorPosition.y = 1 - 2 * (event.offsetY / this.bounds[1]);

      this.raycaster.setFromCamera(this.cursorPosition, this.camera);
      const intersections = this.raycaster.intersectObjects(this.grid.children);
      if (intersections.length) {
        intersections[0].object.material.uniforms.uHovered.value = 1;
      }
    });
  }
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
