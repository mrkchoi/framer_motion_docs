import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Lenis from "@studio-freight/lenis";
import LottieScrollTrigger from "./LottieScrollTrigger";

import "./raxo.css";

function Raxo() {
  const videoRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    const lenis = new Lenis();

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    const animation = LottieScrollTrigger({
      target: ".raxo__container",
      path: "./lottie/Creativity_is_animation.json",
      // path: "https://assets.codepen.io/35984/tapered_hello.json",
      // speed: "medium",
      scrub: 1,
    });

    return () => animation.destroy();
  });

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      gsap.set(videoRef.current, {
        y: 0,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: videoRef.current,
          start: "top 90%",
          end: "bottom 80%",
          // markers: true,
          scrub: 1,
        },
      });

      tl.to(videoRef.current, {
        duration: 1,
        y: "-65vh",
      });
    },
    {
      scope: videoRef.current,
    },
  );

  return (
    <div className="raxo__main">
      <div className="raxo__container"></div>
      <div className="raxo__videoWrapper">
        <video
          ref={videoRef}
          preload="auto"
          width="2000"
          height="2000"
          className="raxo__video"
          src="https://cms.raxo.co/wp-content/uploads/2023/12/Reel_Web_Rx_23_home_LOOP.mp4"
          autoPlay={true}
          playsInline={true}
          loop={true}
          muted={true}
        ></video>
      </div>
    </div>
  );
}

export default Raxo;
