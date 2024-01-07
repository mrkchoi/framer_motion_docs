import { motion } from "framer-motion";

export default function Examples() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-around">
      <div className="flex min-h-screen w-full items-center justify-center bg-purple-400">
        <motion.div
          className="h-60 w-60 bg-white"
          animate={{
            scale: [1, 2, 2, 1, 1],
            rotate: [0, 0, 270, 270, 0],
            borderRadius: ["20%", "20%", "50%", "50%", "20%"],
          }}
          transition={{
            duration: 2,
            delay: 0.4,
            repeat: Infinity,
            repeatDelay: 0.4,
          }}
        ></motion.div>
      </div>
      <div className="flex min-h-screen w-full items-center justify-center bg-blue-200"></div>
    </div>
  );
}
