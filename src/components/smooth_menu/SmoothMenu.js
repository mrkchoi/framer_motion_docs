import React, { useRef, useState } from "react";
import "./smoothMenu.css";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import userEvent from "@testing-library/user-event";

export default function SmoothMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const innerRef = useRef(null);
  const overlayRef = useRef(null);
  const navBtnRef = useRef(null);
  const timelineRef = useRef(null);

  useGSAP(() => {
    const menuItems = gsap.utils.toArray(".smoothMenu__item a");

    gsap.set(overlayRef.current, {
      scaleY: 0,
    });
    gsap.set(menuItems, { yPercent: 100 });

    const timeline = gsap.timeline({
      defaults: {
        ease: "power3.inOut",
        duration: 1,
      },
    });
    timelineRef.current = timeline;

    timeline
      .to(innerRef.current, {
        scale: 0.95,
      })
      .to(overlayRef.current, { scaleY: 1 }, "-=.5")
      .to(navBtnRef.current, { fill: "white" }, "<")
      .to(menuItems, { yPercent: 0, stagger: 0.1, duration: 2 }, "-=1.5");

    timeline.pause();

    return () => {
      timelineRef.current = null;
    };
  });

  return (
    <div className="smoothMenu__main">
      <div ref={innerRef} className="smoothMenu__inner">
        <svg
          width="56"
          height="56"
          viewBox="0 0 56 56"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="smoothMenu__svg smoothMenu__btn"
          onClick={() => {
            if (!isOpen) {
              setIsOpen(true);
              timelineRef.current.play();
            } else {
              setIsOpen(false);
              timelineRef.current.reverse();
            }
          }}
        >
          <path
            ref={navBtnRef}
            d="M13.9993 16.3333H25.666C26.2849 16.3333 26.8783 16.5792 27.3159 17.0168C27.7535 17.4543 27.9994 18.0478 27.9994 18.6667C27.9994 19.2855 27.7535 19.879 27.3159 20.3166C26.8783 20.7542 26.2849 21 25.666 21H13.9993C13.3805 21 12.787 20.7542 12.3494 20.3166C11.9118 19.879 11.666 19.2855 11.666 18.6667C11.666 18.0478 11.9118 17.4543 12.3494 17.0168C12.787 16.5792 13.3805 16.3333 13.9993 16.3333ZM30.3327 35H41.9994C42.6182 35 43.2117 35.2458 43.6493 35.6834C44.0869 36.121 44.3327 36.7145 44.3327 37.3333C44.3327 37.9522 44.0869 38.5457 43.6493 38.9833C43.2117 39.4208 42.6182 39.6667 41.9994 39.6667H30.3327C29.7138 39.6667 29.1204 39.4208 28.6828 38.9833C28.2452 38.5457 27.9994 37.9522 27.9994 37.3333C27.9994 36.7145 28.2452 36.121 28.6828 35.6834C29.1204 35.2458 29.7138 35 30.3327 35ZM13.9993 25.6667H41.9994C42.6182 25.6667 43.2117 25.9125 43.6493 26.3501C44.0869 26.7877 44.3327 27.3812 44.3327 28C44.3327 28.6188 44.0869 29.2123 43.6493 29.6499C43.2117 30.0875 42.6182 30.3333 41.9994 30.3333H13.9993C13.3805 30.3333 12.787 30.0875 12.3494 29.6499C11.9118 29.2123 11.666 28.6188 11.666 28C11.666 27.3812 11.9118 26.7877 12.3494 26.3501C12.787 25.9125 13.3805 25.6667 13.9993 25.6667Z"
            fill="black"
          />
        </svg>
        <div className="smoothMenu__content--container">
          <div className="smoothMenu__content">
            <p>An entirely smooth interaction, you're about to witness.</p>
          </div>
        </div>
        <div ref={overlayRef} className="smoothMenu__overlay"></div>
      </div>

      <div className="smoothMenu__nav--wrapper">
        <ul className="smoothMenu__nav">
          <li className="smoothMenu__item">
            <a href="/">Home</a>
          </li>
          <li className="smoothMenu__item">
            <a href="/">Services</a>
          </li>
          <li className="smoothMenu__item">
            <a href="/">About</a>
          </li>
          <li className="smoothMenu__item">
            <a href="/">Contact</a>
          </li>
        </ul>
      </div>
    </div>
  );
}
