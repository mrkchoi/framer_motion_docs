import React, { useRef } from "react";
import gsap from "gsap";
import CustomEase from "gsap/CustomEase";

import "./florian.css";

function Florian() {
  CustomEase.create("florian_cubic", "0.76, 0, 0.24, 1");

  const handleMouseEnter = () => {
    const tl = gsap.timeline({ defaults: { ease: "florian_cubic" } });
    tl.to(
      ".florian__textWrapper1 .florian__textCharAnim",
      {
        duration: 0.4,
        transform: "translate3d(0, 0, 0)",
        stagger: 0.05,
      },
      "<",
    );
    tl.to(
      ".florian__textWrapper2 .florian__textCharAnim",
      {
        duration: 0.4,
        transform: "translate3d(0, 0, 0)",
        stagger: 0.1,
      },
      "<",
    );
    tl.to(
      ".florian__textWrapper2",
      {
        duration: 0.4,
        transform: "translate3d(0, 0, 0)",
      },
      "-=0.55",
    );
  };
  const handleMouseLeave = () => {
    const tl = gsap.timeline({ defaults: { ease: "florian_cubic" } });
    tl.to(
      ".florian__textWrapper1 .florian__textCharAnim",
      {
        duration: 0.4,
        transform: "translate3d(0, 100%, 0)",
        stagger: 0.05,
        reversed: true,
      },
      "<",
    );
    tl.to(
      ".florian__textWrapper2 .florian__textCharAnim",
      {
        duration: 0.4,
        transform: "translate3d(0, 100%, 0)",
        stagger: 0.1,
        reversed: true,
      },
      "<",
    );
    tl.to(
      ".florian__textWrapper2",
      {
        duration: 0.4,
        transform: "translate3d(-175%, 0, 0)",
      },
      "-=0.55",
    );
  };

  return (
    <div className="florian__main">
      <div
        className="florian__container"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="florian__textWrapper florian__textWrapper1">
          {"Kenneth".split("").map((char, idx) => (
            <span
              key={idx}
              className={[
                "florian__textChar",
                idx > 0 ? "florian__textCharAnim" : "",
              ].join(" ")}
            >
              {char}
            </span>
          ))}
        </div>
        <div className="florian__textWrapper florian__textWrapper2">
          {"Choi".split("").map((char, idx) => (
            <span
              key={idx}
              className={[
                "florian__textChar",
                idx > 0 ? "florian__textCharAnim" : "",
              ].join(" ")}
            >
              {char}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Florian;
