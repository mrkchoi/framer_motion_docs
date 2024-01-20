import React, { useEffect, useState, useRef } from "react";
import "./preloader01.css";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import image from "./preloader01.jpeg";

const heroText = "flav.";

export default function Preloader01() {
  const [countdown, setCountdown] = useState(0);

  const timeoutRef = useRef(null);
  const timelineRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis();

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    setCountdown(0);
    let currentCount = 0;
    const updateCounter = () => {
      if (currentCount >= 100) {
        setCountdown(100);
        currentCount = 100;
        timelineRef.current.play();
        return;
      }

      const increment = Math.min(
        Math.floor(Math.random() * 10) + 1,
        100 - currentCount,
      );
      const delay = Math.floor(Math.random() * 200) + 100;

      currentCount += increment;
      setCountdown((s) => s + increment);

      timeoutRef.current = setTimeout(updateCounter, delay);
    };
    updateCounter();

    return () => clearTimeout(timeoutRef.current);
  }, []);

  useGSAP(() => {
    const timeline = gsap.timeline({
      defaults: {
        duration: 2,
        ease: "power3.inOut",
      },
    });
    timelineRef.current = timeline;

    timeline.set(
      [".preloader01__hero--letter", ".preloader01__img--container"],
      { y: 300 },
    );
    timeline.pause();

    timeline
      .to(".preloader01__countdown", { opacity: 0 })
      .to(".preloader01__overlay--item", { y: "-100%", stagger: 0.05 }, "<")
      .to(
        ".preloader01__hero--letter",
        { y: 0, stagger: 0.05, duration: 1 },
        "-=1.5",
      )
      .to(".preloader01__img--container", { y: 0 }, "-=1.75");

    //   gsap.registerPlugin(ScrollTrigger);

    // const parallaxTimeline = gsap.timeline({ trigger:, scrollTrigger: { scrub: true } });
  });

  return (
    <div className="preloader01__main">
      <div className="preloader01__header">
        <div className="preloader01__header--left">
          <ul>
            <li>
              <a href="/" className="preloader01__header--item">
                About
              </a>
            </li>
            <li>
              <a href="/" className="preloader01__header--item">
                Contact
              </a>
            </li>
          </ul>
        </div>
        <div className="preloader01__header--right">
          <ul>
            <li>
              <a href="/" className="preloader01__header--item">
                Playground
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="preloader01__hero--container">
        <h1 className="preloader01__hero--content">
          {heroText.split("").map((letter, idx) => (
            <span key={idx} className="preloader01__hero--letter">
              {letter}
            </span>
          ))}
        </h1>
      </div>
      <div className="preloader01__img--container">
        <img src={image} alt="" className="preloader01__img" />
      </div>
      <div className="preloader01__overlay--wrapper">
        <div className="preloader01__overlay">
          <div className="preloader01__overlay--item"></div>
          <div className="preloader01__overlay--item"></div>
          <div className="preloader01__overlay--item"></div>
          <div className="preloader01__overlay--item"></div>
          <div className="preloader01__overlay--item"></div>
          <div className="preloader01__overlay--item"></div>
          <div className="preloader01__overlay--item"></div>
          <div className="preloader01__overlay--item"></div>
          <div className="preloader01__overlay--item"></div>
          <div className="preloader01__overlay--item"></div>
        </div>
        <div className="preloader01__countdown--container">
          <span className="preloader01__countdown">{countdown}</span>
        </div>
      </div>
    </div>
  );
}
