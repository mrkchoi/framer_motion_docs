import React, { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import { NavLink } from "react-router-dom";
import gsap from "gsap";
import Flip from "gsap/Flip";
import CustomEase from "gsap/CustomEase";

import "./mason.css";

import ViewRoutes from "./ViewRoutes";

const PAGES = [
  {
    title: "Index,",
    url: "/mason",
  },
  {
    title: "Patreon,",
    url: "/mason",
  },
  {
    title: "Store,",
    url: "/mason",
  },
  {
    title: "About,",
    url: "/mason",
  },
  {
    title: "Lab",
    url: "/mason",
  },
];

gsap.registerPlugin(Flip);
gsap.registerPlugin(CustomEase);
CustomEase.create("cubic", "0.19, 1, 0.22, 1");

function Mason() {
  useEffect(() => {
    const lenis = new Lenis();

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    const body = document.querySelector("body");
    body.classList.add("mason__scrollbar");

    return () => {
      body.classList.remove("mason__scrollbar");
    };
  }, []);

  return (
    <div className="mason__main">
      <header className="mason__headerWrapper">
        <span className="mason__headerLeft">3D, Motion, Art direction</span>
        <nav className="mason__headerNavWrapper">
          <ul className="mason__nav">
            {PAGES.map((page) => (
              <li
                key={page.title}
                className={[
                  "mason__navItem",
                  page.title === "Index," ? "mason__navItem--active" : "",
                ].join(" ")}
              >
                <NavLink to={page.url} className="mason__navLink">
                  {page.title}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mason__headerRight">
          <button className="mason__headerRightBtn">Send me a message</button>
        </div>
      </header>
      <ViewRoutes />
      <div className="mason__transitionImgWrapper"></div>
    </div>
  );
}

export default Mason;
