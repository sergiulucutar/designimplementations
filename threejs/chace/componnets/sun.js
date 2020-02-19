import * as THREE from 'three';

export class Sun {
  constructor() {
    const geom = new THREE.SphereGeometry(40, 50, 50);
    const mat = new THREE.MeshBasicMaterial({color: 0x0CFFFF});
    this.mesh = new THREE.Mesh(geom, mat);
    this.mesh.castShadow = true;

    this.mesh.position.x = 200;
    this.mesh.position.y = 250;
    this.mesh.position.z = -500;
  }
}
