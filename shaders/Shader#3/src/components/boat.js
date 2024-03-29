import * as THREE from 'three';

export class Boat {
  constructor() {
    this.mesh = new THREE.Object3D();

    let geom, partMesh;
    this.mat = new THREE.MeshStandardMaterial({
      color: 'yellow',
      side: THREE.DoubleSide
    });
    // Hull
    geom = new THREE.CylinderGeometry(1, 1, 3, 16, 32, false, false, 3.5);
    partMesh = new THREE.Mesh(geom, this.mat);
    partMesh.rotation.y = Math.PI / 3;
    this.mesh.add(partMesh);
    geom = new THREE.CylinderGeometry(1, 0.6, 2.5, 16, 32, false, false, 3.5);
    partMesh = new THREE.Mesh(geom, this.mat);
    partMesh.rotation.y = Math.PI / 3;
    partMesh.position.y -= 2.7;
    this.mesh.add(partMesh);
    geom = new THREE.CylinderGeometry(0.1, 1, 2.5, 16, 32, false, false, 3.5);
    partMesh = new THREE.Mesh(geom, this.mat);
    partMesh.position.y += 2.7;
    partMesh.rotation.y = Math.PI / 3;
    this.mesh.add(partMesh);

    //Catarge
    geom = new THREE.BoxGeometry(0.1, 5, 0.1);
    partMesh = new THREE.Mesh(geom, this.mat);
    partMesh.position.y = -2;
    partMesh.position.z = 1;
    partMesh.rotation.y = Math.PI / 2;
    partMesh.rotation.z = Math.PI / 2;
    this.mesh.add(partMesh);

    partMesh = new THREE.Mesh(geom, this.mat);
    // partMesh.position.x = -2;
    partMesh.position.y = 1;
    partMesh.position.z = 1;
    partMesh.rotation.y = Math.PI / 2;
    partMesh.rotation.z = -Math.PI / 2;
    this.mesh.add(partMesh);

    partMesh = new THREE.Mesh(geom, this.mat);
    partMesh.position.z = 1;
    partMesh.position.y = 1;
    partMesh.rotation.z = -Math.PI / 2;
    this.mesh.add(partMesh);

    partMesh = new THREE.Mesh(geom, this.mat);
    partMesh.position.z = 3;
    partMesh.position.y = 1;
    partMesh.rotation.z = -Math.PI / 2;
    this.mesh.add(partMesh);

    partMesh = new THREE.Mesh(geom, this.mat);
    partMesh.position.z = 3;
    partMesh.position.y = -2;
    partMesh.rotation.z = -Math.PI / 2;
    this.mesh.add(partMesh);

    partMesh = new THREE.Mesh(geom, this.mat);
    partMesh.position.z = 1;
    partMesh.position.y = -2;
    partMesh.rotation.z = -Math.PI / 2;
    this.mesh.add(partMesh);

    geom = new THREE.PlaneGeometry(2, 5);
    const mat = new THREE.MeshStandardMaterial({
      color: 'white',
      side: THREE.DoubleSide
    });
    partMesh = new THREE.Mesh(geom, mat);
    partMesh.position.z = 2;
    partMesh.position.y = -2;
    partMesh.rotation.x = Math.PI / 2;
    partMesh.rotation.z = Math.PI / 2;
    this.mesh.add(partMesh);

    partMesh = new THREE.Mesh(geom, mat);
    partMesh.position.z = 2;
    partMesh.position.y = 1;
    partMesh.rotation.x = Math.PI / 2;
    partMesh.rotation.z = Math.PI / 2;
    this.mesh.add(partMesh);

    this.movementTime = 1;
    this.queuedMovement = null;
  }
}
