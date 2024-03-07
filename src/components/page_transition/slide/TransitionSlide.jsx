import React from "react";
import { AnimatePresence, motion } from "framer-motion";

import Page from "./Page";

const perspective = {
  initial: { scale: 1, y: 0 },
  animate: { scale: 1, y: 0 },
  exit: {
    scale: 0.9,
    y: -150,
    opacity: 0.5,
    transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] },
  },
};

const anim = (variants) => {
  return {
    initial: "initial",
    animate: "animate",
    exit: "exit",
    variants,
  };
};

export default function TransitionSlide() {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        className="perspective"
        key="animateKey"
        {...anim(perspective)}
      >
        <motion.div className="opacity">
          <Page />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
