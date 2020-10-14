export const fragmentShader_default = /* GLSL */ `
  precision mediump float;

  varying vec2 vUvs;

  uniform sampler2D uTexture;
  uniform float uTime;

  void main() {

    vec2 r_vUvs = (vUvs - 0.5) * (1.0 - (0.1 * uTime)) + 0.5;
    vec2 b_vUvs = (vUvs - 0.5) * (1.0 - (0.2 * uTime)) + 0.5;

    float r = texture2D(uTexture, b_vUvs).r;
    float g = texture2D(uTexture, r_vUvs).g;
    float b = texture2D(uTexture, vUvs).b;

    gl_FragColor = vec4(r, g, b, 1.0);
  }
`;
