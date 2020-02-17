import * as THREE from "three";

export default class Textures {
  constructor() {
    this.loaded = false;
  }

  load() {
    // if (this.loaded) {
    //   return;
    // }

    // this.loaded = true;
    this.imgs = [];
    const promises = [];
    let promise;
    for (let i = 1; i <= 6; i++) {
      promise = new Promise(resolve => {
        let texture = new THREE.TextureLoader().load(`img/${i}.jpg`, resolve);
        // debugger;
        this.imgs.push(texture);
      });
      promises.push(promise);
    }

    return Promise.all(promises).then(this.adjustTextures.bind(this));

    // return Promise.all(promises);
  }

  adjustTextures() {
    // 4096x2048
    return new Promise(resolve => {
      let repeatX;
      for (let img of this.imgs) {
        img.minFilter = THREE.NearestFilter;
        // img.generateMipmaps = false;
        img.wrapS = THREE.ClampToEdgeWrapping;
        img.wrapT = THREE.RepeatWrapping;
        repeatX =
          (window.innerWidth * img.image.height || 1000) /
          (window.innerHeight * img.image.width);
        // console.log(repeatX);
        img.repeat.set(repeatX, 1);
        img.offset.x = ((repeatX - 1) / 2) * -1;
      }
      resolve();
    });
  }
}
