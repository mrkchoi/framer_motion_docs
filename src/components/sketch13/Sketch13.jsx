import React, { useEffect, useRef, useState } from "react";
import random from "canvas-sketch-util/random";
import math from "canvas-sketch-util/math";
import Color from "canvas-sketch-util/color";
import Lenis from "@studio-freight/lenis";
// import risoColors from "riso-colors";
import colormap from "colormap";

function Sketch13() {
  const canvasRef = useRef(null);
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const lenis = new Lenis();

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  useEffect(() => {
    const resize = () => {
      const side = Math.min(window.innerWidth, window.innerHeight) * 0.8;
      setDimensions({
        width: side,
        height: side,
      });

      canvasRef.current.width = side;
      canvasRef.current.height = side;
    };
    resize();

    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  useEffect(() => {
    /** @type {HTMLCanvasElement} */
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;

    const cols = 72;
    const rows = 8;
    const numCells = cols * rows;
    // grid
    const gridw = width * 0.8;
    const gridh = height * 0.8;
    // cell
    const cellw = gridw / cols;
    const cellh = gridh / rows;
    // margin
    const mx = (width - gridw) * 0.5;
    const my = (height - gridh) * 0.5;

    let x, y, noise, lineWidth, color;
    let frequency = 0.002;
    let amplitude = 90;

    const colors = colormap({
      colormap: "salinity",
      nshades: amplitude,
    });

    const points = [];

    for (let i = 0; i < numCells; i++) {
      x = (i % cols) * cellw;
      y = Math.floor(i / cols) * cellh;
      noise = random.noise2D(x, y, frequency, amplitude);

      lineWidth = math.mapRange(noise, -amplitude, amplitude, 1, 5);
      color =
        colors[
          Math.floor(math.mapRange(noise, -amplitude, amplitude, 0, amplitude))
        ];
      points.push(new Point({ x, y, lineWidth, color }));
    }

    const animate = (frame) => {
      context.fillStyle = "black";
      context.fillRect(0, 0, width, height);

      context.save();
      context.translate(mx, my);
      context.translate(cellw * 0.5, cellh * 0.5);

      context.strokeStyle = "red";
      context.lineWidth = 4;

      points.forEach((point) => {
        noise = random.noise2D(
          point.ix + frame * 0.05,
          point.iy,
          frequency,
          amplitude,
        );
        point.x = point.ix + noise;
        point.y = point.iy + noise;
      });

      let lastx, lasty;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols - 1; c++) {
          const cur = points[r * cols + c + 0];
          const next = points[r * cols + c + 1];

          const mx = cur.x + (next.x - cur.x) * 0.8;
          const my = cur.y + (next.y - cur.y) * 5.5;

          if (!c) {
            lastx = cur.x;
            lasty = cur.y;
          }
          context.beginPath();
          context.lineWidth = cur.lineWidth;
          context.strokeStyle = cur.color;
          context.moveTo(lastx, lasty);
          context.quadraticCurveTo(cur.x, cur.y, mx, my);

          context.stroke();

          lastx = mx - (c / cols) * 250;
          lasty = my - (r / rows) * 250;
        }
      }
      // points.forEach((point) => {
      //   point.draw(context);
      // });
      context.restore();

      requestAnimationFrame(animate);
    };
    animate(0);
  }, [dimensions]);

  return (
    <div className="flex h-screen w-[100%] items-center justify-center">
      <canvas
        ref={canvasRef}
        width={Math.min(window.innerWidth, window.innerHeight) * 0.8}
        height={Math.min(window.innerWidth, window.innerHeight) * 0.8}
        className="border"
      ></canvas>
    </div>
  );
}

class Point {
  constructor({ x, y, lineWidth, color }) {
    this.x = x;
    this.y = y;
    this.lineWidth = lineWidth;
    this.color = color;
    this.ix = x;
    this.iy = y;
  }

  draw(context) {
    /** @type {HTMLCanvasElement} */
    context.save();
    context.translate(this.x, this.y);
    context.fillStyle = "red";
    context.beginPath();
    context.arc(0, 0, 10, 0, Math.PI * 2);
    context.fill();
    context.restore();
  }
}

export default Sketch13;
