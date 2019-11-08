import * as THREE from 'three';

export default class Collectables {
    constructor() {
        this.mesh = new THREE.Object3D();
        this.total = 20;

        const partGeom = new THREE.BoxGeometry(1, 1, 1);
        const partMat = new THREE.MeshBasicMaterial({
            color: 0xffff00,
            shininess: 1
        });

        const angle = Math.PI * 2 / this.total;
        const height = 100;

        for(let i = 0; i < this.total; i++) {
            const part = new THREE.Mesh(partGeom, partMat);
            const a = i * angle;
            part.position.x = Math.cos(a) * height;
            part.position.y = Math.sin(a) * height;
            part.position.z = 50;

            this.mesh.add(part);
        }
    }
}