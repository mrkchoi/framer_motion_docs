import React, { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import "./blockMenu.css";

// https://faubourg.tv/contact/

const links = ["Works", "VFX Breakdowns", "Showreel", "About", "Contact"];

export default function BlockMenu() {
  const [open, setOpen] = useState(false);
  const firstBlockRef = useRef(null);
  const secondBlockRef = useRef(null);
  const thirdBlockRef = useRef(null);
  const fourthBlockRef = useRef(null);
  const navWrapperRef = useRef(null);
  const timelineRef = useRef(null);

  useGSAP(() => {
    const timeline = gsap.timeline({
      defaults: {
        duration: 1,
        ease: "power3.inOut",
      },
    });
    timelineRef.current = timeline;

    timeline
      .to(firstBlockRef.current, {
        width: "100%",
      })
      .to(
        secondBlockRef.current,
        {
          width: "100%",
        },
        "<",
      )
      .to(
        thirdBlockRef.current,
        {
          width: "75%",
        },
        "-=.75",
      )
      .to(
        fourthBlockRef.current,
        {
          width: "50%",
        },
        "-=.75",
      )
      .to(
        navWrapperRef.current,
        {
          opacity: 1,
          visibility: "visible",
        },
        "-=.5",
      );

    timeline.pause();
  });

  return (
    <div className="blockMenu__main">
      <div className="blockMenu__wrapper">
        <div className="blockMenu__block--wrapper">
          <div ref={firstBlockRef} className="blockMenu__block"></div>
          <div ref={secondBlockRef} className="blockMenu__block"></div>
          <div ref={thirdBlockRef} className="blockMenu__block"></div>
          <div ref={fourthBlockRef} className="blockMenu__block"></div>
        </div>
        <div className="blockMenu__btn--wrapper">
          <button
            className="blockMenu__btn"
            onClick={() => {
              if (open) {
                setOpen(false);
                timelineRef.current.reverse();
              } else {
                setOpen(true);
                timelineRef.current.play();
              }
            }}
          >
            {open ? "Close" : "Open"}
          </button>
        </div>
        <div ref={navWrapperRef} className="blockMenu__nav--wrapper">
          <ul className="blockMenu__nav">
            {links.map((link) => (
              <NavItem key={link} link={link} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function NavItem({ link }) {
  const animationRef = useRef(null);
  const primaryRef = useRef(null);
  const secondaryRef = useRef(null);

  useGSAP(() => {
    const timeline = gsap.timeline({
      defaults: { duration: 0.5, ease: "power3.inOut" },
    });
    animationRef.current = timeline;

    timeline
      .to(primaryRef.current.children, {
        y: "-100%",
        stagger: 0.025,
      })
      .to(
        secondaryRef.current.children,
        {
          y: "-100%",
          stagger: 0.025,
        },
        "<",
      );

    timeline.pause();
  });

  return (
    <li className="blockMenu__item">
      <a
        href="/block-menu"
        onMouseEnter={() => animationRef.current.play()}
        onMouseLeave={() => animationRef.current.reverse()}
      >
        <span
          ref={primaryRef}
          className="blockMenu__item--text blockMenu__item--textPrimary"
        >
          {link.split("").map((char, idx) => (
            <span key={idx} className="blockMenu__item--char">
              {char}
            </span>
          ))}
        </span>
        <span
          ref={secondaryRef}
          className="blockMenu__item--text blockMenu__item--textSecondary"
        >
          {link.split("").map((char, idx) => (
            <span
              key={idx}
              className="blockMenu__item--char blockMenu__item--charSecondary"
            >
              {char}
            </span>
          ))}
        </span>
      </a>
    </li>
  );
}
