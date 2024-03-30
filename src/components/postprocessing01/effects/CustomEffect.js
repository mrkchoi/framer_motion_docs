import { Effect, BlendFunction } from "postprocessing";
import { Uniform } from "three";

import fragmentShader from "./fragmentShader";

export default class CustomEffect extends Effect {
  constructor({
    uFrequency,
    uAmplitude,
    uTime,
    blendFunction = BlendFunction.DARKEN,
  }) {
    super("CustomEffect", fragmentShader, {
      blendFunction: blendFunction,
      uniforms: new Map([
        ["uFrequency", new Uniform(uFrequency)],
        ["uAmplitude", new Uniform(uAmplitude)],
        ["uTime", new Uniform(uTime)],
      ]),
    });
  }

  // built in method to update uniforms/attributes
  update(renderer, inputBuffer, deltaTime) {
    // this.uniforms.get('uTime').value += deltaTime;
  }
}
