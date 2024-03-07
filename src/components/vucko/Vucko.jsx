import React, { useEffect, useState, useRef } from "react";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
// import SplitType from "split-type";

import "./vucko.css";

const PADDING = 64;

function Vucko() {
  const heroTextRef = useRef(null);
  const showreelRef = useRef(null);
  const showreelVideoRef = useRef(null);
  const heroBottomRef = useRef(null);
  const sectionRef = useRef(null);
  const sectionTitleRef = useRef(null);

  const mouseRef = useRef(0);
  const xTranslateValueRef = useRef(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const lenis = new Lenis();

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      const xTo = gsap.quickTo(showreelRef.current, "x", {
        duration: 0.6,
      });

      const handleMouseMove = (e) => {
        // if (window.scrollY > 0) return;
        const clampedMouseX = Math.max(
          PADDING,
          Math.min(windowWidth - PADDING, e.clientX),
        );

        const bounds = showreelRef.current.getBoundingClientRect();
        const maxX = window.innerWidth - bounds.width - PADDING * 2;
        const normalizedMouseX = clampedMouseX / window.innerWidth;
        const translateValue = normalizedMouseX * maxX;
        mouseRef.current = normalizedMouseX;
        xTranslateValueRef.current = mouseRef.current * maxX;
        xTo(translateValue);
      };

      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    },
    {
      scope: showreelRef.current,
    },
  );

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroBottomRef.current,
          start: "top 80%",
          end: "bottom 50%",
          // markers: true,
          scrub: 1,
        },
      });

      tl.fromTo(heroBottomRef.current, { opacity: 1 }, { opacity: 0 });
    },
    { scope: heroBottomRef.current },
  );

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroBottomRef.current,
          start: "top 80%",
          end: "bottom 10%",
          // markers: true,
          scrub: 1,
        },
      });

      const finalWidthInPixels = window.innerWidth - PADDING * 2;
      const finalWidthInVW = (finalWidthInPixels / window.innerWidth) * 100;

      tl.fromTo(
        showreelRef.current,
        { width: "27svw", y: "0" },
        { width: `${finalWidthInVW}svw`, y: "70vh" },
      ).to(showreelRef.current, { y: "80vh" });
    },
    { scope: showreelRef.current },
  );

  useGSAP(() => {
    const heroTextChars = heroTextRef.current.querySelectorAll(
      ".vucko_heroTextChar",
    );

    gsap.set(heroTextChars, { rotateX: 90, y: 200 });
    gsap.set(showreelRef.current, { opacity: 0 });

    gsap.to(heroTextChars, {
      rotateX: 0,
      y: 0,
      duration: 1,
      stagger: 0.1,
      ease: "power3.out",
      delay: 0.25,
    });
    gsap.to(showreelRef.current, { opacity: 1, duration: 0.4, delay: 1.5 });
  });

  useGSAP(
    () => {
      // const split = new SplitType(sectionTitleRef.current, {
      //   types: "lines",
      // });

      gsap.set(sectionRef.current, { opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          end: "50% 30%",
          // markers: true,
          scrub: 1,
        },
      });
      tl.to(sectionRef.current, { opacity: 1 });
    },
    { scope: sectionTitleRef.current },
  );

  useGSAP(() => {});

  return (
    <div className="vucko__main">
      <div className="vucko__header">
        <div className="vucko__headerLeft">
          <div className="vucko__logoWrapper">
            <span className="vucko__logoFront">Vucko</span>
            <span className="vucko__logoBack">Vucko</span>
          </div>
          <span className="vucko__time">Toronto, Canada 22:56 pm</span>
        </div>
        <div className="vucko__headerRight">
          <ul className="vucko__nav">
            <li className="vucko__navItem">Projects,</li>
            <li className="vucko__navItem">Approach,</li>
            <li className="vucko__navItem">About,</li>
            <li className="vucko__navItem">Contact</li>
          </ul>
        </div>
      </div>
      <div className="vucko__hero">
        <div className="vucko__heroTop">
          <h1 ref={heroTextRef} className="vucko_heroText">
            {"vucko".split("").map((char, i) => {
              return (
                <span key={i} className="vucko_heroTextChar">
                  {char}
                </span>
              );
            })}
          </h1>
          <div ref={showreelRef} className="vucko__showreelWrapper">
            <div ref={showreelVideoRef} className="vucko__showreel">
              <video
                data-v-a1a2b520=""
                src="https://player.vimeo.com/progressive_redirect/playback/875704152/rendition/1080p/file.mp4?loc=external&amp;signature=a51db91031c588449ef893d10479cf7ccf0294dc26b184c643a63da3ce9c257d"
                muted="muted"
                loop="loop"
                autoPlay="autoplay"
                playsInline=""
                // class="js-cinema-flip-loop pointer-events-none absolute left-0 top-0 h-full w-full object-cover"
                className="vucko__showreelVideo"
              ></video>
              <div className="vucko__showreelTextWrapper">
                <span className="vucko__showreelText">Vucko™ Showreel</span>
                <span className="vucko__showreelText">
                  (Clients — 2018/2023)
                </span>
              </div>
            </div>
          </div>
        </div>
        <div ref={heroBottomRef} className="vucko__heroBottom">
          <div className="vucko__heroBottomLeft">
            <h2 className="vucko__heroBottomLeftTitle">
              A motion partner building brand-led identities, systems, and
              applications.
            </h2>
            <a href="/" className="vucko__heroBottomLeftLink">
              Learn more about our approach
            </a>
          </div>
          <div className="vucko__heroBottomRight">
            <span className="vucko__heroBottomRightText">(Scroll)</span>
          </div>
        </div>
      </div>
      <div className="vucko__spacer"></div>
      <div ref={sectionRef} className="vucko__section">
        <div className="vucko__sectionLeft">
          <div className="vucko__sectionLeftContent">→</div>
        </div>
        <div className="vucko__sectionRight">
          <div className="vucko__sectionRightContent">
            <h2 ref={sectionTitleRef} className="vucko__sectionRightTitle">
              Motion that defines how brands express themselves across modern
              media.
            </h2>
            <div className="vucko__sectionRightSubWrapper">
              <span className="vucko__sectionRightSubLeft">(Approach)</span>
              <div className="vucko__sectionRightSubRight">
                <div className="vucko__sectionRightSubRightTitle">
                  Transforming brands into dynamic brand experiences.{" "}
                </div>
                <div className="vucko__sectionRightSubRightContent">
                  <p>
                    The media landscape is changing in front of our eyes, and
                    brands need to adapt how they communicate in order to
                    thrive. Motion is the connective tissue between a brand and
                    its audience. It is a vital component of a brand's platform,
                    evolving its ecosystem and communications in profound new
                    ways.
                  </p>
                  <p>
                    We work with brand leaders to build motion identities,
                    systems, and applications that deepen their audience
                    relationships, strengthen their brand affinity, and drive
                    their long-term growth.
                  </p>
                </div>
                <div className="vucko__sectionRightSubRightFooter">
                  <button className="vucko__learnMoreButton">
                    Learn more about our approach
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Vucko;
