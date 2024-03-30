const imageFragmentShader =
  /* glsl */
  `
  uniform sampler2D uTexture;
  uniform vec2 uImageNaturalSize;
  uniform vec2 uImageRenderedSize;
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
    vec2 uv = vUv;

    uv = getUV(uv, uImageNaturalSize, uImageRenderedSize);
    vec4 color = texture2D(uTexture, uv);
    gl_FragColor = color;
  }
`;

export default imageFragmentShader;
