import React from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";

const list = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delay: 0.5, when: "beforeChildren" },
  },
};
const item = {
  initial: {
    x: -100,
    opacity: 0,
  },
  animate: {
    x: 0,
    opacity: 1,
  },
};

export default function Intro() {
  const x = useMotionValue(0);
  const opacity = useTransform(x, [-100, 0, 100], [0, 1, 0]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-around">
      <div className="h-screen">
        <motion.div
          initial={{ x: 100, rotate: "21deg" }}
          animate={{ x: 0, rotate: "0deg" }}
          transition={{
            duration: 1,
            delay: 1,
          }}
          className="h-60 w-60 rounded-lg bg-cyan-300"
        ></motion.div>
      </div>
      <div className="h-screen">
        <motion.div
          className="h-60 w-60 rounded-lg bg-red-300"
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 1.1 }}
          drag="x"
          dragConstraints={{ left: -100, right: 100 }}
        ></motion.div>
      </div>
      <div className="h-screen">
        <motion.ul variants={list} initial="initial" animate="animate">
          <motion.li
            className="h-60 w-60 rounded-lg bg-orange-300"
            variants={item}
          ></motion.li>
          <motion.li
            className="h-60 w-60 rounded-lg bg-orange-400"
            variants={item}
          ></motion.li>
          <motion.li
            className="h-60 w-60 rounded-lg bg-orange-500"
            variants={item}
          ></motion.li>
        </motion.ul>
      </div>
      <div className="h-screen">
        <motion.div
          className="h-60 w-60 rounded-lg bg-gray-300"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        ></motion.div>
      </div>
      <div className="h-screen">
        <motion.div
          className="h-60 w-60 rounded-lg bg-pink-300"
          style={{ x, opacity }}
          drag="x"
          dragConstraints={{ left: -100, right: 100 }}
        ></motion.div>
      </div>
      <div className="h-screen">
        <button
          onClick={() => animate(".box", { opacity: 0 })}
          className="m-1 border-2 bg-cyan-50 p-2"
        >
          Make me disappear
        </button>
        <button
          onClick={() => animate(".box", { opacity: 1 })}
          className="m-1 border-2 bg-cyan-50 p-2"
        >
          Make me reappear
        </button>
        <motion.div className="box h-60 w-60 rounded-lg bg-yellow-300"></motion.div>
      </div>
    </div>
  );
}
