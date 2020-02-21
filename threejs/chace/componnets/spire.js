import * as THREE from 'three';
import Utils from './utils';

class Spire {
  constructor() {
    this.mesh = new THREE.Object3D();
    this.mesh.castShadow = true;

    const partGeom = new THREE.BoxGeometry(10, 10, 10);
    const partMat = new THREE.MeshPhongMaterial({
      color: 0xAB5C0F
    });

    const specialMat = new THREE.MeshPhongMaterial({
      color: 0xDC493A
    })

    const piecesCount = Utils.random(5, 15)
    for (let i = 0; i < piecesCount; i++) {
      const mat = i === 14 ? specialMat : partMat;

      const tempMesh = new THREE.Mesh(partGeom, mat);
      tempMesh.scale.set(1 - i * .06, 1 - i * .06, 1 - i * .06);
      tempMesh.position.z = -i * 5;
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
    if (this.piecesCount > 13) {
      this.mesh.children[this.piecesCount - 1].rotation.y += .1;
    }
  }
}

export default class Spires {
  constructor() {
    this.mesh = new THREE.Object3D();
    this.mesh.castShadow = true;
    this.spiresCount = 30;

    for (let i = 0; i < this.spiresCount; i++) {
      const spire = new Spire();
      const pos = Utils.getPositionOnSphere(150);
      spire.mesh.position.set(pos[0], pos[1], pos[2]);
      spire.mesh.lookAt(0, 0, 0);

      this.mesh.add(spire.mesh);
    }

    this.mesh.receiveShadow = true;
  }

  update() {
    this.mesh.children.forEach(spire => {
      const childCount = spire.children.length;
      if (childCount > 13) {
        spire.children[childCount - 1].rotation.y += .01;
      }
    });
  }
}
