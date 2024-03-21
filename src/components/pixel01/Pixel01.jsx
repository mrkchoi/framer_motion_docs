import React from "react";
import { Suspense, useEffect, useState, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrthographicCamera } from "@react-three/drei";

import Scene from "./Scene";
import "./pixel01.css";

// import img01 from "./assets/images/zajno01.webp";
import img01 from "./assets/images/zajno01.png";
import img02 from "./assets/images/zajno02.webp";

// import { useControls } from "leva";

const ARTIST_DATA = [
  {
    id: "01",
    title: "Gemmy Woud-Binnendijk",
    src: img01,
  },
  {
    id: "02",
    title: "Bachelor Maxwell",
    src: img02,
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

function Pixel01() {
  const scrollableRef = useRef(null);
  const [images, setImages] = useState([]);
  const [targetScroll, setTargetScroll] = useState(0);
  const [actualScroll, setActualScroll] = useState(0);

  useEffect(() => {
    // get all images from DOM and set them to state for use in canvas scene
    const allImages = [...document.querySelectorAll(".pixel01__sectionImg")];
    setImages(allImages);
  }, []);

  useEffect(() => {
    const onMouseMove = (e) => {
      normalizedMouse.x = e.clientX / window.innerWidth;
      normalizedMouse.y = 1 - e.clientY / window.innerHeight;
      actualMouse.x = e.clientX;
      actualMouse.y = e.clientY;
      // console.log(mouse);
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
      setTargetScroll(target);
      setActualScroll(current);
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
    <div className="pixel01__main">
      <div className="pixel01__canvasWrapper">
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
          <Suspense fallback={<span>loading...</span>}>
            <Scene
              images={images}
              targetScroll={targetScroll}
              actualScroll={actualScroll}
              normalizedMouse={normalizedMouse}
              actualMouse={actualMouse}
            />
          </Suspense>
        </Canvas>
      </div>
      <div ref={scrollableRef} className="pixel01__scrollable">
        <header className="pixel01__headerWrapper">
          <div className="pixel01__headerLogoWrapper">
            <a href="/pixel01 pixel01__btnUnderline">
              <span className="pixel01__headerLogoSpan">
                zajno<span>©</span>
              </span>
            </a>
          </div>
          <div className="pixel01__headerDescriptionWrapper">
            <div className="pixel01__headerDescriptionRow">digital studio</div>
          </div>
          <div className="pixel01__headerLinksWrapper">
            <ul className="pixel01__headerNav">
              <li className="pixel01__headerNavItem">
                <a
                  className="pixel01__headerNavItemLink pixel01__btnUnderline"
                  href="/pixel01"
                >
                  work
                </a>
              </li>
              <li className="pixel01__headerNavItem">
                <a
                  className="pixel01__headerNavItemLink pixel01__btnUnderline"
                  href="/pixel01"
                >
                  studio
                </a>
              </li>
              <li className="pixel01__headerNavItem">
                <a
                  className="pixel01__headerNavItemLink pixel01__btnUnderline"
                  href="/pixel01"
                >
                  contact
                </a>
              </li>
            </ul>
          </div>
          <div className="pixel01__headerSocialWrapper">
            <ul className="pixel01__headerSocialLinks">
              <li className="pixel01__headerSocialItem">
                <a
                  className="pixel01__headerSocialItemLink pixel01__btnUnderline"
                  href="/pixel01"
                >
                  twitter
                </a>
              </li>
              <li className="pixel01__headerSocialItem">
                <a
                  className="pixel01__headerSocialItemLink pixel01__btnUnderline"
                  href="/pixel01"
                >
                  instagram
                </a>
              </li>
            </ul>
          </div>
          <div className="pixel01__headerLocationWrapper">
            <div className="pixel01__headerLocationRow">los angeles, ca</div>
          </div>
        </header>
        <div className="pixel01__section">
          <div className="pixel01__sectionImgWrapper">
            <img src={img01} alt="zajno" className="pixel01__sectionImg" />
          </div>
        </div>
        <div className="pixel01__section pixel01__section2">
          <div className="pixel01__sectionImgWrapper pixel01__sectionImgWrapper2">
            <img src={img02} alt="zajno" className="pixel01__sectionImg" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pixel01;
