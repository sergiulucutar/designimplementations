import * as THREE from 'three';
import * as CANNON from 'cannon';
import { World } from './objets/world';
import { ReflectiveSphere } from './objets/sphere';

import { TimelineLite, Elastic, TweenMax } from 'gsap';
import { Utils } from '../utils';
import { Power2 } from 'gsap/gsap-core';

const defaultPivot = new CANNON.Vec3(0, 0, 0);
const defaultPivotShape = new CANNON.Sphere(0.1);

export class Interaction3d {
  constructor(canvas, bounds) {
    this.bounds = bounds;
    this.canvas = canvas;

    canvas.width = this.bounds[0];
    canvas.height = this.bounds[1];

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

    const ambLight = new THREE.AmbientLight(0xffffff, 0.8);
    this.scene.add(ambLight);
    const spotLight = new THREE.SpotLight(0xffffff, 0.4);
    spotLight.position.set(0, 20, 70);
    spotLight.castShadow = true;
    this.scene.add(spotLight);

    this.renderer = new THREE.WebGLRenderer({
      alpha: 1,
      antialias: true,
      canvas
    });
    // this.renderer.setSize(this.bounds[0], this.bounds[1]);

    this.physiscs = new World(this.bounds, this.cameraSize);

    this.spheres = [];

    // Data used user input
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
    this.jointBody = new CANNON.Body({ mass: 0 });
    this.jointBody.addShape(defaultPivotShape);
    this.jointBody.collisionFilterGroup = 0;
    this.jointBody.collisionFilterMask = 0;
    this.physiscs.world.addBody(this.jointBody);
    this.mouseContraint = null;
  }

  addSphere(sphere) {
    sphere.mesh.scale.set(0.01, 0.01, 0.01);
    this.spheres.push(sphere);
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

  showObjects() {
    const time = new TimelineLite();
    this.spheres.forEach((sphere, index) => {
      time.to(
        sphere.mesh.scale,
        0.8,
        {
          x: 1,
          y: 1,
          z: 1,
          ease: Power2.easeOut,
          onStart: () => {
            sphere.body.angularDamping = 0.5;
            sphere.body.torque = new CANNON.Vec3(
              Utils.randomSign() * Utils.random(5, 10) * 2000,
              Utils.randomSign() * Utils.random(5, 10) * 2000,
              Utils.randomSign() * Utils.random(5, 10) * 2000
            );
          }
        },
        index * 0.04
      );
    });
  }

  /**
   * User Input handlers
   */
  leaveSphere() {
    this.physiscs.world.removeConstraint(this.mouseContraint);
    this.mouseContraint = null;
  }

  moveSphere(event) {
    if (!this.mouseContraint) {
      return;
    }

    this.mouse.x = (event.offsetX / this.bounds[0]) * 2 - 1;
    this.mouse.y = -(event.offsetY / this.bounds[1]) * 2 + 1;

    this.jointBody.position.x =
      this.mouse.x * (this.bounds[0] / this.cameraSize);
    this.jointBody.position.y =
      this.mouse.y * (this.bounds[1] / this.cameraSize);
    this.mouseContraint.update();
  }

  selectSphere(event) {
    this.mouse.x = (event.offsetX / this.bounds[0]) * 2 - 1;
    this.mouse.y = -(event.offsetY / this.bounds[1]) * 2 + 1;

    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersects = this.raycaster.intersectObjects(this.scene.children);
    if (intersects.length) {
      const sphere = this.spheres.find(
        sphere => sphere.mesh === intersects[0].object
      );

      if (sphere) {
        if (!sphere.tween) {
          sphere.tween = TweenMax.from(intersects[0].object.scale, 1.2, {
            x: 0.8,
            y: 0.8,
            z: 0.8,
            ease: Elastic.easeOut
          });
        } else {
          sphere.tween.restart();
        }

        this.addMouseConstraint(sphere);

        if (event.isOnMobile) {
          // Set the shape on a random trajectory
          sphere.body.velocity.x =
            (Math.random() + 1) * Math.sign(Math.random() - 0.5) * 10;
          sphere.body.velocity.y =
            (Math.random() + 1) * Math.sign(Math.random() - 0.5) * 10;
        } else {
          this.jointBody.position.x =
            this.mouse.x * (this.bounds[0] / this.cameraSize);
          this.jointBody.position.y =
            this.mouse.y * (this.bounds[1] / this.cameraSize);
        }
      }
    }
  }

  addMouseConstraint(sphere) {
    this.mouseContraint = new CANNON.PointToPointConstraint(
      sphere.body,
      defaultPivot,
      this.jointBody,
      defaultPivot
    );
    this.physiscs.world.addConstraint(this.mouseContraint);
  }
}
