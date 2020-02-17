import * as THREE from "three";
import { Power2, TweenLite } from "gsap";

import ColumnsShader from "../shaders/columns";

const interval = 1000 / 60;
let then = Date.now();
let now;
let delta;

const vertexShader = `
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = vec4( position, 1.0 );
}
`;

export default class Slider {
  constructor(el, textures) {
    this.domEl = el;
    this.textures = textures;

    this.three = null;
    this.uniforms = {
      u_time: {
        type: "f",
        value: 0
      },
      u_texture1: {
        type: "f",
        value: 0
      },
      u_texture2: {
        type: "f",
        value: 0
      },
      u_resolution: {
        type: "v2",
        value: new THREE.Vector4(0, 0)
      }
    };

    this.sliderIndex = 4;
    this.animate = false;
  }

  init() {
    this.bounds = [this.domEl.offsetWidth, this.domEl.offsetHeight];

    const camera = new THREE.PerspectiveCamera(
      70,
      this.bounds[0] / this.bounds[1],
      0.001,
      1000
    );
    camera.position.set(0, 0, 2);
    camera.fov = 2 * (180 / Math.PI) * Math.atan(1 / (2 * camera.position.z));

    const scene = new THREE.Scene();

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true
    });
    renderer.setSize(this.bounds[0], this.bounds[1]);

    this.uniforms.u_resolution.value = new THREE.Vector4(
      this.bounds[0],
      this.bounds[1]
    );

    /**
     * Create material -> Shader Entry
     */
    const mat = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: vertexShader,
      fragmentShader: ColumnsShader
    });
    const geom = new THREE.PlaneBufferGeometry(2, 2);
    const plane = new THREE.Mesh(geom, mat);
    scene.add(plane);

    this.three = {
      renderer,
      camera,
      scene
    };

    this.loadTextures();

    return renderer.domElement;
  }

  loadTextures() {
    this.textures.load();
  }

  next() {
    this.increaceIndex();
    this.uniforms.u_time.value = 0;

    const img = this.textures.imgs[this.sliderIndex];
    this.uniforms.u_texture2.value = img;

    this.animate = true;
    if (this.animationObj) {
      this.animationObj.kill();
    }
    this.animationObj = TweenLite.to(this.uniforms.u_time, 1, {
      value: 1,
      ease: Power2.easeOut,
      onUpdate: () => this.draw(),
      onComplete: () => {
        this.uniforms.u_texture1.value = this.uniforms.u_texture2.value;
        this.animate = true;
      }
    });
  }

  increaceIndex() {
    this.sliderIndex = (this.sliderIndex + 1) % 6;
  }

  loop() {
    now = Date.now();
    delta = now - then;
    if (delta > interval && this.animate) {
      then = now - (delta % interval);
      this.draw();
      requestAnimationFrame(() => this.loop());
    }
  }

  draw() {
    this.three.renderer.render(this.three.scene, this.three.camera);
  }
}
