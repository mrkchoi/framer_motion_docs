import React, { useEffect, useRef, useState } from "react";
import random from "canvas-sketch-util/random";
import math from "canvas-sketch-util/math";
import Color from "canvas-sketch-util/color";
import Lenis from "@studio-freight/lenis";
// import risoColors from "riso-colors";

class Point {
  constructor({ x, y, control = false }) {
    this.x = x;
    this.y = y;
    this.control = control;
    this.isDragging = false;
  }

  draw(context) {
    /** @type {HTMLCanvasElement} */
    context.save();
    context.translate(this.x, this.y);
    context.fillStyle = this.control ? "red" : "black";
    context.beginPath();
    context.arc(0, 0, 10, 0, Math.PI * 2);
    context.fill();
    context.restore();
  }

  hitTest(x, y) {
    const dx = this.x - x;
    const dy = this.y - y;
    return Math.sqrt(dx * dx + dy * dy) < 20;
  }
}

const mouse = { x: 0, y: 0 };
const points = [
  new Point({ x: 200, y: 540 }),
  new Point({ x: 400, y: 300, control: true }),
  new Point({ x: 600, y: 540 }),
];

function Sketch11() {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
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
      setDimensions({
        width: Math.min(window.innerWidth, window.innerHeight) * 0.8,
        height: Math.min(window.innerWidth, window.innerHeight) * 0.8,
      });

      canvasRef.current.width =
        Math.min(window.innerWidth, window.innerHeight) * 0.8;
      canvasRef.current.height =
        Math.min(window.innerWidth, window.innerHeight) * 0.8;
      cancelAnimationFrame(animationRef.current);
    };
    resize();

    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  useEffect(() => {
    const handleMouseDown = (e) => {
      // attach event listener for mousemove to record current mouse position
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);

      const x = e.clientX - canvasRef.current.getBoundingClientRect().left;
      const y = e.clientY - canvasRef.current.getBoundingClientRect().top;

      points.forEach((point) => {
        point.isDragging = point.hitTest(x, y);
      });
    };
    const handleMouseMove = (e) => {
      const x = e.clientX - canvasRef.current.getBoundingClientRect().left;
      const y = e.clientY - canvasRef.current.getBoundingClientRect().top;

      points.forEach((point) => {
        if (point.isDragging) {
          point.x = x;
          point.y = y;
        }
      });
    };
    const handleMouseUp = (e) => {
      // remove event listener for mousemove
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };

    // window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    return () => {
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  useEffect(() => {
    /** @type {HTMLCanvasElement} */
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;

    const animate = () => {
      context.fillStyle = "white";
      context.fillRect(0, 0, width, height);

      context.beginPath();
      context.moveTo(points[0].x, points[0].y);
      context.quadraticCurveTo(
        points[1].x,
        points[1].y,
        points[2].x,
        points[2].y,
      );
      context.stroke();

      points.forEach((point) => {
        point.draw(context);
      });
      requestAnimationFrame(animate);
    };
    animate();
  }, [dimensions]);

  return (
    <div className="flex h-screen w-[100%] items-center justify-center">
      <canvas
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight}
        className="border"
      ></canvas>
    </div>
  );
}

export default Sketch11;
