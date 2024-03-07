import React, { useEffect, useRef } from "react";
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

import "./matter01.css";

const WALL_OFFSET = 10;

function Matter01() {
  const sceneRef = useRef(null);
  const engineRef = useRef(Engine.create());

  useEffect(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    const render = Render.create({
      element: sceneRef.current,
      engine: engineRef.current,
      options: {
        width,
        height,
        wireframes: false,
        background: "transparent",
      },
    });

    engineRef.current.gravity.y = 0.3;

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

    const objects = [];

    for (let i = 0; i < 20; i++) {
      const body = Bodies.rectangle(
        Math.max(100, Math.min(Math.random() * width, width - 100)),
        Math.max(100, Math.min(Math.random() * height, height - 100)),
        100,
        100,
      );
      body.friction = 0.25;
      body.restitution = 0.5;
      objects.push(body);
    }

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

    World.add(engineRef.current.world, [
      leftWall,
      ground,
      ceiling,
      rightWall,
      ...objects,
      mouseConstraint,
    ]);
    Render.mouse = mouse;

    Runner.run(engineRef.current);
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

    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
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
      Runner.stop(engine);
      World.clear(engine.world);
      Engine.clear(engine);
      render.canvas.remove();
      render.canvas = null;
      render.context = null;
      render.textures = {};
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="matter01__main">
      <div ref={sceneRef} className="matter01__canvas"></div>
    </div>
  );
}

export default Matter01;
