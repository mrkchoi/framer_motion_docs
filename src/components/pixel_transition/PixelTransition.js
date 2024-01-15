import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "./pixelTransition.css";

export default function PixelTransition() {
  const [open, setOpen] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const handleResize = () => {
      const { innerWidth, innerHeight } = window;
      setDimensions({ width: innerWidth, height: innerHeight });
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="relative flex h-screen w-screen">
      <div className="menu__btn absolute right-4 top-4">
        <button
          className="relative z-20 rounded-xl border-2 px-6 py-2 transition-all duration-150 hover:bg-slate-100 active:bg-slate-200"
          onClick={() => setOpen((s) => !s)}
        >
          {open ? "close" : "open"}
        </button>
      </div>
      {dimensions.height > 0 && (
        <CenteredPixelTransition open={open} dimensions={dimensions} />
        // <HorizontalPixelTransition open={open} dimensions={dimensions} />
        // <VerticalPixelTransition open={open} dimensions={dimensions} />
      )}
      <Nav open={open} />
    </div>
  );
}

function CenteredPixelTransition({ open, dimensions }) {
  const variants = {
    initial: {
      opacity: 0,
    },
    animate: (idx) => ({
      opacity: 1,
      transition: { duration: 0, delay: 0.03 * idx },
    }),
    exit: (idx) => ({
      opacity: 0,
      transition: { duration: 0, delay: 0.03 * idx },
    }),
  };

  const shuffle = (arr) => {
    let output = [...arr];
    for (let i = 0; i < output.length; i++) {
      let randomIdx = Math.floor(Math.random() * (i + 1));
      [output[i], output[randomIdx]] = [output[randomIdx], output[i]];
    }
    return output;
  };

  const getRow = () => {
    const { height, width } = dimensions;
    const blockSize = width * 0.05;
    const numBlocks = Math.ceil(height / blockSize);
    const shuffledIndices = shuffle([
      ...Array.from({ length: numBlocks }).map((_, i) => i),
    ]);
    return shuffledIndices.map((randomIdx, idx) => (
      <motion.div
        className="block"
        key={idx}
        variants={variants}
        initial="initial"
        animate={open ? "animate" : "exit"}
        custom={randomIdx}
      ></motion.div>
    ));
  };

  return (
    <div className="pixelBg relative z-10 h-screen w-screen">
      {Array.from({ length: 20 }).map((_, col) => (
        <div key={col} className="blockCol">
          {getRow()}
        </div>
      ))}
    </div>
  );
}

function HorizontalPixelTransition({ open, dimensions }) {
  const variants = {
    initial: {
      opacity: 0,
    },
    animate: (idx) => ({
      opacity: 1,
      transition: { duration: 0, delay: 0.03 * idx[1] },
    }),
    exit: (idx) => ({
      opacity: 0,
      transition: { duration: 0, delay: 0.03 * idx[0] },
    }),
  };

  const shuffle = (arr) => {
    let output = [...arr];
    for (let i = 0; i < output.length; i++) {
      let randomIdx = Math.floor(Math.random() * (i + 1));
      [output[i], output[randomIdx]] = [output[randomIdx], output[i]];
    }
    return output;
  };

  const getRow = (colIdx) => {
    const { height, width } = dimensions;
    const blockSize = width * 0.05;
    const numBlocks = Math.ceil(height / blockSize);
    const shuffledIndices = shuffle([
      ...Array.from({ length: numBlocks }).map((_, i) => i),
    ]);
    return shuffledIndices.map((randomIdx, idx) => (
      <motion.div
        className="block"
        key={idx}
        variants={variants}
        initial="initial"
        animate={open ? "animate" : "exit"}
        custom={[colIdx + randomIdx, 20 - colIdx + randomIdx]}
      ></motion.div>
    ));
  };

  return (
    <div className="pixelBg relative z-10 h-screen w-screen">
      {Array.from({ length: 20 }).map((_, colIdx) => (
        <div key={colIdx} className="blockCol">
          {getRow(colIdx)}
        </div>
      ))}
    </div>
  );
}

function VerticalPixelTransition({ open, dimensions }) {
  const variants = {
    initial: {
      opacity: 0,
    },
    animate: (idx) => ({
      opacity: 1,
      transition: { duration: 0, delay: 0.03 * idx[1] },
    }),
    exit: (idx) => ({
      opacity: 0,
      transition: { duration: 0, delay: 0.03 * idx[0] },
    }),
  };

  const shuffle = (arr) => {
    let output = [...arr];
    for (let i = 0; i < output.length; i++) {
      let randomIdx = Math.floor(Math.random() * (i + 1));
      [output[i], output[randomIdx]] = [output[randomIdx], output[i]];
    }
    return output;
  };

  const getRow = () => {
    const { height, width } = dimensions;
    const blockSize = width * 0.05;
    const numBlocks = Math.ceil(height / blockSize);
    const shuffledIndices = shuffle([
      ...Array.from({ length: numBlocks }).map((_, i) => i),
    ]);
    return shuffledIndices.map((randomIdx, idx) => (
      <motion.div
        className="block"
        key={idx}
        variants={variants}
        initial="initial"
        animate={open ? "animate" : "exit"}
        custom={[randomIdx + idx, 20 - randomIdx - idx]}
      ></motion.div>
    ));
  };

  return (
    <div className="pixelBg relative z-10 h-screen w-screen">
      {Array.from({ length: 20 }).map((_, colIdx) => (
        <div key={colIdx} className="blockCol">
          {getRow()}
        </div>
      ))}
    </div>
  );
}

function Nav({ open }) {
  const listVariant = {
    animate: {
      opacity: 1,
      transition: {
        delay: 0.5,
      },
    },
    exit: {
      opacity: 0,
      trnasition: {
        delay: 0.5,
      },
    },
  };

  return (
    <div className="menu__nav fixed left-[50%] top-[50%] z-20 translate-x-[-50%] translate-y-[-50%]">
      <motion.ul
        className="text-center text-4xl font-bold"
        variants={listVariant}
        initial={false}
        animate={open ? "animate" : "exit"}
      >
        <li>
          <a
            href="/"
            className="underline decoration-transparent transition-all duration-150 hover:decoration-black"
          >
            Home
          </a>
        </li>
        <li>
          <a
            href="/"
            className="underline decoration-transparent transition-all duration-150 hover:decoration-black"
          >
            About
          </a>
        </li>
        <li>
          <a
            href="/"
            className="underline decoration-transparent transition-all duration-150 hover:decoration-black"
          >
            Works
          </a>
        </li>
        <li>
          <a
            href="/"
            className="underline decoration-transparent transition-all duration-150 hover:decoration-black"
          >
            Contact
          </a>
        </li>
      </motion.ul>
    </div>
  );
}
