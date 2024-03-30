import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  OrthographicCamera,
  PerspectiveCamera,
} from "@react-three/drei";
import { Leva } from "leva";

import Scene from "./Scene";

import "./ripple01.css";

import img01 from "./assets/images/ocean.jpeg";
import img02 from "./assets/images/abstract.jpeg";

const PERSPECTIVE = 1000;
const FOV =
  (180 * (2 * Math.atan(window.innerHeight / 2 / PERSPECTIVE))) / Math.PI;

function Ripple01() {
  const [image, setImage] = useState([]);

  useEffect(() => {
    const image = document.querySelector(".ripple01__img");
    setImage(image);
  }, []);

  return (
    <div className="ripple01__main">
      <div className="ripple01__canvasWrapper">
        <Canvas>
          <OrthographicCamera
            makeDefault
            position={[0, 0, PERSPECTIVE]}
            zoom={1}
            fov={FOV}
            aspect={window.innerWidth / window.innerHeight}
            near={0.01}
            far={10000}
          />
          <OrbitControls enableDamping enabled={false} />
          <Suspense fallback={<span>loading...</span>}>
            <Scene image={image} />
          </Suspense>
        </Canvas>
        <Leva collapsed={true} />
      </div>
      <div className="ripple01__content">
        <div className="ripple01__imgWrapper">
          <img className="ripple01__img" src={img01} alt="img" />
        </div>
      </div>
    </div>
  );
}

export default Ripple01;
