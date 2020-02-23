import * as THREE from 'three';
import Utils from './utils';


class Batch {
  constructor() {
    this.mesh = new THREE.Object3D();

    const partGeom = new THREE.BoxGeometry(2, 2, 2);
    const partMat = new THREE.MeshBasicMaterial({
        color: 0xff00ff
    });

    const numberOfCubs = Utils.random(2, 6);
    let piece;
    for(let i = 0; i < numberOfCubs; i++) {
      piece = new THREE.Mesh(partGeom, partMat);
      piece.position.x = i * 8;
      this.mesh.add(piece);
    }
  }
}

export default class Collectables {
  constructor() {
    this.mesh = new THREE.Object3D();
    this.total = 20;
    this.height = 250;

    // const stepAngle = 2 * Math.PI / this.total;

    // for(let i = 0; i < this.total; i++) {
    //   const part = new Batch();
    //   const a = stepAngle * i;

    //   part.mesh.position.x = Math.cos(a) * this.height;
    //   part.mesh.position.y = Math.sin(a) * this.height;
    //   part.mesh.position.z = this.height - (100 * Math.random()) + 50;
    //   part.mesh.rotation.z = a + Math.PI/2;

    //   this.mesh.add(part.mesh);
    // }

    // this.mesh.lookAt(0, 0, 0);
    this.mesh.rotation.x = Math.PI / 2;
    this.mesh.position.y = 250;
  }


  // checkCollisions(player) {
  //   for(let batch of this.mesh.children) {
  //     for(let coin of batch.children) {
  //       player.mesh.position.clone().sub(coin.mesh.position.clone());
  //       console.log(awx.x, awx.y ,awx.z);
  //     }
  //   }
  // }


  checkCollisions(playerPosition) {
    const aux = new THREE.Vector3();
    for(let batch of this.mesh.children) {
      batch.children.forEach(coin => {
        aux.setFromMatrixPosition(coin.matrixWorld);
        if(playerPosition.distanceTo(aux) < 10) {
          batch.remove(coin);
        }
      });
    }
  }

  spawn(worldRotationAngle) {
    if(this.mesh.children.length > this.total) {
      return;
    }

    const part = new Batch();
    const a = worldRotationAngle - Math.PI / 2;

    part.mesh.position.x = Math.cos(a) * this.height;
    part.mesh.position.y = Math.sin(a) * this.height;
    part.mesh.position.z = this.height - (100 * Math.random()) + 50;
    part.mesh.rotation.z = a + Math.PI/2;

    this.mesh.add(part.mesh);
  }
}