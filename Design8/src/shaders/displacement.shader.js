export const fragmentShader_displacement = /* GLSL */ `
  precision mediump float;

  varying vec2 vUvs;

  uniform sampler2D uTexture;
  uniform sampler2D uDisplacement;

  uniform float uTime;

  mat2 getRotM(float angle) {
    float s = sin(angle);
    float c = cos(angle);
    return mat2(c, -s, s, c);
  }

  void main() {
    vec2 centeredUv = vUvs; //(vUvs - 0.5) * 1.0 + 0.5;
    vec4 disp = texture2D(uDisplacement, centeredUv);
    vec2 dispVec = vec2(disp.r, disp.g);
    
    vec2 distortedPosition1 = centeredUv + getRotM(3.14 * 0.25) * dispVec * 0.3 * uTime;
    vec4 t1 = texture2D(uTexture, distortedPosition1);

    // vec2 distortedPosition2 = centeredUv * dispVec + getRotM(-3.14 * 0.75) * dispVec * 0.3 * (1.0 - uTime);
		float t2_r = texture2D(uTexture, centeredUv * dispVec + getRotM(-3.14 * 0.75) * dispVec * 0.3 * (1.0 - uTime)).r;
    float t2_g = texture2D(uTexture, ((vUvs - 0.5) * 1.1 + 0.5) * dispVec + getRotM(-3.14 * 0.75) * dispVec * 0.3 * (1.0 - uTime)).g;
    float t2_b = texture2D(uTexture, ((vUvs - 0.5) * 1.2 + 0.5) * dispVec + getRotM(-3.14 * 0.75) * dispVec * 0.3 * (1.0 - uTime)).b;

    gl_FragColor = mix(t1, vec4(t2_r, t2_g, t2_b, 1.0), uTime);
  }
`;
