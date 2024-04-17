import React, { Suspense, useEffect, useRef, useState } from "react";
import Lenis from "@studio-freight/lenis";
import { CustomEase } from "gsap/all";
import gsap from "gsap";
import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera, OrthographicCamera } from "@react-three/drei";
import { Perf } from "r3f-perf";

import Scene from "./Scene";

import "./bizarro02.css";

import img01 from "./assets/images/01_aawum.webp";
import img02 from "./assets/images/02_karina-sirqueira.webp";
import img03 from "./assets/images/03_youtube.webp";
import img04 from "./assets/images/04_xbox-museum.webp";
import img05 from "./assets/images/05_bbdo.webp";
import img06 from "./assets/images/06_peggy-gou.webp";
import img07 from "./assets/images/07_isabel-moranta.webp";
import img08 from "./assets/images/08_floema.webp";
import img09 from "./assets/images/09_garoa-skincare.webp";
import img10 from "./assets/images/10_design-embraced.webp";
import img11 from "./assets/images/11_kacper-chlebowicz.webp";
import img12 from "./assets/images/12_trolli.webp";
import img13 from "./assets/images/13_adventure-time.webp";
import img14 from "./assets/images/14_studio-maertens.webp";
import img15 from "./assets/images/15_inbound.webp";
import img16 from "./assets/images/16_redis.webp";
import img17 from "./assets/images/17_kaleidoz.webp";
import img18 from "./assets/images/18_erika-moreira.webp";
import img19 from "./assets/images/19_bruno-arizio.webp";
import img20 from "./assets/images/20_dominic-berzins.webp";
import img21 from "./assets/images/21_pagethink.webp";
import img22 from "./assets/images/22_neoway.webp";
import img23 from "./assets/images/23_cult.webp";
import img24 from "./assets/images/24_movida.webp";
import img25 from "./assets/images/25_lufthansa-2.webp";
import img26 from "./assets/images/26_tiaa.webp";
import img27 from "./assets/images/27_lufthansa-1.webp";
import img28 from "./assets/images/28_shell.webp";
import img29 from "./assets/images/29_corvette.webp";
import img30 from "./assets/images/30_nike.webp";
import img31 from "./assets/images/31_airbnb.webp";
import img32 from "./assets/images/32_discovery-kids.webp";

const PROJECTS = [
  {
    title: "UKRAINE",
    src: img01,
  },
  {
    title: "KARINA SIRQUEIRA",
    src: img02,
  },
  {
    title: "YOUTUBE",
    src: img03,
  },
  {
    title: "XBOX MUSEUM",
    src: img04,
  },
  {
    title: "BBDO",
    src: img05,
  },
  {
    title: "PEGGY GOU",
    src: img06,
  },
  {
    title: "ISABEL MORANTA",
    src: img07,
  },
  {
    title: "FLOEMA",
    src: img08,
  },
  {
    title: "GAROA SKINCARE",
    src: img09,
  },
  {
    title: "DESIGN EMBRACED",
    src: img10,
  },
  {
    title: "KACPER CHLEBOWICZ",
    src: img11,
  },
  {
    title: "TROLLI",
    src: img12,
  },
  {
    title: "ADVENTURE TIME",
    src: img13,
  },
  {
    title: "STUDIO MÆRTENS",
    src: img14,
  },
  {
    title: "INBOUND",
    src: img15,
  },
  {
    title: "REDIS",
    src: img16,
  },
  {
    title: "KALEIDOZ",
    src: img17,
  },
  {
    title: "ERIKA MOREIRA",
    src: img18,
  },
  {
    title: "BRUNO ARIZIO",
    src: img19,
  },
  {
    title: "DOMINIC BERZINS",
    src: img20,
  },
  {
    title: "PAGETHINK",
    src: img21,
  },
  {
    title: "NEOWAY",
    src: img22,
  },
  {
    title: "CULT",
    src: img23,
  },
  {
    title: "MOVIDA",
    src: img24,
  },
  {
    title: "LUFTHANSA",
    src: img25,
  },
  {
    title: "TIAA",
    src: img26,
  },
  {
    title: "LUFTHANSA",
    src: img27,
  },
  {
    title: "SHELL",
    src: img28,
  },
  {
    title: "CORVETTE",
    src: img29,
  },
  {
    title: "NIKE",
    src: img30,
  },
  {
    title: "AIRBNB",
    src: img31,
  },
  {
    title: "DISCOVERY KIDS",
    src: img32,
  },
];

