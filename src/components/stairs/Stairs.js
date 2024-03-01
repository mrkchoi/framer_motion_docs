import React, { useState, useRef } from "react";
import "./stairs.css";
import gsap from "gsap";
import CustomEase from "gsap/CustomEase";

import projects1 from "./assets/projects1.jpg";
import projects2 from "./assets/projects2.jpg";
import contact1 from "./assets/contact1.jpg";
import contact2 from "./assets/contact2.jpg";
import agence1 from "./assets/agence1.jpg";
import agence2 from "./assets/agence2.jpg";

CustomEase.create("custom", "M0,0 C0.126,0.382 0.2,1 1,1 ");

const MENU_ITEMS = [
  {
    title: "Projects",
    description: "To See Everything",
    images: [projects1, projects2],
  },
  {
    title: "Agence",
    description: "To Learn Everything",
    images: [agence1, agence2],
  },
  {
    title: "Contact",
    description: "To Send a Fax",
    images: [contact1, contact2],
  },
];

function Stairs() {
  const [open, setOpen] = useState(false);
  const btnRef = useRef(null);

  const openMenu = () => {
    setOpen(true);
    btnRef.current.classList.add("stairs__menu--open");

    gsap.to(".stairs__navMain", {
      opacity: 1,
      visibility: "visible",
      duration: 0.5,
      ease: "custom",
      delay: 0.2,
    });
    gsap.to([".stairs__navWrapper"], {
      height: "100vh",
      duration: 0,
    });
    gsap.to([".stairs__navBackground"], {
      opacity: 1,
      duration: 0.5,
      ease: "custom",
    });
    gsap.to(".stairs__navStair", {
      height: "100%",
      duration: 0.5,
      stagger: 0.025,
      ease: "custom",
    });
    gsap.to(".stairs__navItemLinkText", {
      rotateX: 0,
      duration: 0.5,
      stagger: 0.1,
      ease: "custom",
    });
  };

  const closeMenu = () => {
    setOpen(false);
    btnRef.current.classList.remove("stairs__menu--open");
    gsap.to(".stairs__navMain", {
      opacity: 0,
      visibility: "hidden",
      duration: 0.5,
      ease: "custom",
      delay: 0.2,
    });
    gsap.to([".stairs__navBackground"], {
      opacity: 0,
      duration: 0.5,
      ease: "custom",
    });
    gsap.to(".stairs__navStair", {
      height: "0",
      duration: 0.5,
      stagger: 0.025,
      ease: "custom",
    });
    gsap.to(".stairs__navItemLinkText", {
      rotateX: "90deg",
      duration: 0.5,
      stagger: 0.01,
      ease: "custom",
    });
  };

  return (
    <div className="stairs__main">
      <header className="stairs__header">
        <button
          ref={btnRef}
          className="stairs__menu"
          onClick={() => {
            open ? closeMenu() : openMenu();
          }}
        >
          <div className="stairs__menuBg"></div>
          <svg
            className="stairs__menuSvg"
            width="50"
            height="7"
            viewBox="0 0 50 7"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line x1="0" y1="0.5" x2="50" y2="0.5" stroke="#eee"></line>
            <line x1="16" y1="6.5" x2="50" y2="6.5" stroke="#eee"></line>
          </svg>
          <span className="stairs__menuBtnContent">
            {open ? "Close" : "Menu"}
          </span>
        </button>
        <div className="stairs__navWrapper">
          <div className="stairs__navBackgroundWrapper">
            <div className="stairs__navBackground"></div>
            <div className="stairs__navStairsWrapper">
              {Array.from({ length: 8 }).map((_, idx) => (
                <div className="stairs__navStair" key={idx}></div>
              ))}
            </div>
            <div className="stairs__navMain">
              <ul className="stairs__navContent">
                {MENU_ITEMS.map((item, idx) => (
                  <StairsItem item={item} key={idx} />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

function StairsItem({ item }) {
  return (
    <li className="stairs__navItem">
      <a href="/stairs" className="stairs__navItemLink">
        <span className="stairs__navItemLinkText">{item.title}</span>
      </a>
      <div className="stairs__navItemOverlayWrapper">
        {Array.from({ length: 2 }).map((_, idx) => (
          <div key={idx} className="stairs__navItemOverlayOuter">
            <div className="stairs__navItemOverlayInner" key={idx}>
              <img
                src={item.images[0]}
                alt=""
                className="stairs__navItemOverlayImg"
              />
              <p className="stairs__navItemOverlayContent">
                {item.description}
              </p>
            </div>
            <div className="stairs__navItemOverlayInner">
              <img
                src={item.images[1]}
                alt=""
                className="stairs__navItemOverlayImg"
              />
              <p className="stairs__navItemOverlayContent">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </li>
  );
}

export default Stairs;
