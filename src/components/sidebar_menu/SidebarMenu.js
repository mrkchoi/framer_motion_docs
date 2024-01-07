import React, { useRef } from "react";
import { MenuToggle } from "./MenuToggle";
import { useDimensions } from "./useDimensions";
import { motion, useCycle } from "framer-motion";
import Navigation from "./Navigation";

// Reference: https://www.framer.com/motion/examples/

const sidebar = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2,
    },
  }),
  closed: {
    clipPath: "circle(30px at 40px 40px)",
    transition: {
      delay: 0.5,
      type: "string",
      stiffness: 400,
      damping: 40,
    },
  },
};

export default function SidebarMenu() {
  const [isOpen, toggleOpen] = useCycle(false, true);
  const containerRef = useRef(null);
  const { height } = useDimensions(containerRef);

  return (
    <div className="min-h-screen w-full bg-purple-400">
      <motion.nav
        initial={false}
        animate={isOpen ? "open" : "closed"}
        ref={containerRef}
        custom={height}
      >
        <motion.div className="background" variants={sidebar}></motion.div>
        <Navigation />
        <MenuToggle toggle={() => toggleOpen()} />
      </motion.nav>
    </div>
  );
}
