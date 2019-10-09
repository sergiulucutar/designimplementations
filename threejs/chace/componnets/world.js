import * as THREE from 'three';

export default class World {

  constructor() {
    this.geom = new THREE.SphereGeometry(100, 50, 50);
    // this.mat = new THREE.MeshPhongMaterial({
    //   color: 0x23B5D3,
    //   shininess: 1,
    //   transparent: true,
    //   opacity: .98
    // });
    this.mat = this.createWaterShader();

    this.mesh = new THREE.Mesh(this.geom, this.mat);
    this.mesh.receiveShadow = true;
  }

  createWaterShader() {
    const uniforms = {
      u_time: {
        type: 'f',
        value: 1.0
      },
      u_resolution: {
        type: 'v2',
        value: new THREE.Vector2(window.innerWidth, window.innerHeight)
      }
    };

    return new THREE.ShaderMaterial({
      uniforms,
      fragmentShader: this.getShader()
    });
  }

  getShader() {
    return `
      uniform vec2 u_resolution;
      uniform float u_time;

      void main() {
        vec2 st = gl_FragCoord.xy/u_resolution.xy;
        gl_FragColor = vec4(st.x, st.y, 0.0, 1.0);
      }
    `;
  }

}
