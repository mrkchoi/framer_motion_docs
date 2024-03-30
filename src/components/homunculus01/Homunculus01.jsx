// Reference: https://zajno.com/

import React from "react";
import { Suspense, useEffect, useState, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import {
  OrthographicCamera,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";
import { Leva } from "leva";
import gsap from "gsap";

import "./homunculus01.css";

import logo from "./assets/images/logo.png";
import img01 from "./assets/images/img01.jpeg";
import img02 from "./assets/images/img02.jpeg";
import img03 from "./assets/images/img03.jpeg";
import img04 from "./assets/images/img04.jpeg";
import img05 from "./assets/images/img05.jpeg";
import img06 from "./assets/images/img06.jpeg";

import Scene from "./Scene";

const PROJECT_DATA = [
  {
    title: "Kibounoakari",
    subtitle: "",
    src: img01,
  },
  {
    title: "P.I.C.S.",
    subtitle: "OFFICIAL Website",
    src: img02,
  },
  {
    title: "CITIZEN",
    subtitle: "LIGHT is Time",
    src: img03,
  },
  {
    title: "LIBERTY LONDON",
    subtitle: "Special Contents",
    src: img04,
  },
  {
    title: "TAO TAJIMA",
    subtitle: "OFFICIAL Website",
    src: img05,
  },
  {
    title: "DeNA",
    subtitle: "fontgraphy",
    src: img06,
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

function Homunculus01() {
  const scrollableRef = useRef(null);
  const [images, setImages] = useState([]);

  useEffect(() => {
    // get all images from DOM and set them to state for use in canvas scene
    const allImages = [...document.querySelectorAll(".homunculus01__Img")];
    setImages(allImages);
  }, []);

  // SMOOTH SCROLL SYNC SETUP
  useEffect(() => {
    // UPDATE SCROLLABLE CONTAINER Y POSITION IN ANIMATION LOOP
    const smoothScroll = () => {
      target = window.scrollY;
      current = lerp(current, target, ease);
      if (scrollableRef.current) {
        scrollableRef.current.style.transform = `
        translate3d(0, -${current}px, 0)
        `;
        document.body.style.height = `${
          scrollableRef.current.getBoundingClientRect().height
        }px`;
      }
      requestAnimationFrame(smoothScroll);
    };
    smoothScroll();

    return () => {
      cancelAnimationFrame(smoothScroll);
      document.body.style.height = "";
    };
  }, []);

  return (
    <div className="homunculus01__main">
      <div className="homunculus01__canvasWrapper">
        <Canvas>
          <PerspectiveCamera
            makeDefault
            position={[0, 0, PERSPECTIVE]}
            zoom={1}
            fov={FOV}
            aspect={window.innerWidth / window.innerHeight}
            near={0.01}
            far={3000}
          />
          {/* <color attach="background" args={["#000"]} /> */}
          <Suspense fallback={<span>loading...</span>}>
            <Scene images={images} />
          </Suspense>
        </Canvas>
        {/* <Leva collapsed={true} /> */}
      </div>
      <header className="homunculus01__header">
        <div className="homunculus01__logoWrapper">
          <img className="homunculus01__logo" src={logo} alt="logo" />
        </div>
        <div className="homunculus01__nav">
          <a href="/homunculus01" className="homunculus01__navLink">
            Contact
          </a>
          <span>/</span>
          <a href="/homunculus01" className="homunculus01__navLink">
            FB
          </a>
          <span>/</span>
          <a href="/homunculus01" className="homunculus01__navLink">
            TW
          </a>
        </div>
      </header>
      <section ref={scrollableRef} className="homunculus01__scrollable">
        <div className="homunculus01__section homunculus01__projects">
          <div className="homunculus01__projectsHeader">
            <h2 className="homunculus01__projectsTitle">Projects</h2>
          </div>
          <div className="homunculus01__projectsGridWrapper">
            <div className="homunculus01__projectsGrid">
              {PROJECT_DATA.map((data, index) => (
                <div key={index} className="homunculus01__project">
                  <div className="homunculus01__ImgWrapper">
                    <img
                      className="homunculus01__Img"
                      src={data.src}
                      alt={`project ${index}`}
                    />
                  </div>
                  <div className="homunculus01__projectInfo">
                    <h3 className="homunculus01__projectTitle">{data.title}</h3>
                    <p className="homunculus01__projectSubtitle">
                      {data.subtitle}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Homunculus01;
