import { Suspense, useEffect, useState, useRef } from "react";
import { Canvas, addEffect } from "@react-three/fiber";
import {
  OrbitControls,
  OrthographicCamera,
  PerspectiveCamera,
} from "@react-three/drei";

import Mesh from "./Mesh";

import "./vision.css";

const PERSPECTIVE = 1000;
const FOV =
  (180 * (2 * Math.atan(window.innerHeight / 2 / PERSPECTIVE))) / Math.PI;

function Vision() {
  return (
    <div className="vision__main">
      <div className="vision__canvasWrapper">
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
          {/* <ambientLight intensity={0.5} color={"#ffffff"} />
          <pointLight position={[10, 10, 10]} />
          <directionalLight intensity={0.5} position={[0, 10, 0]} /> */}
          <OrbitControls enableDamping />
          <Suspense fallback={<span>loading...</span>}>
            <Mesh />
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
}

export default Vision;
