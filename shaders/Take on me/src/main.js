import * as THREE from 'three';
import { MagicWindow } from './components/magicwindow';
import { Wall } from './components/wall';
import { Cube, FloatingCube } from './components/cube.object';
import { Power2, TweenLite } from 'gsap/gsap-core';

class App {
  constructor() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    this.camera.position.set(-0.1, 1, 6);
    this.camera.lookAt(new THREE.Vector3(0, 0.15, 0));
    this.cameraOffset = 0;
    this.prevCameraOffset = 0;

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.scene.add(ambientLight);

    const spotLight = new THREE.SpotLight(0xffffff, 0.7);
    spotLight.castShadow = true;

    spotLight.position.set(3, 20, 4);

    spotLight.shadow.mapSize.width = 1024;
    spotLight.shadow.mapSize.height = 1024;

    spotLight.shadow.camera.near = 50;
    spotLight.shadow.camera.far = 100;
    spotLight.shadow.camera.fov = 10;

    this.scene.add(spotLight);

    this.renderer = new THREE.WebGLRenderer({
      alpha: 1,
      antialias: 1
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);
  }

  init() {
    this.magicWindow = new MagicWindow();
    this.magicWindow.mesh.position.x = 0.1;
    this.magicWindow.mesh.position.z = 2;
    this.magicWindow.mesh.position.y = 0.5;
    this.magicWindow.mesh.rotation.y = Math.PI / 2;
    this.scene.add(this.magicWindow.mesh);

    this.scene.add(new Wall().mesh);

    // Objects
    let cube;
    cube = new Cube();
    cube.mesh.scale.set(10, 3, 2);
    cube.mesh.position.set(-6, 1.8, -3.5);
    cube.mesh.rotation.y = Math.PI / 4;
    this.scene.add(cube.mesh);

    const line = new THREE.Object3D();

    cube = new Cube();
    cube.mesh.position.set(0, 0, -5);
    cube.mesh.scale.y = 3;
    cube.mesh.scale.z = 3;
    line.add(cube.mesh);

    cube = new Cube();
    cube.mesh.scale.y = 3;
    cube.mesh.position.set(0, 0, -2);
    line.add(cube.mesh);

    cube = new Cube();
    cube.mesh.scale.y = 3;
    cube.mesh.scale.z = 3;
    cube.mesh.position.set(0, 0, 1);
    line.add(cube.mesh);

    line.position.set(6, 1.8, -1);
    line.rotation.y = Math.PI / 4;
    this.scene.add(line);

    this.floatingCubes = [];
    let floatingCube = new FloatingCube();
    floatingCube.mesh.scale.set(0.4, 0.4, 0.4);
    let customPosition = this.magicWindow.mesh.position.clone();
    floatingCube.setPositon(
      customPosition.x + 1.5,
      customPosition.y,
      customPosition.z
    );

    this.scene.add(floatingCube.mesh);
    this.floatingCubes.push(floatingCube);

    floatingCube = new FloatingCube();
    floatingCube.mesh.scale.set(0.4, 0.4, 0.4);
    floatingCube.setPositon(
      customPosition.x - 1.5,
      customPosition.y,
      customPosition.z
    );

    this.scene.add(floatingCube.mesh);
    this.floatingCubes.push(floatingCube);
  }

  addEventListeners() {
    const canvas = this.renderer.domElement;

    canvas.addEventListener('mousemove', event => {
      this.prevCameraOffset = this.cameraOffset;
      this.cameraOffset = -1 + 2 * (event.offsetX / window.innerWidth);
    });

    canvas.addEventListener('mouseleave', () => {
      TweenLite.to(this, 0.6, {
        cameraOffset: 0,
        ease: Power2.easeOut
      });

      TweenLite.to(this.camera.rotation, 0.6, {
        y: 0,
        ease: Power2.easeOut
      });
    });
  }

  draw() {
    this.renderer.render(this.scene, this.camera);
  }

  update() {
    this.floatingCubes.forEach(cube => cube.update());

    if (this.cameraOffset) {
      if (Math.abs(this.camera.position.x - this.cameraOffset) > 0.08) {
        this.camera.position.x +=
          (this.cameraOffset - this.camera.position.x) * 0.08;

        this.camera.rotation.y +=
          (this.cameraOffset - this.camera.position.x) * 0.02 * (-Math.PI / 4);

        // Move the magic window
        this.magicWindow.mesh.position.x +=
          (this.cameraOffset - this.magicWindow.mesh.position.x) * 0.2;

        this.magicWindow.mesh.rotation.y +=
          (this.cameraOffset - this.magicWindow.mesh.position.x) *
          0.3 *
          (Math.PI / 4);

        this.floatingCubes[0].mesh.position.x =
          this.magicWindow.mesh.position.x + 1.5;
        this.floatingCubes[0].mesh.position.z =
          -this.magicWindow.mesh.position.x + 1.5;
        this.floatingCubes[1].mesh.position.x =
          this.magicWindow.mesh.position.x - 1.5;
        this.floatingCubes[1].mesh.position.z =
          this.magicWindow.mesh.position.x + 1.5;
      }
    }
  }
}

var app;
function loop() {
  app.update();
  app.draw();

  requestAnimationFrame(loop);
}

window.onload = () => {
  app = new App();
  app.init();
  app.addEventListeners();

  loop();
};

window.onresize = () => {
  app.renderer.setSize(window.innerWidth, window.innerHeight);
};
