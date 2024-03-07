import { useEffect } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

function SmoothCursor({ cursorSize = 20, color = "black" }) {
  // const smoothCursorColor = `bg-${color}`;

  const mouse = {
    x: useMotionValue(0),
    y: useMotionValue(0),
  };

  const smoothMouse = {
    x: useSpring(mouse.x, { stiffness: 300, damping: 30, mass: 0.5 }),
    y: useSpring(mouse.y, { stiffness: 300, damping: 30, mass: 0.5 }),
  };

  const manageMouseMove = (e) => {
    const { clientX, clientY } = e;
    mouse.x.set(clientX - cursorSize / 2);
    mouse.y.set(clientY - cursorSize / 2);
  };

  useEffect(() => {
    window.addEventListener("mousemove", manageMouseMove);
    return () => window.removeEventListener("mousemove", manageMouseMove);
  }, []);

  return (
    <motion.div
      className={"fixed left-0 top-0 h-[20px] w-[20px] rounded-full bg-black"}
      style={{ left: smoothMouse.x, top: smoothMouse.y }}
    ></motion.div>
  );
}

export default SmoothCursor;
