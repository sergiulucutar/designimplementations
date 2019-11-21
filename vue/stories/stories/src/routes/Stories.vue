<template>
  <div class="stories">
    <div class="stories_background" ref="bg"></div>
    <section class="slides">
      <div class="slide slide-displayed">
        <div class="slide_carousel">
          <img data-index="1" src="../assets/img/story1.jpg" />
          <img data-index="2" src="../assets/img/story2.jpg" />
          <img data-index="3" src="../assets/img/story3.jpg" />
          <img data-index="4" src="../assets/img/story4.jpg" />
          <img data-index="5" src="../assets/img/story5.jpg" />
        </div>
        <h1>STORIES</h1>
      </div>
      <div class="slide">
        <div class="slide_carousel">
          <img data-index="1" src="../assets/img/story1.jpg" />
          <img data-index="2" src="../assets/img/story2.jpg" />
          <img data-index="3" src="../assets/img/story3.jpg" />
          <img data-index="4" src="../assets/img/story4.jpg" />
          <img data-index="5" src="../assets/img/story5.jpg" />
        </div>
        <h1>EXPERIENCES</h1>
      </div>
      <div class="slide">
        <div class="slide_carousel">
          <img data-index="1" src="../assets/img/story1.jpg" />
          <img data-index="2" src="../assets/img/story2.jpg" />
          <img data-index="3" src="../assets/img/story3.jpg" />
          <img data-index="4" src="../assets/img/story4.jpg" />
          <img data-index="5" src="../assets/img/story5.jpg" />
        </div>
        <h1>MEMORIES</h1>
      </div>
    </section>
    <section class="captions">
      <div class="slide_captions">
        <h2 :class="{ displayed: selectedImage == 1 }">
          Pharetra sit amet aliquam id diam maecenas ultricies
        </h2>
        <h2 :class="{ displayed: selectedImage == 2 }">
          Tellus in metus vulputate eu. Consectetur adipiscing elit
        </h2>
        <h2 :class="{ displayed: selectedImage == 3 }">
          Aenean euismod elementum nisi quis eleifend quam
        </h2>
        <h2 :class="{ displayed: selectedImage == 4 }">
          Morbi blandit cursus risus at ultrices
        </h2>
        <h2 :class="{ displayed: selectedImage == 5 }">
          Natoque penatibus et magnis dis parturient montes nascetur
        </h2>
      </div>
    </section>
  </div>
</template>

<script>
import * as THREE from "three";
import { Power2, TweenLite } from "gsap";
import { random } from "../components/utils";

