import * as THREE from 'three';
import { Shape } from './components/shape';
import { Wall } from './components/wall';

import { TweenLite } from 'gsap';
import { Power2 } from 'gsap/gsap-core';

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

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

    // OrbitControls.OrbitControls
    // this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    // this.controls.enableZoom = false;

    // this.shape = null;
    this.shapes = [];
    this.shapeMeshes = new THREE.Object3D();
    this.hoveredElements = [];

    this.cursorPosition = new THREE.Vector2();
  }

  init() {
    // const geom = new THREE.SphereGeometry(2, 32, 16);
    // const mat = new THREE.MeshPhongMaterial({
    //   color: 'green'
    // });
    // this.scene.add(new THREE.Mesh(geom, mat));
    for (let i = 0; i < 5; i++) {
      const shape = new Shape();
      shape.mesh.position.x = random(0, 20) - 10;
      shape.mesh.position.y = random(0, 10) - 5;
      shape.mesh.position.z = random(0, 5) * -1;

      this.shapeMeshes.add(shape.mesh);
      // this.scene.add(shape.mesh);
      this.shapes.push(shape);
    }

    this.scene.add(this.shapeMeshes);

    // Shader #2
    const wall = new Wall();
    wall.mesh.position.z = -10;
    this.scene.add(wall.mesh);

    this.addEventListeners();
  }

  draw() {
    this.renderer.render(this.scene, this.camera);
  }

  update(time) {
    // this.shapes.forEach(obj => {
    //   // obj.update(time);
    //   obj.update(this.cursorPosition);
    // });
    // this.controls.update();
    if (distance(this.camera.position, this.cursorPosition) > 0.05) {
      this.camera.position.x +=
        (this.cursorPosition.x - this.camera.position.x) * 0.05;
      this.camera.position.y +=
        (this.cursorPosition.y - this.camera.position.y) * 0.05;
    }
  }

  addEventListeners() {
    this.domEl.addEventListener('mousemove', event => {
      this.cursorPosition.x = -1 + 2 * (event.offsetX / this.bounds[0]);
      this.cursorPosition.y = 1 - 2 * (event.offsetY / this.bounds[1]);
      this.checkforCursorIntersections();
    });

    this.domEl.addEventListener('mouseleave', () => {
      this.cursorPosition.x = 0;
      this.cursorPosition.y = 0;
    });
  }

  checkforCursorIntersections() {
    this.raycaster.setFromCamera(this.cursorPosition, this.camera);
    const intersections = this.raycaster.intersectObjects(
      this.shapeMeshes.children
    );
    if (intersections.length) {
      TweenLite.to(intersections[0].object.material.uniforms.hoverIndex, 1.2, {
        value: 0,
        ease: Power2.easeOut
      });
      this.hoveredElements.push(intersections[0].object);
    }

    this.hoveredElements.forEach((obj, index) => {
      if (!intersections.find(int => int.object === obj)) {
        TweenLite.to(obj.material.uniforms.hoverIndex, 1.2, {
          value: 1,
          ease: Power2.easeInOut
        });
        this.hoveredElements.splice(index, 1);
      }
    });
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
