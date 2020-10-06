import * as THREE from 'three';
import { random } from './utils';

const geom = new THREE.BoxGeometry(1, 1, 1);
const mat = new THREE.MeshStandardMaterial({
  color: 0xa496a4
});
const matShell = new THREE.MeshBasicMaterial({
  color: 0xffffff
});

const edgeGeom = new THREE.EdgesGeometry(geom);
const linesMat = new THREE.LineBasicMaterial({
  color: 0x000000
});

export class Cube {
  constructor(material = mat) {
    this.mesh = new THREE.Object3D();

    let mesh;
    mesh = new THREE.Mesh(geom, material);
    this.mesh.add(mesh);

    //Shell
    mesh = new THREE.Mesh(geom, matShell);
    const lines = new THREE.LineSegments(edgeGeom, linesMat);
    mesh.add(lines);
    mesh.renderOrder = 5;
    lines.renderOrder = 5;
    this.mesh.add(mesh);
  }
}

const floatMaterial = new THREE.MeshStandardMaterial({
  color: 0x554d73
});

export class FloatingCube extends Cube {
  constructor() {
    super(floatMaterial);

    this.rotateDirecion = new THREE.Vector3(
      random(-1, 1),
      random(-1, 1),
      random(-1, 1)
    );

    this.floatingDirection = new THREE.Vector3(
      Math.random() * 2 - 1,
      Math.random() * 2 - 1,
      Math.random() * 2 - 1
    );
  }

  setPositon(x, y, z) {
    this.mesh.position.x = x;
    this.mesh.position.y = y;
    this.mesh.position.z = z;

    this.originalPosition = this.mesh.position.clone();
  }

  update() {
    this.mesh.rotation.x += 0.005 * this.rotateDirecion.x;
    this.mesh.rotation.y += 0.005 * this.rotateDirecion.y;
    this.mesh.rotation.z += 0.005 * this.rotateDirecion.z;

    this.mesh.position.x += this.floatingDirection.x * 0.001;
    this.mesh.position.y += this.floatingDirection.y * 0.001;
    this.mesh.position.z += this.floatingDirection.z * 0.001;

    this.updateDirection('x');
    this.updateDirection('y');
    this.updateDirection('z');
  }

  updateDirection(direction) {
    if (Math.abs(this.mesh.position[direction]) > 1) {
      this.floatingDirection[direction] *= -1;
    }
  }
}
