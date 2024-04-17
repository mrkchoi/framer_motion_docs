const outputFragmentShader =
  /* glsl */
  `
  uniform sampler2D uTextureBrush;
  uniform sampler2D uTextureImage;
  uniform vec2 uImageNaturalSize;
  uniform vec2 uImageRenderedSize;
  varying vec2 vUv;

  float PI = 3.141592653589793238;

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

    
    vec4 displacement = texture2D(uTextureBrush, uv);
    float theta = displacement.r * PI * 2.0;
    vec2 dir = vec2(sin(theta), cos(theta));

    uv = uv + dir * displacement.r * 0.1;

    vec4 color = texture2D(uTextureImage, uv);
    gl_FragColor = color;
    // gl_FragColor = displacement;
    // gl_FragColor = vec4(uv, 1.0, 1.0);
  }
`;

export default outputFragmentShader;
