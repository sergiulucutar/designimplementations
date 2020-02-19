import * as THREE from 'three';
import Utils from './utils';

class Aux {
    static getAux() {
        const mesh = new THREE.Group();

        const mainGeo = new THREE.SphereGeometry(1.5, 10, 10);
        const mainMat = new THREE.MeshPhongMaterial({color: 0xffffff, shininess:1});
        const mainMesh = new THREE.Mesh(mainGeo, mainMat);

        const partGeom =  new THREE.BoxGeometry(.2, 2, 5);
        const partMesh = new THREE.Mesh(partGeom, mainMat);
        partMesh.position.x = 2.5;
        partMesh.rotation.y = 80;
        partMesh.position.z = -.75;

        mesh.add(mainMesh);
        mesh.add(partMesh);

        return mesh;
    }
}

export default class Hero {
    constructor() {
        this.mesh = new THREE.Group();

        const geomMain = new THREE.SphereGeometry(3, 20, 20);
        const matMain = new THREE.MeshPhongMaterial({color: 0x000000});
        const meshMain = new THREE.Mesh(geomMain, matMain);
        // this.createBoat();
        this.mesh.add(meshMain);

        // auxs
        const geomPart = new THREE.SphereBufferGeometry(1, 10, 10);
        const matPart = new THREE.MeshPhongMaterial({color: 0xffffff, shininess: 1});

        const aux1Mesh = new THREE.Mesh(geomPart, matPart);
        const aux2Mesh = new THREE.Mesh(geomPart, matPart);

        // this.mesh.add(aux1Mesh);
        this.mesh.add(aux1Mesh);
        this.mesh.add(aux2Mesh);

        this.auxDistance = 5;

        this.mesh.children[1].position.x += 5;
        this.mesh.children[2].position.x += 5;
        this.mesh.children[1].position.y -= 2;
        this.mesh.children[2].position.y -= 2;
        this.mesh.children[1].position.z -= this.auxDistance;
        this.mesh.children[2].position.z += this.auxDistance;

        // Mesh positioning
        const angle = Math.PI / 2 - Math.PI /2 * .2;

        this.mesh.position.x = Math.cos(angle) * 100;
        this.mesh.position.y = Math.sin(angle) * 100;
        this.mesh.rotation.z = angle;

        this.mesh.position.z = 50;

        this.mesh.castShadow = true;
        this.mesh.receiveShadow = true;
    }

    // move(event) {
    //     this.tagret = [event.clientX, event.clientY];
    //     const normalizedTarget = Utils.normalizeMousePosition(this.tagret);

    //     const normalizeY = event.clientY / window.innerHeight;

    //     // const angle = Math.PI / 2 - Math.PI /2 * (.2 * normalizedTarget[0]);
    //     // const height = 100 + this.tagret[1] * 25 > 110 ? 110 : 100 + this.tagret[1] * 25;
    //     const height = Math.min(105 + normalizedTarget[1] * 25, 105)

    //     // this.mesh.position.x = Math.cos(angle) * height;
    //     // this.mesh.position.y = Math.sin(angle) * height;
    //     // this.mesh.position.z = 75 * normalizeY;
        
    //     // this.mesh.rotation.z = angle + Math.PI / 2;
    //     // this.mesh.rotation.x = normalizeY -.5 * (1 - normalizeY);

    //     this.auxDistance = normalizedTarget[0] * 4;
    //     this.mesh.children[1].position.z = -5 + this.auxDistance;
    //     this.mesh.children[2].position.z = 5 - this.auxDistance;
    // }

    move(x, y) {
        this.mesh.position.x = normalize(x, -1, 1, -100, 100);
        this.mesh.position.y = normalize(y, -1, 1, 25, 175);
    }

    update() {
        
    }

    
}

function normalize(v,vmin,vmax,tmin, tmax){

	var nv = Math.max(Math.min(v,vmax), vmin);
	var dv = vmax-vmin;
	var pc = (nv-vmin)/dv;
	var dt = tmax-tmin;
	var tv = tmin + (pc*dt);
	return tv;

}