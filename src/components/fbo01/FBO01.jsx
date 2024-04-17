import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import "./fbo01.css";
import Scene from "./Scene";

// comment
const PERSPECTIVE = 1000;
const FAR = PERSPECTIVE * 3;
const FOV =
  (180 * (2 * Math.atan(window.innerHeight / 2 / PERSPECTIVE))) / Math.PI;

function FBO01() {
  return (
    <div className="fbo01__main">
      <div className="fbo01__canvasWrapper">
        <Canvas>
          <OrbitControls enableDamping={true} />
          <PerspectiveCamera
            makeDefault
            position={[0, 0, 1]}
            fov={FOV}
            near={0.1}
            far={FAR}
          />
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
}

export default FBO01;
