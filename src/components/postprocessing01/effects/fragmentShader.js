const fragmentShader = /* GLSL */ `
  uniform float uFrequency;
  uniform float uAmplitude;
  uniform float uTime;

  // UV manipulation
  void mainUv(inout vec2 uv) {
    // update uv effect logic here
    uv.y += sin(uv.x * uFrequency + uTime) * uAmplitude;
  }  

  // Main image effect
  void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
    // update image/texture/color effect logic here
    outputColor = inputColor;
  }
`;

export default fragmentShader;
