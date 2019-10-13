import * as THREE from 'three';

export default class World {

  constructor() {
    this.geom = new THREE.SphereGeometry(100, 50, 50);
    this.mat = new THREE.MeshPhongMaterial({
      color: 0x006494,
      transparent: true,
      opacity: .98,
    });
    this.mesh = new THREE.Mesh(this.geom, this.mat);
    this.mesh.receiveShadow = true;
  }
}