import { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import MeshWrapper from "./MeshWrapper";
import "./shader02.css";

function Shader02() {
  const [canvasRef, setCanvasRef] = useState(null);

  return (
    <div className="shader02__main">
      <Suspense fallback={null}>
        <Canvas
          ref={setCanvasRef}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100vh",
          }}
          camera={{
            position: [0, 0, 600],
            fov: 2 * Math.atan(window.innerHeight / 2 / 600) * (180 / Math.PI),
            near: 100,
            far: 2000,
          }}
        >
          {/* <perspectiveCamera
            makeDefault
            position={[0, 0, 600]}
            fov={2 * Math.atan(window.innerHeight / 2 / 600) * (180 / Math.PI)}
            near={100}
            far={1000}
          /> */}
          <OrbitControls enableDamping />
          <ambientLight />
          <MeshWrapper canvasRef={canvasRef} />
        </Canvas>
      </Suspense>
    </div>
  );
}

export default Shader02;
