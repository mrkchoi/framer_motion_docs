import React, { useEffect, useRef, useState } from "react";
import Lenis from "@studio-freight/lenis";

import {
  Engine,
  Render,
  Bodies,
  World,
  Runner,
  Mouse,
  Body,
  MouseConstraint,
  Vector,
} from "matter-js";

import "./brands.css";

import svg1 from "./assets/ASOS.svg";
import svg2 from "./assets/CHANDON.svg";
import svg3 from "./assets/CHIVAS.svg";
import svg4 from "./assets/LOREAL.svg";
import svg5 from "./assets/MASTERCARD.svg";
import svg6 from "./assets/MONCLER.svg";
import svg7 from "./assets/NESPRESSO.svg";
import svg8 from "./assets/PRADA.svg";
import svg9 from "./assets/SPINNEYS.svg";
import svg10 from "./assets/VALENTINO.svg";
import svg11 from "./assets/VERSACE.svg";
import svg12 from "./assets/VICHY.svg";

const SVG_FILES = [
  svg1,
  svg2,
  svg3,
  svg4,
  svg5,
  svg6,
  svg7,
  svg8,
  svg9,
  svg10,
  svg11,
  svg12,
];

// import { decomp } from "poly-decomp";

// Common.setDecomp(decomp);
// window.decomp = decomp;

// console.log(decomp);

const WALL_OFFSET = 10;

function Brands() {
  const sceneRef = useRef(null);
  const engineRef = useRef(Engine.create());
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    const lenis = new Lenis();

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  useEffect(() => {
    const container = sceneRef.current;

    const width = container.clientWidth;
    const height = container.clientHeight;
    const world = engineRef.current.world;

    const render = Render.create({
      element: sceneRef.current,
      engine: engineRef.current,
      options: {
        width,
        height,
        wireframes: false,
        background: "black",
      },
    });
    const runner = Runner.create();

    engineRef.current.gravity.y = 1;

    // MOUSE
    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engineRef.current, {
      mouse,
      constraint: {
        stiffness: 0.2,
        render: {
          visible: false,
        },
      },
    });

    // WALLS
    const rightWall = Bodies.rectangle(
      width + WALL_OFFSET,
      height / 2,
      20,
      9999,
      {
        isStatic: true,
      },
    );
    const leftWall = Bodies.rectangle(-WALL_OFFSET, height / 2, 20, 9999, {
      isStatic: true,
    });
    const ground = Bodies.rectangle(width / 2, height + WALL_OFFSET, 9999, 20, {
      isStatic: true,
    });
    const ceiling = Bodies.rectangle(width / 2, -WALL_OFFSET, 9999, 20, {
      isStatic: true,
    });

    // SVG
    const svg_objs = [];

    for (let i = 0; i < SVG_FILES.length * 3; i++) {
      const svgPath = SVG_FILES[i % SVG_FILES.length];
      const body = Bodies.rectangle(
        Math.max(100, Math.min(Math.random() * width, width - 100)),
        Math.max(100, Math.min(Math.random() * height, height - 100)),
        150,
        25,
        {
          render: {
            strokeStyle: "#ffffff",
            sprite: {
              texture: svgPath,
            },
            background: "#ffffff",
          },
        },
      );
      body.friction = 0.25;
      body.restitution = 0.5;
      svg_objs.push(body);
    }
    // World.add(engineRef.current.world, svg_objs);

    World.add(engineRef.current.world, [
      leftWall,
      ground,
      ceiling,
      rightWall,
      // ...objects,
      ...svg_objs,
      mouseConstraint,
    ]);

    Render.mouse = mouse;
    runner.enabled = false;
    Runner.start(runner, engineRef.current);
    Render.run(render);

    const engine = engineRef.current;

    // allow scroll through the canvas
    mouseConstraint.mouse.element.removeEventListener(
      "mousewheel",
      mouseConstraint.mouse.mousewheel,
    );
    mouseConstraint.mouse.element.removeEventListener(
      "DOMMouseScroll",
      mouseConstraint.mouse.mousewheel,
    );

    const handleClick = () => {
      setIsRunning(true);
      runner.enabled = true;
    };

    window.addEventListener("click", handleClick);

    const handleResize = () => {
      const container = sceneRef.current;
      const width = container.clientWidth;
      const height = container.clientHeight;
      render.canvas.width = width;
      render.canvas.height = height;

      Body.setPosition(
        rightWall,
        Vector.create(width + WALL_OFFSET, height / 2),
      );
      Body.setPosition(ground, Vector.create(width / 2, height + WALL_OFFSET));
    };

    window.addEventListener("resize", handleResize);

    return () => {
      Render.stop(render);
      Runner.stop(runner);
      World.clear(world);
      Engine.clear(engine);
      render.canvas.remove();
      render.canvas = null;
      render.context = null;
      render.textures = {};
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <div className="brands__main">
      <div ref={sceneRef} className="brands__canvas"></div>
    </div>
  );
}

export default Brands;
