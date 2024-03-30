import { Effect, BlendFunction } from "postprocessing";
import { Uniform } from "three";

const fragmentShader = /* GLSL */ `
  uniform float uTime;
  uniform float uProgress;
  uniform float uScale;
  uniform float uSpeed;
  uniform float a1;
  uniform float a2;
  uniform float a3;
  uniform float b1;
  uniform float b2;
  uniform float b3;
  uniform float c1;
  uniform float c2;
  uniform float c3;
  uniform float d1;
  uniform float d2;
  uniform float d3;
  uniform float p1;
  uniform float y1;

  // UV manipulation
  void mainUv(inout vec2 uv) {
    vec2 newUv = uv;
    vec2 p = newUv * 2.0 - 1.0;

    p += a1 * cos( ( a2 * uScale ) * p.yx + a3 * uTime * uSpeed + vec2(1.2, 3.1) );
    p += b1 * cos( ( b2 * uScale ) * p.yx + b3 * uTime * uSpeed + vec2(3.2, 3.4) );
    p += c1 * cos( ( c2 * uScale ) * p.yx + c3 * uTime * uSpeed + vec2(10.8, 5.2) );
    p += d1 * cos( ( d2 * uScale ) * p.yx + d3 * uTime * uSpeed + vec2(10.2, 3.4) );

    uv.x = mix(newUv.x, length(p * p1), uProgress);
    uv.y = mix(newUv.y, 0.5 * y1, uProgress);
  }  

  // Main image effect
  void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
    outputColor = inputColor;
  }
`;

export default class CustomEffect extends Effect {
  constructor({
    uProgress,
    uScale,
    uTime,
    uSpeed,
    a1,
    a2,
    a3,
    b1,
    b2,
    b3,
    c1,
    c2,
    c3,
    d1,
    d2,
    d3,
    p1,
    y1,
    blendFunction = BlendFunction.DARKEN,
  }) {
    super("CustomEffect", fragmentShader, {
      blendFunction: blendFunction,
      uniforms: new Map([
        ["uTime", new Uniform(uTime)],
        ["uScale", new Uniform(uScale)],
        ["uProgress", new Uniform(uProgress)],
        ["uSpeed", new Uniform(uSpeed)],
        ["a1", new Uniform(a1)],
        ["a2", new Uniform(a2)],
        ["a3", new Uniform(a3)],
        ["b1", new Uniform(b1)],
        ["b2", new Uniform(b2)],
        ["b3", new Uniform(b3)],
        ["c1", new Uniform(c1)],
        ["c2", new Uniform(c2)],
        ["c3", new Uniform(c3)],
        ["d1", new Uniform(d1)],
        ["d2", new Uniform(d2)],
        ["d3", new Uniform(d3)],
        ["p1", new Uniform(p1)],
        ["y1", new Uniform(y1)],
      ]),
    });
  }

  update(renderer, inputBuffer, deltaTime) {
    // this.uniforms.get('uTime').value += deltaTime;
  }
}
