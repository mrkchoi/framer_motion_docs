import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import Flip from "gsap/Flip";
import CustomEase from "gsap/CustomEase";
import { useGSAP } from "@gsap/react";
import Lenis from "@studio-freight/lenis";

import "./flip01.css";

import img1 from "./assets/img1.webp";
import img2 from "./assets/img2.webp";
import img3 from "./assets/img3.webp";
import img4 from "./assets/img4.webp";
import img5 from "./assets/img5.webp";
import img6 from "./assets/img6.png";
import img7 from "./assets/img7.webp";
import img8 from "./assets/img8.png";

gsap.registerPlugin(Flip);
gsap.registerPlugin(CustomEase);
CustomEase.create("cubic", "0.83, 0, 0.17, 1");

function Flip01() {
  const flipStateRef = useRef(null);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const lenis = new Lenis();

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  const handleClick = () => {
    setExpanded(!expanded);
    const state = Flip.getState(".flip01__img");
    const images = [...document.querySelectorAll(".flip01__img")];

    images.forEach((img) => {
      img.classList.toggle("reorder");
    });

    Flip.from(state, {
      duration: 1,
      ease: "cubic",
      stagger: 0.05,
      clearProps: "all",
    });
  };

  return (
    <div className="flip01__main">
      <button className="flip01__button" onClick={handleClick}>
        {expanded ? "Collapse" : "Expand"}
      </button>
      <div className={["flip01__container"].filter(Boolean).join(" ")}>
        <div className="flip01__imgWrapper">
          <img src={img1} alt="" className="flip01__img reorder" />
        </div>
        <div className="flip01__imgWrapper">
          <img src={img2} alt="" className="flip01__img reorder" />
        </div>
        <div className="flip01__imgWrapper">
          <img src={img3} alt="" className="flip01__img reorder" />
        </div>
        <div className="flip01__imgWrapper">
          <img src={img4} alt="" className="flip01__img reorder" />
        </div>
        <div className="flip01__imgWrapper">
          <img src={img5} alt="" className="flip01__img reorder" />
        </div>
        <div className="flip01__imgWrapper">
          <img src={img6} alt="" className="flip01__img reorder" />
        </div>
        <div className="flip01__imgWrapper">
          <img src={img7} alt="" className="flip01__img reorder" />
        </div>
        <div className="flip01__imgWrapper">
          <img src={img8} alt="" className="flip01__img reorder" />
        </div>
      </div>
    </div>
  );
}

export default Flip01;
