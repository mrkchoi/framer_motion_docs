import React, { useState } from "react";
import { disperse } from "./anim";
import { motion } from "framer-motion";
import "./textDisperse.css";

export default function TextDisperse() {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="relative flex h-screen w-screen items-center justify-center bg-black uppercase text-white antialiased">
      <div className="main flex cursor-default flex-col text-8xl">
        <div className="row flex justify-between gap-1">
          <span>Kenny</span>
          <span>Choi</span>
        </div>
        <div className="row flex justify-between gap-1">
          <span>Design</span>
          <span>&</span>
        </div>
        <div className="row flex justify-between gap-1">
          <span>Creative</span>
          <span>Dev</span>
        </div>
        <div className="row flex justify-between gap-1">
          <AnimatedText setIsActive={setIsActive}>
            <span className="cursor-pointer">+14082393088</span>
          </AnimatedText>
        </div>
        <div className="row flex justify-between gap-6">
          <AnimatedText setIsActive={setIsActive}>
            <span className="cursor-pointer">→Email</span>
          </AnimatedText>
          <AnimatedText setIsActive={setIsActive}>
            <span className="cursor-pointer">→Insta</span>
          </AnimatedText>
        </div>
      </div>
      <motion.div
        className="backgroundShade"
        animate={{
          opacity: isActive ? 0.8 : 0,
          transform: {
            duration: 0.75,
            ease: [0.33, 1, 0.68, 1],
          },
        }}
        transition={{ duration: 0.75, ease: [0.33, 1, 0.68, 1] }}
      ></motion.div>
    </div>
  );
}

function AnimatedText({ children, setIsActive }) {
  const [isAnimated, setIsAnimated] = useState(false);

  const getChars = (element) => {
    const words = element.props.children;
    return words.split("").map((char, idx) => (
      <motion.span
        key={idx}
        variants={disperse}
        custom={idx}
        animate={isAnimated ? "open" : "closed"}
        className="relative inline-block"
      >
        {char}
      </motion.span>
    ));
  };

  console.log("isAnimated: ", isAnimated);
  return (
    <div
      className="cursor-pointer"
      onMouseEnter={() => {
        setIsAnimated(true);
        setIsActive(true);
      }}
      onMouseLeave={() => {
        setIsAnimated(false);
        setIsActive(false);
      }}
    >
      {getChars(children)}
    </div>
  );
}
