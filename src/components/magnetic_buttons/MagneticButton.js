import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import "./magneticButton.css";

const lerp = (start, end, t) => {
  return start * (1 - t) + end * t;
};

const cursorSize = 15;

export default function MagneticButton() {
  const cursorRef = useRef(null);

  useGSAP(() => {
    gsap.set(cursorRef.current, {
      width: `${cursorSize}px`,
      height: `${cursorSize}px`,
      backgroundColor: "white",
    });
    const xTo = gsap.quickTo(cursorRef.current, "x", {
      duration: 0.2,
    });
    const yTo = gsap.quickTo(cursorRef.current, "y", {
      duration: 0.2,
    });

    const handleMouseMove = (e) => {
      xTo(e.pageX - cursorSize / 2);
      yTo(e.pageY - cursorSize / 2);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => window.removeEventListener("mousemove", handleMouseMove);
  });

  return (
    <div className="magneticButton__main">
      <div className="magneticButton__container">
        <div>
          <Magnetic>
            <button className="magneticButton__item">Magnetic Button</button>
          </Magnetic>
        </div>
      </div>
      <div className="magneticButton__cursorContainer">
        <div ref={cursorRef} className="magneticButton__cursor"></div>
      </div>
    </div>
  );
}

function Magnetic({ children }) {
  const magnetic = useRef(null);

  useGSAP(() => {
    const xTo = gsap.quickTo(magnetic.current, "x", {
      duration: 1,
      ease: "elastic.out(1, 0.3)",
    });
    const yTo = gsap.quickTo(magnetic.current, "y", {
      duration: 1,
      ease: "elastic.out(1, 0.3)",
    });

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { height, width, left, top } =
        magnetic.current.getBoundingClientRect();
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);
      xTo(x);
      yTo(y);
    };

    const handleMouseLeave = (e) => {
      xTo(0);
      yTo(0);
    };

    magnetic.current.addEventListener("mousemove", handleMouseMove);
    magnetic.current.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      magnetic.current.removeEventListener("mousemove", handleMouseMove);
      magnetic.current.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return React.cloneElement(children, { ref: magnetic });
}
