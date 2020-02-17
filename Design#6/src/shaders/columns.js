let ColumnsShader;
export default ColumnsShader = `
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

    vec4 d1 = texture2D(u_texture1, st);
    vec4 d2 = texture2D(u_texture2, st);

    float displace1 = (d1.r + d1.g + d1.b) * 0.33;
    float displace2 = (d2.r + d2.g + d2.b) * 0.33;

    vec4 t1 = texture2D(u_texture1, vec2(st.x, st.y + u_time * (displace2 * 0.6)));
    vec4 t2 = texture2D(u_texture2, vec2(st.x, st.y + (1.0 - u_time) * (displace1 * 0.6)));

    gl_FragColor = mix(t1, t2, u_time);
}
`;
