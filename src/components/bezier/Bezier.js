import React, { useEffect, useRef } from "react";

import "./bezier.css";

function Bezier() {
  const pathRef = useRef(null);
  let progress = 0;
  let x = 0.5;
  let reqId = null;
  let time = Math.PI / 2;

  useEffect(() => {
    setPath(progress);
    window.addEventListener("resize", () => setPath(progress));
    return () => {
      window.removeEventListener("resize", () => setPath(progress));
      resetAnimation();
    };
  }, []);

  const setPath = (progress) => {
    const width = window.innerWidth * 0.7;
    if (!pathRef.current) return;
    pathRef.current.setAttributeNS(
      null,
      "d",
      `M0 150 Q${width * x} ${150 + progress}, ${width} 150`,
    );
  };

  const animateIn = () => {
    if (reqId) {
      cancelAnimationFrame(reqId);
      time = Math.PI / 2;
    }
    setPath(progress);
    reqId = requestAnimationFrame(animateIn);
  };

  const manageMouseMove = (e) => {
    const { movementY } = e;
    const box = e.target.getBoundingClientRect();
    x = (e.clientX - box.left) / box.width;
    progress += movementY;
  };

  const resetAnimation = () => {
    cancelAnimationFrame(reqId);
    animateOut();
  };

  const lerp = (start, end, t) => start * (1 - t) + end * t;

  const animateOut = () => {
    let newProgress = progress * Math.sin(time);
    setPath(newProgress);
    time += 0.2;
    progress = lerp(progress, 0, 0.05);
    if (Math.abs(progress) > 0.5) {
      reqId = requestAnimationFrame(animateOut);
    } else {
      progress = 0;
      time = Math.PI / 2;
    }
  };

  return (
    <div className="bezier__main">
      <div className="bezier__container">
        <div className="bezier__lineWrapper">
          <span
            className="bezier__lineBox"
            onMouseEnter={() => animateIn()}
            onMouseLeave={() => resetAnimation()}
            onMouseMove={(e) => manageMouseMove(e)}
          ></span>
          <svg className="bezier__svg">
            <path ref={pathRef}></path>
          </svg>
        </div>
        <div className="bezier__contentWrapper">
          <div className="bezier__contentRow">
            <div className="bezier__contentLeft">
              <span>Smart Development</span>
            </div>
            <div className="bezier__contentRight">
              <p>
                Combining unique design and rich technology, we build digital
                products exactly as they were designed, without shortcuts or
                simplifications.
              </p>
            </div>
          </div>
          <div className="bezier__contentRow">
            <div className="bezier__contentLeft">
              <span>Areas</span>
            </div>
            <div className="bezier__contentRight bezier__contentTagWrapper">
              <span className="bezier__contentTag">E-commerce</span>
              <span className="bezier__contentTag">Finance</span>
              <span className="bezier__contentTag">Education</span>
              <span className="bezier__contentTag">Social</span>
              <span className="bezier__contentTag">Entertainment</span>
              <span className="bezier__contentTag">Medical</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Bezier;
