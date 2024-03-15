import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import Scene from "./Scene";
import { OrthographicCamera } from "@react-three/drei";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import "./monopo.css";
import * as THREE from "three";

function Monopo() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const lenis = new Lenis();

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    window.scrollTo(0, 0);
  }, []);

  // useEffect(() => {
  //   if (isLoaded) {
  //     const tl = gsap.timeline();
  //     tl.from(
  //       [".monopo__num", ".monopo__title", ".monopo__subtitle", ".monopo__btn"],
  //       {
  //         y: 200,
  //         opacity: 0,
  //         duration: 1,
  //         delay: 0.5,
  //         stagger: 0.025,
  //       },
  //     );
  //   }
  // }, [isLoaded]);

  return (
    <div className="monopo__main">
      <div className="monopo__background"></div>
      <div className="monopo__canvasWrapper">
        <Canvas>
          <OrthographicCamera makeDefault position={[0, 0, 300]} zoom={1} />
          <Suspense fallback={<span>loading...</span>}>
            <Scene isLoaded={isLoaded} setIsLoaded={setIsLoaded} />
          </Suspense>
        </Canvas>
      </div>
      {/* <div className="monopo__section monopo__section1">
        <div className="monopo__sectionTop">
          <span className="monopo__num">01</span>
          <h1 className="monopo__title">monopo</h1>
        </div>
        <div className="monopo__sectionBottom">
          <p className="monopo__subtitle">
            The fireball that we rode was moving - But now we've got a new
            machine - They got music in the solar system
          </p>
          <button className="monopo__btn">Discover</button>
        </div>
      </div>
      <div className="monopo__section monopo__section2">
        <div className="monopo__sectionTop">
          <span className="monopo__num">02</span>
          <h1 className="monopo__title">Naos</h1>
        </div>
        <div className="monopo__sectionBottom">
          <p className="monopo__subtitle">
            Let me take you on a little trip - We're gonna travel faster than
            light - And you'll go anywhere you want to decide
          </p>
          <button className="monopo__btn">Discover</button>
        </div>
      </div>
      <div className="monopo__section monopo__section3">
        <div className="monopo__sectionTop">
          <span className="monopo__num">03</span>
          <h1 className="monopo__title">Chara</h1>
        </div>
        <div className="monopo__sectionBottom">
          <p className="monopo__subtitle">
            Close your eyes now - And give in to the night - Soar above the
            stars - Forget what's behind
          </p>
          <button className="monopo__btn">Discover</button>
        </div>
      </div>
      <div
        className={[
          "monopo__loadingWrapper",
          isLoaded ? "monopo__loaded" : "",
        ].join(" ")}
      >
        <span className="monopo__loadingDot"></span>
      </div> */}
    </div>
  );
}

export default Monopo;
