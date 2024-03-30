import MeshImage from "./MeshImage";
import {
  EffectComposer,
  Vignette,
  ToneMapping,
  Noise,
  Bloom,
  N8AO,
  BrightnessContrast,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { useControls } from "leva";

import CustomEffectPass from "./effects/CustomEffectPass";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

function Scene({ images }) {
  const effectRef = useRef(null);

  const {
    progress,
    scale,
    speed,
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
  } = useControls("Postprocessing", {
    progress: { value: 1, min: 0, max: 1 },
    scale: { value: 0.9, min: 0, max: 1 },
    strength: { value: 1, min: 0, max: 10 },
    speed: { value: 0.1, min: 0, max: 1 },
    a1: { value: 0.1, min: 0, max: 1 },
    a2: { value: 3.5, min: 0, max: 10 },
    a3: { value: 1.3, min: 0, max: 10 },
    b1: { value: 0.1, min: 0, max: 1 },
    b2: { value: 2.3, min: 0, max: 10 },
    b3: { value: 1.3, min: 0, max: 10 },
    c1: { value: 0.1, min: 0, max: 1 },
    c2: { value: 2.2, min: 0, max: 10 },
    c3: { value: 1.7, min: 0, max: 10 },
    d1: { value: 0.3, min: 0, max: 1 },
    d2: { value: 7, min: 0, max: 10 },
    d3: { value: 3.6, min: 0, max: 10 },
    p1: { value: 0.55, min: 0, max: 1 },
    y1: { value: 0.8, min: 0, max: 1 },
  });

  useFrame(({ clock }) => {
    if (effectRef.current) {
      effectRef.current.uniforms.get("uTime").value = clock.elapsedTime;
    }
  });

  return (
    <>
      {images.map((image, idx) => (
        <MeshImage key={idx} image={image} />
      ))}
      <EffectComposer disableNormalPass multisampling={0}>
        <CustomEffectPass
          key={CustomEffectPass.key}
          ref={effectRef}
          uFrequency={10}
          uAmplitude={0.01}
          uTime={0}
          uProgress={progress}
          uScale={scale}
          uSpeed={speed}
          a1={a1}
          a2={a2}
          a3={a3}
          b1={b1}
          b2={b2}
          b3={b3}
          c1={c1}
          c2={c2}
          c3={c3}
          d1={d1}
          d2={d2}
          d3={d3}
          p1={p1}
          y1={y1}
        />
      </EffectComposer>
    </>
  );
}

export default Scene;
