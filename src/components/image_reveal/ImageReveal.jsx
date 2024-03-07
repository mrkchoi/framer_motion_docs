import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import img from "./img.jpeg";
import "./imageReveal.css";
import Lenis from "@studio-freight/lenis";

const variants = {
  initial: {
    scaleY: 1,
  },
  animate: {
    scaleY: 0,
    transition: {
      duration: 0.75,
      ease: [0.63, -0.04, 0.45, 0.95],
    },
  },
  exit: {
    scaleY: 1,
    transition: {
      duration: 0.75,
      ease: [0.63, -0.04, 0.45, 0.95],
    },
  },
};

export default function ImageReveal() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const lenis = new Lenis();

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }, []);

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-around">
      <Image show={show} />
      <button onClick={() => setShow((s) => !s)}>Toggle</button>
    </div>
  );
}

function Image({ show }) {
  return (
    <div className="relative overflow-hidden">
      <img src={img} alt="" className="max-w-96" />
      <motion.div
        className="overlay absolute bottom-0 left-0 right-0 top-0 bg-[rgba(255,255,255,1)]"
        variants={variants}
        initial="initial"
        animate={show ? "animate" : "exit"}
      ></motion.div>
    </div>
  );
}
