import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import Scene from "./Scene";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import "./logma.css";

function Logma() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const lenis = new Lenis();

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      const tl = gsap.timeline();
      tl.from(
        [".logma__num", ".logma__title", ".logma__subtitle", ".logma__btn"],
        {
          y: 200,
          opacity: 0,
          duration: 1,
          delay: 0.5,
          stagger: 0.025,
        },
      );
    }
  }, [isLoaded]);

  return (
    <div className="logma__main">
      <div className="logma__background"></div>
      <div className="logma__canvasWrapper">
        <Canvas camera={{ position: [0, 0, 4] }}>
          <Suspense fallback={<span>loading...</span>}>
            <Scene isLoaded={isLoaded} setIsLoaded={setIsLoaded} />
          </Suspense>
        </Canvas>
      </div>
      <div className="logma__section logma__section1">
        <div className="logma__sectionTop">
          <span className="logma__num">01</span>
          <h1 className="logma__title">Logma</h1>
        </div>
        <div className="logma__sectionBottom">
          <p className="logma__subtitle">
            The fireball that we rode was moving - But now we've got a new
            machine - They got music in the solar system
          </p>
          <button className="logma__btn">Discover</button>
        </div>
      </div>
      <div className="logma__section logma__section2">
        <div className="logma__sectionTop">
          <span className="logma__num">02</span>
          <h1 className="logma__title">Naos</h1>
        </div>
        <div className="logma__sectionBottom">
          <p className="logma__subtitle">
            Let me take you on a little trip - We're gonna travel faster than
            light - And you'll go anywhere you want to decide
          </p>
          <button className="logma__btn">Discover</button>
        </div>
      </div>
      <div className="logma__section logma__section3">
        <div className="logma__sectionTop">
          <span className="logma__num">03</span>
          <h1 className="logma__title">Chara</h1>
        </div>
        <div className="logma__sectionBottom">
          <p className="logma__subtitle">
            Close your eyes now - And give in to the night - Soar above the
            stars - Forget what's behind
          </p>
          <button className="logma__btn">Discover</button>
        </div>
      </div>
      <div
        className={[
          "logma__loadingWrapper",
          isLoaded ? "logma__loaded" : "",
        ].join(" ")}
      >
        <span className="logma__loadingDot"></span>
      </div>
    </div>
  );
}

export default Logma;
