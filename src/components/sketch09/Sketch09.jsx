import React, { useEffect, useRef, useState } from "react";
// import random from "canvas-sketch-util/random";
import math from "canvas-sketch-util/math";
import Lenis from "@studio-freight/lenis";

const mouse = { x: 0, y: 0 };

function Sketch09() {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [text, setText] = useState("A");
  const [fontSize, setFontSize] = useState(1000);
  const [fontFamily, setFontFamily] = useState("serif");

  useEffect(() => {
    const lenis = new Lenis();

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  // useEffect(() => {
  //   const handleMouseMove = (e) => {
  //     const canvasBounds = canvasRef.current.getBoundingClientRect();
  //     mouse.x = e.clientX - canvasBounds.left;
  //     mouse.y = e.clientY - canvasBounds.top;
  //   };

  //   window.addEventListener("mousemove", handleMouseMove);
  //   return () => window.removeEventListener("mousemove", handleMouseMove);
  // }, []);

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
    const onKeyUp = (e) => {
      setText(e.key.toUpperCase());
    };

    // const url = "https://picsum.photos/200";
    // const loadImage = async (url) => {
    //   const image = new Image();
    //   image.src = url;
    //   image.onload = () => {
    //     const canvas = canvasRef.current;
    //     const context = canvas.getContext("2d");
    //     context.drawImage(image, 0, 0);
    //   };
    // };

    // loadImage(url);

    window.addEventListener("keyup", onKeyUp);
    return () => window.removeEventListener("keyup", onKeyUp);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;

    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);

    context.fillStyle = "black";
    context.font = `${fontSize}px ${fontFamily}`;

    context.textBaseline = "top";

    const metrics = context.measureText(text);
    const mx = metrics.actualBoundingBoxLeft * -1;
    const my = metrics.actualBoundingBoxAscent * -1;
    const mw = metrics.actualBoundingBoxLeft + metrics.actualBoundingBoxRight;
    const mh =
      metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;

    const x = (width - mw) * 0.5 - mx;
    const y = (height - mh) * 0.5 - my;

    context.save();
    context.translate(x, y);
    context.beginPath();
    context.rect(mx, my, mw, mh);
    context.stroke();
    context.fillText(text, 0, 0);
    context.restore();
  }, [dimensions, text, fontSize, fontFamily]);

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

export default Sketch09;
