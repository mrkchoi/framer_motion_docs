import React, { Suspense, useEffect, useState } from "react";
import Lenis from "@studio-freight/lenis";
import { Canvas, addEffect } from "@react-three/fiber";
import { OrthographicCamera } from "@react-three/drei";
import { useProgress } from "@react-three/drei";

import Scene from "./Scene";

import "./RGBDistortion.css";

import img01 from "./assets/images/1.jpeg";
import img02 from "./assets/images/2.jpeg";
import img03 from "./assets/images/3.jpeg";
import img04 from "./assets/images/4.jpeg";

const IMAGES = [
  { title: "Monochrome", src: img01 },
  { title: "Street", src: img02 },
  { title: "Abstract", src: img03 },
  { title: "Rose", src: img04 },
];

const lenis = new Lenis({
  syncTouch: true,
});

const perspective = 1000;
const fov =
  (180 * (2 * Math.atan(window.innerHeight / 2 / perspective))) / Math.PI;

function RGBDistortion() {
  const [images, setImages] = useState([]);
  const [targetScroll, setTargetScroll] = useState(0);
  const [actualScroll, setActualScroll] = useState(0);

  // const { active, progress, errors, item, loaded, total, transition } =
  //   useProgress();

  useEffect(() => {
    // get all images from DOM and set them to state for use in canvas scene
    const allImages = [...document.querySelectorAll(".rgbDistortion__img")];
    setImages(allImages);
  }, []);

  addEffect((time) => {
    lenis.raf(time);
    setTargetScroll(lenis.targetScroll);
    setActualScroll(lenis.actualScroll);
  }, []);

  return (
    <div className="rgbDistortion__main">
      <div className="rgbDistortion__contentWrapper">
        {IMAGES.map((image, index) => (
          <div key={index} className="rgbDistortion__section">
            <img
              className={[
                "rgbDistortion__img",
                `rgbDistortion__img--${index + 1}`,
              ].join(" ")}
              src={image.src}
              alt={image.title}
            />
            <h2
              className={[
                "rgbDistortion__title",
                `rgbDistortion__title--${index + 1}`,
              ].join(" ")}
            >
              {image.title}
            </h2>
          </div>
        ))}
      </div>
      <div className="rgbDistortion__canvasWrapper">
        <Canvas>
          <OrthographicCamera
            makeDefault
            position={[0, 0, perspective]}
            zoom={1}
            fov={fov}
            aspect={window.innerWidth / window.innerHeight}
            near={0.01}
            far={1000}
          />
          <Suspense fallback={<span>loading...</span>}>
            <Scene
              images={images}
              targetScroll={targetScroll}
              actualScroll={actualScroll}
            />
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
}

export default RGBDistortion;
