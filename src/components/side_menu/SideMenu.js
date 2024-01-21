import React, { useState, useRef } from "react";
import gsap from "gsap";
import "./sideMenu.css";
import { useGSAP } from "@gsap/react";

export default function SideMenu() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const menuContentRef = useRef(null);

  const timelineRef = useRef(null);

  useGSAP(() => {
    setOpen(false);
    const timeline = gsap.timeline({
      defaults: { duration: 0.65, ease: "power2.inOut" },
    });
    timelineRef.current = timeline;

    // timeline.set(menuRef.current, {
    //   top: 0,
    //   right: 0,
    //   width: "100px",
    //   height: "25px",
    // });
    // timeline.set(menuContentRef.current, {
    //   opacity: 0,
    //   visibility: "none",
    // });

    const menuItems = gsap.utils.toArray(".sideMenu__nav--item");
    const footerItems = gsap.utils.toArray(".sideMenu__footer--item");
    timeline.set([menuItems, footerItems], {
      opacity: 0,
      rotateX: 90,
      translateY: 20,
      translateX: 20,
    });

    timeline
      .to(menuRef.current, {
        top: "2rem",
        right: "2rem",
        width: "400px",
        height: "525px",
      })
      .to(
        menuContentRef.current,
        {
          opacity: 1,
          visibility: "visible",
        },
        "-=.25",
      )
      .to(
        menuItems,
        {
          opacity: 1,
          rotateX: 0,
          translateY: 0,
          translateX: 0,
          stagger: 0.05,
        },
        "-=.75",
      )
      .to(
        footerItems,
        {
          opacity: 1,
          rotateX: 0,
          translateX: 0,
          translateY: 0,
        },
        "-=.5",
      );

    timeline.pause();
  });

  return (
    <div className="sideMenu__main">
      <div ref={menuRef} className="sideMenu__wrapper">
        <div ref={menuContentRef} className="sideMenu__nav--outer">
          <div className="sideMenu__nav--container">
            <ul>
              <li>
                <a href="/" className="sideMenu__nav--item">
                  Projects
                </a>
              </li>
              <li>
                <a href="/" className="sideMenu__nav--item">
                  Agency
                </a>
              </li>
              <li>
                <a href="/" className="sideMenu__nav--item">
                  Expertise
                </a>
              </li>
              <li>
                <a href="/" className="sideMenu__nav--item">
                  Careers
                </a>
              </li>
              <li>
                <a href="/" className="sideMenu__nav--item">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div className="sideMenu__footer--container">
            <div className="sideMenu__footer--inner">
              <ul>
                <li>
                  <a href="/" className="sideMenu__footer--item">
                    Facebook
                  </a>
                </li>
                <li>
                  <a href="/" className="sideMenu__footer--item">
                    Instagram
                  </a>
                </li>
              </ul>
            </div>
            <div className="sideMenu__footer--inner">
              <ul>
                <li>
                  <a href="/" className="sideMenu__footer--item">
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a href="/" className="sideMenu__footer--item">
                    X
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="sideMenu__btn--container">
        <button
          className={["sideMenu__btn", open ? "open" : ""].join(" ")}
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
          <div>
            <span className="sideMenu__btn--text">
              {open ? "close" : "menu"}
            </span>
            <span className="sideMenu__btn--text sideMenu__btn--textExtra">
              {open ? "close" : "menu"}
            </span>
          </div>
        </button>
      </div>
    </div>
  );
}
