import React, { useLayoutEffect } from "react";
import img01 from "../assets/home/04_poulsen.jpeg";
import img02 from "../assets/poulsen/02_poulsen.webp";
import img03 from "../assets/poulsen/03_poulsen.webp";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Flip from "gsap/Flip";

function Poulsen() {
  useGSAP(() => {
    gsap.set(".poulsen__img1", { opacity: 0 });
    const tl = gsap.timeline();
    tl.to(".poulsen__img1", {
      opacity: 1,
      duration: 0.5,
      ease: "cubic",
    });
  });

  useLayoutEffect(() => {
    const tl = gsap.timeline();
    gsap.set([".poulsen__headerTextChar", ".poulsen__headerSubtitleChar"], {
      y: "100%",
    });
    gsap.set(".poulsen__descriptionWrapper", { opacity: 0 });
    const img = document.querySelector(".mason__transitionImgWrapper img");
    if (img) {
      const state = Flip.getState(img, {
        absolute: true,
      });
      const newParent = document.querySelector(".poulsen__imgWrapperOverlay");
      newParent.appendChild(img);
      Flip.from(state, {
        absolute: true,
        duration: 2,
        ease: "cubic",
        onComplete: () => {
          newParent.removeChild(img);
          tl.to(".poulsen__headerTextChar", {
            y: 0,
            duration: 1,
            ease: "cubic",
            stagger: 0.05,
          });
          tl.to(
            ".poulsen__headerSubtitleChar",
            {
              y: 0,
              duration: 1,
              ease: "cubic",
              stagger: 0.05,
            },
            "<",
          );
          tl.to(
            ".poulsen__descriptionWrapper",
            {
              opacity: 1,
              duration: 3,
              ease: "cubic",
            },
            "-=0.75",
          );
        },
      });
      return;
    }
    tl.to(".poulsen__headerTextChar", {
      y: 0,
      duration: 1,
      ease: "cubic",
      stagger: 0.05,
    });
    tl.to(
      ".poulsen__headerSubtitleChar",
      {
        y: 0,
        duration: 1,
        ease: "cubic",
        stagger: 0.05,
      },
      "<",
    );
    tl.to(
      ".poulsen__descriptionWrapper",
      {
        opacity: 1,
        duration: 3,
        ease: "cubic",
      },
      "-=0.75",
    );
  }, []);

  return (
    <div className="poulsen__wrapper">
      <header className="poulsen__headerWrapper">
        <div className="poulsen__headerTextWrapper">
          <h1 className="poulsen__headerText" aria-label="Louis Poulsen">
            {"Louis Poulsen".split("").map((char, idx) => (
              <span key={idx} className="poulsen__headerTextChar">
                {char}
              </span>
            ))}
          </h1>
          <h2 className="poulsen__headerSubtitle" aria-label="(2022)">
            {"(2022)".split("").map((char, idx) => (
              <span key={idx} className="poulsen__headerSubtitleChar">
                {char}
              </span>
            ))}
          </h2>
        </div>
        <div className="poulsen__descriptionWrapper">
          <div className="poulsen__descriptionItem">
            <span className="poulsen__descriptionTitle">Services</span>
            <span className="poulsen__descriptionSubtitle">
              [Art Direction]
            </span>
          </div>
          <div className="poulsen__descriptionRight">
            <div className="poulsen__descriptionItem">
              <span className="poulsen__descriptionTitle">Client</span>
              <span className="poulsen__descriptionSubtitle">
                [Louis Poulsen]
              </span>
            </div>
            <div className="poulsen__descriptionItem">
              <span className="poulsen__descriptionTitle">Agency</span>
              <span className="poulsen__descriptionSubtitle">[Frame]</span>
            </div>
          </div>
        </div>
      </header>
      <div className="poulsen__ImgWrapper poulsen__ImgWrapper1">
        <img src={img01} alt="" className="poulsen__img poulsen__img1" />
        <div className="poulsen__imgWrapperOverlay"></div>
      </div>
      <div className="poulsen__contentWrapper">
        <div className="poulsen__contentLeftWrapper">
          <span className="poulsen__contentLeft">01.</span>
        </div>
        <div className="poulsen__contentRightWrapper">
          <div className="poulsen__contentRightTop">
            <span className="poulsen__contentRightTopText">
              <span>classic design</span> STANDS THE TEST OF TIME.
            </span>
          </div>
          <div className="poulsen__contentRightBottom">
            <div className="poulsen__contentRightBottomLeft">
              <span>[Project Info]</span>
            </div>
            <div className="poulsen__contentRightBottomRight">
              <span className="poulsen__contentRightBottomRightTitle">
                (Re)Discover Iconic Designs
              </span>
              <span className="poulsen__contentRightBottomRightSubtitle">
                I was brought onto this project by Frame to help create the art
                direction for Louis Poulsens 2023 campaign, 'Icons'. The
                creative challenge for this campaign was to portray nine very
                distinct products (both iconic and new designs) in a coherent,
                sophisticsted yet contemporary setting.
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="poulsen__ImgWrapper poulsen__ImgWrapper2">
        <img src={img02} alt="" className="poulsen__img poulsen__img2" />
      </div>
      <div className="poulsen__ImgWrapper poulsen__ImgWrapper3">
        <img src={img03} alt="" className="poulsen__img poulsen__img3" />
      </div>
    </div>
  );
}

export default Poulsen;
