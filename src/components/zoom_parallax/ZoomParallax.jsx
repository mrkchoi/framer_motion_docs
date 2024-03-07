import React, { useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";
import { motion, useScroll, useTransform } from "framer-motion";
import picture2 from "../../images/zoom-parallax/2.jpeg";
import picture3 from "../../images/zoom-parallax/3.jpg";
import picture4 from "../../images/zoom-parallax/4.jpg";
import picture5 from "../../images/zoom-parallax/5.jpg";
import picture6 from "../../images/zoom-parallax/6.jpg";
import picture7 from "../../images/zoom-parallax/7.jpeg";

export default function ZoomParallax() {
  const container = useRef(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  const scale4 = useTransform(scrollYProgress, [0, 1], [1, 4]);
  const scale6 = useTransform(scrollYProgress, [0, 1], [1, 6]);
  const scale8 = useTransform(scrollYProgress, [0, 1], [1, 8]);
  // console.log("🚀 ~ scale:", scale);

  useEffect(() => {
    const lenis = new Lenis();

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  return (
    <div className="bg-black pb-[100vh] pt-[50vh]">
      <div
        className="parent relative h-[400vh] bg-gradient-to-t from-white to-black"
        ref={container}
      >
        <div className="sticky top-0 h-[100vh] overflow-hidden">
          <motion.div
            className="el absolute top-0 flex h-[100%] w-[100%] items-center justify-center"
            style={{ scale: scale8 }}
          >
            <img
              src={picture6}
              alt=""
              className="relative left-[17vw] top-[28vh] h-[25vh] w-[auto]"
            />
          </motion.div>
          <motion.div
            className="el absolute top-0 flex h-[100%] w-[100%] items-center justify-center"
            style={{ scale: scale8 }}
          >
            <img
              src={picture2}
              alt=""
              className="relative bottom-[30vh] left-[1vw] h-[28vh] w-[auto]"
            />
          </motion.div>
          <motion.div
            className="el absolute top-0 flex h-[100%] w-[100%] items-center justify-center"
            style={{ scale: scale6 }}
          >
            <img
              src={picture4}
              alt=""
              className="relative right-[13vw] top-[28vh] h-[25vh] w-[auto]"
            />
          </motion.div>
          <motion.div
            className="el absolute top-0 flex h-[100%] w-[100%] items-center justify-center"
            style={{ scale: scale8 }}
          >
            <img
              src={picture3}
              alt=""
              className="relative right-[25vw] top-[-2.5vh] h-[30vh] w-[auto]"
            />
          </motion.div>
          <motion.div
            className="el absolute top-0 flex h-[100%] w-[100%] items-center justify-center"
            style={{ scale: scale6 }}
          >
            <img
              src={picture5}
              alt=""
              className="relative bottom-[2.5vw] left-[27vw] h-[30vh] w-[auto]"
            />
          </motion.div>
          <motion.div
            className="el absolute top-0 flex h-[100%] w-[100%] items-center justify-center"
            style={{ scale: scale4 }}
          >
            <div className="imgContainer relative h-[25vh] w-[25vw] bg-zoom-parallax bg-cover"></div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
