import React from "react";
import { Suspense, useEffect, useState, useRef } from "react";
import { Canvas, addEffect } from "@react-three/fiber";
import { OrthographicCamera, PerspectiveCamera } from "@react-three/drei";

import Scene from "./Scene";
import "./cursor01.css";

import img01 from "./assets/images/gemmy.webp";
import img02 from "./assets/images/bachelor.webp";
import img03 from "./assets/images/asuka.webp";
import img04 from "./assets/images/dan.webp";
import img05 from "./assets/images/steampunk.webp";
import img06 from "./assets/images/glow.webp";
import img07 from "./assets/images/christian.webp";

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
function Cursor01() {
  const scrollableRef = useRef(null);
  const [images, setImages] = useState([]);
  const [targetScroll, setTargetScroll] = useState(0);
  const [actualScroll, setActualScroll] = useState(0);

  useEffect(() => {
    // get all images from DOM and set them to state for use in canvas scene
    const allImages = [...document.querySelectorAll(".cursor01__sectionImg")];
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
    <div className="cursor01__main">
      <div className="cursor01__canvasWrapper">
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
            />
          </Suspense>
        </Canvas>
      </div>
      <header className="cursor01__headerWrapper">
        <div className="cursor01__headerLogoWrapper">
          <a href="/cursor01">
            <span className="cursor01__headerLogoSpan">
              DE2 <span>©</span>
            </span>
            <span className="cursor01__headerLogoSpan">K24</span>
          </a>
        </div>
        <div className="cursor01__headerContactWrapper">
          <div className="cursor01__headerContactRow">
            Available for Freelance
          </div>
          <div className="cursor01__headerContactRow">
            <a className="cursor01__headerContactLink" href="/cursor01">
              designembraced@gmail.com
            </a>
          </div>
          <div className="cursor01__headerContactRow">
            <a className="cursor01__headerContactLink" href="/cursor01">
              +44 07749737297
            </a>
          </div>
        </div>
        <div className="cursor01__headerSkillWrapper">
          <div className="cursor01__headerSkillRow">Web Design UI IX</div>
          <div className="cursor01__headerSkillRow">
            Branding / Typeface Design
          </div>
          <div className="cursor01__headerSkillRow">Motion Design</div>
        </div>
        <div className="cursor01__headerSocialWrapper">
          <span className="cursor01__headerSocialSpan">Social:</span>
          <ul className="cursor01__headerSocialLinks">
            <li className="cursor01__headerSocialItem">
              <a className="cursor01__headerSocialItemLink" href="/cursor01">
                TW
              </a>
            </li>
            <li className="cursor01__headerSocialItem">
              <a className="cursor01__headerSocialItemLink" href="/cursor01">
                DR
              </a>
            </li>
            <li className="cursor01__headerSocialItem">
              <a className="cursor01__headerSocialItemLink" href="/cursor01">
                LI
              </a>
            </li>
          </ul>
        </div>
        <div className="cursor01__headerLinksWrapper">
          <ul className="cursor01__headerNav">
            <li className="cursor01__headerNavItem">
              <a className="cursor01__headerNavItemLink" href="/cursor01">
                Wrk
              </a>
            </li>
            <li className="cursor01__headerNavItem">
              <a className="cursor01__headerNavItemLink" href="/cursor01">
                Abt
              </a>
            </li>
          </ul>
        </div>
      </header>
      <div ref={scrollableRef} className="cursor01__scrollable">
        {ARTIST_DATA.map((artist, idx) => (
          <div key={idx} className="cursor01__section">
            <div className="cursor01__sectionImgWrapper">
              <img
                src={artist.src}
                alt={artist.title}
                className="cursor01__sectionImg"
              />
            </div>
            <div className="cursor01__sectionTitleWrapper">
              <h2 className="cursor01__sectionTitle">
                <span>PR.{artist.id}</span>
                <span>/07</span>
              </h2>
              <span className="cursor01__sectionSubtitle">{artist.title}</span>
            </div>
          </div>
        ))}
      </div>
      <footer className="cursor01__footerWrapper">
        <div className="cursor01__footerLeft">
          <span>© Design</span>
          <span>Embraced LTD</span>
        </div>
        <div className="cursor01__footerRight">
          <span>C-Nr. 07186749</span>
          <span>Dev. Perozzi</span>
        </div>
      </footer>
    </div>
  );
}

export default Cursor01;
