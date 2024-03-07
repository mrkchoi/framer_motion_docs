import React, { useState, useRef, useEffect } from "react";
import "./rejouice.css";

import gsap from "gsap";
import CustomEase from "gsap/CustomEase";

CustomEase.create("cubic", "0.43, 0.195, 0.02, 1");

function Rejouice() {
  const [open, setOpen] = useState(false);
  const navRef = useRef(null);
  const navInnerRef = useRef(null);

  useEffect(() => {
    if (open) {
      navRef.current.classList.add("rejouice__navIsOpen");
    } else {
      navRef.current.classList.remove("rejouice__navIsOpen");
    }
  }, [open]);

  const openMenu = () => {
    setOpen(true);
    gsap.set(".rejouice__nav", {
      pointerEvents: "auto",
      height: "100vh",
    });
    gsap.set([".rejouice__navMenuItem", ".rejouice__navMenuBtn"], {
      y: 50,
      opacity: 0,
    });
    gsap.set(".rejouice__navFooterInner", {
      x: 500,
      opacity: 0,
    });
    gsap.to(".rejouice__navInner", {
      duration: 1,
      minHeight: "780px",
      height: "70vh",
      ease: "cubic",
    });
    gsap.to(".rejouice__navMainLeftImg", {
      duration: 1,
      scale: 1,
      ease: "cubic",
    });
    gsap.to(".rejouice__navMenuItem", {
      duration: 0.75,
      y: 0,
      opacity: 1,
      stagger: 0.075,
      ease: "cubic",
      delay: 0.15,
    });
    gsap.to(".rejouice__navMenuBtn", {
      duration: 0.5,
      y: 0,
      opacity: 1,
      ease: "cubic",
      delay: 0.5,
    });
    gsap.to(".rejouice__navFooterInner", {
      duration: 1,
      x: 0,
      opacity: 1,
      ease: "cubic",
      delay: 0.35,
    });
  };

  const closeMenu = () => {
    setOpen(false);
    gsap.set(".rejouice__nav", {
      pointerEvents: "none",
      height: 0,
    });
    gsap.to(".rejouice__navInner", {
      duration: 1,
      height: 0,
      minHeight: 0,
      ease: "cubic",
      delay: 0.3,
    });
    gsap.to(".rejouice__navMainLeftImg", {
      duration: 1,
      scale: 0,
      ease: "cubic",
      delay: 0.35,
    });
    gsap.to(".rejouice__navMenuItem", {
      duration: 1,
      y: 50,
      opacity: 0,
      stagger: -0.075,
      ease: "cubic",
      delay: 0.15,
    });
    gsap.to(".rejouice__navMenuBtn", {
      duration: 1,
      y: 50,
      opacity: 0,
      ease: "cubic",
      delay: 0.2,
    });
    gsap.to(".rejouice__navFooterInner", {
      duration: 1,
      x: 500,
      opacity: 0,
      ease: "cubic",
      delay: 0.5,
    });
  };

  return (
    <div className="rejouice__main">
      <header className="rejouice__header">
        <a href="/rejouice" className="rejouice__logo">
          The Venture Agency.
        </a>
        <button
          className="rejouice__btnUnderline rejouice__menuOpen"
          onClick={openMenu}
        >
          Menu
        </button>
        <div ref={navRef} className="rejouice__nav">
          <div ref={navInnerRef} className="rejouice__navInner">
            <div className="rejouice__navHeader">
              <a href="/rejouice" className="rejouice__logo">
                <svg
                  className=""
                  width="86"
                  height="16"
                  viewBox="0 0 86 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M41.184 10.736C41.184 14.912 38.304 17.336 34.992 17.336C31.68 17.336 28.8 14.936 28.8 10.736C28.8 6.56 31.68 4.184 34.992 4.184C38.304 4.184 41.184 6.536 41.184 10.736ZM0.96 17V9.968C0.96 6.008 3.72 4.376 6.288 4.376H7.536V6.44H6.24C4.296 6.44 3.072 7.736 3.072 10.136V17H0.96ZM8.016 10.736C8.016 6.632 10.632 4.136 14.112 4.184C18.12 4.232 19.968 7.304 19.968 10.376C19.968 10.736 19.944 11.072 19.896 11.432H10.224C10.416 14.192 12.168 15.392 14.232 15.392C16.176 15.392 17.328 14.504 17.736 13.04H19.896C19.464 15.56 17.352 17.336 14.184 17.336C10.848 17.336 8.016 15.152 8.016 10.736ZM10.272 9.608H17.736C17.472 7.112 15.888 6.128 14.064 6.128C12.096 6.128 10.584 7.136 10.272 9.608ZM20.472 17.144V15.08H21.768C23.712 15.08 24.936 13.784 24.936 11.384V4.52H27.048V11.552C27.048 15.512 24.288 17.144 21.72 17.144H20.472ZM24.552 1.52C24.552 0.727999 25.224 0.079999 25.992 0.079999C26.736 0.079999 27.408 0.727999 27.408 1.52C27.408 2.336 26.736 2.984 25.992 2.984C25.224 2.984 24.552 2.336 24.552 1.52ZM30.984 10.76C30.984 13.856 32.832 15.392 34.992 15.392C37.152 15.392 39 13.856 39 10.76C39 7.544 37.152 6.128 34.992 6.128C32.832 6.128 30.984 7.544 30.984 10.76ZM42.936 12.032V4.52H45.048V11.6C45.048 14.384 46.416 15.416 48.36 15.416C50.304 15.416 51.672 14.384 51.672 11.6V4.52H53.784V12.032C53.784 15.872 50.856 17.336 48.36 17.336C45.864 17.336 42.936 15.872 42.936 12.032ZM55.704 1.52C55.704 0.727999 56.376 0.079999 57.144 0.079999C57.888 0.079999 58.56 0.727999 58.56 1.52C58.56 2.336 57.888 2.984 57.144 2.984C56.376 2.984 55.704 2.336 55.704 1.52ZM56.088 17V4.52H58.2V17H56.088ZM59.952 10.736C59.952 6.56 62.808 4.184 66.12 4.184C69.216 4.184 71.736 5.792 71.976 9.2H69.84C69.552 6.896 67.968 6.128 66.072 6.128C63.936 6.128 62.136 7.544 62.136 10.76C62.136 13.856 63.912 15.392 66.096 15.392C68.016 15.392 69.528 14.264 69.84 11.96H71.976C71.736 15.416 69.264 17.336 66.144 17.336C62.784 17.336 59.952 14.936 59.952 10.736ZM73.056 10.736C73.056 6.632 75.672 4.136 79.152 4.184C83.16 4.232 85.008 7.304 85.008 10.376C85.008 10.736 84.984 11.072 84.936 11.432H75.264C75.456 14.192 77.208 15.392 79.272 15.392C81.216 15.392 82.368 14.504 82.776 13.04H84.936C84.504 15.56 82.392 17.336 79.224 17.336C75.888 17.336 73.056 15.152 73.056 10.736ZM75.312 9.608H82.776C82.512 7.112 80.928 6.128 79.104 6.128C77.136 6.128 75.624 7.136 75.312 9.608Z"
                    fill="#2D2B2B"
                  ></path>
                </svg>
              </a>
              <button
                className="rejouice__btnUnderline rejouice__menuClose"
                onClick={closeMenu}
              >
                Close
              </button>
            </div>
            <div className="rejouice__navMain">
              <div className="rejouice__navMainLeft">
                <div className="rejouice__navMainLeftImgWrapper">
                  {/* <img src={img} alt="" className="rejouice__navMainLeftImg" /> */}
                  <video
                    playsInline
                    loop
                    muted
                    autoPlay
                    className="rejouice__navMainLeftImg"
                    src="https://prismic-io.s3.amazonaws.com/rejouice/3c8eec5e-c857-4fd3-9add-a9e6035a160c_RJ-2.0-Video+background+5_1+%281%29.mp4"
                  ></video>
                  <div className="rejouice__navMainLeftImgFooter">
                    <div className="rejouice__navMainLeftImgFooterLeft">
                      <div className="rejouice__navMainLeftImgFooterLeftSvgWrapper">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="4"
                          height="6"
                          viewBox="0 0 4 6"
                          className=""
                        >
                          <path d="M3.47669 2.67493C3.73935 2.87702 3.7363 3.27408 3.47058 3.47212L0.864538 5.4143C0.537145 5.6583 0.0711485 5.42822 0.0657971 5.01995L0.013533 1.03249C0.00805605 0.614631 0.487176 0.374829 0.818385 0.629658L3.47669 2.67493Z"></path>
                        </svg>
                      </div>
                      <span className="rejouice__btnUnderline">Play reel</span>
                    </div>
                    <span className="rejouice__navMainLeftImgFooterRight">
                      -01:18
                    </span>
                  </div>
                </div>
              </div>
              <div className="rejouice__navMainRight">
                <ul className="rejouice__navMenu">
                  <li className="rejouice__navMenuItem">
                    <a href="/rejouice" className="rejouice__navMenuLink">
                      <span className="rejouice__navSpan1">Home</span>
                      <span className="rejouice__navSpan2">Home</span>
                    </a>
                  </li>
                  <li className="rejouice__navMenuItem">
                    <a href="/rejouice" className="rejouice__navMenuLink">
                      <span className="rejouice__navSpan1">Work</span>
                      <span className="rejouice__navSpan2">Work</span>
                    </a>
                  </li>
                  <li className="rejouice__navMenuItem">
                    <a href="/rejouice" className="rejouice__navMenuLink">
                      <span className="rejouice__navSpan1">
                        Services & Models
                      </span>
                      <span className="rejouice__navSpan2">
                        Services & Models
                      </span>
                    </a>
                  </li>
                  <li className="rejouice__navMenuItem">
                    <a href="/rejouice" className="rejouice__navMenuLink">
                      <span className="rejouice__navSpan1">About</span>
                      <span className="rejouice__navSpan2">About</span>
                    </a>
                  </li>
                  <li className="rejouice__navMenuItem">
                    <a href="/rejouice" className="rejouice__navMenuLink">
                      <span className="rejouice__navSpan1">Contact</span>
                      <span className="rejouice__navSpan2">Contact</span>
                    </a>
                  </li>
                </ul>
                <button className="rejouice__navMenuBtn">
                  <span className="rejouice__navMenuBtnSpan1">Take a seat</span>
                  <span className="rejouice__navMenuBtnSpan2">Take a seat</span>
                </button>
              </div>
            </div>
            <div className="rejouice__navFooter">
              <div className="rejouice__navFooterInner">
                <div className="rejouice__navFooterLeft">
                  <p className="rejouice__navFooterLeftContent">
                    Tomorrow's Brands, Today.™
                  </p>
                </div>
                <div className="rejouice__navFooterRight">
                  <ul className="rejouice__navFooterMenu">
                    <li className="rejouice__navFooterMenuItem">
                      <a href="/rejouice">
                        <span className="rejouice__btnUnderline">X</span>
                        <svg
                          className=""
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M6.82813 13.1411L13.1413 6.82841M13.1413 6.82841L7.48446 6.82841M13.1413 6.82841L13.1413 12.4853"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                        </svg>
                      </a>
                    </li>
                    <li className="rejouice__navFooterMenuItem">
                      <a href="/rejouice">
                        <span className="rejouice__btnUnderline">
                          Instagram
                        </span>
                        <svg
                          className=""
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M6.82813 13.1411L13.1413 6.82841M13.1413 6.82841L7.48446 6.82841M13.1413 6.82841L13.1413 12.4853"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                        </svg>
                      </a>
                    </li>
                    <li className="rejouice__navFooterMenuItem">
                      <a href="/rejouice">
                        <span className="rejouice__btnUnderline">LinkedIn</span>
                        <svg
                          className=""
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M6.82813 13.1411L13.1413 6.82841M13.1413 6.82841L7.48446 6.82841M13.1413 6.82841L13.1413 12.4853"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                        </svg>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <video
        loop
        muted
        playsInline
        autoPlay
        className="rejouice__mainVideo"
        src="https://prismic-io.s3.amazonaws.com/rejouice/658ef98d531ac2845a270509_RJ-2-0-Videobackground_compressed.mp4"
      ></video>
      <div className="rejouice__mainFooter">
        <svg
          className="rejouice__mainFooterSvg"
          viewBox="0 0 86 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M41.184 10.736C41.184 14.912 38.304 17.336 34.992 17.336C31.68 17.336 28.8 14.936 28.8 10.736C28.8 6.56 31.68 4.184 34.992 4.184C38.304 4.184 41.184 6.536 41.184 10.736ZM0.96 17V9.968C0.96 6.008 3.72 4.376 6.288 4.376H7.536V6.44H6.24C4.296 6.44 3.072 7.736 3.072 10.136V17H0.96ZM8.016 10.736C8.016 6.632 10.632 4.136 14.112 4.184C18.12 4.232 19.968 7.304 19.968 10.376C19.968 10.736 19.944 11.072 19.896 11.432H10.224C10.416 14.192 12.168 15.392 14.232 15.392C16.176 15.392 17.328 14.504 17.736 13.04H19.896C19.464 15.56 17.352 17.336 14.184 17.336C10.848 17.336 8.016 15.152 8.016 10.736ZM10.272 9.608H17.736C17.472 7.112 15.888 6.128 14.064 6.128C12.096 6.128 10.584 7.136 10.272 9.608ZM20.472 17.144V15.08H21.768C23.712 15.08 24.936 13.784 24.936 11.384V4.52H27.048V11.552C27.048 15.512 24.288 17.144 21.72 17.144H20.472ZM24.552 1.52C24.552 0.727999 25.224 0.079999 25.992 0.079999C26.736 0.079999 27.408 0.727999 27.408 1.52C27.408 2.336 26.736 2.984 25.992 2.984C25.224 2.984 24.552 2.336 24.552 1.52ZM30.984 10.76C30.984 13.856 32.832 15.392 34.992 15.392C37.152 15.392 39 13.856 39 10.76C39 7.544 37.152 6.128 34.992 6.128C32.832 6.128 30.984 7.544 30.984 10.76ZM42.936 12.032V4.52H45.048V11.6C45.048 14.384 46.416 15.416 48.36 15.416C50.304 15.416 51.672 14.384 51.672 11.6V4.52H53.784V12.032C53.784 15.872 50.856 17.336 48.36 17.336C45.864 17.336 42.936 15.872 42.936 12.032ZM55.704 1.52C55.704 0.727999 56.376 0.079999 57.144 0.079999C57.888 0.079999 58.56 0.727999 58.56 1.52C58.56 2.336 57.888 2.984 57.144 2.984C56.376 2.984 55.704 2.336 55.704 1.52ZM56.088 17V4.52H58.2V17H56.088ZM59.952 10.736C59.952 6.56 62.808 4.184 66.12 4.184C69.216 4.184 71.736 5.792 71.976 9.2H69.84C69.552 6.896 67.968 6.128 66.072 6.128C63.936 6.128 62.136 7.544 62.136 10.76C62.136 13.856 63.912 15.392 66.096 15.392C68.016 15.392 69.528 14.264 69.84 11.96H71.976C71.736 15.416 69.264 17.336 66.144 17.336C62.784 17.336 59.952 14.936 59.952 10.736ZM73.056 10.736C73.056 6.632 75.672 4.136 79.152 4.184C83.16 4.232 85.008 7.304 85.008 10.376C85.008 10.736 84.984 11.072 84.936 11.432H75.264C75.456 14.192 77.208 15.392 79.272 15.392C81.216 15.392 82.368 14.504 82.776 13.04H84.936C84.504 15.56 82.392 17.336 79.224 17.336C75.888 17.336 73.056 15.152 73.056 10.736ZM75.312 9.608H82.776C82.512 7.112 80.928 6.128 79.104 6.128C77.136 6.128 75.624 7.136 75.312 9.608Z"
            fill="#fffcf1"
          ></path>
        </svg>
      </div>
    </div>
  );
}

export default Rejouice;
