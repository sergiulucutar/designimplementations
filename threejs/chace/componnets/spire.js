import * as THREE from 'three';

class Spire {
  constructor() {
    this.mesh = new THREE.Object3D();

    const partGeom = new THREE.BoxGeometry(20, 20, 20);
    const partMat = new THREE.MeshPhongMaterial({
      color: 0xffffff
    });

    for (let i = 0; i < 5; i++) {
      const tempMesh = new THREE.Mesh(partGeom, partMat);
      tempMesh.position.y = i * 15;
      tempMesh.rotation.x = Math.random() * Math.PI * 2;
      tempMesh.rotateOnAxis.z = Math.random() * Math.PI * 2;

      tempMesh.castShadow = true;
      tempMesh.receiveShadow = true;

      this.mesh.add(tempMesh);
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
      const height = 50;
      spire.mesh.position.y = Math.sin(a) * height;
      spire.mesh.position.x = Math.cos(a) * height;
      spire.mesh.position.z = a + Math.PI / 2;
      spire.mesh.position.z = -400 - Math.random() * 400;
      this.mesh.add(spire.mesh);
    }
  }
}
