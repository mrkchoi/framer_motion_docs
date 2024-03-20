import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { EffectComposer, Noise, Bloom } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";

import Mesh from "./Mesh";

import "./vision02.css";

const PERSPECTIVE = 1000;
const FOV =
  (180 * (2 * Math.atan(window.innerHeight / 2 / PERSPECTIVE))) / Math.PI;

function Vision02() {
  return (
    <div className="vision02__main">
      <div className="vision02__canvasWrapper">
        <Canvas>
          <PerspectiveCamera
            makeDefault
            position={[0, 0, PERSPECTIVE]}
            zoom={1}
            fov={FOV}
            aspect={window.innerWidth / window.innerHeight}
            near={0.01}
            far={2000}
          />
          <OrbitControls enableDamping />
          <Suspense fallback={<span>loading...</span>}>
            <Mesh />
            <EffectComposer>
              <Noise
                blendFunction={BlendFunction.OVERLAY}
                opacity={2}
                premultiply
              />
              <Bloom
                luminanceThreshold={0}
                luminanceSmoothing={0.9}
                height={300}
                opacity={0.5}
                blendFunction={BlendFunction.OVERLAY}
                kernelSize={3}
              />
            </EffectComposer>
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
}

export default Vision02;
