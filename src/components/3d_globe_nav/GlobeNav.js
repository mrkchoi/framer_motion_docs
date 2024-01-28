import React, { useEffect, useRef, useState } from "react";
import SmoothScroll from "../lenis/SmoothScroll";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";

import Projects from "./Projects";
import Earth from "./Earth";

import "./globeNav.css";

function GlobeNav() {
  const meshRef = useRef(null);

  useGSAP(() => {
    // meshRef is not loaded immediately resulting in gsap undefined target issue (setTImeout is temp fix)

    setTimeout(() => {
      gsap.registerPlugin(ScrollTrigger);

      gsap.to(meshRef?.current?.rotation, {
        y: 1,
        scrollTrigger: {
          scrub: true,
          trigger: ".globeNav__container",
          start: "start 90%",
          end: "bottom 10%",
          // markers: true,
          immediateRender: false,
        },
      });
    }, 1000);
  });

  return (
    <SmoothScroll>
      <div className="globeNav__main">
        <div className="globeNav__container">
          <Earth meshRef={meshRef} />
          <Projects />
        </div>
      </div>
    </SmoothScroll>
  );
}

export default GlobeNav;
