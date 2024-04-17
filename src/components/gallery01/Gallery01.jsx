import React, { Suspense, useEffect, useRef, useState } from "react";
import Lenis from "@studio-freight/lenis";
import { CustomEase } from "gsap/all";
import gsap from "gsap";
import { Canvas } from "@react-three/fiber";
import {
  PerspectiveCamera,
  OrthographicCamera,
  OrbitControls,
} from "@react-three/drei";

import Scene from "./Scene";

import "./gallery01.css";

import bgGrid from "./assets/images/grid.png";

import img01 from "./assets/images/img01.webp";
import img02 from "./assets/images/img02.webp";
import img03 from "./assets/images/img03.webp";
import img04 from "./assets/images/img04.webp";
import img05 from "./assets/images/img05.webp";
import img06 from "./assets/images/img06.webp";
import img07 from "./assets/images/img07.webp";
import img08 from "./assets/images/img08.webp";
import img09 from "./assets/images/img09.webp";
import img10 from "./assets/images/img10.webp";
import img11 from "./assets/images/img11.webp";
import img12 from "./assets/images/img12.webp";
import img13 from "./assets/images/img13.webp";
import img14 from "./assets/images/img14.webp";
import img15 from "./assets/images/img15.webp";
import img16 from "./assets/images/img16.webp";
import img17 from "./assets/images/img17.webp";
import img18 from "./assets/images/img18.webp";

const IMAGES = [
  img01,
  img02,
  img06,
  img04,
  img05,
  img07,
  img08,
  img10,
  img12,
  img13,
  img14,
  img15,
  img09,
  img16,
  img17,
  img03,
  img18,
  img11,
];

const NAV = ["Index", "Work", "Gallery", "About"];

const PERSPECTIVE = 1000;
const FAR = PERSPECTIVE * 3;
const FOV =
  (180 * (2 * Math.atan(window.innerHeight / 2 / PERSPECTIVE))) / Math.PI;

const lerp = (start, end, t) => {
  return start * (1 - t) + end * t;
};

const mouse = {
  ease: 0.04,
  current: { x: 0, y: 0 },
  target: { x: 0, y: 0 },
  start: { x: 0, y: 0 },
  offset: { x: 0, y: 0 },
  isDown: false,
};

function Gallery01() {
  const cameraRef = useRef(null);
  const canvasRef = useRef(null);

  const [images, setImages] = useState([]);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [directionX, setDirectionX] = useState("left");
  const [directionY, setDirectionY] = useState("up");

  const direction = useRef({ x: "left", y: "up" });

  useEffect(() => {
    // scroll.current = 0;
    // scroll.currentFast = 0;
    // scroll.target = 0;
    // scroll.targetFast = 0;
    // scroll.last = 0;

    // get all images from DOM and set them to state for use in canvas scene
    const allImages = [...document.querySelectorAll(".gallery01__img")];
    setImages(allImages);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      // update camera fov
      cameraRef.current.aspect = window.innerWidth / window.innerHeight;
      cameraRef.current.fov =
        (180 * (2 * Math.atan(window.innerHeight / 2 / PERSPECTIVE))) / Math.PI;
      cameraRef.current.updateProjectionMatrix();
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const handleTouchDown = (e) => {
      mouse.isDown = true;
      mouse.start.x = e.clientX;
      mouse.start.y = e.clientY;
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      mouse.target.x = e.clientX;
      mouse.target.y = e.clientY;
      if (canvasRef.current) {
        canvasRef.current.style.cursor = "grabbing";
      }
    };

    const handleTouchMove = (e) => {
      if (!mouse.isDown) return;
      mouse.target.x = e.clientX;
      mouse.target.y = e.clientY;

      const dx = mouse.target.x - mouse.current.x;
      const dy = mouse.target.y - mouse.current.y;

      if (dx > 0) {
        direction.current.x = "right";
      } else {
        direction.current.x = "left";
      }

      if (dy > 0) {
        direction.current.y = "down";
      } else {
        direction.current.y = "up";
      }
    };

    const handleTouchUp = (e) => {
      mouse.isDown = false;
      if (canvasRef.current) {
        canvasRef.current.style.cursor = "grab";
      }
    };

    const handleWheel = (e) => {
      const deltaX = e.deltaX;
      const deltaY = e.deltaY;

      if (deltaX > 0) {
        direction.current.x = "left";
      } else if (deltaX < 0) {
        direction.current.x = "right";
      }

      if (deltaY > 0) {
        direction.current.y = "up";
      } else if (deltaY < 0) {
        direction.current.y = "down";
      }

      mouse.target.x -= deltaX;
      mouse.target.y -= deltaY;
    };

    window.addEventListener("touchstart", handleTouchDown);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", handleTouchUp);
    window.addEventListener("wheel", handleWheel);

    window.addEventListener("mousedown", handleTouchDown);
    window.addEventListener("mousemove", handleTouchMove);
    window.addEventListener("mouseup", handleTouchUp);

    return () => {
      window.removeEventListener("touchstart", handleTouchDown);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchUp);
      window.removeEventListener("wheel", handleWheel);
    };
  }, []);

  useEffect(() => {
    const update = () => {
      mouse.current.x = lerp(mouse.current.x, mouse.target.x, mouse.ease);
      mouse.current.y = lerp(mouse.current.y, mouse.target.y, mouse.ease);

      const dx = mouse.current.x - mouse.target.x;
      const dy = mouse.current.y - mouse.target.y;

      mouse.offset.x = dx;
      mouse.offset.y = dy;

      setOffset({ x: dx, y: dy });

      setDirectionX(direction.current.x);
      setDirectionY(direction.current.y);

      requestAnimationFrame(update);
    };
    update();

    return () => cancelAnimationFrame(update);
  }, []);

  return (
    <div className="gallery01__main">
      <div ref={canvasRef} className="gallery01__canvasWrapper">
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
          {/* <OrbitControls
            enableZoom={true}
            enablePan={false}
            enableRotate={false}
          /> */}
          <Suspense fallback={<span>loading...</span>}>
            <Scene
              images={images}
              offset={offset}
              directionX={directionX}
              directionY={directionY}
            />
          </Suspense>
          {/* <Perf /> */}
        </Canvas>
      </div>
      <div className="gallery01__scrollable">
        <div className="gallery01__content">
          <header className="gallery01__header">
            <div className="gallery01__headerLeft">
              <a href="/gallery-01" className="gallery01__logoLink">
                <span className="gallery01__logo">Axel</span>
                <span className="gallery01__logo">Vanhessche</span>
              </a>
            </div>
            <div className="gallery01__header2">
              <span>Photographer from</span>
              <span>France based in Paris</span>
            </div>
            <div className="gallery01__header3">
              <span>Last Update</span>
              <span>Feb 2024</span>
            </div>
            <div className="gallery01__headerRight">
              <ul className="gallery01__nav">
                {NAV.map((item, idx) => (
                  <li key={idx} className="gallery01__navItem">
                    <a
                      href={`/gallery-01`}
                      className={[
                        "gallery01__navLink",
                        item === "Gallery" ? "gallery01__navLink--active" : "",
                      ].join(" ")}
                    >
                      <span>{item + (idx !== NAV.length - 1 ? "," : "")}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </header>
          <div className="gallery01__bgGrid">
            <img src={bgGrid} alt="" className="gallery01__bgGridImg" />
          </div>
          <div className="gallery01__grid">
            {IMAGES.map((img, index) => (
              <div key={index} className="gallery01__gridItem">
                <div className="gallery01__imgWrapper">
                  <img src={img} alt="" className="gallery01__img" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Gallery01;
