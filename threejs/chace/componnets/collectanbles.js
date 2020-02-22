import * as THREE from 'three';
import Utils from './utils';


class Batch {
  constructor() {
    this.mesh = new THREE.Object3D();

    const partGeom = new THREE.BoxGeometry(2, 2, 2);
    const partMat = new THREE.MeshBasicMaterial({
        color: 0xff00ff
    });

    const numberOfCubs = Utils.random(2, 6);
    let piece;
    for(let i = 0; i < numberOfCubs; i++) {
      piece = new THREE.Mesh(partGeom, partMat);
      piece.position.x = i * 8;
      this.mesh.add(piece);
    }
  }
}

export default class Collectables {
  constructor() {
    this.mesh = new THREE.Object3D();
    this.total = 10;
    const height = 250;

    const stepAngle = 2 * Math.PI / this.total;

    for(let i = 0; i < this.total; i++) {
      const part = new Batch();
      const a = stepAngle * i;

      part.mesh.position.x = Math.cos(a) * height;
      part.mesh.position.y = Math.sin(a) * height;
      part.mesh.position.z = height - (100 * Math.random()) + 50;
      part.mesh.rotation.z = a + Math.PI/2;

      this.mesh.add(part.mesh);
    }

    // this.mesh.lookAt(0, 0, 0);
    this.mesh.rotation.x = Math.PI / 2;
    this.mesh.position.y = 250;
  }
}