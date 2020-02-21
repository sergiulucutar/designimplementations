import * as THREE from 'three';

export default class World {

  constructor(camera) {
    this.radius = 150;
    this.geom = new THREE.SphereGeometry(this.radius, 50, 50);
    this.mat = new THREE.MeshPhongMaterial({
      color: 0xAB5C0F,
      transparent: true,
      opacity: 1,
    });
    this.mesh = new THREE.Mesh(this.geom, this.mat);
    this.mesh.receiveShadow = true;
  }
}
