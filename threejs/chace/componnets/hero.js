import * as THREE from 'three';

export default class Hero {
    constructor() {
        this.mesh = new THREE.Group();

        this.geom = new THREE.BoxGeometry(5, 5, 5);
        this.mat = new THREE.MeshPhongMaterial({color: 0x0000ff});
        this.mesh = new THREE.Mesh(this.geom, this.mat);
        // this.createBoat();

        const angle = Math.PI / 2 - Math.PI /2 * .2;

        this.mesh.position.x = Math.cos(angle) * 100;
        this.mesh.position.y = Math.sin(angle) * 100;
        this.mesh.rotation.z = angle;

        this.mesh.position.z = 50;

        this.mesh.castShadow = true;
        this.mesh.receiveShadow = true;
    }

    move(event) {
        const normalizeX = event.clientX / window.innerWidth;
        const normalizeY = event.clientY / window.innerHeight;

        const angle = Math.PI / 2 - Math.PI /2 * (-.2 + .4 * normalizeX);
        const height = 125 - normalizeY * 50 > 100 ? 100 : 125 - normalizeY * 50;

        this.mesh.position.x = Math.cos(angle) * height;
        this.mesh.position.y = Math.sin(angle) * height;
        this.mesh.position.z = 75 * normalizeY;
        
        this.mesh.rotation.z = angle + Math.PI / 2;
        this.mesh.rotation.x = normalizeY -.5 * (1 - normalizeY);
    }

    createBoat() {
        // this.mesh = new THREE.Group();

        const hullgeom = new THREE.CylinderGeometry(4, 4, 14, 16, false, 0, Math.PI);
        const hullmat = new THREE.MeshBasicMaterial({color: 'brown'});
        this.mesh = new THREE.Mesh(hullgeom, hullmat);
    }
}
