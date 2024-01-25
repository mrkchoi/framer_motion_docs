import React, { useEffect, useRef } from "react";

import "./scrollSvg.css";
import Lenis from "@studio-freight/lenis";

export default function ScrollSVG() {
  const pathRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis();

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = () => {
    const distance = window.scrollY;
    const svgHeight = document.querySelector(".scrollSvg__squiggle");
    const path = document.querySelector(".scrollSvg__squiggle path");
    const pathLength = path.getTotalLength();

    const totalDistance = svgHeight.clientHeight - window.innerHeight;
    const percentage = distance / totalDistance;

    path.style.opacity = 1;
    path.style.strokeDasharray = `${pathLength}`;
    path.style.strokeDashoffset = `${pathLength * (1 - percentage)}`;
  };

  return (
    <di>
      <svg
        width="1217"
        height="1869"
        viewBox="0 0 1217 1869"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="scrollSvg__squiggle"
      >
        <path
          ref={pathRef}
          d="M8 15.5C366 196 -15 344 169.5 529C298.847 658.697 573.5 621.459 573.5 461.5C573.5 396 519.5 255.5 383 321C246.5 386.5 403.203 574.198 350.5 761.5C301.585 935.337 86.5003 752.5 106 1154C125.5 1555.5 808.5 1175 489 1050C169.5 925 133 1834.5 1216 1852"
          stroke="#BC1F1F"
          strokeWidth="24"
          strokeLinecap="round"
        />
      </svg>
    </di>
  );
}
