import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Leva } from "leva";

import GridMesh from "./GridMesh";

import "./grid01.css";

const PERSPECTIVE = 1000;
const FOV =
  (180 * (2 * Math.atan(window.innerHeight / 2 / PERSPECTIVE))) / Math.PI;

function Grid01() {
  return (
    <div className="grid01__main">
      <div className="grid01__canvasWrapper">
        <Canvas>
          <PerspectiveCamera
            makeDefault
            position={[0, 0, PERSPECTIVE]}
            zoom={1}
            fov={FOV}
            aspect={window.innerWidth / window.innerHeight}
            near={0.01}
            far={10000}
          />
          {/* <OrbitControls enableDamping /> */}
          <Suspense fallback={<span>loading...</span>}>
            <GridMesh />
          </Suspense>
        </Canvas>
        {/* <Leva collapsed={false} /> */}
      </div>
    </div>
  );
}

export default Grid01;
