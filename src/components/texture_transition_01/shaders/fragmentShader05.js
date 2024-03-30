// Vertical Melt

const fragmentShader05 =
  /* glsl */
  `
  uniform sampler2D uTexture1;
  uniform sampler2D uTexture2;
  uniform vec2 uImageNaturalSize1;
  uniform vec2 uImageNaturalSize2;
  uniform vec2 uImageRenderedSize;
  uniform float uProgress;
  uniform float uTime;

  varying vec2 vUv;

  float intensity = 0.25;

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
    
    vec4 d1 = texture2D(uTexture1, uv1);
    vec4 d2 = texture2D(uTexture2, uv2);

    float displace1 = (d1.r + d1.g + d1.b) * 0.33;
    float displace2 = (d2.r + d2.g + d2.b) * 0.33;

    vec4 texture1 = texture2D(uTexture1, vec2(uv1.x, uv1.y + uProgress * displace2 * intensity));
    vec4 texture2 = texture2D(uTexture2, vec2(uv2.x, uv2.y + (1.0 - uProgress) * displace1 * intensity));

    vec4 color = mix(texture1, texture2, uProgress);
    // vec4 color = mix(d1, d2, uProgress);
    gl_FragColor = color;
  }
`;

export default fragmentShader05;
