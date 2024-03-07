import React, { useRef } from "react";
import gsap from "gsap";

import jomor from "./images/jomor_design2.jpeg";
import grange from "./images/la_grange2.jpeg";
import huit from "./images/deux_huit_huit2.jpeg";
import nothing from "./images/nothing_design_studio2.png";
import mambo from "./images/mambo_mambo2.jpeg";

import "./gallerySlide.css";
import { useGSAP } from "@gsap/react";

const projects = [
  {
    title1: "Jomor",
    title2: "Design",
    src: jomor,
  },
  {
    title1: "La",
    title2: "Grange",
    src: grange,
  },
  {
    title1: "Deux Huit",
    title2: "Huit",
    src: huit,
  },
  {
    title1: "Nothing",
    title2: "Design Studio",
    src: nothing,
  },
  {
    title1: "Mambo",
    title2: "Mambo",
    src: mambo,
  },
];

export default function GallerySlide() {
  return (
    <div className="gallerySlide__main">
      <div className="gallerySlide__inner">
        <p className="gallerySlide__header">Featured Work</p>
        {projects.map((project, idx) => (
          <GalleryItem key={idx} project={project} />
        ))}
      </div>
    </div>
  );
}

function GalleryItem({ project }) {
  const imgRef = useRef(null);
  const tweenRef = useRef(null);

  useGSAP(() => {
    tweenRef.current = gsap
      .fromTo(
        imgRef.current,
        { width: 0, duration: 0.3, ease: "power2.inOut" },
        { width: "auto", duration: 0.3, ease: "power2.inOut" },
      )
      .pause();
  });

  return (
    <div
      className="gallerySlide__row"
      onMouseEnter={() => tweenRef.current.play()}
      onMouseLeave={() => tweenRef.current.reverse()}
    >
      <span className="gallerySlide__text">{project.title1}</span>
      <div ref={imgRef} className="gallerySlide__img--container">
        <img src={project.src} alt="" />
      </div>
      <span className="gallerySlide__text">{project.title2}</span>
    </div>
  );
}
