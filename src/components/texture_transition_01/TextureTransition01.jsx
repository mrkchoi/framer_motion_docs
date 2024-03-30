import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  OrthographicCamera,
  PerspectiveCamera,
} from "@react-three/drei";
import * as THREE from "three";
import { Leva } from "leva";

import Scene from "./Scene";

import "./textureTransition01.css";

import disp01 from "./assets/images/disp1.jpg";

import img01 from "./assets/images/img19.jpeg";
import img02 from "./assets/images/img2.jpeg";
import img03 from "./assets/images/img3.jpeg";
import img04 from "./assets/images/img5.jpeg";
import img05 from "./assets/images/img7.jpeg";
import img06 from "./assets/images/img12.jpeg";
import img07 from "./assets/images/img15.jpeg";
import img08 from "./assets/images/img1.jpeg";
import img09 from "./assets/images/img20.jpeg";
import img10 from "./assets/images/img23.jpeg";
import img11 from "./assets/images/img33.jpeg";
import img12 from "./assets/images/img39.jpeg";
import img13 from "./assets/images/img49.jpeg";
import img14 from "./assets/images/img52.jpeg";
import img15 from "./assets/images/img65.jpeg";

const IMAGES = [
  img01,
  img02,
  img03,
  img04,
  img05,
  img06,
  img07,
  img08,
  img09,
  img10,
  img11,
  img12,
  img13,
  img14,
  img15,
];

const PERSPECTIVE = 1000;
const FOV =
  (180 * (2 * Math.atan(window.innerHeight / 2 / PERSPECTIVE))) / Math.PI;

function TextureTransition01() {
  const [textures, setTextures] = useState([]);
  const [displacementTexture, setDisplacementTexture] = useState(null);
  // const [image, setImage] = useState([]);

  // useEffect(() => {
  //   const image = document.querySelector(".textureTransition01__img");
  //   setImage(image);
  // }, []);

  useEffect(() => {
    const newTextures = IMAGES.map((img) =>
      new THREE.TextureLoader().load(img),
    );
    const newDisplacementTexture = new THREE.TextureLoader().load(disp01);
    setDisplacementTexture(newDisplacementTexture);
    setTextures(newTextures);
  }, []);

  return (
    <div className="textureTransition01__main">
      <div className="textureTransition01__canvasWrapper">
        <Canvas>
          <OrthographicCamera
            makeDefault
            position={[0, 0, PERSPECTIVE]}
            zoom={1}
            fov={FOV}
            aspect={window.innerWidth / window.innerHeight}
            near={0.01}
            far={2000}
          />
          <OrbitControls enableDamping enabled={false} />
          <Suspense fallback={<span>loading...</span>}>
            <Scene
              textures={textures}
              displacementTexture={displacementTexture}
            />
          </Suspense>
        </Canvas>
        <Leva collapsed={false} />
      </div>
      <div className="textureTransition01__content">
        <div className="textureTransition01__imgWrapper">
          {/* <img className="textureTransition01__img" src={img01} alt="img" /> */}
        </div>
      </div>
    </div>
  );
}

export default TextureTransition01;