const PERSPECTIVE = 1000;
const FOV =
  (180 * (2 * Math.atan(window.innerHeight / 2 / PERSPECTIVE))) / Math.PI;

const lerp = (start, end, t) => {
  return start * (1 - t) + end * t;
};

const scroll = {
  ease: 0.075,
  current: 0,
  target: 0,
  last: 0,
  position: 0,
  start: 0,
};

const mouse = {
  current: { x: 0, y: 0 },
  target: { x: 0, y: 0 },
};

function Bizarro02() {
  const listRef = useRef(null);
  const cameraRef = useRef(null);
  const [direction, setDirection] = useState("up");

  const [items, setItems] = useState([]);

  useEffect(() => {
    // get all images from DOM and set them to state for use in canvas scene
    const allItems = [...document.querySelectorAll(".bizarro02__listItem")];
    setItems(allItems);
  }, []);

  // ANIMATION LOOP FOR SMOOTH SCROLL
  useEffect(() => {
    const update = () => {
      scroll.current = lerp(scroll.current, scroll.target, scroll.ease);

      if (scroll.current > scroll.last) {
        setDirection("up");
      } else {
        setDirection("down");
      }

      scroll.last = scroll.current;

      requestAnimationFrame(update);
    };
    update();

    return () => cancelAnimationFrame(update);
  }, []);

  useEffect(() => {
    const handleWheel = (e) => {
      scroll.target += e.deltaY;
    };

    const handleResize = () => {
      // update camera fov
      cameraRef.current.aspect = window.innerWidth / window.innerHeight;
      cameraRef.current.fov =
        (180 * (2 * Math.atan(window.innerHeight / 2 / PERSPECTIVE))) / Math.PI;
      cameraRef.current.updateProjectionMatrix();
    };

    window.addEventListener("wheel", handleWheel);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="bizarro02__main">
      <div className="bizarro02__canvasWrapper">
        <Canvas>
          <PerspectiveCamera
            ref={cameraRef}
            makeDefault
            position={[0, 0, PERSPECTIVE]}
            zoom={1}
            fov={FOV}
            aspect={window.innerWidth / window.innerHeight}
            near={0.01}
            far={3000}
          />
          <Suspense fallback={<span>loading...</span>}>
            <Scene items={items} />
          </Suspense>
          {/* <Perf /> */}
        </Canvas>
      </div>
      <div className="bizarro02__listWrapper">
        <ul ref={listRef} className="bizarro02__list">
          {PROJECTS.map((project, idx) => (
            <ListItem
              key={idx}
              idx={idx}
              direction={direction}
              project={project}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

function ListItem({ idx, project }) {
  const ref = useRef(null);
  const position = useRef({
    y: 0,
    offset: 0,
    isBefore: false,
    isAfter: false,
  });
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    scroll.current = 0;
    scroll.target = 0;
    scroll.last = 0;
    position.current.offset = 0;

    const handleResize = () => {
      scroll.current = 0;
      scroll.target = 0;
      scroll.last = 0;
      position.current.offset = 0;
    };

    const handleWheel = (e) => {
      const list = document.querySelector(".bizarro02__list");
      const listHeight = list.getBoundingClientRect().height;

      let direction = e.deltaY > 0 ? "up" : "down";

      if (direction === "up" && position.current.isBefore) {
        position.current.offset -= listHeight;
        position.current.isBefore = false;
        position.current.isAfter = false;
      }

      if (direction === "down" && position.current.isAfter) {
        position.current.offset += listHeight;
        position.current.isBefore = false;
        position.current.isAfter = false;
      }
    };

    window.addEventListener("wheel", handleWheel);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const update = () => {
      const rect = ref.current?.getBoundingClientRect();
      if (!rect) return;

      const amount = -(scroll.current + position.current.offset);

      position.current.isBefore = rect.bottom < 0;
      position.current.isAfter = rect.top > window.innerHeight;

      ref.current.style.transform = `translate3d(0, ${amount}px, 0)`;

      requestAnimationFrame(update);
    };
    update();

    return () => cancelAnimationFrame(update);
  }, []);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  return (
    <li
      ref={ref}
      className="bizarro02__listItem"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <a href="/bizarro-02" className="bizarro02__listItemLink">
        <span className="bizarro02__listItemText">{project.title}</span>
        <div className="bizarro02__listItemImageWrapper">
          <img
            className="bizarro02__listItemImage"
            data-hovered={hovered}
            src={project.src}
            alt={project.title}
          />
        </div>
      </a>
    </li>
  );
}

export default Bizarro02;
