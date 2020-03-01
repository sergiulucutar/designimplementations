import * as THREE from 'three';

const geom = new THREE.TetrahedronGeometry(5, 0);
const mat = new THREE.MeshBasicMaterial({
  color: 0xBB2A27
});

class Enemy {
  constructor() {
    this.mesh = new THREE.Mesh(geom, mat);
  }
}

export default class Enemies {
    constructor() {
      this.mesh = new THREE.Object3D();
      this.height = 250;
      this.mesh.rotation.x = Math.PI / 2;
      this.mesh.position.y = 250;

      this.maxEnemies = 20;
    }

    checkCollisions(player) {
      const playerPosition = new THREE.Vector3().setFromMatrixPosition(player.mesh.matrixWorld);
      const aux = new THREE.Vector3();
      for(let enemy of this.mesh.children) {
        aux.setFromMatrixPosition(enemy.matrixWorld);
        if(playerPosition.distanceTo(aux) < 5) {
          this.mesh.remove(enemy);
        }
      }
    }

    spawn(worldRotationAngle) {
      if(this.mesh.children.length > this.maxEnemies) {
        return
      }
      const part = new Enemy();
      const a = worldRotationAngle - Math.PI / 2;

      part.mesh.position.x = Math.cos(a) * this.height;
      part.mesh.position.y = Math.sin(a) * this.height;
      part.mesh.position.z = this.height - (100 * Math.random()) + 50;
      part.mesh.rotation.z = a + Math.PI/2;

      this.mesh.add(part.mesh);
    }
  }