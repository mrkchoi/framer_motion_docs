import "../App.css";
import { motion } from "framer-motion";

export default function Stagger() {
  return (
    <div className="container mx-auto flex flex-col items-center">
      <motion.div
        className="relative mt-48"
        variants={bannerParent}
        initial="initial"
        animate="animate"
      >
        <Header title="Design" />
        <Header title="Experience" />
        <Header title="Studio" />
      </motion.div>
    </div>
  );
}

const bannerParent = {
  animate: {
    transition: {
      delay: 2,
      staggerChildren: 0.9,
    },
  },
};
const banner = {
  animate: {
    transition: {
      delayChildren: 0.4,
      staggerChildren: 0.1,
    },
  },
};

const letterAnimation = {
  initial: {
    y: 400,
  },
  animate: {
    y: 0,
    transition: {
      ease: [0.6, 0.01, 0.05, 0.95],
      duration: 1,
    },
  },
};

function Header({ title }) {
  return (
    <motion.div
      variants={banner}
      initial="initial"
      animate="animate"
      className="banner relative"
    >
      {title.split("").map((char, idx) => (
        <motion.span
          key={idx}
          className="banner-letter text-9xl font-bold"
          variants={letterAnimation}
        >
          {char}
        </motion.span>
      ))}
    </motion.div>
  );
}
