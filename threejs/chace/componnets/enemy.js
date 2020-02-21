import * as THREE from 'three';

export default class Enemy {
    constructor() {
        this.mesh = new THREE.Group();

        this.geom = new THREE.BoxGeometry(8, 8, 8);
        this.mat = new THREE.MeshPhongMaterial({ color: 0x000033 });
        this.mesh = new THREE.Mesh(this.geom, this.mat);

        // this.mesh.position.x = Math.cos(-Math.PI / 2) * 100;
        // this.mesh.position.y = Math.sin(-Math.PI / 2) * 100;
        // this.mesh.position.y = 90; 
        // this.mesh.position.x = 10;

        this.mesh.position.x = -30
        this.mesh.position.y = Math.sin(90) * 100;
        this.mesh.rotation.x = 10 - Math.PI / 2;
        this.mesh.rotation.z = -30 - Math.PI / 2;

        this.mesh.position.z = 50;
    }
}
