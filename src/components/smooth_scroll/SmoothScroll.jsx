import React, { useEffect, useState, useRef } from "react";
import "./smoothScroll.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Lenis from "@studio-freight/lenis";

import img0 from "./images/salar_de_atacama.jpg";
import img1 from "./images/valle_de_la_muerte.jpeg";
import img2 from "./images/miscani_lake.jpeg";
import img3 from "./images/miniques_lagoon.jpg";

export default function SmoothScrollLanding() {
  return (
    <main className="h-[300vh] w-screen bg-black">
      <Intro />
      <Description />
      <Projects />
    </main>
  );
}

function Intro() {
  const background = useRef(null);
  const introImage = useRef(null);
  const homeHeader = useRef(null);
  const heroTextRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis();

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }, []);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: document.documentElement,
        scrub: true,
        start: "top",
        end: "+=500px",
      },
    });

    timeline
      .from(background.current, { clipPath: "inset(15%)" })
      .to(introImage.current, { height: "200px", y: -100 }, 0)
      .to(heroTextRef.current, { y: -400 }, "<");
  });

  return (
    <div ref={homeHeader} className="homeHeader">
      <div ref={background} className="backgroundImage"></div>
      <div className="intro">
        <div
          ref={introImage}
          className="introImage"
          data-scroll
          data-scroll-speed="0.3"
        ></div>
        <h1 data-scroll data-scroll-speed="0.7" ref={heroTextRef}>
          Smooth Scroll
        </h1>
      </div>
    </div>
  );
}

const phrases = [
  "Los Flamencos National Reserve",
  "is a nature reserve located",
  "in the commune of San Pedro de Atacama",
  "The reserve covers a total area",
  "of 740 square kilometers (290 sq mi)",
];

function Description() {
  return (
    <div className="description">
      {phrases.map((phrase, idx) => {
        return <AnimatedText key={idx}>{phrase}</AnimatedText>;
      })}
    </div>
  );
}

function AnimatedText({ children }) {
  const textRef = useRef(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.from(textRef.current, {
      scrollTrigger: {
        trigger: textRef.current,
        scrub: true,
        start: "0px bottom",
        end: "bottom+=400px bottom",
      },
      opacity: 0,
      left: "-200px",
      ease: "power2.inOut",
    });
  });

  return <p ref={textRef}>{children}</p>;
}

const projects = [
  {
    title: "Salar de Atacama",
    src: img0,
  },
  {
    title: "Valle de la luna",
    src: img1,
  },
  {
    title: "Miscanti Lake",
    src: img2,
  },
  {
    title: "Miniques Lagoons",
    src: img3,
  },
];

function Projects() {
  const [selectedImage, setSelectedImage] = useState(0);
  const imageContainer = useRef(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    ScrollTrigger.create({
      trigger: imageContainer.current,
      pin: true,
      start: "top-=100px",
      end: document.body.offsetHeight - window.innerHeight - 50,
      markers: false,
    });
  });

  return (
    <div className="projects relative text-white">
      <div className="projectDescription">
        <div
          ref={imageContainer}
          className="imageContainer"
          style={{
            backgroundImage: `url(${projects[selectedImage].src})`,
          }}
        ></div>
        <div className="column">
          <p>
            The flora is characterized by the presence of high elevation
            wetland, as well as yellow straw, broom sedge, tola de agua and tola
            amaia.
          </p>
        </div>
        <div className="column">
          <p>
            Some, like the southern viscacha, vicuña and Darwins rhea, are
            classified as endangered species. Others, such as Andean goose,
            horned coot, Andean gull, puna tinamou and the three flamingo
            species inhabiting in Chile (Andean flamingo, Chilean flamingo, and
            Jamess flamingo) are considered vulnerable.
          </p>
        </div>
      </div>
      <div className="projectList">
        {projects.map((project, idx) => (
          <div
            key={idx}
            className="projectEl"
            onMouseOver={() => setSelectedImage(idx)}
          >
            <h2>{project.title}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}
