import React, { useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import "./trionn.css";

export default function Trionn() {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis();

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  useGSAP(() => {
    const titleSpans = titleRef.current.children;

    gsap.registerPlugin(ScrollTrigger);

    gsap.to(titleSpans, {
      scrollTrigger: {
        trigger: titleRef.current,
        scrub: true,
        // markers: true,
        start: "start 80%",
        end: "start 10%",
      },
      backgroundPositionX: "0%",
      transform: "translate3d(0,0,0)",
      ease: "power3.inOut",
    });

    gsap.to(".trionn__subtitleSpan", {
      scrollTrigger: {
        trigger: subtitleRef.current,
        // markers: true,
        // scrub: true,
        start: "start 90%",
        end: "start 10%",
        toggleActions: "play pause resume reverse",
      },
      backgroundPositionX: "0%",
      transform: "translate3d(0,0,0)",
      ease: "power3.inOut",
      duration: 1,
      delay: 0.4,
      stagger: 0.1,
    });
  });

  return (
    <div className="trionn__main">
      <div className="trionn__container">
        <div className="trionn__header">
          <span className="trionn__logo">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100"
              height="19"
              fill="#E0EEEE"
              fillRule="evenodd"
            >
              <path d="M49.313.019c-1.266.105-2.446.434-3.592 1.003-.917.455-1.663.994-2.443 1.767-.834.825-1.337 1.519-1.844 2.546-1.299 2.627-1.306 5.643-.02 8.28a9.12 9.12 0 0 0 1.741 2.469c2.222 2.265 5.383 3.297 8.497 2.773 3.774-.635 6.826-3.433 7.729-7.086a8.36 8.36 0 0 0 .265-2.261c.002-1.138-.133-1.994-.473-3a9.24 9.24 0 0 0-2.298-3.696 9.63 9.63 0 0 0-5.586-2.74A12.19 12.19 0 0 0 49.314.02zM0 1.089v1.07h2.873 2.873v8.421V19h1.171 1.171v-8.421-8.421h2.891 2.891v-1.07-1.07H6.935 0v1.07zM17.383 9.51V19h1.188 1.188v-8.423-8.423l2.51.014c2.384.013 2.527.018 2.847.087 1.35.293 2.144.847 2.615 1.823.242.503.333.902.356 1.575.041 1.188-.247 2.043-.919 2.736-.57.587-1.264.926-2.299 1.123-.233.044-.601.061-1.623.074l-1.321.033c0 .03 1.091 1.659 3.701 5.528l2.596 3.849 1.43.002 1.43.002-.227-.325-2.385-3.465-2.329-3.383c-.095-.134-.16-.253-.145-.266s.195-.066.4-.119c1.641-.424 2.873-1.36 3.555-2.702a6.43 6.43 0 0 0 .495-1.526c.093-.518.127-1.59.068-2.149-.28-2.658-1.847-4.368-4.472-4.884-.782-.154-1.026-.162-4.937-.162h-3.719V9.51zm17.205 0V19h1.188 1.188V9.509.018h-1.188-1.188v9.491zm28.593 0V19h1.171 1.171l.009-7.5.009-7.5.221.298 1.984 2.754 4.587 6.386 2.45 3.412 1.542 2.148 1.197.001h1.197v-.247-.247l-1.017-1.428-6.473-9.06-4.122-5.763-1.6-2.237h-1.163-1.163v9.491zm13.197-3.831v5.66l.626.875 1.162 1.626.536.751.018-5.294.018-5.294.482.667 2.144 2.982 2.62 3.649 1.688 2.351 2.287 3.184L89.514 19h1.201 1.201v-.262-.262l-.437-.606-5.292-7.378-3.376-4.719L78.797.159l-.096-.138L77.539.02 76.377.018v5.66zm13.161-.019v5.641l.401.56 1.173 1.639.787 1.079c.008 0 .015-3.276.015-7.28V.018h-1.188-1.188V5.66zM50.734 2.406c1.221.121 2.296.495 3.294 1.146 2.171 1.417 3.404 3.872 3.224 6.422a7.12 7.12 0 0 1-4.023 5.924 6.98 6.98 0 0 1-3.163.716c-1.367 0-2.633-.352-3.797-1.057-2.245-1.359-3.594-3.967-3.388-6.552.11-1.386.532-2.538 1.355-3.698.302-.426 1.157-1.271 1.597-1.578 1.474-1.027 3.196-1.493 4.901-1.324zM98.587.353C98.142.118 97.686 0 97.219 0s-.923.118-1.368.353a2.55 2.55 0 0 0-1.044 1.004c-.251.437-.373.888-.373 1.36a2.69 2.69 0 0 0 .369 1.35c.246.432.589.768 1.029 1.008a2.86 2.86 0 0 0 1.387.356c.482 0 .943-.119 1.383-.356a2.55 2.55 0 0 0 1.029-1.008 2.69 2.69 0 0 0 .369-1.35c0-.473-.124-.926-.373-1.36a2.51 2.51 0 0 0-1.04-1.004zm-2.512.392A2.41 2.41 0 0 1 97.218.45c.391 0 .769.098 1.14.295a2.09 2.09 0 0 1 .867.839c.209.362.314.74.314 1.134a2.25 2.25 0 0 1-.306 1.126c-.204.357-.491.637-.859.839s-.754.299-1.155.299a2.4 2.4 0 0 1-1.155-.299c-.369-.202-.657-.481-.863-.839s-.306-.735-.306-1.126.105-.771.314-1.134a2.12 2.12 0 0 1 .867-.839zm1.704 3.306h.548l-.687-.969v-.011c.393-.108.589-.371.589-.789 0-.256-.077-.461-.23-.615s-.38-.232-.687-.232h-.99v2.617h.457V3.12h.359l.642.932zm-1.001-1.334v-.884h.465c.164 0 .29.039.378.118a.4.4 0 0 1 .136.324c0 .135-.047.243-.14.324s-.228.118-.404.118h-.434z" />
            </svg>
          </span>
          <span className="trionn__nav">Menu</span>
        </div>
        <div className="trionn__spacer">scroll...</div>
        <div className="trionn__section">
          <div className="trionn__content">
            <h1 ref={titleRef} className="trionn__title">
              <span className="trionn__titleSpan">Recent</span>
              <span className="trionn__titleSpan">Works</span>
            </h1>
            <h2 ref={subtitleRef} className="trionn__subtitle">
              <div className="trionn__subtitleSpan--wrapper">
                <span className="trionn__subtitleSpan">
                  In the creative wilderness,
                </span>
              </div>
              <div className="trionn__subtitleSpan--wrapper">
                <span className="trionn__subtitleSpan">
                  clients find our work truly
                </span>
              </div>
              <div className="trionn__subtitleSpan--wrapper">
                <span className="trionn__subtitleSpan">beloved.</span>
              </div>
            </h2>
          </div>
          <div className="trionn__cta">
            <button className="trionn__btn">Explore work</button>
          </div>
        </div>
      </div>
    </div>
  );
}
