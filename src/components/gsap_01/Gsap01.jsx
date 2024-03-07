import React, { useEffect } from "react";
import gsap from "gsap";

import "./gsap01.css";

export default function Gsap01() {
  const position = { x: 0, y: 0 };

  useEffect(() => {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#aaa";

    function draw() {
      ctx.clearRect(0, 0, 300, 300);
      ctx.fillRect(position.x, position.y, 100, 100);
    }

    gsap.to(position, {
      x: 200,
      y: 200,
      duration: 2,
      onUpdate: draw,
      yoyo: true,
      repeat: -1,
      ease: "power1.inOut",
    });
  }, []);

  useEffect(() => {
    gsap.to(".gsap01__box", {
      rotation: 360,
      ease: "bounce.inOut",
      duration: 1,
      stagger: 0.1,
      opacity: 1,
    });
  }, []);

  const handleBoxClick = () => {
    gsap.to(".gsap01__box", {
      opacity: 0,
      y: -500,
      duration: 1,
      stagger: -0.1,
      ease: "power1.inOut",
    });
  };

  useEffect(() => {
    gsap.to(".gsap01__box2", {
      scale: 0.1,
      y: 60,
      ease: "power1.inOut",
      duration: 1,
      yoyo: true,
      repeat: -1,
      stagger: {
        each: 0.1,
        grid: "auto",
        from: "end",
        axis: null,
        ease: "power1.inOut",
      },
      opacity: 1,
    });
  }, []);

  useEffect(() => {
    const tl = gsap.timeline({
      repeat: -1,
      yoyo: true,
      defaults: { duration: 0.25, ease: "power2.inOut" },
    });
    tl.to(".gsap01__box3--red", {
      x: 200,
      scale: 1.5,
    });
    tl.to(".gsap01__box3--cyan", {
      x: 250,
      scale: 2,
    });
    tl.to(".gsap01__box3--turquoise", {
      x: 300,
      scale: 2.5,
    });
    tl.to(".gsap01__box3--container", {
      rotate: 720,
      duration: 1,
    });
  }, []);

  useEffect(() => {
    gsap.utils.toArray(".gsap01__box4").forEach((box) => {
      let tl = gsap.timeline({ paused: true });

      tl.to(box, {
        y: -50,
        opacity: 0,
      });

      box.addEventListener("mouseenter", () => {
        tl.timeScale(1).play();
      });
      box.addEventListener("mouseleave", () => {
        tl.timeScale(3).reverse();
      });
    });
  }, []);

  return (
    <>
      <div className="flex h-screen w-screen flex-col items-center justify-center">
        <canvas id="canvas" width={300} height={300}></canvas>
      </div>
      <div className="flex h-screen w-screen flex-row items-center justify-center gap-4">
        <div className="gsap01__box" onClick={handleBoxClick}></div>
        <div className="gsap01__box"></div>
        <div className="gsap01__box"></div>
        <div className="gsap01__box"></div>
        <div className="gsap01__box"></div>
        <div className="gsap01__box"></div>
        <div className="gsap01__box"></div>
      </div>
      <div className="flex h-screen w-screen flex-row items-center justify-center gap-4">
        <div className="flex max-w-[500px] flex-wrap gap-4">
          <div className="gsap01__box2"></div>
          <div className="gsap01__box2"></div>
          <div className="gsap01__box2"></div>
          <div className="gsap01__box2"></div>
          <div className="gsap01__box2"></div>
          <div className="gsap01__box2"></div>
          <div className="gsap01__box2"></div>
          <div className="gsap01__box2"></div>
          <div className="gsap01__box2"></div>
          <div className="gsap01__box2"></div>
          <div className="gsap01__box2"></div>
          <div className="gsap01__box2"></div>
          <div className="gsap01__box2"></div>
          <div className="gsap01__box2"></div>
          <div className="gsap01__box2"></div>
          <div className="gsap01__box2"></div>
          <div className="gsap01__box2"></div>
          <div className="gsap01__box2"></div>
          <div className="gsap01__box2"></div>
          <div className="gsap01__box2"></div>
          <div className="gsap01__box2"></div>
          <div className="gsap01__box2"></div>
          <div className="gsap01__box2"></div>
          <div className="gsap01__box2"></div>
          <div className="gsap01__box2"></div>
          <div className="gsap01__box2"></div>
          <div className="gsap01__box2"></div>
          <div className="gsap01__box2"></div>
          <div className="gsap01__box2"></div>
          <div className="gsap01__box2"></div>
          <div className="gsap01__box2"></div>
          <div className="gsap01__box2"></div>
          <div className="gsap01__box2"></div>
          <div className="gsap01__box2"></div>
          <div className="gsap01__box2"></div>
        </div>
      </div>
      <div className="flex h-screen w-screen flex-row items-center justify-center gap-4">
        <div className="gsap01__box3--container flex flex-col gap-4">
          <div
            className="gsap01__box3 gsap01__box3--red"
            style={{ backgroundColor: "red" }}
          ></div>
          <div
            className="gsap01__box3 gsap01__box3--cyan"
            style={{ backgroundColor: "cyan" }}
          ></div>
          <div
            className="gsap01__box3 gsap01__box3--turquoise"
            style={{ backgroundColor: "turquoise" }}
          ></div>
        </div>
      </div>
      <div className="flex h-screen w-screen flex-row items-center justify-center gap-4">
        <div className="flex h-[400px] w-[600px] items-center justify-around bg-black">
          <div className="gsap01__box4 h-[200px] w-[100px] bg-white"></div>
          <div className="gsap01__box4 h-[200px] w-[100px] bg-white"></div>
          <div className="gsap01__box4 h-[200px] w-[100px] bg-white"></div>
        </div>
      </div>
    </>
  );
}
