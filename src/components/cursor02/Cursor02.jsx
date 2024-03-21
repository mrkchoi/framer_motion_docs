import React from "react";
import { Suspense, useEffect, useState, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";

import Scene from "./Scene";
import "./cursor02.css";

import img01 from "./assets/images/gemmy.webp";
import img02 from "./assets/images/bachelor.webp";
import img03 from "./assets/images/asuka.webp";
import img04 from "./assets/images/dan.webp";
import img05 from "./assets/images/steampunk.webp";
import img06 from "./assets/images/glow.webp";
import img07 from "./assets/images/christian.webp";
import { useControls } from "leva";

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
  {
    id: "03",
    title: "Asuka Langley",
    src: img03,
  },
  {
    id: "04",
    title: "Dan J Wills",
    src: img04,
  },
  {
    id: "05",
    title: "Steampunk Concept",
    src: img05,
  },
  {
    id: "06",
    title: "Glow Concept",
    src: img06,
  },
  {
    id: "07",
    title: "Christian Tagliavini",
    src: img07,
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

// Reference for scroll distortion from Luis Bizarro: https://tympanus.net/codrops/2021/01/05/creating-an-infinite-auto-scrolling-gallery-using-webgl-with-ogl-and-glsl-shaders/
function Cursor02() {
  const scrollableRef = useRef(null);
  const [images, setImages] = useState([]);
  const [targetScroll, setTargetScroll] = useState(0);
  const [actualScroll, setActualScroll] = useState(0);
  const { scrollStrengthMultiplier } = useControls({
    scrollStrengthMultiplier: {
      value: 450,
      min: 0,
      max: 2000,
      step: 1,
    },
  });

  useEffect(() => {
    // get all images from DOM and set them to state for use in canvas scene
    const allImages = [...document.querySelectorAll(".cursor02__sectionImg")];
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
    <div className="cursor02__main">
      <div className="cursor02__canvasWrapper">
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

          {/* <OrthographicCamera
            makeDefault
            position={[0, 0, PERSPECTIVE]}
            zoom={1}
            fov={FOV}
            aspect={window.innerWidth / window.innerHeight}
            near={1}
            far={1000}
          /> */}
          <Suspense fallback={<span>loading...</span>}>
            <Scene
              images={images}
              targetScroll={targetScroll}
              actualScroll={actualScroll}
              normalizedMouse={normalizedMouse}
              actualMouse={actualMouse}
              scrollStrengthMultiplier={scrollStrengthMultiplier}
            />
          </Suspense>
        </Canvas>
      </div>
      <header className="cursor02__headerWrapper">
        <div className="cursor02__headerLogoWrapper">
          <a href="/cursor02">
            <span className="cursor02__headerLogoSpan">
              DE2 <span>©</span>
            </span>
            <span className="cursor02__headerLogoSpan">K24</span>
          </a>
        </div>
        <div className="cursor02__headerContactWrapper">
          <div className="cursor02__headerContactRow">
            Available for Freelance
          </div>
          <div className="cursor02__headerContactRow">
            <a className="cursor02__headerContactLink" href="/cursor02">
              designembraced@gmail.com
            </a>
          </div>
          <div className="cursor02__headerContactRow">
            <a className="cursor02__headerContactLink" href="/cursor02">
              +44 07749737297
            </a>
          </div>
        </div>
        <div className="cursor02__headerSkillWrapper">
          <div className="cursor02__headerSkillRow">Web Design UI IX</div>
          <div className="cursor02__headerSkillRow">
            Branding / Typeface Design
          </div>
          <div className="cursor02__headerSkillRow">Motion Design</div>
        </div>
        <div className="cursor02__headerSocialWrapper">
          <span className="cursor02__headerSocialSpan">Social:</span>
          <ul className="cursor02__headerSocialLinks">
            <li className="cursor02__headerSocialItem">
              <a className="cursor02__headerSocialItemLink" href="/cursor02">
                TW
              </a>
            </li>
            <li className="cursor02__headerSocialItem">
              <a className="cursor02__headerSocialItemLink" href="/cursor02">
                DR
              </a>
            </li>
            <li className="cursor02__headerSocialItem">
              <a className="cursor02__headerSocialItemLink" href="/cursor02">
                LI
              </a>
            </li>
          </ul>
        </div>
        <div className="cursor02__headerLinksWrapper">
          <ul className="cursor02__headerNav">
            <li className="cursor02__headerNavItem">
              <a className="cursor02__headerNavItemLink" href="/cursor02">
                Wrk
              </a>
            </li>
            <li className="cursor02__headerNavItem">
              <a className="cursor02__headerNavItemLink" href="/cursor02">
                Abt
              </a>
            </li>
          </ul>
        </div>
      </header>
      <div ref={scrollableRef} className="cursor02__scrollable">
        {[...ARTIST_DATA, ...ARTIST_DATA].map((artist, idx) => (
          <div key={idx} className="cursor02__section">
            <div className="cursor02__sectionImgWrapper">
              <img
                src={artist.src}
                alt={artist.title}
                className="cursor02__sectionImg"
              />
            </div>
            <div className="cursor02__sectionTitleWrapper">
              <h2 className="cursor02__sectionTitle">
                <span>PR.{artist.id}</span>
                <span>/07</span>
              </h2>
              <span className="cursor02__sectionSubtitle">{artist.title}</span>
            </div>
          </div>
        ))}
      </div>
      <footer className="cursor02__footerWrapper">
        <div className="cursor02__footerLeft">
          <span>© Design</span>
          <span>Embraced LTD</span>
        </div>
        <div className="cursor02__footerRight">
          <span>C-Nr. 07186749</span>
          <span>Dev. Perozzi</span>
        </div>
      </footer>
    </div>
  );
}

export default Cursor02;
