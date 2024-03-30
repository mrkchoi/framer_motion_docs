import React from "react";
import { Suspense, useEffect, useState, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";

import Scene from "./Scene";

import "./depth01.css";

import texture01 from "./assets/images/mount.jpg";
import texture02 from "./assets/images/lady.jpg";
import texture03 from "./assets/images/ball.jpg";
import texture05 from "./assets/images/dream.webp";
import texture06 from "./assets/images/fusion.webp";
import texture07 from "./assets/images/soda.webp";

import depth01 from "./assets/images/mount-map.jpg";
import depth02 from "./assets/images/lady-map.jpg";
import depth03 from "./assets/images/ball-map.jpg";
import depth05 from "./assets/images/dream-map.webp";
import depth06 from "./assets/images/fusion-map.webp";
import depth07 from "./assets/images/soda-map.webp";

const TEXTURE_DATA = [
  {
    texture: texture01,
    depth: depth01,
    intensity: 0.1,
  },
  {
    texture: texture02,
    depth: depth02,
    intensity: 0.1,
  },
  {
    texture: texture03,
    depth: depth03,
    intensity: 0.1,
  },
  {
    texture: texture07,
    depth: depth07,
    intensity: 0.03,
  },
  {
    texture: texture06,
    depth: depth06,
    intensity: 0.03,
  },
  {
    texture: texture05,
    depth: depth05,
    intensity: 0.05,
  },
];

const PERSPECTIVE = 1000;
const FOV =
  (180 * (2 * Math.atan(window.innerHeight / 2 / PERSPECTIVE))) / Math.PI;

const lerp = (start, end, t) => {
  return start * (1 - t) + end * t;
};
let current = 0;
let target = 0;
let ease = 0.075;

let normalizedMouse = { x: 0, y: 0 };
let actualMouse = { x: 0, y: 0 };

function Depth01() {
  const scrollableRef = useRef(null);
  const [images, setImages] = useState([]);

  useEffect(() => {
    // get all images from DOM and set them to state for use in canvas scene
    const allImages = [...document.querySelectorAll(".depth01__img")];
    setImages(allImages);
  }, []);

  useEffect(() => {
    const onMouseMove = (e) => {
      normalizedMouse.x = e.clientX / window.innerWidth;
      normalizedMouse.y = 1 - e.clientY / window.innerHeight;
      actualMouse.x = e.clientX;
      actualMouse.y = e.clientY;
    };
    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  // SMOOTH SCROLL SYNC SETUP
  useEffect(() => {
    // SET VIRTUAL SCROLL PARENT HEIGHT, UPDATE ON RESIZE
    const init = () => {
      document.body.style.height = `${
        scrollableRef.current.getBoundingClientRect().height
      }px`;
    };
    init();
    window.addEventListener("resize", init);

    // UPDATE SCROLLABLE CONTAINER Y POSITION IN ANIMATION LOOP
    const smoothScroll = () => {
      target = window.scrollY;
      current = lerp(current, target, ease);
      if (scrollableRef.current) {
        scrollableRef.current.style.transform = `
        translate3d(0, -${current}px, 0)
        `;
      }
      requestAnimationFrame(smoothScroll);
    };
    smoothScroll();

    return () => {
      cancelAnimationFrame(smoothScroll);
      window.removeEventListener("resize", init);
      document.body.style.height = "";
    };
  }, []);

  return (
    <div className="depth01__main">
      <div className="depth01__canvasWrapper">
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
          <Suspense fallback={<span>loading...</span>}>
            <Scene images={images} />
          </Suspense>
        </Canvas>
      </div>
      <div ref={scrollableRef} className="depth01__scrollable">
        {TEXTURE_DATA.map((data, index) => (
          <div key={index} className="depth01__section">
            <div className="depth01__imgWrapper">
              <img
                src={data.texture}
                data-depth-map={data.depth}
                data-intensity={data.intensity}
                alt=""
                className="depth01__img"
              />
              {/* <div className="depth01__letter">W</div> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Depth01;
