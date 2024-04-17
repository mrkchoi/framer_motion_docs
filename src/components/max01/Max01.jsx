import React, { Suspense, useEffect, useRef, useState } from "react";
import Lenis from "@studio-freight/lenis";
import { CustomEase } from "gsap/all";
import gsap from "gsap";
import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera, OrthographicCamera } from "@react-three/drei";
import { Perf } from "r3f-perf";
import { create } from "zustand";

import Scene from "./Scene";

import "./max01.css";

import img01 from "./assets/images/img01.jpeg";
import img07 from "./assets/images/img02.jpeg";
import img03 from "./assets/images/img03.jpeg";
import img04 from "./assets/images/img04.jpeg";
import img08 from "./assets/images/img05.jpeg";
import img06 from "./assets/images/img06.jpeg";
import img02 from "./assets/images/img07.jpeg";
import img05 from "./assets/images/img08.jpeg";
import img09 from "./assets/images/img09.jpeg";
import img10 from "./assets/images/img10.jpeg";
import img11 from "./assets/images/img11.jpeg";
// import img12 from "./assets/images/img12.jpeg";

const PROJECTS = [
  img01,
  img02,
  img03,
  img04,
  img05,
  img06,
  img11,
  img10,
  img07,
  img09,
  img08,
  // img12,
];
const PROJECTS_2 = [
  img06,
  img11,
  img10,
  img07,
  img09,
  img08,
  // img12,
  img01,
  img02,
  img03,
  img04,
  img05,
];

const PERSPECTIVE = 1000;
const FAR = PERSPECTIVE * 3;
const FOV =
  (180 * (2 * Math.atan(window.innerHeight / 2 / PERSPECTIVE))) / Math.PI;

const lerp = (start, end, t) => {
  return start * (1 - t) + end * t;
};

const scroll = {
  ease: 0.025,
  current: 0,
  currentFast: 0,
  target: 0,
  targetFast: 0,
  last: 0,
  direction: "left",
};

function Max01() {
  const cameraRef = useRef(null);
  const [targetScroll, setTargetScroll] = useState(0);
  const [currentScroll, setCurrentScroll] = useState(0);

  const [items, setItems] = useState([]);

  useEffect(() => {
    scroll.current = 0;
    scroll.currentFast = 0;
    scroll.target = 0;
    scroll.targetFast = 0;
    scroll.last = 0;

    // get all images from DOM and set them to state for use in canvas scene
    const allItems = [...document.querySelectorAll(".max01__project")];
    setItems(allItems);
  }, []);

  useEffect(() => {
    const handleWheel = (e) => {
      scroll.target += e.deltaY * 0.5;
      setTargetScroll(scroll.target);
      scroll.targetFast += e.deltaY;
    };

    const handleResize = () => {
      // update camera fov
      cameraRef.current.aspect = window.innerWidth / window.innerHeight;
      cameraRef.current.fov =
        (180 * (2 * Math.atan(window.innerHeight / 2 / PERSPECTIVE))) / Math.PI;
      cameraRef.current.updateProjectionMatrix();
    };

    window.addEventListener("wheel", handleWheel);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // ANIMATION LOOP FOR SMOOTH SCROLL
  useEffect(() => {
    const update = () => {
      scroll.current = lerp(scroll.current, scroll.target, scroll.ease);
      scroll.currentFast = lerp(
        scroll.currentFast,
        scroll.targetFast,
        scroll.ease,
      );
      setCurrentScroll(scroll.current);

      if (scroll.current > scroll.last) {
        scroll.direction = "left";
      } else {
        scroll.direction = "right";
      }
      scroll.last = scroll.current;

      requestAnimationFrame(update);
    };
    update();

    return () => cancelAnimationFrame(update);
  }, []);

  return (
    <div className="max01__main">
      <div className="max01__canvasWrapper">
        <Canvas>
          <PerspectiveCamera
            ref={cameraRef}
            makeDefault
            position={[0, 0, PERSPECTIVE]}
            zoom={1}
            fov={FOV}
            aspect={window.innerWidth / window.innerHeight}
            near={0.01}
            far={FAR}
          />
          <Suspense fallback={<span>loading...</span>}>
            <Scene
              items={items}
              targetScroll={targetScroll}
              currentScroll={currentScroll}
            />
          </Suspense>
          {/* <Perf /> */}
        </Canvas>
      </div>
      <div className="max01__scrollable">
        <div className="max01__projectWrapper">
          <div className="max01__projects">
            {[...PROJECTS, ...PROJECTS].map((project, idx) => (
              <ListItem project={project} key={idx} speed="slow" />
            ))}
          </div>
        </div>
        <div className="max01__projectWrapper">
          <div className="max01__projects max01__projects2">
            {[...PROJECTS_2, ...PROJECTS_2].map((project, idx) => (
              <ListItem project={project} key={idx} speed="fast" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ListItem({ project, speed }) {
  const ref = useRef(null);
  const position = useRef({
    offset: 0,
    isBefore: false,
    isAfter: false,
  });

  useEffect(() => {
    scroll.current = 0;
    scroll.target = 0;
    scroll.last = 0;
    position.current.offset = 0;

    const handleResize = () => {
      scroll.current = 0;
      scroll.target = 0;
      scroll.last = 0;
      position.current.offset = 0;
    };

    const handleWheel = (e) => {
      const list = document.querySelector(".max01__projects");
      const listWidth = list.getBoundingClientRect().width;

      if (scroll.direction === "left" && position.current.isBefore) {
        position.current.offset -= listWidth;
        position.current.isBefore = false;
        position.current.isAfter = false;
      }

      if (scroll.direction === "right" && position.current.isAfter) {
        position.current.offset += listWidth;
        position.current.isBefore = false;
        position.current.isAfter = false;
      }
    };

    window.addEventListener("wheel", handleWheel);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const update = () => {
      const rect = ref.current?.getBoundingClientRect();
      if (!rect) return;

      const scrollSpeed =
        speed === "slow" ? scroll.current : scroll.currentFast;
      const amount = -(scrollSpeed + position.current.offset);

      position.current.isBefore = rect.right < 0;
      position.current.isAfter = rect.left > window.innerWidth;

      ref.current.style.transform = `translate3d(${amount}px, 0, 0)`;

      requestAnimationFrame(update);
    };
    update();

    return () => cancelAnimationFrame(update);
  }, []);

  return (
    <div ref={ref} className="max01__project">
      <div className="max01__projectImgWrapper">
        <img src={project} alt="" className="max01__projectImg" />
      </div>
    </div>
  );
}

export default Max01;
