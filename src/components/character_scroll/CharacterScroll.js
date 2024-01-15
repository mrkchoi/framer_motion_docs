import React, { useEffect, useRef } from "react";
import "./characterScroll.css";
import { motion, useScroll, useTransform } from "framer-motion";
import Lenis from "@studio-freight/lenis";

const sentence =
  "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consequuntur sed dolorem aut sint maiores ut fugit aliquid repellendus neque ipsa!";

export default function CharacterScroll() {
  useEffect(() => {
    const lenis = new Lenis();

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  return (
    <div className="flex h-[600vh] w-screen flex-col justify-around bg-black">
      <ParagraphScroll />
      <WordScroll />
      <CharScroll />
    </div>
  );
}

function CharScroll() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start .9", "start .4"],
  });

  const chars = sentence.split("");
  return (
    <p
      className="flex max-w-[1100px] flex-wrap p-8 text-6xl text-white"
      ref={container}
    >
      {chars.map((char, idx) => {
        const start = idx / chars.length;
        const end = start + 1 / chars.length;

        return (
          <Char key={idx} range={[start, end]} progress={scrollYProgress}>
            {char}
          </Char>
        );
      })}
    </p>
  );
}

function Char({ children, range, progress }) {
  const opacity = useTransform(progress, range, [0, 1]);
  return (
    <span className="relative whitespace-pre">
      <span className="absolute opacity-20">{children}</span>
      <motion.span style={{ opacity }}>{children}</motion.span>
    </span>
  );
}

function WordScroll() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start .9", "start .4"],
  });

  const words = sentence.split(" ");
  return (
    <p
      className="flex max-w-[1100px] flex-wrap p-8 text-6xl text-white"
      ref={container}
    >
      {words.map((word, idx) => {
        const start = idx / words.length;
        const end = start + 1 / words.length;

        return (
          <Word
            key={idx}
            range={[start, end]}
            progress={scrollYProgress}
            word={word}
          >
            {word}
          </Word>
        );
      })}
    </p>
  );
}

function Word({ children, range, progress }) {
  const opacity = useTransform(progress, range, [0, 1]);

  return (
    <span className="relative ml-[0.4rem] mr-[0.4rem] inline-block">
      <span className="absolute opacity-20">{children}</span>
      <motion.span style={{ opacity }}>{children}</motion.span>
    </span>
  );
}

function ParagraphScroll() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start .8", "start .2"],
  });

  return (
    <motion.p
      ref={container}
      className="relative max-w-[1100px] p-8 text-6xl text-white"
      style={{ opacity: scrollYProgress }}
    >
      {sentence}
    </motion.p>
  );
}
