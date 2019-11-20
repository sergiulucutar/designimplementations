<template>
  <div class="stories">
    <div class="stories_background" ref="bg"></div>
    <!-- <section class="stories_carousel">
      <img src="../assets/img/story1.jpg" />
      <img src="../assets/img/story2.jpg" />
      <img src="../assets/img/story3.jpg" />
      <img src="../assets/img/story4.jpg" />
      <img src="../assets/img/story5.jpg" />
    </section>-->
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
      shaders: {
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
    this.loadTextures();
    setTimeout(() => {
      const { bg } = this.$refs;

      const scene = new THREE.Scene();
      const renderer = new THREE.WebGLRenderer();
      const camera = new THREE.PerspectiveCamera(
        70,
        window.innerWidth / window.innerHeight,
        0.001,
        1000
      );
      camera.position.set(0, 0, 2);
      camera.fov = 2 * (180 / Math.PI) * Math.atan(1 / (2 * camera.position.z));
      renderer.setSize(window.innerWidth, window.innerHeight);
      this.resolution = [window.innerWidth, window.innerHeight];

      /**
       * Create material -> Shader Entry
       */
      var uniforms = {
        u_time: {
          type: "f",
          value: 0
        },
        u_texture1: {
          type: "f",
          value: this.textures[0]
        },
        u_texture2: {
          type: "f",
          value: this.textures[1]
        },
        u_resolution: {
          type: "v2",
          value: new THREE.Vector4(this.resolution[0], this.resolution[1])
        }
      };
      const mat = new THREE.ShaderMaterial({
        uniforms,
        vertexShader: this.shaders.vertexShader,
        fragmentShader: this.shaders.fragmentShader
      });
      const geom = new THREE.PlaneBufferGeometry(2, 2);
      const plane = new THREE.Mesh(geom, mat);
      scene.add(plane);

      bg.appendChild(renderer.domElement);
      renderer.render(scene, camera);

      //GSAP
      TweenLite.to(uniforms.u_time, 3, {
        value: 1,
        ease: Power2.easeOut,
        onComplete: () => {
          uniforms.u_time.value = 0;
          uniforms.u_texture1.value = uniforms.u_texture2.value;
        }
      });

      const loop = () => {
        requestAnimationFrame(loop);

        // uniforms.u_time.value += 0.01;
        renderer.render(scene, camera);
      };
      loop();
    }, 2000);
  },
  methods: {
    loadTextures: function() {
      this.textures.push(new THREE.TextureLoader().load("dist/story1.jpg"));
      this.textures.push(new THREE.TextureLoader().load("dist/story3.jpg"));
    }
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
