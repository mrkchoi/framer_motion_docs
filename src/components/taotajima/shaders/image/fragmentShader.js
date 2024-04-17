// Swipe Noise

const fragmentShader09 =
  /* glsl */
  `
  uniform sampler2D uTextureImage;
  uniform sampler2D uTextureVideo;
  uniform sampler2D uDisplacement;
  uniform float uProgress;
  uniform float uTime;

  varying vec2 vUv;

  vec2 mirrored(vec2 v) {
    vec2 m = mod(v,2.);
    return mix(m,2.0 - m, step(1.0 ,m));
  }

  void main() {
    vec2 uv = vUv;

    vec4 noise = texture2D(uDisplacement, mirrored(uv + uTime * 0.04));
    float prog = uProgress * 0.8 - 0.05 + noise.g * 0.01;
    float intpl = pow(abs(smoothstep(0.0, 1.0, (prog * 5.0 - uv.y + (uv.x * 1.5) - 1.4))), 2.0);

    vec4 texture1 = texture2D(uTextureImage, (uv - 0.5) * (1.0 - intpl * 100.0) + 0.5);
    vec4 texture2 = texture2D(uTextureVideo, (uv - 0.5) * intpl + 0.5);

    vec4 color = mix(texture1, texture2, intpl);
    gl_FragColor = color;
  }
`;

export default fragmentShader09;
