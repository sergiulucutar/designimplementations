import * as THREE from 'three';
import Utils from './utils';

export class Sky {
  constructor(canvas) {
    // const canvas = document.createElement('canvas');
    const starCount = 600;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'white';
    ctx.shadowBlur = 10;
    ctx.shadowColor = 'white';
    for (let i = 0; i < starCount; i++) {
      ctx.beginPath();
      ctx.arc(Utils.random(0, window.innerWidth), Utils.random(0, window.innerHeight), Math.random() * 2, 0, 2 * Math.PI);
      ctx.fill();
    }
  }
}

export class Sun {
  constructor() {
    const geom = new THREE.SphereGeometry(40, 50, 50);
    const mat = new THREE.MeshBasicMaterial({ color: 0x0CFFFF });
    this.mesh = new THREE.Mesh(geom, mat);
    this.mesh.castShadow = true;

    this.mesh.position.x = 200;
    this.mesh.position.y = 250;
    this.mesh.position.z = -500;
  }
}
