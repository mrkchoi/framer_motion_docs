import React, { useEffect, useRef } from "react";
import "./imagePreloader.css";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Lenis from "@studio-freight/lenis";

import img02 from "./images/02.jpeg";
import img03 from "./images/03.jpeg";
import img05 from "./images/05.jpeg";
import img06 from "./images/06.jpeg";
import img07 from "./images/07.jpeg";

export default function ImagePreloader() {
  const overlayRef = useRef(null);
  const imgRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      window.scrollTo(0, 0);
    });
    const lenis = new Lenis();

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }, []);

  useGSAP(() => {
    const timeline = gsap.timeline({ ease: "power3" });

    const { innerHeight, innerWidth } = window;
    const { left, top } = imgRef.current.getBoundingClientRect();
    const startLeft = innerWidth / 2;
    const startTop = innerHeight / 2;

    timeline.set(imgRef.current, {
      top: startTop - top,
      left: startLeft - left,
      scale: 1.5,
      translateX: "-50%",
      translateY: "-50%",
    });

    timeline
      .to(imgRef.current.children, {
        visibility: "visible",
        opacity: 1,
        stagger: 1,
        delay: 0.5,
      })
      .to(
        imgRef.current,
        {
          top: 0,
          left: 0,
          translateX: 0,
          translateY: 0,
          scale: 1,
          delay: 0.4,
          filter: `grayscale(0)`,
          duration: 1.2,
        },
        "+=.5",
      )
      .to(
        overlayRef.current,
        {
          opacity: 0,
          visibility: "none",
          duration: 1,
        },
        "-=.5",
      )
      .eventCallback("onComplete", () => {});
  });

  return (
    <div className="imagePreloader__main">
      <nav className="imagePreloader__nav">
        <span className="imagePreloader__logo">Image Preloader</span>
        <ul className="imagePreloader__list">
          <li>
            <a href="/" className="imagePreloader__item">
              Home
            </a>
          </li>
          <li>
            <a href="/" className="imagePreloader__item">
              About
            </a>
          </li>
          <li>
            <a href="/" className="imagePreloader__item">
              Contact
            </a>
          </li>
        </ul>
      </nav>
      <div ref={overlayRef} className="imagePreloader__overlay"></div>
      <div className="imagePreloader__hero">
        <h1 ref={textRef}>We specialize in turning shapes into motion</h1>
        <div ref={imgRef} className="imagePreloader__wrapper">
          <img src={img02} alt="" className="imagePreloader__img" />
          <img src={img03} alt="" className="imagePreloader__img" />
          <img src={img06} alt="" className="imagePreloader__img" />
          <img src={img07} alt="" className="imagePreloader__img" />
          <img src={img05} alt="" className="imagePreloader__img" />
        </div>
      </div>
    </div>
  );
}
