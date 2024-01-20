import React, { useEffect, useRef } from "react";
import "./textMask.css";
import { motion, useInView } from "framer-motion";
import Lenis from "@studio-freight/lenis";

const TEXT =
  "I'm a creative frontend developer and HH_began HH_my HH_career HH_in HH_web HH_and HH_front-end HH_development HH_in HH_2019. I transitioned into a creative role, driven by a passion for web design, UI/IX, branding, and mobile application projects.";

const variants = {
  initial: { y: "100%" },
  animate: (idx) => ({
    y: 0,
    transition: {
      duration: 0.5,
      delay: 0.02 * idx,
      // delay: 0.02 * Math.random() * Math.min(idx, 10),
      ease: [0.56, 0.14, 0.38, 1],
    },
  }),
  exit: { y: "100%" },
};

export default function TextMask() {
  useEffect(() => {
    const lenis = new Lenis();

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }, []);

  return (
    <div className="flex h-[500vh] w-screen flex-col items-center justify-around ">
      <Content />
      <Content />
      <Content />
      <Content />
      <Content />
    </div>
  );
}

// cubic-bezier(.56,.14,.38,1)
function Content() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-25%" });

  return (
    <div className="content max-w-[900px] text-5xl" ref={ref}>
      <h1 className="font-[300]">
        {TEXT.split(" ").map((word, idx) => {
          return <Word key={idx} word={word} idx={idx} isInView={isInView} />;
        })}
      </h1>
    </div>
  );
}

function Word({ word, idx, isInView }) {
  return (
    <div
      key={idx}
      className="word_wrap relative inline-block overflow-hidden py-1 text-black"
    >
      <motion.span
        className={[
          "word mx-1 inline-block",
          word.startsWith("HH_") ? "text-[#ff2f00]" : "",
        ].join(" ")}
        variants={variants}
        initial="initial"
        animate={isInView ? "animate" : ""}
        custom={idx}
      >
        {word.startsWith("HH_") ? word.slice(3) : word}
      </motion.span>
    </div>
  );
}
