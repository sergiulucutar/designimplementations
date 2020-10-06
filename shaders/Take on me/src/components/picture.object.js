import * as THREE from 'three';

export class Picture {
  constructor(url) {
    const spriteMap = new THREE.TextureLoader().load('/guy_line.png');
    const spriteMaterial = new THREE.SpriteMaterial({
      map: spriteMap,
      side: THREE.DoubleSide
    });
    this.sprite = new THREE.Sprite(spriteMaterial);
    this.sprite.scale.set(2, 3, 1);
    this.sprite.position.set(0, 0, 2);

    this.sprite.renderOrder = 10;
  }
}
