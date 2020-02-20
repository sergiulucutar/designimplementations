import * as THREE from 'three';
import Utils from './utils';

export default class Hero {
    constructor() {
        this.mesh = new THREE.Group();

        const matMain = new THREE.MeshStandardMaterial({ color: 0x434343, metalness: 0.5, roughness: 0.5 });

        // Geoms
        const geomMain = new THREE.CylinderGeometry(3, 3, 5, 8);

        //Geom Tip
        const geomTip1 = new THREE.CylinderGeometry(3, 2.5, 2, 8);
        const geomTip2 = new THREE.CylinderGeometry(2.5, 1.5, 2, 8);
        const geomTip3 = new THREE.CylinderGeometry(1.5, 0, 2, 8);

        //Game Tail
        const geomTail = new THREE.CylinderGeometry(1.5, 1.5, 2, 8);

        //Mesh
        const meshMain = new THREE.Mesh(geomMain, matMain);

        const meshTip1 = new THREE.Mesh(geomTip1, matMain);
        const meshTip2 = new THREE.Mesh(geomTip2, matMain);
        const meshTip3 = new THREE.Mesh(geomTip3, matMain);

        const tailMesh = new THREE.Mesh(geomTail, matMain);

        meshTip1.position.y = -3;
        meshTip2.position.y = -5;
        meshTip3.position.y = -7;

        tailMesh.position.y = 2;

        this.mesh.add(meshMain);
        this.mesh.add(meshTip1);
        this.mesh.add(meshTip2);
        this.mesh.add(meshTip3);

        this.mesh.add(tailMesh);

        // Mesh positioning
        const angle = Math.PI / 2 - Math.PI / 2 * .2;

        this.mesh.position.x = Math.cos(angle) * 100;
        this.mesh.position.y = Math.sin(angle) * 100;
        this.mesh.rotation.z = Math.PI / 2;

        this.mesh.position.z = 50;

        this.mesh.castShadow = true;
        this.mesh.receiveShadow = true;
    }

    move(normalizeCoords) {
        this.mesh.position.x = normalize(normalizeCoords[0], -1, 1, -100, 100);
        this.mesh.position.y = normalize(normalizeCoords[1], -1, 1, 80, 140);
    }

    update() {

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