import * as THREE from 'three';

export class MagicWindow {
  constructor() {
    this.mesh = new THREE.Object3D();

    let mesh;
    const geom = new THREE.PlaneGeometry(3, 3);
    const mat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      colorWrite: false,
      side: THREE.FrontSide
    });
    mesh = new THREE.Mesh(geom, mat);
    mesh.renderOrder = 3;
    this.mesh.add(mesh);

    mesh = new THREE.Mesh(geom, mat);
    mesh.rotation.y = Math.PI;
    mesh.position.z = -0.2;
    mesh.renderOrder = 3;
    this.mesh.add(mesh);

    const shellGeom = new THREE.BoxGeometry(3.5, 3.5, 0.2);
    const shellMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      side: THREE.BackSide
    });
    mesh = new THREE.Mesh(shellGeom, shellMat);
    mesh.renderOrder = 4;
    mesh.position.z = -0.1;

    const edgeGeom = new THREE.EdgesGeometry(shellGeom);
    const lines = new THREE.LineSegments(
      edgeGeom,
      new THREE.LineBasicMaterial({
        color: 0x000000
      })
    );
    mesh.add(lines);

    this.mesh.add(mesh);

    //black line
    const planeGeom = new THREE.PlaneGeometry(0.2, 3.5);
    const planeMat = new THREE.MeshBasicMaterial({
      color: 0x000000,
      side: THREE.DoubleSide
    });
    const planeMesh = new THREE.Mesh(planeGeom, planeMat);
    planeMesh.position.x = -1.75;
    planeMesh.position.z = -0.1;
    planeMesh.rotation.y = Math.PI / 2;
    this.mesh.add(planeMesh);
  }
}
