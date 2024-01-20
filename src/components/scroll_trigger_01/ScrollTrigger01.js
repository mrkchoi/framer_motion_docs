import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Lenis from "@studio-freight/lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./scrollTrigger01.css";

export default function ScrollTrigger01() {
  const ref = useRef(null);

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
        trigger: ref.current,
        start: "-50% center",
        end: "200% center",
        scrub: false,
        markers: true,
        toggleActions: "play reverse play reverse",
      },
    });

    timeline.to(ref.current, {
      x: 800,
    });
  });

  return (
    <div className="scrollTrigger__body">
      <div className="scrollTrigger__spacer"></div>
      <div className="scrollTrigger__spacer">
        <div ref={ref} className="scrollTrigger__animatedElement">
          <h2>Animate me</h2>
          <p>
            This is a simple card with a title and a description. It will
            animate as we scroll.
          </p>
        </div>
      </div>
      <div className="scrollTrigger__spacer"></div>
    </div>
  );
}
