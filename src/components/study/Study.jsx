import React, { useRef } from "react";
import gsap from "gsap";
import "./study.css";
import { useGSAP } from "@gsap/react";

const CURSOR_SIZE = 60;

function Study() {
  const cursorRef = useRef(null);

  useGSAP(() => {
    gsap.set(cursorRef.current, {
      width: `${CURSOR_SIZE}px`,
      height: `${CURSOR_SIZE}px`,
      scale: 0.5,
      // backgroundColor: "transparent",
      opacity: 0,
    });
    const xTo = gsap.quickTo(cursorRef.current, "x", {
      duration: 0.4,
    });
    const yTo = gsap.quickTo(cursorRef.current, "y", {
      duration: 0.4,
    });

    const handleMouseMove = (e) => {
      xTo(e.pageX - CURSOR_SIZE / 2);
      yTo(e.pageY - CURSOR_SIZE / 2);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => window.removeEventListener("mousemove", handleMouseMove);
  });

  return (
    <div className="study__main">
      <div className="study__wrapper">
        <button
          className="study__btn"
          onMouseEnter={() => {
            gsap.to(cursorRef.current, {
              duration: 0.2,
              opacity: 1,
              scale: 1,
            });
          }}
          onMouseLeave={() => {
            gsap.to(cursorRef.current, {
              duration: 0.1,
              opacity: 0,
              scale: 0.5,
            });
          }}
        >
          <span className="study__text">READ THE STUDY</span>
          <span className="study__arrowWrapper">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
              className="study__arrowSvg study__arrowSvg1"
            >
              <path
                fillRule="evenodd"
                d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"
              />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
              className="study__arrowSvg study__arrowSvg2"
            >
              <path
                fillRule="evenodd"
                d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"
              />
            </svg>
          </span>
        </button>
        <div ref={cursorRef} className="study__circle"></div>
      </div>
    </div>
  );
}

export default Study;
