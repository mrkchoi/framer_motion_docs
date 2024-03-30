// Swipe Noise

const fragmentShader04 =
  /* glsl */
  `
  uniform sampler2D uTexture1;
  uniform sampler2D uTexture2;
  uniform sampler2D uDisplacement;
  uniform vec2 uImageNaturalSize1;
  uniform vec2 uImageNaturalSize2;
  uniform vec2 uDisplacementNaturalSize;
  uniform vec2 uImageRenderedSize;
  uniform float uProgress;
  uniform float uTime;

  varying vec2 vUv;

  float radius = 0.9;
  float width = 0.35;

  // Preserve aspect ratio of texture
  vec2 getUV(vec2 uv, vec2 uTextureSize, vec2 uPlaneResolution){
    vec2 tempUV = uv - vec2(0.5);

    float planeAspect = uPlaneResolution.x / uPlaneResolution.y;
    float textureAspect = uTextureSize.x / uTextureSize.y;
    if (planeAspect < textureAspect) {
      tempUV = tempUV * vec2(planeAspect / textureAspect, 1.0);
    } else {
      tempUV = tempUV * vec2(1.0, textureAspect / planeAspect);
    }

    tempUV += vec2(0.5);
    return tempUV;
  } 

  vec2 mirrored(vec2 v) {
    vec2 m = mod(v,2.);
    return mix(m,2.0 - m, step(1.0 ,m));
  }

  void main() {
    vec2 uv1 = vUv;
    vec2 uv2 = vUv;
    vec2 uvD = vUv;

    uv1 = getUV(uv1, uImageNaturalSize1, uImageRenderedSize);
    uv2 = getUV(uv2, uImageNaturalSize2, uImageRenderedSize);
    uvD = getUV(uvD, uDisplacementNaturalSize, uImageRenderedSize);

    vec4 noise = texture2D(uDisplacement, mirrored(uvD + uTime * 0.04));
    float prog = uProgress * 0.8 - 0.05 + noise.g * 0.06;
    float intpl = pow(abs(smoothstep(0.0, 1.0, (prog * 2.0 - vUv.x + 0.5))), 10.0);

    vec4 texture1 = texture2D(uTexture1, (uv1 - 0.5) * (1.0 - intpl) + 0.5);
    vec4 texture2 = texture2D(uTexture2, (uv2 - 0.5) * intpl + 0.5);

    vec4 color = mix(texture1, texture2, intpl);
    gl_FragColor = color;
  }
`;

export default fragmentShader04;
