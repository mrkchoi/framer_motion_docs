// Reference: https://zajno.com/

import React from "react";
import { Suspense, useEffect, useState, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrthographicCamera } from "@react-three/drei";
import gsap from "gsap";

import Scene from "./Scene";
import "./pixel01.css";

import img01 from "./assets/images/zajno01.png";
import img02 from "./assets/images/zajno02.webp";

import workImg01 from "./assets/images/work/img01.png";
import workImg02 from "./assets/images/work/img02.png";
import workImg03 from "./assets/images/work/img03.png";
import workImg04 from "./assets/images/work/img04.avif";
import workImg05 from "./assets/images/work/img05.avif";

import studioImg01 from "./assets/images/studio/img01.avif";

import playgroundImg01 from "./assets/images/playground/img01.avif";
import playgroundImg02 from "./assets/images/playground/img02.avif";
import playgroundImg03 from "./assets/images/playground/img03.avif";
import playgroundImg04 from "./assets/images/playground/img04.avif";
import playgroundImg05 from "./assets/images/playground/img05.avif";
import playgroundImg06 from "./assets/images/playground/img06.avif";

const PLAYGROUND_DATA = [
  {
    title: "Motion.ed - 2023",
    img: playgroundImg01,
  },
  {
    title: "The power of sound - 2019",
    img: playgroundImg02,
  },
  {
    title: "TL/E - 2023",
    img: playgroundImg03,
  },
  {
    title: "Zajno Grid - 2018",
    img: playgroundImg04,
  },
  {
    title: "Playlists - 2020",
    img: playgroundImg05,
  },
  {
    title: "Journey - Coming soon",
    img: playgroundImg06,
  },
];

const WORK_DATA = [
  {
    idx: "01",
    title: "Brightmark",
    industry: "Technology",
    description: "Design & development of the website's 3 pages",
    awards: ["Awwwards x 1", "CSSDA x 3"],
    img: workImg01,
  },
  {
    idx: "02",
    title: "Ooki",
    industry: "Crypto",
    description:
      "Homepage design, 2D illustrations, animations, visual identity",
    awards: ["Awwwards x 1", "CSSDA x 4"],
    img: workImg02,
  },
  {
    idx: "03",
    title: "8Finance",
    industry: "Crypto",
    description: "Full-cycle website creation, branding",
    awards: ["Awwwards x 1", "CSSDA x 4"],
    img: workImg03,
  },
  {
    idx: "04",
    title: "Altered state machine",
    industry: "Technology",
    description: "Full-cycle website creation, branding",
    awards: ["Awwwards x 2", "CSSDA x 4"],
    img: workImg04,
  },
  {
    idx: "05",
    title: "Maslo",
    industry: "AI Platform and app",
    description: "Full-cycle website creation",
    awards: ["Awwwards x 2", "CSSDA x 4"],
    img: workImg05,
  },
];

const SERVICES = [
  "Web Design",
  "Web Development",
  "Mobile Apps",
  "Branding",
  "Motion Graphics",
  "3D Illustration",
  "Sound Design",
  "Webflow",
];

const STATS = [
  "Founded 2015",
  "Clients 300+",
  "Countries 12",
  "Awwwards 62",
  'Team 28"',
];

const PERSPECTIVE = 1000;
const FOV =
  (180 * (2 * Math.atan(window.innerHeight / 2 / PERSPECTIVE))) / Math.PI;

const lerp = (start, end, t) => {
  return start * (1 - t) + end * t;
};
let current = 0;
let target = 0;
let ease = 0.075;

