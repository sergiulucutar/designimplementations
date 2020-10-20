export const fragmentShader_default = /* GLSL */ `
  precision mediump float;

  varying vec2 vUvs;

  uniform sampler2D uTexture;
  uniform float uTime;

  uniform float uAlpha;
  uniform vec2 uScale;

  void main() {
    vec2 r_vUvs = (vUvs - 0.5) * (1.0 - (0.1 * uTime)) + 0.5;
    vec2 b_vUvs = (vUvs - 0.5) * (1.0 - (0.2 * uTime)) + 0.5;

    float r = texture2D(uTexture, b_vUvs).r;
    float g = texture2D(uTexture, r_vUvs).g;
    float b = texture2D(uTexture, vUvs).b;

    vec3 color = vec3(r, g, b);
    gl_FragColor = vec4(color * uAlpha, uAlpha);
    // gl_FragColor = texture2D(uTexture, newvUvs);
  }
`;
