import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import img1 from "../../images/1.jpg";
import img2 from "../../images/2.jpg";
import img3 from "../../images/3.jpg";
const word = "with framer motion";

export default function Page() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });
  const sm = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const md = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const lg = useTransform(scrollYProgress, [0, 1], [0, -300]);

  const images = [
    { src: img1, y: 0 },
    { src: img2, y: lg },
    { src: img3, y: md },
  ];

  return (
    <div className="h-screen w-full" ref={container}>
      <div className="text mt-24">
        <motion.h1 className="text-6xl uppercase" style={{ y: sm }}>
          Parallax
        </motion.h1>
        <h1 className="text-6xl uppercase">Scroll</h1>
        <p className="mt-2">
          {word
            .toUpperCase()
            .split("")
            .map((letter, idx) => {
              return (
                <motion.span key={idx} className="text-4xl text-white">
                  {letter}
                </motion.span>
              );
            })}
        </p>
      </div>
      <div className="images relative mt-[5vh] flex w-full justify-center">
        {images.map(({ src, y }, idx) => {
          return (
            <motion.div
              key={idx}
              className="image_container absolute"
              style={{ y }}
            >
              <img src={src} alt="" />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
