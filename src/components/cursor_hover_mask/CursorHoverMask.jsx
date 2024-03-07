import React, { useState } from "react";
import { useCursor } from "./useCursor";
import { motion } from "framer-motion";

import "./cursorHoverMask.css";

export default function CursorHoverMask() {
  const [isHovered, setIsHovered] = useState(false);
  const { x, y } = useCursor();

  const size = isHovered ? 400 : 40;

  // console.log("x: ", x, " y: ", y);
  // console.log("size: ", size);

  return (
    <div className="mainContainer">
      <motion.div
        className="maskLayerContainer"
        animate={{
          WebkitMaskPosition: `${x - size / 2}px ${y - size / 2}px`,
          WebkitMaskSize: `${size}px`,
        }}
        transition={{ type: "tween", ease: "backOut", duration: 0.5 }}
      >
        <p
          className="maskLayerContent"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          A visual designer - with skills that haven't been replaced by A.I
          (yet) - making good shit only if the paycheck is equally good.
        </p>
      </motion.div>
      <div className="topLayerContainer">
        <p className="topLayerContent">
          I'm a <span>selectively skilled</span> product designer with strong
          focus on producing high quality & impactful digital experience.
        </p>
      </div>
    </div>
  );
}
