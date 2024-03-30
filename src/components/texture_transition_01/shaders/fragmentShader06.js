// Cross Fade

const fragmentShader06 =
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

    vec4 texture1 = texture2D(uTexture1, uv1);
    vec4 texture2 = texture2D(uTexture2, uv2);

    vec4 color = mix(texture1, texture2, uProgress);
    // vec4 color = vec4(vUv, 1.0, 1.0);
    gl_FragColor = color;
  }
`;

export default fragmentShader06;
