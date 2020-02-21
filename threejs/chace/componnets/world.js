import * as THREE from 'three';

export default class World {

  constructor(camera) {
    this.radius = 150;
    this.geom = new THREE.SphereGeometry(this.radius, 30, 30);
    this.geom.mergeVertices();

    this.mat = new THREE.MeshPhongMaterial({
      color: 0xAB5C0F,
      transparent: true,
      opacity: 1,
    });
    this.mesh = new THREE.Mesh(this.geom, this.mat);
    this.mesh.receiveShadow = true;

    for (let vertex of this.geom.vertices) {
      const amp = -5 + Math.random() * 15;
      vertex.x += Math.cos(Math.random() * Math.PI * 2) * amp;
      vertex.y += Math.sin(Math.random() * Math.PI * 2) * amp;
    }
    this.mesh.geometry.verticesNeedUpdate = true;
  }
}
