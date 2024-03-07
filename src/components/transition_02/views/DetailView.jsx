import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import SplitType from "split-type";

function DetailView({ year, title, title2, img, location, material, path }) {
  const navigate = useNavigate();
  const timelineRef = useRef(null);

  useGSAP(() => {
    const titleChars = new SplitType(".transition02__detailViewTitle");
    const leftTitleChars = new SplitType(
      ".transition02__detailViewContentLeftTopSpan",
    );
    const rightTitleChars = new SplitType(
      ".transition02__detailViewContentRightItemTitle",
    );

    const tl = gsap.timeline();
    timelineRef.current = tl;

    tl.add("primary", 0);
    tl.add("secondary", 0.3);

    tl.set(".transition02__detailViewImg", {
      scale: 1.2,
    });
    tl.set(".transition02__detailView", {
      overflow: "hidden",
    });

    tl.from(
      titleChars.chars,
      {
        duration: 1,
        y: 100,
        opacity: 0,
        stagger: 0.05,
        ease: "power2.inOut",
      },
      "start",
    );
    tl.from(
      leftTitleChars.lines,
      {
        duration: 1,
        y: 100,
        opacity: 0,
        stagger: 0.05,
        ease: "power2.inOut",
      },
      "secondary",
    );
    tl.from(
      rightTitleChars.lines,
      {
        duration: 1,
        y: 100,
        opacity: 0,
        stagger: 0.05,
        ease: "power2.inOut",
      },
      "secondary",
    );
    tl.from(
      ".transition02__detailViewContentRightItemDesc",
      {
        duration: 1,
        y: 100,
        opacity: 0,
        ease: "power2.inOut",
      },
      "secondary",
    );
    tl.from(
      ".transition02__detailViewContentLeftBottomBtn",
      {
        duration: 1,
        y: 100,
        opacity: 0,
        ease: "power2.inOut",
      },
      "secondary",
    );

    tl.to(
      ".transition02__detailViewImg",
      {
        duration: 1,
        scale: 1,
        ease: "power2.inOut",
      },
      "primary",
    );
    tl.to(".transition02__detailView", {
      overflow: "visible",
    });

    tl.play();
  });

  return (
    <div className="transition02__view transition02__detailView">
      <div className="transition02__detailViewContainer">
        <div className="transition02__detailViewImgWrapper">
          <div
            className="transition02__detailViewImg"
            style={{ backgroundImage: `url(${img})` }}
          ></div>
          <div className="transition02__detailViewImgOverlay">
            <div className="transition02__detailViewTitleWrapper">
              <h1 className="transition02__detailViewTitle">{title}</h1>
            </div>
          </div>
        </div>
        <div className="transition02__detailViewContent">
          <div className="transition02__detailViewContentLeft">
            <div className="transition02__detailViewContentLeftTop">
              <span className="transition02__detailViewContentLeftTopSpan">
                {title2}
              </span>
              <span className="transition02__detailViewContentLeftTopSpan">
                {year}
              </span>
            </div>
            <div className="transition02__detailViewContentLeftBottom">
              <button
                className="transition02__detailViewContentLeftBottomBtn"
                onClick={() => {
                  timelineRef.current.reverse();
                  setTimeout(() => {
                    navigate("/transition02");
                  }, 500);
                }}
              >
                <svg width="100" height="18" viewBox="0 0 50 9">
                  <path
                    vectorEffect="non-scaling-stroke"
                    d="m0 4.5 5-3m-5 3 5 3m45-3h-77"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
          <div className="transition02__detailViewContentRight">
            <div className="transition02__detailViewContentRightItem">
              <span className="transition02__detailViewContentRightItemTitle">
                LOCATION
              </span>
              <div className="transition02__detailViewContentRightItemDesc">
                {location}
              </div>
            </div>
            <div className="transition02__detailViewContentRightItem">
              <span className="transition02__detailViewContentRightItemTitle">
                MATERIAL
              </span>
              <div className="transition02__detailViewContentRightItemDesc">
                {material}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailView;
