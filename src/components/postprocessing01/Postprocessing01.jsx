import { Canvas } from "@react-three/fiber";

import "./postprocessing01.css";

import Scene from "./Scene";

function Postprocessing01() {
  return (
    <div className="postprocessing01__main">
      <div className="postprocessing01__canvasWrapper">
        <Canvas
          camera={{
            fov: 45,
            near: 0.1,
            far: 200,
            position: [4, 2, 15],
          }}
        >
          <Scene />
        </Canvas>
      </div>
    </div>
  );
}

export default Postprocessing01;
