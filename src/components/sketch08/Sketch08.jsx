import React, { useEffect, useRef, useState } from "react";
// import random from "canvas-sketch-util/random";
import math from "canvas-sketch-util/math";
import Lenis from "@studio-freight/lenis";

const mouse = { x: 0, y: 0 };

function Sketch08() {
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
        width: window.innerWidth,
        height: window.innerHeight,
      });

      canvasRef.current.width = window.innerWidth;
      canvasRef.current.height = window.innerHeight;
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
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);

    const flowField = new FlowFieldEffect(context, width, height);
    animationRef.current = flowField.animate(0);
  }, [dimensions]);

  return (
    <div className="flex h-full w-full items-center justify-center">
      <canvas
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight}
        className=""
      ></canvas>
    </div>
  );
}

class FlowFieldEffect {
  #context;
  #width;
  #height;

  constructor(context, width, height) {
    this.#context = context;
    this.#context.lineWidth = 0.5;
    this.#width = width;
    this.#height = height;
    this.angle = 0;
    this.lastTime = 0;
    this.interval = 1000 / 60;
    this.timer = 0;
    this.cellSize = 35;
    this.cursorRadius = this.cellSize * 6;
    this.gradient = this.#context.createLinearGradient(
      0,
      0,
      this.#width,
      this.#height,
    );
    this.#context.strokeStyle = "black";
  }
  #drawLine(angle, x, y) {
    let positionX = x;
    let positionY = y;
    let dx = mouse.x - positionX;
    let dy = mouse.y - positionY;
    let distance = Math.sqrt(dx * dx + dy * dy);
    let length = 3;

    if (mouse.x !== 0 && mouse.y !== 0) {
      length = math.mapRange(
        distance,
        0,
        this.cursorRadius,
        this.cellSize - 15,
        this.cellSize - 20,
        true,
      );
    }

    if (distance < this.cursorRadius) {
      this.#context.lineWidth = 1;
    } else {
      this.#context.lineWidth = 0.75;
    }

    this.#context.beginPath();
    this.#context.moveTo(x, y);
    this.#context.lineTo(
      x + Math.cos(angle) * length,
      y + Math.sin(angle) * length,
    );
    this.#context.stroke();
  }

  animate(timestamp) {
    const deltaTime = timestamp - this.lastTime;
    this.lastTime = timestamp;
    if (this.timer > this.interval) {
      this.timer = 0;
      this.#context.clearRect(0, 0, this.#width, this.#height);
      for (
        let y = this.cellSize;
        y <= this.#height - this.cellSize / 2;
        y += this.cellSize
      ) {
        for (
          let x = this.cellSize;
          x <= this.#width - this.cellSize / 2;
          x += this.cellSize
        ) {
          // leave padding of this.cellSize around canvas border

          const angle = Math.atan2(mouse.y - y, mouse.x - x);
          this.#drawLine(angle, x, y);
        }
      }
    } else {
      this.timer += deltaTime;
    }
    return requestAnimationFrame(this.animate.bind(this));
  }
}

export default Sketch08;
