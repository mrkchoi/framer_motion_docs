import { useRef } from "react";
import { OrbitControls } from "@react-three/drei";
import { Perf } from "r3f-perf";
import { useFrame } from "@react-three/fiber";
import {
  EffectComposer,
  Bloom,
  Vignette,
  ToneMapping,
  Glitch,
  Noise,
  DepthOfField,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { useControls } from "leva";

import CustomEffectPass from "./effects/CustomEffectPass";

function Scene() {
  const effectRef = useRef(null);

  const { frequency, amplitude } = useControls({
    frequency: { value: 10, min: 0, max: 20 },
    amplitude: { value: 0.1, min: 0, max: 1 },
  });

  useFrame((state, delta) => {
    // Update uniforms in custom pass shader (postprocessing)
    if (effectRef.current) {
      effectRef.current.uniforms.get("uTime").value += delta;
    }
  });

  return (
    <>
      <Perf position="top-left" />
      <OrbitControls makeDefault />
      <color attach="background" args={["#fff"]} />
      <directionalLight castShadow position={[1, 2, 3]} intensity={4.5} />
      <ambientLight intensity={1.5} />
      <mesh castShadow position-x={-2}>
        <sphereGeometry />
        <meshStandardMaterial color="orange" />
      </mesh>
      <mesh castShadow position-x={2} scale={1.5}>
        <boxGeometry />
        <meshStandardMaterial color="mediumpurple" />
      </mesh>
      <mesh
        receiveShadow
        position-y={-1}
        rotation-x={-Math.PI * 0.5}
        scale={10}
      >
        <planeGeometry />
        <meshStandardMaterial color="greenyellow" />
      </mesh>
      <EffectComposer disableNormalPass multisampling={0}>
        <CustomEffectPass
          ref={effectRef}
          blendFunction={BlendFunction.DARKEN}
          uFrequency={frequency}
          uAmplitude={amplitude}
          uTime={0}
        />
      </EffectComposer>
    </>
  );
}

export default Scene;
