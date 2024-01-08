import React, { useState } from "react";
import { motion } from "framer-motion";

const spring = {
  type: "spring",
  stiffness: 700,
  damping: 30,
};

export default function Toggle() {
  const [isOn, setIsOn] = useState(false);

  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-tr from-slate-700 to-white">
      <div
        className="switch flex h-24 w-48 cursor-pointer items-center
      justify-start rounded-full bg-[rgba(255,255,255,.5)] p-4"
        onClick={() => setIsOn((s) => !s)}
        data-ison={isOn}
      >
        <motion.div
          className="toggle h-20 w-20 rounded-full bg-white"
          transition={spring}
          layout
        ></motion.div>
      </div>
    </div>
  );
}
