const shader = /* GLSL */ `
  uniform sampler2D uTexture;

  varying vec2 vUv;

  void main() {
    vec2 uv = vUv;

    vec4 color = texture2D(uTexture, uv);

    gl_FragColor = vec4(1.0, 1.0, 1.0, 0.5);
    // gl_FragColor = vec4(vUv, 1.0, 1.0);
    // gl_FragColor = color;
  }
`;

export default shader;
