<template>
  <div class="stories">
    <div class="stories_background" ref="bg"></div>
    <section class="stories_carousel">
      <img @mouseover="onHover(1)" src="../assets/img/story1.jpg" />
      <img @mouseover="onHover(2)" src="../assets/img/story2.jpg" />
      <img src="../assets/img/story3.jpg" />
      <img src="../assets/img/story4.jpg" />
      <img src="../assets/img/story5.jpg" />
    </section>
  </div>
</template>

<script>
import * as THREE from "three";
import { Power2, TweenLite } from "gsap";

export default {
  name: "Stories",
  data() {
    return {
      progress: 0,
      index: 1,
      textures: [],
      resolution: [],
      three: {
        render: null,
        scene: null,
        camera: null
      },
      shaders: {
        uniforms: {
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
        },
        vertexShader: `
        varying vec2 vUv;

        void main() {
          vUv = uv;

          gl_Position = vec4( position, 1.0 );
        }
        `,
        fragmentShader: `
        uniform float u_time;
        uniform vec2 u_resolution;
        uniform sampler2D u_texture1;
        uniform sampler2D u_texture2;

        varying vec2 vUv;

        void main() {
            vec2 st = gl_FragCoord.xy/u_resolution.xy;
            // gl_FragColor = texture2D(u_texture1, st - fract(st * vec2(5.0, 0.0)) * u_time * 0.1);
            // gl_FragColor = vec4(abs(sin(u_time)),st.y,0.0,1.0);

            vec2 uvDivided = fract(st*vec2(50.0,1.0));
            vec2 uvDisplaced1 = st + uvDivided*u_time*0.1;
            vec2 uvDisplaced2 = st + uvDivided*(1. - u_time)*0.1;
            vec4 t1 = texture2D(u_texture1,uvDisplaced1);
            vec4 t2 = texture2D(u_texture2,uvDisplaced2);
            gl_FragColor = mix(t1, t2, u_time);
        }
        `
      }
    };
  },
  mounted() {
    const texturePromises = this.loadTextures();
    Promise.all(texturePromises).then(() => {
      this.init();
      this.shaders.uniforms.u_texture1.value = this.textures[0];
      this.shaders.uniforms.u_texture2.value = this.textures[4];

      //GSAP
      TweenLite.to(this.shaders.uniforms.u_time, 3, {
        value: 1,
        ease: Power2.easeOut,
        onComplete: () => {
          this.shaders.uniforms.u_time.value = 0;
          this.shaders.uniforms.u_texture1.value = this.shaders.uniforms.u_texture2.value;
        }
      });

      this.loop();
    });
  },
  methods: {
    loadTextures() {
      const promises = [];
      let promise;
      for (let i = 1; i <= 5; i++) {
        promise = new Promise(resolve => {
          this.textures.push(
            new THREE.TextureLoader().load(`dist/story${i}.jpg`, resolve)
          );
        });
        promises.push(promise);
      }

      return promises;
    },
    init() {
      const { bg } = this.$refs;
      const camera = new THREE.PerspectiveCamera(
        70,
        window.innerWidth / window.innerHeight,
        0.001,
        1000
      );
      camera.position.set(0, 0, 2);
      camera.fov = 2 * (180 / Math.PI) * Math.atan(1 / (2 * camera.position.z));

      const scene = new THREE.Scene();

      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight);
      this.resolution = [window.innerWidth, window.innerHeight];
      this.shaders.uniforms.u_resolution.value = new THREE.Vector4(
        this.resolution[0],
        this.resolution[1]
      );

      /**
       * Create material -> Shader Entry
       */
      console.log(this.shaders);
      const mat = new THREE.ShaderMaterial({
        uniforms: this.shaders.uniforms,
        vertexShader: this.shaders.vertexShader,
        fragmentShader: this.shaders.fragmentShader
      });
      const geom = new THREE.PlaneBufferGeometry(2, 2);
      const plane = new THREE.Mesh(geom, mat);
      scene.add(plane);

      bg.appendChild(renderer.domElement);

      this.three = {
        renderer,
        camera,
        scene
      };
    },
    loop() {
      requestAnimationFrame(this.loop);
      this.three.renderer.render(this.three.scene, this.three.camera);
    },
    onHover(id) {}
  }
};
</script>

<style lang="scss">
.stories {
  position: relative;

  display: grid;
  grid-template-rows: repeat(3, 1fr);

  width: 100vw;
  height: 100vh;

  &_background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  &_carousel {
    grid-row: 2;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      width: 19%;
      height: auto;

      filter: grayscale(1) contrast(4);
      opacity: 0.5;
      transition: opacity 0.2s ease-in-out;

      &:hover {
        opacity: 0;
      }
    }
  }
}
</style>
