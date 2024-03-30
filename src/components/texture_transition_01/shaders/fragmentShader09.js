// Bubble Side

const fragmentShader09 =
  /* glsl */
  `
  uniform sampler2D uTexture1;
  uniform sampler2D uTexture2;
  uniform vec2 uImageNaturalSize1;
  uniform vec2 uImageNaturalSize2;
  uniform vec2 uImageRenderedSize;
  uniform float uProgress;

  varying vec2 vUv;

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

  void main() {
    vec2 uv1 = vUv;
    vec2 uv2 = vUv;

    uv1 = getUV(uv1, uImageNaturalSize1, uImageRenderedSize);
    uv2 = getUV(uv2, uImageNaturalSize2, uImageRenderedSize);

    float x = uProgress;
    x = smoothstep(0.0, 1.0, (x * 2.0 + uv1.x - 1.0));

    vec4 texture1 = texture2D(uTexture1, (uv1 - 0.5) * (1.0 - x) + 0.5);
    vec4 texture2 = texture2D(uTexture2, (uv2 - 0.5) * x + 0.5);

    vec4 color = mix(texture1, texture2, x);
    gl_FragColor = color;
  }
`;

export default fragmentShader09;
