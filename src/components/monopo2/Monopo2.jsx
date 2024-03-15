import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import Scene from "./Scene";
import { OrthographicCamera, CubeCamera } from "@react-three/drei";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import "./monopo2.css";
import * as THREE from "three";

function Monopo2() {
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
    <div className="monopo2__main">
      <div className="monopo2__background"></div>
      <div className="monopo2__canvasWrapper">
        <Canvas>
          {/* <OrthographicCamera makeDefault position={[0, 0, 300]} zoom={1} /> */}
          {/* <perspectiveCamera
            makeDefault
            position={[0, 0, 10]}
            zoom={1}
            fov={75}
            aspect={window.innerWidth / window.innerHeight}
            near={0.01}
            far={1000}
          /> */}

          <Suspense fallback={<span>loading...</span>}>
            <Scene isLoaded={isLoaded} setIsLoaded={setIsLoaded} />
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
}

export default Monopo2;
