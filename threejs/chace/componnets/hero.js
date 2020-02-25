import * as THREE from 'three';

export default class Hero {
  constructor() {
    this.position = [0, 0];

    this.mesh = new THREE.Group();

    const matRed = new THREE.MeshStandardMaterial({ color: 0xBB2A27, metalness: 0.5, roughness: 0.5 });
    const matWhite = new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 0.5, roughness: 0.5 });
    const matBrown = new THREE.MeshStandardMaterial({ color: 0x554E44, metalness: 0.5, roughness: 0.5 });
    const matGrey = new THREE.MeshStandardMaterial({ color: 0x7F939C, metalness: 0.5, roughness: 0.5 });

    //Geoms
    const geomMain = new THREE.CylinderGeometry(3, 3, 5, 10);
    const geomRing = new THREE.CylinderGeometry(3, 3, 1, 10);

    //Geom Tip
    const geomTip1 = new THREE.CylinderGeometry(3, 2.5, 3, 10);
    const geomTip2 = new THREE.CylinderGeometry(2.5, 1.5, 2, 10);
    const geomTip3 = new THREE.CylinderGeometry(1.5, 0.5, 1, 10);
    // const geomTip2 = new THREE.SphereGeometry(2., 10, 10);

    const geomBack1 = new THREE.CylinderGeometry(2.5, 3, 4, 10);
    const geomBack2 = new THREE.CylinderGeometry(2, 2.4, 2, 10);

    //Geom Tail
    const geomTail = new THREE.CylinderGeometry(1.5, 1.5, 1, 10);

    //Mesh
    const meshMain = new THREE.Mesh(geomMain, matBrown);

    const meshRing1 = new THREE.Mesh(geomRing, matWhite);
    const meshRing2 = new THREE.Mesh(geomRing, matWhite);

    const meshTip1 = new THREE.Mesh(geomTip1, matRed);
    const meshTip2 = new THREE.Mesh(geomTip2, matRed);
    const meshTip3 = new THREE.Mesh(geomTip3, matRed);

    const meshBack1 = new THREE.Mesh(geomBack1, matRed);
    const meshBack2 = new THREE.Mesh(geomBack2, matRed);

    const tailMesh = new THREE.Mesh(geomTail, matGrey);

    meshRing1.position.y = -3;
    meshRing2.position.y = 3;

    meshTip1.position.y = -5;
    meshTip2.position.y = -7.5;
    meshTip3.position.y = -9;

    meshBack1.position.y = 5;
    meshBack2.position.y = 8;

    tailMesh.position.y = 9;

    this.mesh.add(meshMain);
    this.mesh.add(meshRing1);
    this.mesh.add(meshRing2);

    this.mesh.add(meshTip1);
    this.mesh.add(meshTip2);
    this.mesh.add(meshTip3);

    this.mesh.add(meshBack1);
    this.mesh.add(meshBack2);

    this.mesh.add(tailMesh);

    this.mesh.lookAt(0, 0, 0);
    this.mesh.rotation.z = Math.PI / 2;
    this.mesh.position.z = 250;

    this.mesh.castShadow = true;
    this.mesh.receiveShadow = true;

    this.createSmoke();
  }

  move(normalizeCoords) {
    this.position = normalizeCoords;
  }

  update() {
    const targetX = normalize(this.position[0], -1, 1, -100, 100);
    const targetY = normalize(this.position[1], -1, 1, -50, 50);

    this.mesh.position.x = targetX;
    this.mesh.position.y += (targetY - this.mesh.position.y) * 0.1;

    this.mesh.rotation.z = Math.PI / 2 + (targetY - this.mesh.position.y) * 0.0128;
    this.mesh.rotation.x = (this.mesh.position.y - targetY) * 0.0064;

    this.updateSmoke();
  }

  createSmoke() {
    const smokeGeom = new THREE.SphereGeometry(5, 5, 5);
    const smokeMat = new THREE.MeshPhongMaterial({
      color: 0xffffff
    });

    this.smokeMesh = new THREE.Object3D();
    this.smokeMesh.rotation.z = Math.PI / 2;

    for (let i = 0; i < 6; i++) {
      const part = new THREE.Mesh(smokeGeom, smokeMat);
      part['sizeToScale'] = 0.1;
      part.position.x = this.mesh.position.x;
      part.position.y = this.mesh.position.y - i * 10;
      part.position.z = this.mesh.position.z;
      part.rotation.z = Math.random() * (Math.PI * 2)
      part.scale.set(part.sizeToScale, part.sizeToScale, part.sizeToScale);
      this.smokeMesh.add(part);
    }
  }

  updateSmoke() {
    for (let smoke of this.smokeMesh.children) {
      smoke.position.y += 1;
      smoke.sizeToScale += Math.random() * 0.1;
      if (smoke.position.y > 65) {
        smoke.position.x = this.mesh.position.y;
        smoke.position.y = -this.mesh.position.x + 10;
        smoke.position.z = this.mesh.position.z;
        smoke['sizeToScale'] = 0.1;
      }
      smoke.scale.set(smoke.sizeToScale, smoke.sizeToScale, smoke.sizeToScale);
    }
  }
}

function normalize(v, vmin, vmax, tmin, tmax) {
  var nv = Math.max(Math.min(v, vmax), vmin);
  var dv = vmax - vmin;
  var pc = (nv - vmin) / dv;
  var dt = tmax - tmin;
  var tv = tmin + (pc * dt);
  return tv;
}
