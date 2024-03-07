import React, { useEffect } from "react";

import "./gradient01.css";

function Gradient01() {
  // get the mouse x and y position
  //  as the mouse position changes, use gsap to update the linear gradient values

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = e.clientX;
      const y = e.clientY;

      const xPercent = (x / window.innerWidth) * 100;
      const yPercent = (y / window.innerHeight) * 100;

      document.querySelector(".gradient01__main").style.background =
        `linear-gradient(
          255deg, 
          rgb(250, 15, ${100 + yPercent}), 
          rgb(107, 114, 240) 30%, 
          rgb(${100 + xPercent}, 177, ${150 + yPercent * 0.25}) 65%, 
          rgb(255, 255, 255))`;
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return <div className="gradient01__main"></div>;
}

export default Gradient01;
