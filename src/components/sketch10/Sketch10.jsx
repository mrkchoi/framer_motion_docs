import React, { useEffect, useRef, useState } from "react";
import random from "canvas-sketch-util/random";
import math from "canvas-sketch-util/math";
import Color from "canvas-sketch-util/color";
import Lenis from "@studio-freight/lenis";
import risoColors from "riso-colors";

const mouse = { x: 0, y: 0 };

function Sketch10() {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [rects, setRects] = useState([]);

  useEffect(() => {
    const lenis = new Lenis();

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const canvasBounds = canvasRef.current.getBoundingClientRect();
      mouse.x = e.clientX - canvasBounds.left;
      mouse.y = e.clientY - canvasBounds.top;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
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
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;
    const num = 40;
    const rectColors = [
      random.pick(risoColors),
      random.pick(risoColors),
      // random.pick(risoColors),
    ];
    const bgColor = random.pick(risoColors).hex;

    if (!rects.length) {
      let newRects = [];
      for (let i = 0; i < num; i++) {
        let x = random.range(0, width);
        let y = random.range(0, height);
        let w = random.range(600, width);
        let h = random.range(40, 200);
        let fill = random.pick(rectColors).hex;
        let stroke = random.pick(rectColors).hex;
        newRects.push({ x, y, w, h, fill, stroke });
      }
      setRects(newRects);
    }

    context.fillStyle = bgColor;
    context.fillRect(0, 0, width, height);

    context.save();
    context.translate(width * 0.5, height * 0.57);
    context.beginPath();
    context.moveTo(0, -300);
    context.lineTo(300, 200);
    context.lineTo(-300, 200);
    context.closePath();
    context.lineWidth = 20;
    context.strokeStyle = rectColors[0].hex;
    context.stroke();
    context.restore();

    context.clip();

    rects.forEach(({ x, y, w, h, fill, stroke }) => {
      context.save();
      context.translate(x, y);

      drawSkewedRect({
        context,
        w,
        h,
        degrees: -30,
        fill,
        stroke,
      });
    });
  }, [dimensions, rects]);

  const drawSkewedRect = ({
    context,
    w = 600,
    h = 200,
    degrees = -45,
    fill,
    stroke,
  }) => {
    const angle = math.degToRad(degrees);
    const rx = Math.cos(angle) * w;
    const ry = Math.sin(angle) * w;
    context.strokeStyle = stroke;
    context.fillStyle = fill;
    context.translate(-rx * 0.5, (ry + h) * -0.5);

    context.beginPath();
    context.moveTo(0, 0);
    context.lineTo(rx, ry);
    context.lineTo(rx, ry + h);
    context.lineTo(0, h);
    context.closePath();

    let shadowColor = Color.offsetHSL(fill, 0, 0, -20);
    shadowColor[3] = 0.5;
    context.shadowColor = Color.style(shadowColor.rgba);
    context.shadowOffsetX = -10;
    context.shadowOffsetY = 20;

    context.fill();
    context.stroke();

    context.globalCompositeOperation =
      random.value() > 0.5 ? "overlay" : "source-over";
    context.lineWidth = 2;
    context.strokeStyle = "black";
    context.stroke();

    context.shadowColor = null;

    context.restore();
  };

  const drawPolygon = ({ context, radius = 100, sides = 3 }) => {
    const slice = (Math.PI * 2) / sides;
    context.beginPath();
    context.moveTo(0, radius);
    for (let i = 1; i < sides; i++) {
      const angle = slice * i;
      const x = Math.sin(angle) * radius;
      const y = Math.cos(angle) * radius;
      context.lineTo(x, y);
    }
    context.closePath();
  };

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

export default Sketch10;
