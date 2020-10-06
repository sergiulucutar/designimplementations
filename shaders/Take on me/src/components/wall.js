import * as THREE from 'three';

export class Wall {
  constructor() {
    this.mesh = new THREE.Object3D();

    let geom, mat, mesh;

    geom = new THREE.BoxGeometry(15, 15, 15);
    mat = new THREE.MeshStandardMaterial({
      color: 0xa5a7bb,
      side: THREE.DoubleSide
    });
    mesh = new THREE.Mesh(geom, mat);
    mesh.position.y = 6;
    mesh.position.z = 1;
    mesh.rotation.y = Math.PI / 4;
    this.mesh.add(mesh);

    //Shell
    mat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      side: THREE.DoubleSide
    });
    mesh = new THREE.Mesh(geom, mat);
    mesh.renderOrder = 4;
    mesh.position.y = 6;
    mesh.position.z = 1;
    mesh.rotation.y = Math.PI / 4;
    this.mesh.add(mesh);

    const edgeGeom = new THREE.EdgesGeometry(
      geom.clone().scale(0.99, 0.99, 0.99)
    );
    const lines = new THREE.LineSegments(
      edgeGeom,
      new THREE.LineBasicMaterial({
        color: 0x000000,
        side: THREE.DoubleSide
      })
    );
    lines.renderOrder = 5;
    lines.position.y = 6;
    lines.position.z = 1;
    lines.rotation.y = Math.PI / 4;
    this.mesh.add(lines);
  }
}
