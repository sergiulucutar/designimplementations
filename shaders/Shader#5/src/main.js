import * as THREE from 'three';

class App {
  constructor() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);
  }

  draw() {
    this.renderer.render(this.scene, this.camera);
  }
}

function loop() {
  app.draw();

  requestAnimationFrame(loop);
}

var app = new App();
window.onload = () => {
  loop();
};
