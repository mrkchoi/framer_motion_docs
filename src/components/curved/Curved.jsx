import React, { useState } from "react";
import gsap from "gsap";
import CustomEase from "gsap/CustomEase";

import "./curved.css";

const NAV_ITEMS = [
  {
    title: "Home",
    link: "/curved",
  },
  {
    title: "Work",
    link: "/curved",
  },
  {
    title: "About",
    link: "/curved",
  },
  {
    title: "Contact",
    link: "/curved",
  },
];

const FOOTER_ITEMS = [
  {
    title: "Awwwards",
    link: "/curved",
  },
  {
    title: "Instagram",
    link: "/curved",
  },
  {
    title: "Dribbble",
    link: "/curved",
  },
  {
    title: "LinkedIn",
    link: "/curved",
  },
];

const COLORS = ["#194e6c", "#dc321e", "#ffaa00", "#ff7000"];

function Curved() {
  CustomEase.create("curved_cubic", "0.76, 0, 0.24, 1");
  const [open, setOpen] = useState(false);

  const convexPath = `M100 0 L200 0 L200 ${window.innerHeight} L100 ${
    window.innerHeight
  } Q-100 ${window.innerHeight / 2} 100 0`;
  const concavePath = `M100 0 L200 0 L200 ${window.innerHeight} L100 ${
    window.innerHeight
  } Q200 ${window.innerHeight / 2} 100 0`;
  const basePath = `M100 0 L200 0 L200 ${window.innerHeight} L100 ${
    window.innerHeight
  } Q100 ${window.innerHeight / 2} 100 0`;

  const handleMenuClick = () => {
    setOpen(!open);
    const tl = gsap.timeline({ defaults: { ease: "curved_cubic" } });

    if (!open) {
      gsap.set(".curved__svgPath", { attr: { d: convexPath } });
      // gsap.set(".curved__menuWrapper", {
      //   xPercent: 100,
      //   x: "100px",
      // });
      gsap.set(".curved__menuLinkText", {
        y: "100%",
        opacity: 0,
      });
      gsap.set([".curved__footerMenu", ".curved__menuHeader"], {
        opacity: 0,
        x: "50%",
      });
      // gsap.set(".curved__menuHeader", {
      //   opacity: 0,
      // });
      // tl.to(".curved__menuWrapper", {
      //   xPercent: 0,
      //   x: "0",
      //   duration: 1,
      // });
      tl.to(
        ".curved__svgPath",
        {
          attr: { d: basePath },
          duration: 1,
          ease: "curved_cubic",
        },
        // "<",
      );
      tl.to(
        ".curved__menuLinkText",
        {
          y: "0%",
          opacity: 1,
          duration: 0.75,
          stagger: 0.1,
          ease: "curved_cubic",
        },
        "<",
      );
      tl.to(
        [".curved__footerMenu", ".curved__menuHeader"],
        {
          x: "0",
          opacity: 1,
          duration: 1,
          delay: 0.1,
          ease: "curved_cubic",
        },
        "<",
      );
      return;
    }
    // tl.to(
    //   ".curved__menuWrapper",
    //   {
    //     xPercent: 100,
    //     x: "100px",
    //     duration: 1,
    //   },
    //   "<",
    // );
    tl.to(".curved__svgPath", {
      attr: { d: convexPath },
      duration: 1,
      ease: "curved_cubic",
    });
    tl.to(
      ".curved__menuLinkText",
      {
        y: "100%",
        opacity: 0,
        duration: 1,
        ease: "curved_cubic",
      },
      "<",
    );
    tl.to(
      [".curved__footerMenu", ".curved__menuHeader"],
      {
        x: "100%",
        opacity: 0,
        duration: 1,
        ease: "curved_cubic",
      },
      "<",
    );
  };

  const handleMouseEnter = (e, itemIdx) => {
    const target = e.target;
    const item = target.closest(".curved__menuItem");
    const chars = item.querySelectorAll(".curved__menuLinkTextChar");
    chars.forEach((char, charIdx) => {
      char.classList.add(
        `shake${
          itemIdx % 2 === 0 ? ((charIdx + 1) % 2) + 1 : (charIdx % 2) + 1
        }`,
      );
      const interval = setInterval(() => {
        const randomColor = COLORS[Math.floor(Math.random() * COLORS.length)];
        char.style.color = `${randomColor}`;
      }, 125);
      setTimeout(() => {
        clearInterval(interval);
        char.style.color = "";
      }, 400);
    });
  };
  const handleMouseLeave = (e) => {
    const target = e.target;
    const item = target.closest(".curved__menuItem");
    const chars = item.querySelectorAll(".curved__menuLinkTextChar");
    chars.forEach((char) => {
      char.classList.remove("shake1", "shake2");
      char.style.color = "";
    });
  };

  return (
    <div className="curved__main">
      <div className="curved__navWrapper">
        <button
          className={["curved__btn", open ? "active" : ""].join(" ")}
          onClick={handleMenuClick}
          aria-label="nav-button"
        >
          <div className="curved__burger"></div>
        </button>
        <div
          // className={["curved__menuWrapper"].join(" ")}
          className={["curved__menuWrapper", open ? "active" : ""].join(" ")}
        >
          <div className="curved__menuMain">
            <div className="curved__menuHeader">Navigation</div>
            <ul className="curved__menu">
              {NAV_ITEMS.map((item, itemIdx) => (
                <li key={itemIdx} className="curved__menuItem">
                  <a
                    href="/curved"
                    className="curved__menuLink"
                    onMouseEnter={(e) => handleMouseEnter(e, itemIdx)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <span className="curved__menuLinkText">
                      {item.title.split("").map((char, charIdx) => (
                        <span
                          key={charIdx}
                          className="curved__menuLinkTextChar"
                        >
                          {char}
                        </span>
                      ))}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="curved__menuFooter">
            <ul className="curved__footerMenu">
              {FOOTER_ITEMS.map((item, idx) => (
                <li key={idx} className="curved__footerMenuItem">
                  <a href="/curved" className="curved__footerLink">
                    <span className="curved__footerLinkText">{item.title}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <svg className="curved__svg">
            <path className="curved__svgPath" d={basePath}></path>
          </svg>
        </div>
      </div>
    </div>
  );
}

export default Curved;
