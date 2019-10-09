import * as THREE from 'three';
import Utils from './utils';

class Spire {
  constructor() {
    this.mesh = new THREE.Object3D();

    const partGeom = new THREE.BoxGeometry(10, 10, 10);
    const partMat = new THREE.MeshPhongMaterial({
      color: 0x4392F1
    });

    const piecesCount = Utils.random(5, 15) 
    for (let i = 0; i < piecesCount; i++) {

      const tempMesh = new THREE.Mesh(partGeom, partMat);
      // tempMesh.scale.set(1 / i, 1 / i, 1 / i);
      tempMesh.scale.set(1 - i * .06, 1 - i * .06, 1 - i * .06);
      tempMesh.position.y = i * 5;
      tempMesh.rotation.x = Math.random() * Math.PI * 2;
      tempMesh.rotation.z = Math.random() * Math.PI * 2;

      tempMesh.castShadow = true;
      tempMesh.receiveShadow = true;

      this.mesh.add(tempMesh);
    }

    this.mesh.castShadow = true;
    this.mesh.receiveShadow = true;
  }

  update() {
    if(this.piecesCount > 13) {
      this.mesh.children[this.piecesCount - 1].rotation.y += .1;
    }
  }
}

export default class Spires {
  constructor() {
    this.mesh = new THREE.Object3D();
    this.spiresCount = 50;

    const angle = Math.PI * 2 / this.spiresCount;
    for (let i = 0; i < this.spiresCount; i++) {
      const spire = new Spire();
      const a = angle * i;
      const height = 100;
      spire.mesh.position.x = Math.cos(a) * height;
      spire.mesh.position.y = Math.sin(a) * height;
      spire.mesh.position.z = 20 + -1 * Math.random() * 150;
      spire.mesh.rotation.z = a - Math.PI / 2;
      this.mesh.add(spire.mesh);
    }
  }

  update() {
    this.mesh.children.forEach(spire => {
      // debugger;
      const childCount = spire.children.length;
      if(childCount > 13) {
        spire.children[childCount - 1].rotation.y += .01;
        // spire.children[childCount - 1].position.y += Math.cos(spire.children[childCount - 1].position.y + 1);
      }
      // spire.update();
    })
  }
}
