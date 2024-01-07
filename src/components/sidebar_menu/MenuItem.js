import React from "react";
import { motion } from "framer-motion";

const colors = ["#FF008C", "#D309E1", "#9C1AFF", "#7700FF", "#4400FF"];

const variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

export default function MenuItem({ idx }) {
  const style = { border: `2px solid ${colors[idx]}` };

  return (
    <motion.li
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      variants={variants}
    >
      <div className="icon-placeholder" style={style}></div>
      <div className="text-placeholder" style={style}></div>
    </motion.li>
  );
}
