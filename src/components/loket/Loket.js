import React, { useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Lenis from "@studio-freight/lenis";
import { ScrollTrigger } from "gsap/all";

import img1 from "./assets/product-header-3.webp";

import "./loket.css";

function Loket() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis();

    function raf(time) {
      lenis.raf(time);
      ScrollTrigger.update();
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    gsap.set(".loket__char", { y: 40, opacity: 0, rotateX: 60, skewX: 10 });
    gsap.set(".loket__imgWrapper", {
      scale: 0.8,
      y: 50,
      opacity: 0,
      borderRadius: "100px",
    });
    gsap.set(".loket__img", { opacity: 0, yPercent: -40 });

    gsap.to(".loket__char", {
      y: 0,
      skewX: 0,
      opacity: 1,
      rotateX: 0,
      stagger: 0.02,
      duration: 0.5,
    });
    gsap.to([".loket__imgWrapper", ".loket__img"], {
      scale: 1,
      y: 0,
      borderRadius: "0px",
      duration: 0.5,
      opacity: 1,
    });

    gsap.to(".loket__img", {
      yPercent: 0,
      scrollTrigger: {
        trigger: ".loket__imgWrapper",
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  });

  return (
    <div className="loket__main">
      <header className="loket__header">
        <nav className="loket__nav">
          <span className="loket__logo">loket.design</span>
          <ul className="loket__navList">
            <li className="loket__navItem">Products</li>
            <li className="loket__navItem">Packaging</li>
          </ul>
        </nav>
      </header>
      <div className="loket__textWrapper">
        <span className="loket__char">P</span>
        <span className="loket__char">R</span>
        <span className="loket__char">O</span>
        <span className="loket__char">D</span>
        <span className="loket__char">U</span>
        <span className="loket__char">C</span>
        <span className="loket__char">T</span>
      </div>
      <div className="loket__imgWrapper">
        <img src={img1} alt="product" className="loket__img" />
      </div>
    </div>
  );
}

export default Loket;