export default {
  name: "Stories",
  data() {
    return {
      progress: 0,
      index: 1,
      textures: [],
      resolution: [],
      isPaused: true,
      animation: null,
      selectedImage: 0,
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

        mat2 rotate(float a) {
          float s = sin(a);
          float c = cos(a);
          return mat2(c, -s, s, c);
        }

        varying vec2 vUv;

        void main() {
            vec2 st = gl_FragCoord.xy/u_resolution.xy;
            // gl_FragColor = texture2D(u_texture1, st - fract(st * vec2(5.0, 0.0)) * u_time * 0.1);
            // gl_FragColor = vec4(abs(sin(u_time)),st.y,0.0,1.0);

            vec2 uvDivided = fract(st*vec2(10.0,1.0));
            vec2 uvDisplaced1 = st + rotate(3.1415926/4.)*uvDivided*u_time*0.1;
            vec2 uvDisplaced2 = st + rotate(3.1415926/4.)*uvDivided*(1. - u_time)*0.1;
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
      this.addListeners();
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

      const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true
      });
      renderer.setSize(window.innerWidth, window.innerHeight);
      this.resolution = [window.innerWidth, window.innerHeight];
      this.shaders.uniforms.u_resolution.value = new THREE.Vector4(
        this.resolution[0],
        this.resolution[1]
      );

      /**
       * Create material -> Shader Entry
       */
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
      if (!this.isPaused) {
        requestAnimationFrame(this.loop);
        this.three.renderer.render(this.three.scene, this.three.camera);
      }
    },
    addListeners() {
      const imgEls = document.querySelectorAll("img");
      imgEls.forEach(el => {
        el.addEventListener("mouseenter", () => {
          this.onMouseEnter(el.dataset.index);
        });
        el.addEventListener("mouseleave", () => {
          this.onMouseLeave(el.dataset.index);
        });
        if (random(0, 3) !== 2) {
          el.style = `transform: rotate(${random(-20, 20)}deg) translateY(0)`;
        }
      });
    },
    onMouseEnter(id) {
      this.selectedImage = id;
      if (this.isPaused) {
        this.shaders.uniforms.u_texture2.value = this.textures[id - 1];

        this.isPaused = false;
        this.loop();
        //GSAP
        if (this.animation) {
          this.animation.kill();
        }
        this.animation = TweenLite.to(this.shaders.uniforms.u_time, 1, {
          value: 1,
          ease: Power2.easeOut,
          onComplete: () => {
            this.shaders.uniforms.u_time.value = 0;
            this.shaders.uniforms.u_texture1.value = this.shaders.uniforms.u_texture2.value;
            this.isPaused = true;
          }
        });
      }
    },
    onMouseLeave(id) {
      this.selectedImage = 0;
      if (this.isPaused) {
        this.shaders.uniforms.u_texture1.value = this.textures[id - 1];
        this.shaders.uniforms.u_texture2.value = 0;

        this.isPaused = false;
        this.loop();
        //GSAP
        if (this.animation) {
          this.animation.kill();
        }
        this.animation = TweenLite.to(this.shaders.uniforms.u_time, 1, {
          value: 1,
          ease: Power2.easeOut,
          onComplete: () => {
            this.shaders.uniforms.u_time.value = 0;
            this.shaders.uniforms.u_texture1.value = this.shaders.uniforms.u_texture2.value;
            this.isPaused = true;
          }
        });
      }
    }
  }
};
</script>

<style lang="scss">
:root {
  --e_easing: cubic-bezier(0.5, 0, 0.1, 1);
}

.stories {
  position: relative;

  display: grid;
  grid-template-rows: 1fr 3fr 1fr;
  grid-template-columns: 1fr;

  width: 100vw;
  height: 100vh;

  &_background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    background-color: #aabd8c;
  }

  .slides {
    grid-row: 2;
  }

  .slide {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;

    display: none;
    justify-content: center;
    align-items: center;

    opacity: 0;

    &-displayed {
      display: flex;
      opacity: 1;
    }

    h1 {
      position: absolute;

      color: white;
      font-family: "Playfair Display", serif;
      font-size: 15rem;
      font-weight: bold;

      pointer-events: none;
    }

    &_carousel {
      display: flex;
      justify-content: center;
      align-items: center;

      img {
        width: 16%;
        height: auto;

        filter: grayscale(1) contrast(4);
        opacity: 0.5;
        transform: translateY(0);
        transition: opacity 1s var(--e_easing), transform 1s var(--e_easing);

        &:hover {
          opacity: 0;
          transform: rotate(0) !important;
          transition: opacity 1s var(--e_easing),
            transform 0s var(--e_easing) 1s;
        }
      }
    }
  }

  .captions {
    grid-row: 3;
    display: flex;
    justify-content: center;
    align-items: flex-start;

    overflow: hidden;
    pointer-events: none;
    z-index: 2;

    .slide_captions {
      position: relative;

      width: 50vw;

      h2 {
        position: absolute;

        display: block;
        width: 100%;

        color: white;
        // font-family: "Roboto", sans-serif;
        font-size: 3.5rem;

        opacity: 0;
        text-align: center;
        transition: opacity 1s var(--e_easing);

        &.displayed {
          opacity: 1;
        }
      }
    }
  }
}
</style>
