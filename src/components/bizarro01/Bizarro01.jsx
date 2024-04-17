import React, { Suspense, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrthographicCamera, PerspectiveCamera } from "@react-three/drei";
import normalizeWheel from "normalize-wheel";

import Scene from "./Scene";
import "./bizarro01.css";

import img01 from "./assets/images/1.jpg";
import img02 from "./assets/images/2.jpg";
import img03 from "./assets/images/3.jpg";
import img04 from "./assets/images/4.jpg";
import img05 from "./assets/images/5.jpg";
import img06 from "./assets/images/6.jpg";
import img07 from "./assets/images/7.jpg";
import img08 from "./assets/images/8.jpg";
import img09 from "./assets/images/9.jpg";
import img10 from "./assets/images/10.jpg";
import img11 from "./assets/images/11.jpg";
import img12 from "./assets/images/12.jpg";

const IMAGE_DATA = [
  { src: img01, text: "New Synagogue" },
  { src: img02, text: "Paro Taktsang" },
  { src: img03, text: "Petra" },
  { src: img04, text: "Gooderham Building" },
  { src: img05, text: "Catherine Palace" },
  { src: img06, text: "Sheikh Zayed Mosque" },
  { src: img07, text: "Madonna Corona" },
  { src: img08, text: "Plaza de Espana" },
  { src: img09, text: "Saint Martin" },
  { src: img10, text: "Tugela Falls" },
  { src: img11, text: "Sintra-Cascais" },
  { src: img12, text: "The Prophet's Mosque" },
  { src: img01, text: "New Synagogue" },
  { src: img02, text: "Paro Taktsang" },
  { src: img03, text: "Petra" },
  { src: img04, text: "Gooderham Building" },
  { src: img05, text: "Catherine Palace" },
  { src: img06, text: "Sheikh Zayed Mosque" },
  { src: img07, text: "Madonna Corona" },
  { src: img08, text: "Plaza de Espana" },
  { src: img09, text: "Saint Martin" },
  { src: img10, text: "Tugela Falls" },
  { src: img11, text: "Sintra-Cascais" },
  { src: img12, text: "The Prophet's Mosque" },
];

const PERSPECTIVE = 1000;
const FOV =
  (180 * (2 * Math.atan(window.innerHeight / 2 / PERSPECTIVE))) / Math.PI;

const lerp = (start, end, t) => {
  return start * (1 - t) + end * t;
};
// let current = 0;
// let target = 0;
// let ease = 0.075;

const scroll = {
  ease: 0.075,
  current: 0,
  target: 0,
  last: 0,
  position: 0,
  start: 0,
};

function Bizarro01() {
  // const scroll = useRef({
  //   ease: 0.075,
  //   current: 0,
  //   target: 0,
  //   last: 0,
  //   position: 0,
  //   start: 0,
  // });
  const isDown = useRef(false);
  const [scrollCurrent, setScrollCurrent] = useState(0);
  const [scrollLast, setScrollLast] = useState(0);
  const [direction, setDirection] = useState("left");

  useEffect(() => {
    const update = () => {
      scroll.current = lerp(scroll.current, scroll.target, scroll.ease);

      if (scroll.current > scroll.last) {
        setDirection("left");
        // console.log("left");
      } else {
        // console.log("right");
        setDirection("right");
      }

      setScrollCurrent(scroll.current);
      setScrollLast(scroll.last);
      scroll.last = scroll.current;

      requestAnimationFrame(update);
    };
    update();
  }, []);

  useEffect(() => {
    // const log = () => {
    //   console.log(scroll);
    //   requestAnimationFrame(log);
    // };
    // log();

    const handleTouchDown = (e) => {
      isDown.current = true;

      scroll.position = scroll.current;
      scroll.start = e.touches ? e.touches[0].clientX : e.clientX;
    };

    const handleTouchMove = (e) => {
      if (!isDown.current) return;

      const x = e.touches ? e.touches[0].clientX : e.clientX;
      const distance = (scroll.start - x) * 2.5;

      scroll.target = scroll.position + distance;
    };

    const handleTouchUp = (e) => {
      isDown.current = false;
    };

    const handleWheel = (e) => {
      const normalized = normalizeWheel(e);
      const speed = normalized.pixelY;
      scroll.target += speed * 1.0;
    };

    window.addEventListener("wheel", handleWheel);
    window.addEventListener("mousedown", handleTouchDown);
    window.addEventListener("mousemove", handleTouchMove);
    window.addEventListener("mouseup", handleTouchUp);
    window.addEventListener("touchstart", handleTouchDown);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", handleTouchUp);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("mousedown", handleTouchDown);
      window.removeEventListener("mousemove", handleTouchMove);
      window.removeEventListener("mouseup", handleTouchUp);
      window.removeEventListener("touchstart", handleTouchDown);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchUp);
    };
  }, []);

  return (
    <div className="bizarro01__main">
      <div className="bizarro01__canvasWrapper">
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
          <color attach="background" args={["#cbcabd"]} />
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <Suspense fallback={null}>
            <Scene
              images={IMAGE_DATA}
              scrollCurrent={scrollCurrent}
              scrollLast={scrollLast}
              direction={direction}
            />
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
}

export default Bizarro01;
