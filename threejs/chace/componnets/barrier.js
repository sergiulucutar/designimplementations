import * as THREE from 'three';

export default class Barrier {
    constructor() {
        this.mesh = new THREE.Object3D();
        this.total = 40;

        const partGeom = new THREE.BoxGeometry(2, 2, 2);
        const partMat = new THREE.MeshPhongMaterial({
            color: 0xff0000,
            shininess: 1
        });

        const angle = Math.PI * 2 / this.total;
        const height = 110;

        for(let i = 0; i < this.total; i++) {
            const part = new THREE.Mesh(partGeom, partMat);
            const a = i * angle;
            part.position.x = Math.cos(a) * height;
            part.position.y = Math.sin(a) * height;

            this.mesh.add(part);
        }
    }
}