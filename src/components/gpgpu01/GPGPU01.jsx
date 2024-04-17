import React, { Suspense, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Canvas } from "@react-three/fiber";
import {
  PerspectiveCamera,
  OrthographicCamera,
  OrbitControls,
} from "@react-three/drei";
import { Perf } from "r3f-perf";

import Scene from "./Scene";
import "./gpgpu01.css";

const PERSPECTIVE = 1000;
const FAR = PERSPECTIVE * 3;
const FOV =
  (180 * (2 * Math.atan(window.innerHeight / 2 / PERSPECTIVE))) / Math.PI;

function GPGPU01() {
  const cameraRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      // update camera fov
      cameraRef.current.aspect = window.innerWidth / window.innerHeight;
      cameraRef.current.fov =
        (180 * (2 * Math.atan(window.innerHeight / 2 / PERSPECTIVE))) / Math.PI;
      cameraRef.current.updateProjectionMatrix();
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="gpgpu01__main">
      <div className="gpgpu01__canvasWrapper">
        <Canvas>
          {/* <PerspectiveCamera
            ref={cameraRef}
            makeDefault
            position={[0, 0, 20]}
            // position={[0, 0, PERSPECTIVE]}
            zoom={1}
            // fov={FOV}
            fov={45}
            aspect={window.innerWidth / window.innerHeight}
            near={0.01}
            far={40}
          /> */}
          <OrbitControls enableDamping={true} />
          <ambientLight intensity={2} />
          <Suspense fallback={<span>loading...</span>}>
            <Scene />
          </Suspense>
          <Perf />
        </Canvas>
      </div>
    </div>
  );
}

export default GPGPU01;
