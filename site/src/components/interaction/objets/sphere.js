import * as CANNON from 'cannon';
import * as THREE from 'three';

const size = 2;
const sphereGeom = new THREE.SphereBufferGeometry(size, 52, 52);
export class Sphere {
  constructor(color = 0x000000) {
    this.mat = new THREE.MeshStandardMaterial({
      color,
      roughness: 0.3
    });
    this.mesh = new THREE.Mesh(sphereGeom, this.mat);

    this.body = new CANNON.Body({
      mass: 5,
      position: new CANNON.Vec3(0, 10, 0),
      shape: new CANNON.Sphere(size)
    });

    this.body.angularDamping = 0;
  }

  setPosition({ x, y, z }) {
    if (x) {
      this.body.position.x = x;
    }

    if (y) {
      this.body.position.y = y;
    }

    if (z) {
      this.body.position.z = z;
    }
  }

  update() {
    this.mesh.position.x = this.body.position.x;
    this.mesh.position.y = this.body.position.y;
    this.mesh.position.z = this.body.position.z;
    this.mesh.quaternion.x = this.body.quaternion.x;
    this.mesh.quaternion.y = this.body.quaternion.y;
    this.mesh.quaternion.z = this.body.quaternion.z;
    this.mesh.quaternion.w = this.body.quaternion.w;
  }
}

export class CanvasSphere extends Sphere {
  constructor(canvasTexture) {
    super();

    this.canvasTexture = canvasTexture;
    this.sphereTexture = new THREE.CanvasTexture(this.canvasTexture.canvas);

    this.mat = new THREE.MeshStandardMaterial({
      map: this.sphereTexture,
      roughness: 0.3
    });
    this.mesh = new THREE.Mesh(sphereGeom, this.mat);
  }

  update() {
    super.update();

    this.canvasTexture.update();
    this.sphereTexture.needsUpdate = true;
  }
}