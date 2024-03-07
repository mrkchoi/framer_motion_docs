import React from "react";
import "./portfolio.css";
import { motion } from "framer-motion";
import img from "./portrait.jpg";

const underline = {
  initial: { scaleX: 0 },
  animate: {
    scaleX: 1,
    transition: { duration: 1.5, ease: [0.3, 0, 0.21, 1] },
  },
  exit: { scaleX: 0 },
};

const navItem = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: 0.5, ease: [0.3, 0, 0.21, 1] },
  },
  exit: { opacity: 0 },
};

const nav = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      duration: 1.5,
      staggerChildren: 0.25,
      delay: 0.25,
      ease: [0.3, 0, 0.21, 1],
    },
  },
};

export default function Portfolio() {
  return (
    <div className="h-screen w-screen">
      <motion.nav
        className="flex w-full justify-between p-6"
        variants={nav}
        initial="initial"
        animate="animate"
      >
        <motion.div className="navItem max-w-[200px]" variants={navItem}>
          <span className="block text-sm text-slate-600">Name</span>
          <span className="text-md block uppercase">
            Kenny Choi, 2024 GMT+6 (07:52AM, KZ)
          </span>
        </motion.div>
        <motion.div className="navItem max-w-[200px]" variants={navItem}>
          <span className="block text-sm text-slate-600">Status</span>
          <span className="text-md block uppercase">
            Currently available for freeance projects
          </span>
        </motion.div>
        <motion.div className="navItem max-w-[200px]" variants={navItem}>
          <span className="block text-sm text-slate-600">Sitemap</span>
          <span className="">
            Index, About, Projects [6], Services, Contact
          </span>
        </motion.div>
        <motion.div className="navItem max-w-[200px]" variants={navItem}>
          <span className="block text-sm text-slate-600">Let's connect</span>
          <span className="">
            Twitter, Instagram, Email, LinkedIn, Dribbble, Savee
          </span>
        </motion.div>
      </motion.nav>
      <motion.div
        className="navBorderBottom ml-6 mr-6 h-[1px] bg-black"
        variants={underline}
        initial="initial"
        animate="animate"
      ></motion.div>

      <div className="mainWrapper flex items-start justify-between gap-12 p-6">
        <Content />
        <div className="min-w-[20vw] py-1">
          <Image />
        </div>
      </div>
    </div>
  );
}

const imgVariant = {
  initial: {
    scaleY: 1,
  },
  animate: {
    scaleY: 0,
    transition: {
      duration: 1,
      ease: [0.63, -0.04, 0.45, 0.95],
      delay: 0.5,
    },
  },
  exit: {
    scaleY: 1,
    transition: {
      duration: 1,
      ease: [0.63, -0.04, 0.45, 0.95],
      delay: 0.5,
    },
  },
};

function Image({ show = true }) {
  return (
    <div className="relative overflow-hidden">
      <img src={img} alt="" className="" />
      <motion.div
        className="overlay absolute bottom-0 left-0 right-0 top-0 bg-[rgba(255,255,255,1)]"
        variants={imgVariant}
        initial="initial"
        animate={show ? "animate" : "exit"}
      ></motion.div>
    </div>
  );
}

const heroTextVariant = {
  initial: { y: "100%" },
  animate: (idx) => ({
    y: 0,
    transition: {
      duration: 0.4,
      delay: 0.5 + 0.02 * idx,
      // delay: 0.02 * Math.random() * Math.min(idx, 10),
    },
  }),
  exit: { y: "100%" },
};

const TEXT =
  "I'm a creative frontend developer and HH_began HH_my HH_career HH_in HH_web HH_and HH_front-end HH_development HH_in HH_2019. I transitioned into a creative role, driven by a passion for web design, UI/UX, branding, and mobile application projects.";

function Content() {
  return (
    <div className="content max-w-[900px] text-5xl">
      <h1 className="font-[300]">
        {TEXT.split(" ").map((word, idx) => {
          return <Word key={idx} word={word} idx={idx} />;
        })}
      </h1>
    </div>
  );
}

function Word({ word, idx }) {
  return (
    <motion.div
      key={idx}
      className="word_wrap relative inline-block overflow-hidden py-1 text-black"
    >
      <motion.span
        className={[
          "word mx-1 inline-block",
          word.startsWith("HH_") ? "text-[#ff2f00]" : "",
        ].join(" ")}
        variants={heroTextVariant}
        initial="initial"
        animate="animate"
        custom={idx}
      >
        {word.startsWith("HH_") ? word.slice(3) : word}
      </motion.span>
    </motion.div>
  );
}
