import React, { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";

import "./midnight.css";

import img1 from "./assets/images/img1.svg";
import img2 from "./assets/images/img2.svg";
import img3 from "./assets/images/img3.svg";
import img4 from "./assets/images/img4.svg";
import img5 from "./assets/images/img5.svg";
import img6 from "./assets/images/img6.svg";
import img7 from "./assets/images/img7.svg";
import img8 from "./assets/images/img8.svg";
import img9 from "./assets/images/img9.svg";
import img10 from "./assets/images/img10.svg";
import img11 from "./assets/images/img11.svg";
import img12 from "./assets/images/img12.svg";
import Cursor from "./Cursor";

const NAV_ITEMS = ["Services", "Work", "Studio", "Thoughts"];
const MARQUEE_IMAGES = [
  img1,
  img2,
  img3,
  img4,
  img5,
  img6,
  img7,
  img8,
  img9,
  img10,
  img11,
  img12,
];

// Reference: https://midnight.agency/
function Midnight() {
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
      // use mouse position to change position of .midnight__backgroundItem1 and .midnight__backgroundItem2 using translate3d to give parallax effect using gsap quickto
      const x = e.clientX;
      const y = e.clientY;

      const xTo = gsap.quickTo(".midnight__backgroundItemWrapper", "x", {
        duration: 1,
      });
      const yTo = gsap.quickTo(".midnight__backgroundItemWrapper", "y", {
        duration: 1,
      });

      xTo(-(x / window.innerWidth) * 300);
      yTo(-(y / window.innerHeight) * 300 + 150);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    gsap.set(
      [".midnight__heroTitle", ".midnight__heroSubtitle", ".midnight__heroCta"],
      {
        opacity: 0,
        y: 100,
      },
    );

    const tl = gsap.timeline({ defaults: { duration: 1 } });

    tl.to(
      [".midnight__heroCta", ".midnight__heroSubtitle", ".midnight__heroTitle"],
      {
        opacity: 1,
        y: 0,
        stagger: 0.05,
        ease: "power3.inOut",
      },
    );
  }, []);

  return (
    <div className="midnight__main">
      <div className="midnight__hero">
        <header className="midnight__header">
          <div className="midnight__logo">
            <svg
              width="708"
              height="91"
              viewBox="0 0 708 91"
              fill="#1C1A1A"
              xmlns="http://www.w3.org/2000/svg"
              className="midnight__logoSvg"
            >
              <path
                d="M61.7956 89L95.5896 15.556V89H110.84V1.40401H87.1716L55.6956 69.968L24.2196 1.40401H0.0635986V89H15.3136V15.556L49.1076 89H61.7956Z"
                fill="#1C1A1A"
              ></path>
              <path
                d="M143.041 1.40401H127.425V89H143.041V1.40401Z"
                fill="#1C1A1A"
              ></path>
              <path
                d="M159.593 89H204.001C234.135 89 253.411 71.92 253.411 45.202C253.411 18.484 234.135 1.40401 204.001 1.40401H159.593V89ZM174.965 75.58V14.824H203.879C224.863 14.824 237.429 26.658 237.429 45.202C237.429 63.624 224.863 75.58 204.001 75.58H174.965Z"
                fill="#1C1A1A"
              ></path>
              <path
                d="M353.244 1.40401H338.238V66.43L280.898 1.40401H264.794V89H279.8V21.046L339.58 89H353.244V1.40401Z"
                fill="#1C1A1A"
              ></path>
              <path
                d="M385.492 1.40401H369.876V89H385.492V1.40401Z"
                fill="#1C1A1A"
              ></path>
              <path
                d="M449.258 0.0620117C419.124 0.0620117 396.798 18.972 396.798 44.958C396.798 71.066 418.514 90.342 448.648 90.342C464.02 90.342 476.952 84.608 482.198 77.776V89H496.838V41.786H441.206V55.45H483.052C482.32 67.894 466.094 76.556 448.648 76.556C427.786 76.556 412.902 63.868 412.902 45.08C412.902 26.414 428.03 13.848 449.38 13.848C465.484 13.848 477.074 21.046 482.686 34.222L495.618 27.024C488.908 10.188 471.828 0.0620117 449.258 0.0620117Z"
                fill="#1C1A1A"
              ></path>
              <path
                d="M586.329 1.40401V37.028H526.793V1.40401H511.177V89H526.793V50.692H586.329V89H601.945V1.40401H586.329Z"
                fill="#1C1A1A"
              ></path>
              <path
                d="M707.095 15.068V1.40401H612.423V15.068H651.951V89H667.567V15.068H707.095Z"
                fill="#1C1A1A"
              ></path>
            </svg>
          </div>
          <ul className="midnight__nav hidden md:flex">
            {NAV_ITEMS.map((item, index) => (
              <li key={index} className="midnight__navItem">
                <a href="/midnight" className="midnight__navLink">
                  {item}
                </a>
              </li>
            ))}
          </ul>
          <div className="midnight__headerRight">
            <button className="midnight__btn">
              <div className="midnight__btnBlobWrapper">
                <span className="midnight__btnBlob midnight__btnBlob1"></span>
                <span className="midnight__btnBlob midnight__btnBlob2"></span>
                <span className="midnight__btnBlob midnight__btnBlob3"></span>
                <span className="midnight__btnBlob midnight__btnBlob4"></span>
              </div>
              <span className="midnight__btnText">Contact Us</span>
            </button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              height="0px"
              className="absolute"
            >
              <defs>
                <filter id="goo">
                  <feGaussianBlur
                    in="SourceGraphic"
                    result="blur"
                    stdDeviation="10"
                  ></feGaussianBlur>
                  <feColorMatrix
                    in="blur"
                    mode="matrix"
                    values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 21 -7"
                    result="goo"
                  ></feColorMatrix>
                  <feBlend in2="goo" in="SourceGraphic" result="mix"></feBlend>
                </filter>
              </defs>
            </svg>
          </div>
        </header>
        <div className="midnight__heroMain">
          <h1 className="midnight__heroTitle">We Build for the Web</h1>
          <p className="midnight__heroSubtitle">
            Web development and strategic technical consultancy for creative
            agencies and team.
          </p>
          <button className="midnight__heroCta midnight__btn">
            <div className="midnight__btnText">Talk to Us</div>
            <span className="midnight__btnBlobWrapper">
              <span className="midnight__btnBlob midnight__btnBlob1"></span>
              <span className="midnight__btnBlob midnight__btnBlob2"></span>
              <span className="midnight__btnBlob midnight__btnBlob3"></span>
              <span className="midnight__btnBlob midnight__btnBlob4"></span>
            </span>
          </button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            height="0px"
            className="absolute"
          >
            <defs>
              <filter id="goo">
                <feGaussianBlur
                  in="SourceGraphic"
                  result="blur"
                  stdDeviation="10"
                ></feGaussianBlur>
                <feColorMatrix
                  in="blur"
                  mode="matrix"
                  values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 21 -7"
                  result="goo"
                ></feColorMatrix>
                <feBlend in2="goo" in="SourceGraphic" result="mix"></feBlend>
              </filter>
            </defs>
          </svg>
        </div>
        <div className="midnight__heroMarqueeWrapper">
          <div className="midnight__heroMarquee">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="midnight__heroMarqueeInner">
                {MARQUEE_IMAGES.map((img, index) => (
                  <div
                    key={`img_${index}`}
                    className="midnight__heroMarqueeImageWrapper"
                  >
                    <img
                      src={img}
                      alt="Marquee"
                      className="midnight__heroMarqueeImage"
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="midnight__backgroundWrapper">
        <div className="midnight__background"></div>
        <div className="midnight__backgroundItemWrapper">
          <div className="midnight__backgroundItem midnight__backgroundItem1"></div>
          <div className="midnight__backgroundItem midnight__backgroundItem2"></div>
        </div>
        <Cursor />
      </div>
    </div>
  );
}

export default Midnight;
