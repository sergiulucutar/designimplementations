<template>
  <section id="#app">
    <home></home>
    <middle></middle>
    <stories></stories>
    <div ref="story" class="story"></div>
  </section>
</template>

<script>
import Home from "./routes/Home.vue";
import Middle from "./routes/Middle.vue";
import Stories from "./routes/Stories.vue";

import * as THREE from "three";
import { Power2, TimelineLite } from "gsap";

export default {
  name: "app",
  components: {
    home: Home,
    middle: Middle,
    stories: Stories
  },
  data() {
    return {
      story: {
        img: {
          selected: null,
          displacement: null
        },
        canvas: {
          isAnimated: false,
          animation: null,
          resolution: [0, 0],
          camera: null,
          renderer: null,
          scene: null
        },
        shader: {
          uniforms: {
            u_resolution: {
              type: "v2",
              value: new THREE.Vector4(0, 0)
            },
            u_time: {
              type: "f",
              value: 0
            },
            u_texture: {
              type: "f",
              value: 0
            },
            u_displacement: {
              type: "f",
              value: 0
            }
          },
          vertex: `
          void main() {
            gl_Position = vec4(position, 1.0);
          }
          `,
          fragment: `
          uniform float u_time;
          uniform vec2 u_resolution;
          uniform sampler2D u_texture;

          void main() {
            vec2 st = gl_FragCoord.xy/u_resolution.xy;

            vec4 d1 = texture2D(u_texture, st);
            float displace = (d1.r + d1.g + d1.b) * 0.2;

            vec4 t1 = texture2D(u_texture, vec2(st.x, st.y + u_time * (displace * 0.6)));

            gl_FragColor = t1;
          }
          `
        }
      }
    };
  },
  mounted() {
    // load texture
    this.loadTextures().then(() => {
      this.init();
      this.addListeneres();
      this.loop();
    });
  },
  methods: {
    loadTextures() {
      return new Promise(resolve => {
        this.story.shader.uniforms.u_texture.value = new THREE.TextureLoader().load(
          `dist/img1.jpg`,
          resolve
        );
      });
    },
    init() {
      const { story } = this.$refs;
      this.story.canvas.resolution = [story.offsetWidth, story.offsetHeight];
      const [widthEl, heightEl] = this.story.canvas.resolution;

      // Define THREEjs Canvas
      let camera, scene, renderer;
      camera = new THREE.PerspectiveCamera(70, widthEl / heightEl, 0.001, 1000);
      camera.position.set(0, 0, 2);
      camera.fov = 2 * (180 / Math.PI) * Math.atan(1 / (2 * camera.position.z));
      scene = new THREE.Scene();
      renderer = new THREE.WebGLRenderer();
      renderer.setSize(widthEl, heightEl);
      this.story.shader.uniforms.u_resolution.value = new THREE.Vector4(
        widthEl,
        heightEl
      );
      this.story.canvas = {
        camera,
        renderer,
        scene
      };

      // Define shader material
      const mat = new THREE.ShaderMaterial({
        uniforms: this.story.shader.uniforms,
        vertexShader: this.story.shader.vertex,
        fragmentShader: this.story.shader.fragment
      });
      const geom = new THREE.PlaneBufferGeometry(2, 2);

      scene.add(new THREE.Mesh(geom, mat));
      story.appendChild(renderer.domElement);
    },
    addListeneres() {
      document.addEventListener("wheel", this.onScroll.bind(this));
    },
    onScroll() {
      if (this.story.canvas.isAnimated) {
        this.story.canvas.animation.kill();
      }
      this.story.canvas.isAnimated = true;
      // this.story.shader.uniforms.u_time.value = 0;
      this.story.canvas.animation = new TimelineLite()
        .eventCallback(
          "onComplete",
          () => (this.story.canvas.isAnimated = false)
        )
        .to(this.story.shader.uniforms.u_time, 0.5, {
          value: 1,
          ease: Power2.easeOut
        })
        .to(this.story.shader.uniforms.u_time, 0.5, {
          value: 0,
          ease: Power2.easeOut
        });
    },
    loop() {
      requestAnimationFrame(this.loop);

      this.story.canvas.renderer.render(
        this.story.canvas.scene,
        this.story.canvas.camera
      );
    }
  }
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Playfair+Display:400,700|Roboto&display=swap");

:root {
  --s_margin-top: 20px;
}

html {
  font-size: 16px;

  @media screen and (min-width: 900px) {
    font-size: 18px;
  }

  @media screen and (min-width: 1200px) {
    font-size: 20px;
  }
}

#app {
  display: flex;
  flex-direction: column;

  width: 100vw;
  height: 100vh;

  // font-family: "Roboto", sans-serif;
  font-family: "Playfair Display", serif;

  background-color: #f7ede2;
}

.story {
  position: fixed;
  top: 25vh;
  right: 15vw;

  width: 20vw;
  height: 50vh;
}
</style>
