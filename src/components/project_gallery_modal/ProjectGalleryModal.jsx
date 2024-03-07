import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import "./projectGalleryModal.css";
import { motion } from "framer-motion";

import montreal from "./images/c2montreal2.png";
import locomotive from "./images/locomotive2.png";
import officestudio from "./images/officestudio2.png";
import silencio from "./images/silencio2.png";

const projects = [
  {
    title: "C2 Montreal",
    description: "Design & Development",
    color: "#000000",
    src: montreal,
  },
  {
    title: "Office Studio",
    description: "Design & Development",
    color: "#8C8C8C",
    src: officestudio,
  },
  {
    title: "Locomotive",
    description: "Design & Development",
    color: "#EFE8D3",
    src: locomotive,
  },
  {
    title: "Silencio",
    description: "Design & Development",
    color: "#706D63",
    src: silencio,
  },
];

export default function ProjectGalleryModal() {
  const [modal, setModal] = useState({ active: false, idx: 0 });

  return (
    <div className="projectGalleryModal__main">
      <div className="projectGalleryModal__menu">
        {projects.map((project, idx) => (
          <Project key={idx} project={project} idx={idx} setModal={setModal} />
        ))}
        <Modal state={modal} />
      </div>
    </div>
  );
}

function Modal({ state }) {
  const modalRef = useRef(null);
  const cursorRef = useRef(null);
  const cursorLabelRef = useRef(null);

  const { active, idx } = state;

  useGSAP(() => {
    gsap.set(
      [
        ".projectGalleryModal__modal",
        ".projectGalleryModal__cursor",
        ".projectGalleryModal__cursorLabel",
      ],
      {
        xPercent: -50,
        yPercent: -50,
      },
    );

    const xModal = gsap.quickTo(modalRef.current, "x", {
      duration: 0.6,
      ease: "power3",
    });
    const yModal = gsap.quickTo(modalRef.current, "y", {
      duration: 0.6,
      ease: "power3",
    });
    const xCursor = gsap.quickTo(cursorRef.current, "x", {
      duration: 0.4,
      ease: "power3",
    });
    const yCursor = gsap.quickTo(cursorRef.current, "y", {
      duration: 0.4,
      ease: "power3",
    });
    const xCursorLabel = gsap.quickTo(cursorLabelRef.current, "x", {
      duration: 0.2,
      ease: "power3",
    });
    const yCursorLabel = gsap.quickTo(cursorLabelRef.current, "y", {
      duration: 0.2,
      ease: "power3",
    });

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;

      xModal(clientX);
      yModal(clientY);
      xCursor(clientX);
      yCursor(clientY);
      xCursorLabel(clientX);
      yCursorLabel(clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => window.removeEventListener("mousemove", handleMouseMove);
  });

  useEffect(() => {
    modalRef.current.style.opacity = active ? 1 : 0;
    cursorRef.current.style.opacity = active ? 1 : 0;
    cursorLabelRef.current.style.opacity = active ? 1 : 0;
  }, [active]);

  return (
    <>
      <div ref={modalRef} className="projectGalleryModal__modal">
        <div
          className="projectGalleryModal__modal--inner"
          style={{ top: `${-100 * idx}%` }}
        >
          {projects.map((project, idx) => (
            <div
              key={idx}
              className="projectGalleryModal__modal--wrapper"
              style={{ backgroundColor: project.color }}
            >
              <img
                src={project.src}
                alt=""
                className="projectGalleryModal__modal--img"
              />
            </div>
          ))}
        </div>
      </div>
      <div
        ref={cursorRef}
        className="projectGalleryModal__cursor"
        // style={{ scaleAnimation }}
      ></div>
      <div
        ref={cursorLabelRef}
        className="projectGalleryModal__cursorLabel"
        // style={{ scaleAnimation }}
      >
        View
      </div>
    </>
  );
}

function Project({ project, setModal, idx }) {
  return (
    <div
      className="projectGalleryModal__item"
      onMouseEnter={() => setModal({ active: true, idx })}
      onMouseLeave={() => setModal({ active: false, idx })}
    >
      <span className="projectGalleryModal__left">{project.title}</span>
      <span className="projectGalleryModal__right">{project.description}</span>
    </div>
  );
}
