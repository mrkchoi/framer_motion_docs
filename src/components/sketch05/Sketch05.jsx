import React, { useEffect, useRef, useState } from "react";
import random from "canvas-sketch-util/random";
import math from "canvas-sketch-util/math";
import Lenis from "@studio-freight/lenis";

import "./sketch05.css";

const mouse = { x: 0, y: 0 };

function Sketch05() {
  const canvasRef = useRef(null);
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const resize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });

      canvasRef.current.width = Math.min(window.innerWidth, window.innerHeight);
      canvasRef.current.height = Math.min(
        window.innerWidth,
        window.innerHeight,
      );
    };
    resize();

    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);

    const cols = 20;
    const rows = 15;
    const numCells = cols * rows;

    const gridw = width - width / cols;
    const gridh = height - height / rows;

    const cellw = gridw / cols;
    const cellh = gridh / rows;

    const marginx = (width - gridw) * 0.5;
    const marginy = (height - gridh) * 0.5;

    let prev = Date.now();

    function animate() {
      // console.log("mouse", mouse);
      context.fillStyle = "white";
      context.fillRect(0, 0, width, height);

      let delta = Date.now() - prev;

      for (let i = 0; i < numCells; i++) {
        const col = i % cols;
        const row = Math.floor(i / cols);

        const x = col * cellw;
        const y = row * cellh;

        const w = cellw * 0.8;
        const h = cellh * 0.8;

        const noise = random.noise2D(x + delta * 0.1, y + delta * 0.15, 0.001);
        // const noise = random.noise3D(x, y, delta * 0.2, 0.001);
        const angle = noise * Math.PI * 0.2;
        // const scale = math.mapRange(noise, -1, 1, 1, 30);

        context.save();
        context.translate(x, y);
        context.translate(marginx, marginy);
        context.translate(cellw * 0.5, cellh * 0.5);
        context.rotate(angle);

        context.lineWidth = 1;
        context.lineCap = "square";

        context.beginPath();
        context.moveTo(w * 0.45, 0);
        context.lineTo(w * -0.45, 0);
        context.stroke();

        context.restore();
      }
      requestAnimationFrame(animate);
    }
    animate();
  }, [dimensions]);

  useEffect(() => {
    const lenis = new Lenis();

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="sketch05__canvasWrapper w-full border">
        <canvas
          // className="h-full w-full"
          ref={canvasRef}
          width={Math.min(window.innerWidth, window.innerHeight)}
          height={Math.min(window.innerWidth, window.innerHeight)}
        ></canvas>
      </div>
    </div>
  );
}

export default Sketch05;
