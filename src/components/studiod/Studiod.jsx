import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import Lenis from "@studio-freight/lenis";

import "./studiod.css";
import video from "./assets/services-hero.mp4";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

function Studiod() {
  const mainRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis();

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const stickyParent = document.querySelector(".studiod__stickyParent");
    const video = stickyParent.querySelector(".studiod__video");

    video.pause();

    const handleScroll = () => {
      const distance = window.scrollY - stickyParent.offsetTop;
      const total = stickyParent.clientHeight - window.innerHeight;
      let percentage = distance / total;
      percentage = Math.max(0, Math.min(percentage, 1));

      if (video.duration > 0) {
        video.currentTime = video.duration * percentage;
      }
    };

    window.addEventListener("scroll", handleScroll);
  }, []);

  useGSAP(
    () => {
      // video opacity animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger:
            ".studiod__stickySectionContent3 .studiod__stickySectionTitle",
          start: "top 50%",
          end: "top 20%",
          scrub: true,
          // markers: true,
        },
      });
      tl.to(".studiod__video", {
        opacity: 0,
      });
    },
    { scope: mainRef.current },
  );

  useGSAP(
    () => {
      // sphere animation
      gsap.set(".studiod__sphereLeft", {
        x: "-50vw",
        y: "-100vh",
        scale: 0.5,
        // opacity: 0,
      });
      gsap.set(".studiod__sphereCenter", {
        x: "-25vw",
        y: "-80vh",
        scale: 0.3,
        // opacity: 0,
      });
      gsap.set(".studiod__sphereRight", {
        x: "50vw",
        y: "-100vh",
        scale: 2,
        opacity: 0.5,
      });
      gsap.set(".studiod__sphere .studiod__sphereText", {
        opacity: 0,
      });
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".studiod__sphereParent",
          start: "top bottom",
          end: "top -200%",
          scrub: true,
        },
      });
      tl.to(".studiod__sphereLeft", {
        x: "-70%",
        y: 0,
        scale: 1,
        duration: 1,
      });
      tl.to(
        ".studiod__sphereCenter",
        {
          x: 0,
          y: 0,
          scale: 1,
          duration: 1,
        },
        "<",
      );
      tl.to(
        ".studiod__sphereRight",
        {
          x: "70%",
          y: 0,
          scale: 1,
          opacity: 1,
          duration: 1,
        },
        "<",
      );
      tl.to(".studiod__sphere .studiod__sphereText", {
        opacity: 1,
        stagger: 0.2,
      });
      tl.to(".studiod__sphereLeft", {
        x: "-35%",
        y: "15%",
        delay: 0.1,
      });
      tl.to(
        ".studiod__sphereCenter",
        {
          y: "-25%",
        },
        "<",
      );
      tl.to(
        ".studiod__sphereRight",
        {
          x: "35%",
          y: "15%",
          scale: 1,
          opacity: 1,
        },
        "<",
      );
      tl.to(".studiod__sphere .studiod__sphereText", {
        opacity: 0,
        delay: 0.1,
      });
      tl.to(
        ".studiod__sphereCenteredText",
        {
          opacity: 1,
          delay: 0.25,
        },
        "<",
      );
      tl.to(".studiod__sphereCenteredText", {
        scale: 2,
      });
      tl.to(
        [
          ".studiod__sphereLeft",
          ".studiod__sphereCenter",
          ".studiod__sphereRight",
        ],
        {
          x: 0,
          y: 0,
        },
        "<",
      );
    },
    { scope: mainRef.current },
  );

  return (
    <div ref={mainRef} className="studiod__main">
      <header className="studiod__header">
        <div className="studiod__headerLeft">
          <div className="studiod__logo">Studio D</div>
        </div>
        <div className="studiod__headerRight">
          <button className="studiod__menuBtn">
            <div className="studiod__burger"></div>
          </button>
        </div>
      </header>
      <div className="studiod__section studiod__stickyParent">
        <div className="studiod__videoWrapper">
          <video
            className="studiod__video"
            src={video}
            playsInline
            autoPlay
            muted
            loop
          ></video>
        </div>
        <div className="studiod__stickySection studiod__stickySection1">
          <div className="studiod__stickySectionContent">
            <h1 className="studiod__stickySectionTitle">
              From concept to completion,
            </h1>
          </div>
        </div>
        <div className="studiod__stickySection">
          <div className="studiod__stickySectionContent studiod__stickySectionContent2">
            <h1 className="studiod__stickySectionTitle">
              Our eye-level perspective is always evolving.
            </h1>
          </div>
        </div>
        <div className="studiod__stickySection">
          <div className="studiod__stickySectionContent studiod__stickySectionContent3">
            <span className="studiod__stickySectionSubtitle">
              Comprehensive holistic solutions
            </span>
            <h1 className="studiod__stickySectionTitle">
              Breaking ground with spatial design
            </h1>
            <div className="studiod__stickySectionDescriptionWrapper">
              <p className="studiod__stickySectionDescription">
                Studio D is at the forefront of revolutionizing spatial design
                by harnessing the power of visualization and real-time
                experiences. By integrating cutting-edge technology and creative
                expertise, we redefine the way spaces are conceptualized and
                experienced.
              </p>
              <p className="studiod__stickySectionDescription">
                Our visionary approach to spatial design empowers clients to
                fully engage with their environments before they exist,
                promoting informed decision-making, enhancing collaboration, and
                stimulating the creation of remarkable spaces.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="studiod__section studiod__stickyParent studiod__stickyParent2">
        <div className="studiod__stickySection studiod__stickySection2">
          <div className="studiod__sphereParent">
            <div className="studiod__sphere studiod__sphereLeft">
              <span className="studiod__sphereText">Visualization</span>
            </div>
            <div className="studiod__sphere studiod__sphereCenter">
              <span className="studiod__sphereText">Spatial Design</span>
            </div>
            <div className="studiod__sphere studiod__sphereRight">
              <span className="studiod__sphereText">Interactive</span>
            </div>
          </div>
          <div className="studiod__sphereCenteredTextWrapper">
            <span className="studiod__sphereCenteredText">Studio D</span>
          </div>
        </div>
        {/* <div className="studiod__stickySectionTrigger"></div> */}
      </div>
      <div className="studiod__footer">
        <span className="studiod__footerText">
          <span>01</span> Holistic Solutions
        </span>
      </div>
    </div>
  );
}

export default Studiod;
