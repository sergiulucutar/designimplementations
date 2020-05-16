import * as THREE from 'three';
import * as CANNON from 'cannon';
import { Interaction3d } from './interaction';
import { TimelineLite, Elastic, TweenLite } from 'gsap';
import { ReflectiveSphere, Sphere } from './objets/sphere';

const defaultPivot = new CANNON.Vec3(0, 0, 0);
export class HomeInteraction extends Interaction3d {
  constructor(domEl) {
    super(domEl);
    this.cubCamera = null;

    // Data used user input
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
    const shape = new CANNON.Sphere(0.1);
    this.jointBody = new CANNON.Body({ mass: 0 });
    this.jointBody.addShape(shape);
    this.jointBody.collisionFilterGroup = 0;
    this.jointBody.collisionFilterMask = 0;
    this.physiscs.world.addBody(this.jointBody);
    this.mouseContraint = null;
  }

  init() {
    this.createReflextionText();

    this.addSphere(new Sphere());
    this.addSphere(new Sphere());
    // this.addSphere(new Sphere());
    this.addSphere(new ReflectiveSphere());
    // this.addSphere(new ReflectiveSphere());

    this.domEl.addEventListener('mousedown', this.selectSphere.bind(this));
    this.domEl.addEventListener('mousemove', this.moveSphere.bind(this));
    this.domEl.addEventListener('mouseup', this.leaveSphere.bind(this));

    this.domEl.addEventListener('touchstart', event =>
      this.selectSphere(event.touches[0])
    );
    this.domEl.addEventListener('touchmove', event =>
      this.moveSphere(event.touches[0])
    );
    this.domEl.addEventListener('touchend', event =>
      this.leaveSphere(event.touches[0])
    );

    const time = new TimelineLite();
    this.spheres.forEach((sphere, index) => {
      sphere.mesh.visible = false;
      time.from(
        sphere.mesh.scale,
        0.6,
        {
          x: 0.01,
          y: 0.01,
          z: 0.01,
          ease: Elastic.easeOut,
          onStart: () => (sphere.mesh.visible = true)
        },
        index * 0.2
      );
    });
  }

  leaveSphere() {
    this.physiscs.world.removeConstraint(this.mouseContraint);
    this.mouseContraint = null;
  }

  moveSphere(event) {
    if (!this.mouseContraint) {
      return;
    }

    this.mouse.x = (event.clientX / this.bounds[0]) * 2 - 1;
    this.mouse.y = -(event.clientY / this.bounds[1]) * 2 + 1;

    this.jointBody.position.x =
      this.mouse.x * (this.bounds[0] / this.cameraSize);
    this.jointBody.position.y =
      this.mouse.y * (this.bounds[1] / this.cameraSize);
    this.mouseContraint.update();
  }

  selectSphere(event) {
    this.mouse.x = (event.clientX / this.bounds[0]) * 2 - 1;
    this.mouse.y = -(event.clientY / this.bounds[1]) * 2 + 1;

    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersects = this.raycaster.intersectObjects(this.scene.children);
    if (intersects.length) {
      const sphere = this.spheres.find(
        sphere => sphere.mesh === intersects[0].object
      );

      if (sphere) {
        TweenLite.from(intersects[0].object.scale, 1.2, {
          x: 0.8,
          y: 0.8,
          z: 0.8,
          ease: Elastic.easeOut
        });

        this.jointBody.position.x =
          this.mouse.x * (this.bounds[0] / this.cameraSize);
        this.jointBody.position.y =
          this.mouse.y * (this.bounds[1] / this.cameraSize);
        this.addMouseConstraint(sphere);
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

  createReflextionText() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    const canvasSize = 2048;
    canvas.width = canvasSize;
    canvas.height = canvasSize;

    const fontSize = 80;
    ctx.fillStyle = '#e0e2db';
    ctx.font = `${fontSize}px Syne Extra`;
    ctx.textAlign = 'center';

    // const gap = canvasSize / 20;
    // for (let i = 0; i < canvasSize; i += gap) {
    //   for (let j = 0; j < canvasSize; j += gap) {
    //     ctx.fillText('|', i, j);
    //   }
    // }

    ctx.fillText('SERGIU', canvasSize / 2, canvasSize / 2 - fontSize);
    ctx.fillText('LUCUȚAR', canvasSize / 2, canvasSize / 2);
    ctx.fillText('DEVELOPER', canvasSize / 2, canvasSize / 2 + fontSize);

    // document.body.appendChild(canvas);

    const planeGeom = new THREE.PlaneGeometry(
      (this.bounds[0] / this.cameraSize) * 2,
      (this.bounds[0] / this.cameraSize) * 2
    );
    const texture = new THREE.CanvasTexture(ctx.canvas);
    const mat = new THREE.MeshBasicMaterial({
      map: texture
    });
    const plane = new THREE.Mesh(planeGeom, mat);
    plane.scale.x = -1;
    plane.position.z = -50;

    this.scene.add(plane);
  }
}
