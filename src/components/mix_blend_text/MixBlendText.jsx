import React, { useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";
import "./mixBlendText.css";
import img from "./89cf477127bd6ca55418b2.webp";
import img2 from "./a88197f9c33e22cb290306.webp";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";

export default function MixBlendText() {
  const textRef = useRef(null);

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

    gsap.set(textRef.current, {
      y: 200,
    });
    gsap.to(textRef.current, {
      scrollTrigger: {
        trigger: textRef.current,
        scrub: true,
        start: "start 90%",
        end: "start 10%",
      },
      y: -200,
    });
  });

  return (
    <div className="mixBlend__main">
      <section className="mixBlend__spacer"></section>
      <img src={img} alt="" className="mixBlend__img" />
      <div ref={textRef} className="mixBlend__text--wrapper">
        <span className="mixBlend__text">
          A superior, supreme, super-natural thing.
        </span>
      </div>
    </div>
  );
}