function Pixel01() {
  const scrollableRef = useRef(null);
  const [images, setImages] = useState([]);

  useEffect(() => {
    // get all images from DOM and set them to state for use in canvas scene
    const allImages = [...document.querySelectorAll(".pixel01__sectionImg")];
    setImages(allImages);
  }, []);

  // SMOOTH SCROLL SYNC SETUP
  useEffect(() => {
    // UPDATE SCROLLABLE CONTAINER Y POSITION IN ANIMATION LOOP
    const smoothScroll = () => {
      target = window.scrollY;
      current = lerp(current, target, ease);
      if (scrollableRef.current) {
        scrollableRef.current.style.transform = `
        translate3d(0, -${current}px, 0)
        `;
        document.body.style.height = `${
          scrollableRef.current.getBoundingClientRect().height
        }px`;
      }
      requestAnimationFrame(smoothScroll);
    };
    smoothScroll();

    return () => {
      cancelAnimationFrame(smoothScroll);
      document.body.style.height = "";
    };
  }, []);

  return (
    <div className="pixel01__main">
      <div className="pixel01__canvasWrapper">
        <Canvas>
          <OrthographicCamera
            makeDefault
            position={[0, 0, PERSPECTIVE]}
            zoom={1}
            fov={FOV}
            aspect={window.innerWidth / window.innerHeight}
            near={0.01}
            far={2000}
          />
          <Suspense fallback={<span>loading...</span>}>
            <Scene images={images} />
          </Suspense>
        </Canvas>
      </div>
      <section ref={scrollableRef} className="pixel01__scrollable">
        <header className="pixel01__headerWrapper">
          <div className="pixel01__headerLogoWrapper">
            <a href="/pixel01 pixel01__btnUnderline">
              <span className="pixel01__headerLogoSpan">
                zajno<span>©</span>
              </span>
            </a>
          </div>
          <div className="pixel01__headerDescriptionWrapper">
            <div className="pixel01__headerDescriptionRow">digital studio</div>
          </div>
          <div className="pixel01__headerLinksWrapper">
            <ul className="pixel01__headerNav">
              <li className="pixel01__headerNavItem">
                <a
                  className="pixel01__headerNavItemLink pixel01__btnUnderline"
                  href="/pixel01"
                >
                  work
                </a>
              </li>
              <li className="pixel01__headerNavItem">
                <a
                  className="pixel01__headerNavItemLink pixel01__btnUnderline"
                  href="/pixel01"
                >
                  studio
                </a>
              </li>
              <li className="pixel01__headerNavItem">
                <a
                  className="pixel01__headerNavItemLink pixel01__btnUnderline"
                  href="/pixel01"
                >
                  contact
                </a>
              </li>
            </ul>
          </div>
          <div className="pixel01__headerSocialWrapper">
            <ul className="pixel01__headerSocialLinks">
              <li className="pixel01__headerSocialItem">
                <a
                  className="pixel01__headerSocialItemLink pixel01__btnUnderline"
                  href="/pixel01"
                >
                  twitter
                </a>
              </li>
              <li className="pixel01__headerSocialItem">
                <a
                  className="pixel01__headerSocialItemLink pixel01__btnUnderline"
                  href="/pixel01"
                >
                  instagram
                </a>
              </li>
            </ul>
          </div>
          <div className="pixel01__headerLocationWrapper">
            <div className="pixel01__headerLocationRow">los angeles, ca</div>
          </div>
        </header>
        <section className="pixel01__section">
          <div className="pixel01__sectionImgWrapperOuter">
            <div className="pixel01__sectionImgWrapper">
              <img
                src={img01}
                alt="zajno"
                className="pixel01__sectionImg"
                data-shift={0}
              />
            </div>
          </div>
        </section>
        <section className="pixel01__section pixel01__section2">
          <div className="pixel01__sectionImgWrapperOuter">
            <div className="pixel01__sectionImgWrapper pixel01__sectionImgWrapper2">
              <img
                src={img02}
                alt="zajno"
                className="pixel01__sectionImg"
                data-shift={1}
              />
            </div>
            <div className="pixel01__sectionImgOverlay">
              <button className="pixel01__sectionImgOvelayBtn">
                <div className="pixel01__sectionImgOvelayBtnIcon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className=""
                    viewBox="0 0 16 16"
                  >
                    <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393" />
                  </svg>
                </div>
                <div className="pixel01__sectionImgOvelayBtnText">
                  <span className="pixel01__sectionImgOvelayBtnTitle">
                    Watch Showreel
                  </span>
                  <span className="pixel01__sectionImgOvelayBtnSubtitle">
                    2015-23
                  </span>
                </div>
              </button>
            </div>
          </div>
        </section>
        <section className="pixel01__section pixel01__work">
          <div className="pixel01__workMainWrapper">
            <div className="pixel01__workMainHeader">
              <div className="pixel01__workTitleWrapper">
                <div className="pixel01__workTitleInner">
                  <h2 className="pixel01__workTitle">Work</h2>
                  <span className="pixel01__workIcon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      fill="currentColor"
                      className=""
                      viewBox="0 0 32 32"
                    >
                      <polygon points="14,7 14,15.923 2.976,4.899 0.148,7.728 11.42,19 2,19 2,23 14,23 18,23 18,19 18,7"></polygon>
                    </svg>
                  </span>
                </div>
              </div>
              <p className="pixel01__workMainDescription">
                At Zajno, we know your time is precious, and that's why we
                prioritize simplicity and efficiency. Our team has the expertise
                and creativity to handle everything from research and planning
                to custom design and development, freeing you from the burden of
                micromanagement.
              </p>
              <span className="pixel01__workMainYear">©2015-24</span>
            </div>
            <nav className="pixel01__workMainNav">
              <ul className="pixel01__workMainNavList">
                {WORK_DATA.map((work, idx) => (
                  <li key={idx} className="pixel01__workMainNavItem">
                    <a href="/pixel01" className="pixel01__workMainNavItemLink">
                      <span className="pixel01__workMainNavItemLinkIdx">
                        {work.idx}
                      </span>
                      <div className="pixel01__workMainNavItemLinkSubtitleWrapper">
                        <span className="pixel01__workMainNavItemLinkSubtitle">
                          {work.description}
                        </span>
                        <div className="pixel01__workMainNavItemLinkAwardsWrapper">
                          {work.awards.map((award, awardIdx) => (
                            <div
                              key={awardIdx}
                              className="pixel01__workMainNavItemLinkAwardOuter"
                            >
                              <span
                                className={[
                                  "pixel01__workMainNavItemLinkAward",
                                  awardIdx === 0
                                    ? ""
                                    : "pixel01__workMainNavItemLinkAward2",
                                ].join(" ")}
                              >
                                {award}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="pixel01__workMainNavItemLinkTitleWrapper">
                        <span className="pixel01__workMainNavItemLinkTitle">
                          {work.title}
                        </span>
                        <span className="pixel01__workMainNavItemLinkTitle pixel01__workMainNavItemLinkTitle2">
                          {work.industry}
                        </span>
                      </div>
                      <div className="pixel01__workMainNavItemLinkImgWrapper">
                        <img
                          src={work.img}
                          alt="zajno"
                          className="pixel01__workMainNavItemLinkImg pixel01__sectionImg"
                        />
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </section>
        <div className="pixel01__divider"></div>
        <section className="pixel01__section pixel01__studio">
          <div className="pixel01__studioHeader">
            <div className="pixel01__studioTitleWrapper">
              <h2 className="pixel01__studioTitle">Studio</h2>
              <span className="pixel01__workIcon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  fill="currentColor"
                  className=""
                  viewBox="0 0 32 32"
                >
                  <polygon points="14,7 14,15.923 2.976,4.899 0.148,7.728 11.42,19 2,19 2,23 14,23 18,23 18,19 18,7"></polygon>
                </svg>
              </span>
            </div>
            <p className="pixel01__studioDescription">
              We're a digital design studio that's all about breaking the mold!
              We don't do boring websites or ordinary apps - we specialize in
              crafting the wildest, most unconventional digital experiences out
              there.
            </p>
          </div>
          <div className="pixel01__studioMain">
            <div className="pixel01__studioMainImgWrapper">
              <img
                src={studioImg01}
                alt="zajno"
                className="pixel01__studioMainImg pixel01__sectionImg"
              />
            </div>
            <div className="pixel01__studioMainTextWrapper">
              <div className="pixel01__studioMainText">
                <div className="pixel01__studioMainTextInner">
                  <div className="pixel01__studioMainTextLineWrapper">
                    <div className="pixel01__studioMainTextLine"></div>
                  </div>
                  <h3 className="pixel01__studioMainTextTitle">Services:</h3>
                  <ul className="pixel01__studioList">
                    {SERVICES.map((service, idx) => (
                      <li key={idx} className="pixel01__studioListItem">
                        <span className="pixel01__studioListItemTitle">
                          {service}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="pixel01__studioMainText">
                <div className="pixel01__studioMainTextInner">
                  <div className="pixel01__studioMainTextLineWrapper">
                    <div className="pixel01__studioMainTextLine"></div>
                  </div>
                  <h3 className="pixel01__studioMainTextTitle">Stats:</h3>
                  <ul className="pixel01__studioList">
                    {STATS.map((stat, idx) => (
                      <li key={idx} className="pixel01__studioListItem">
                        <span className="pixel01__studioListItemTitle">
                          {stat}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="pixel01__divider"></div>
        <section className="pixel01__section pixel01__playground">
          <div className="pixel01__playgroundBgWrapper">
            <span className="pixel01__playgroundBg">715</span>
          </div>
          <div className="pixel01__playgroundHeader">
            <div className="pixel01__playgroundTitleWrapper">
              <h2 className="pixel01__playgroundTitle">Playground Z15™</h2>
              <span className="pixel01__workIcon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  fill="currentColor"
                  className=""
                  viewBox="0 0 32 32"
                >
                  <polygon points="14,7 14,15.923 2.976,4.899 0.148,7.728 11.42,19 2,19 2,23 14,23 18,23 18,19 18,7"></polygon>
                </svg>
              </span>
            </div>
            <div className="pixel01__playgroundDescriptionWrapper">
              <div className="pixel01__studioMainTextLineWrapper">
                <div className="pixel01__studioMainTextLine"></div>
              </div>
              <p className="pixel01__playgroundDescription">
                We dare to be different: to experiment, innovate, bring things
                into being, and spark emotions in the hearts of people
                interacting with us. We proudly stand with our heads up in the
                midst of today's reality that is over-saturated with templated
                solutions, and we invite you to join us in creating something
                truly unique.
              </p>
            </div>
          </div>
          <div className="pixel01__playgroundMain">
            <PlaygroundSlider />
          </div>
        </section>
        <div className="pixel01__divider"></div>
        <section className="pixel01__section pixel01__footer">
          <div className="pixel01__footerLogoWrapper">
            <svg
              viewBox="0 0 1877 641"
              fill="#1A1A1A"
              className="pixel01__footerLogo"
            >
              <path d="M1834.6,166.2c4.2,2.4,8.9,3.6,14,3.6c5.2,0,9.9-1.2,14.2-3.6c4.3-2.4,7.6-5.6,10.1-9.8c2.5-4.1,3.7-8.7,3.7-13.7c0-5.1-1.2-9.7-3.7-13.9c-2.5-4.1-5.8-7.4-10.1-9.8c-4.3-2.4-9-3.6-14.2-3.6c-5.1,0-9.8,1.2-14,3.6s-7.6,5.7-10,9.9c-2.5,4.2-3.7,8.8-3.7,13.9c0,5,1.2,9.6,3.7,13.7C1827,160.6,1830.3,163.8,1834.6,166.2z M1830.1,131.8c1.9-3.3,4.4-5.9,7.6-7.8s6.8-2.8,10.8-2.8c4.1,0,7.7,0.9,10.9,2.8c3.2,1.9,5.8,4.4,7.6,7.7c1.9,3.3,2.8,6.9,2.8,11c0,4-0.9,7.6-2.8,10.9c-1.9,3.3-4.4,5.8-7.6,7.7s-6.9,2.8-10.9,2.8s-7.6-0.9-10.8-2.8c-3.2-1.9-5.8-4.4-7.6-7.6c-1.9-3.2-2.8-6.8-2.8-10.8C1827.3,138.8,1828.2,135.1,1830.1,131.8z"></path>
              <ellipse cx="856.7" cy="44.8" rx="44.8" ry="44.8"></ellipse>
              <path d="M1844.5,147.4h4.1l5.7,10.1h7.1l-6.5-11.4c2-0.7,3.5-1.8,4.6-3.3s1.6-3.3,1.6-5.2c0-2.9-1-5.3-3.1-7s-4.9-2.6-8.4-2.6h-11.7v29.5h6.5v-10.1H1844.5z M1844.5,133.3h4.8c1.6,0,2.9,0.4,3.8,1.1c0.9,0.7,1.4,1.8,1.4,3.2s-0.5,2.5-1.4,3.3c-1,0.8-2.2,1.2-3.8,1.2h-4.8V133.3z"></path>
              <path d="M98.3,472.1l210.1-182.9c69.1-60.2,26.6-173.9-65.1-173.9H1V205h236c11,0,16,13.6,7.8,20.8L34.6,408.7C-34.6,468.8,8,582.5,99.7,582.5h235v-89.6H106C95.1,492.9,90,479.3,98.3,472.1z"></path>
              <path d="M1642.8,115.4c-128.9,0-233.7,104.8-233.7,233.6s104.8,233.6,233.7,233.6s233.7-104.8,233.7-233.6S1771.7,115.4,1642.8,115.4z M1642.8,492.9c-79.4,0-144-64.6-144-143.9c0-79.4,64.6-143.9,144-143.9s144,64.6,144,143.9S1722.2,492.9,1642.8,492.9z"></path>
              <path d="M1154.5,115.4c-54.3,0-104.3,18.6-144,49.7v-49.7h-89.7V349v233.6h89.7V349c0-79.4,64.6-143.9,144-143.9s144,64.6,144,143.9v233.6h89.7V349C1388.2,220.2,1283.4,115.4,1154.5,115.4z"></path>
              <path d="M901.6,115.4h-89.7V349c0,90.5-47.9,170.1-119.6,214.7l47.4,76.3c22.1-13.7,42.7-30.1,61.6-48.9c64.5-64.4,100.1-151,100.3-242.1l0,0v-1l0,0l0,0V115.4z"></path>
              <path d="M792.6,349V115.4H703v49.7c-39.7-31.1-89.7-49.7-144-49.7c-128.9,0-233.7,104.8-233.7,233.6S430.1,582.6,559,582.6C687.8,582.5,792.6,477.7,792.6,349z M559,492.9c-79.4,0-144-64.6-144-143.9c0-79.4,64.6-143.9,144-143.9S703,269.6,703,349C703,428.3,638.4,492.9,559,492.9z"></path>
            </svg>
          </div>
          <div className="pixel01__footerMenuLeft">
            <div className="pixel01__studioMainTextLineWrapper">
              <div className="pixel01__studioMainTextLine"></div>
            </div>
            <ul className="pixel01__footerMenuLeftList">
              {["Work", "Studio", "Contact"].map((item, idx) => (
                <li key={idx} className="pixel01__footerMenuLeftListItem">
                  <a
                    href="/pixel01"
                    className="pixel01__footerMenuLeftListItemLink"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
            <span className="pixel01__footerMenuSpan">©zajno 2024</span>
          </div>
          <div className="pixel01__footerMenuRight">
            <div className="pixel01__studioMainTextLineWrapper">
              <div className="pixel01__studioMainTextLine"></div>
            </div>
            <ul className="pixel01__footerMenuRightList">
              {["Instagram", "Twitter", "LinkedIn", "Clutch", "Dribbble"].map(
                (item, idx) => (
                  <li key={idx} className="pixel01__footerMenuRightListItem">
                    <a
                      href="/pixel01"
                      className="pixel01__footerMenuRightListItemLink"
                    >
                      {item}
                    </a>
                  </li>
                ),
              )}
            </ul>
          </div>
        </section>
      </section>
    </div>
  );
}

function PlaygroundSlider() {
  const sliderRef = useRef(null);
  const sliderInnerRef = useRef(null);
  const isDragging = useRef(false);

  const startX = useRef(null);
  const startOffset = useRef(null);

  useEffect(() => {
    const slider = sliderRef.current;
    const sliderInner = sliderInnerRef.current;

    const clamp = (value, min, max) => {
      return Math.min(Math.max(value, min), max);
    };

    const mouseDown = (e) => {
      const sliderBounds = slider.getBoundingClientRect();
      const sliderInnerBounds = sliderInner.getBoundingClientRect();

      isDragging.current = true;
      startX.current = e.clientX;
      startOffset.current = sliderInnerBounds.left - sliderBounds.left;
      slider.style.cursor = "grabbing";
    };

    const mouseMove = (e) => {
      if (!isDragging.current) return;

      const sliderBounds = slider.getBoundingClientRect();
      const sliderInnerBounds = sliderInner.getBoundingClientRect();
      const diff = e.clientX - startX.current;

      const translateX = startOffset.current + diff;
      const clampedTranslateX = clamp(
        translateX,
        -sliderInnerBounds.width + sliderBounds.width - 32,
        0,
      );

      const xTo = gsap.quickTo(sliderInner, "x", {
        duration: 0.1,
        ease: "none",
      });
      xTo(clampedTranslateX);
    };

    const mouseUp = () => {
      if (!isDragging.current) return;
      isDragging.current = false;
      slider.style.cursor = "grab";
    };

    slider.addEventListener("mousedown", mouseDown);
    window.addEventListener("mouseup", mouseUp);
    window.addEventListener("mousemove", mouseMove);

    return () => {
      slider.removeEventListener("mousedown", mouseDown);
      window.removeEventListener("mouseup", mouseUp);
      window.removeEventListener("mousemove", mouseMove);
    };
  }, []);

  return (
    <div className="pixel01__slider" ref={sliderRef}>
      <div className="pixel01__sliderInner" ref={sliderInnerRef}>
        {PLAYGROUND_DATA.map((playground, idx) => (
          <div key={idx} className="pixel01__sliderItem">
            <div className="pixel01__sliderImgWrapper">
              <img
                src={playground.img}
                alt=""
                className="pixel01__sliderImg pixel01__sectionImg"
              />
            </div>
            <span className="pixel01__sliderItemTitle">{playground.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Pixel01;
