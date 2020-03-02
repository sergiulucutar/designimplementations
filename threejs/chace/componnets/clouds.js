import * as THREE from 'three';
import Utils from "./utils";

class Cloud {
  constructor() {
    this.mesh = new THREE.Object3D();
    const geom = new THREE.SphereGeometry(20, 20, 20);
    const mat = new THREE.MeshPhongMaterial({
      color: 0xffffff
    });

    const nrOfParts = 3 + Utils.random(1, 4);
    let mesh;
    for (let i = 0; i < nrOfParts; i++) {
      mesh = new THREE.Mesh(geom, mat);

      mesh.position.x = i * 15;
      mesh.position.y = Math.random() * 10;
      mesh.position.z = Math.random() * 10;

      mesh.rotation.y = Math.random() * Math.PI * 2;
      mesh.rotation.z = Math.random() * Math.PI * 2;

      const randomScale = .1 + Math.random() * .9;
      mesh.scale.set(randomScale, randomScale, randomScale);

      this.mesh.add(mesh);
    }
  }
}

export class Clouds {
  constructor() {
    this.mesh = new THREE.Object3D();

    const nrOfClouds = 40;
    for (let i = 0; i < nrOfClouds; i++) {
      const spire = new Cloud();
      const pos = Utils.getPositionOnSphere(200);
      spire.mesh.position.set(pos[0], pos[1], pos[2]);
      spire.mesh.lookAt(0, 0, 0);

      this.mesh.add(spire.mesh);
    }
  }
}
