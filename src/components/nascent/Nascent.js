import React, { useRef } from "react";
import "./nascent.css";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import SmoothScroll from "../lenis/SmoothScroll";
import SplitType from "split-type";

const items = [
  {
    title1: "Brand Strategy",
    title2: "Consulting",
  },
  {
    title1: "Brand Design",
    title2: "Identity System",
  },
  {
    title1: "Digital Experience",
    title2: "Communication",
  },
  {
    title1: "Creative",
    title2: "Motion Production",
  },
  {
    title1: "Editorial",
    title2: "Brand Storytelling",
  },
];

export default function Nascent() {
  const rowRef = useRef(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    const titleText = new SplitType(".nascent__title", {
      types: "lines",
    });
    const subtitleText = new SplitType(".nascent__subtitle", {
      types: "lines",
    });

    gsap.to(".nascent__rowInner:nth-child(odd)", {
      scrollTrigger: {
        trigger: ".nascent__bottomContainer",
        start: "top 100%",
        end: "bottom 0%",
        scrub: true,
      },
      x: "-30vw",
    });
    gsap.to(".nascent__rowInner:nth-child(even)", {
      scrollTrigger: {
        trigger: ".nascent__bottomContainer",
        start: "top 100%",
        end: "bottom 0%",
        scrub: true,
      },
      x: "0",
    });
    gsap.from(titleText.lines, {
      opacity: 0,
      y: 20,
      duration: 0.5,
      stagger: { amount: 0.1 },
      scrollTrigger: {
        trigger: ".nascent__title",
        start: "top 80%",
        end: "bottom 50%",
        scrub: true,
      },
    });
    gsap.from(subtitleText.lines, {
      opacity: 0,
      y: 20,
      duration: 0.5,
      stagger: { amount: 0.1 },
      scrollTrigger: {
        trigger: ".nascent__subtitle",
        start: "top 80%",
        end: "bottom 50%",
        scrub: true,
      },
    });
    gsap.from(".nascent__ctaContainer", {
      opacity: 0,
      y: 20,
      duration: 0.5,
      stagger: { amount: 0.1 },
      scrollTrigger: {
        trigger: ".nascent__ctaContainer",
        start: "top 80%",
        end: "bottom 50%",
        scrub: true,
      },
    });
  });

  return (
    <SmoothScroll>
      <div className="nascent__spacer"></div>
      <div className="nascent__main">
        <div className="nascent__top">
          <div className="nascent__titleContainer">
            <h1 className="nascent__title">
              THROUGH OUR <em>services</em> WE SHAPE 💎 BRANDS WITH PURPOSE.
            </h1>
            <div className="nascent__ctaContainer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                viewBox="0 0 25 25"
                fill="none"
                className="nascent__svgArrow"
              >
                <circle cx="12.5" cy="12.5" r="12.5"></circle>
                <path
                  d="M6.78407 13.012L6.78322 11.7168L16.4226 11.7148L12.7006 7.99276L13.605 7.10497L18.864 12.364L13.6035 17.6244L12.698 16.7188L16.4234 13.01L6.78407 13.012Z"
                  data-svg-origin="6.783219814300537 7.1049699783325195"
                  transform="matrix(1,0,0,1,0,0)"
                ></path>
              </svg>
              <span className="nascent__cta">view full services</span>
            </div>
          </div>
          <div className="nascent__subtitleContainer">
            <h2 className="nascent__subtitle">
              UNLEASHING <em>strategic</em> INSIGHT AND <em>creative</em>{" "}
              PROWESS, WE CRAFT <em>digital</em> BRAND EXPERIENCES THAT
              CAPTIVATE THE WORLD THROUGH POWERFUL <em>storytelling</em>.
            </h2>
          </div>
        </div>
        <div className="nascent__bottomContainer">
          {items.map((item, idx) => {
            return (
              <div key={idx} className="nascent__row">
                <div ref={rowRef} className="nascent__rowInner">
                  <span className="nascent__rowContent">{item.title1}</span>
                  <svg
                    width="51"
                    height="51"
                    viewBox="0 0 51 51"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="nascent__svgPlus"
                  >
                    <path d="M25.5 0.5V50.5" stroke="currentColor"></path>
                    <path
                      d="M50.5 25.5L0.499999 25.5"
                      stroke="currentColor"
                    ></path>
                  </svg>
                  <span className="nascent__rowContent">{item.title2}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="nascent__spacer"></div>
    </SmoothScroll>
  );
}
