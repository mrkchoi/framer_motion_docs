import React from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

function DetailView({ year, title, title2, img, location, material, path }) {
  const navigate = useNavigate();

  useGSAP(() => {
    gsap.set(".transition02__detailViewImg", {
      scale: 1.2,
    });
    const tl = gsap.timeline();

    tl.to(".transition02__detailViewImg", {
      duration: 1,
      scale: 1,
      ease: "power2.inOut",
    });
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
            <h1 className="transition02__detailViewTitle">{title}</h1>
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
                  gsap.to(".transition02__detailViewImg", {
                    duration: 1,
                    scale: 1.2,
                    ease: "power2.inOut",
                  });
                  navigate("/transition02");
                  // navigate("/transition02");
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
              <span className="transition02__detailViewContentRightItemDesc">
                {location}
              </span>
            </div>
            <div className="transition02__detailViewContentRightItem">
              <span className="transition02__detailViewContentRightItemTitle">
                MATERIAL
              </span>
              <span className="transition02__detailViewContentRightItemDesc">
                {material}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailView;
