import React, { useEffect, useRef, useState } from "react";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import SplitType from "split-type";

import "./akaru.css";

import img01 from "./assets/images/sanctuary.jpeg";
import img02 from "./assets/images/maison.jpeg";
import img03 from "./assets/images/ubac.jpeg";
import img04 from "./assets/images/avoriaz.jpeg";
import img05 from "./assets/images/salomon.jpeg";
import img06 from "./assets/images/asics.jpeg";
import img07 from "./assets/images/enchanted.jpeg";
import img08 from "./assets/images/mertens.jpeg";
import img09 from "./assets/images/zorba.jpeg";
import img10 from "./assets/images/mediakeys.jpeg";
import img11 from "./assets/images/crosscall.jpeg";
import img12 from "./assets/images/rival.jpeg";
import { CustomEase, ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";

const PROJECTS = [
  {
    title: "Sanctuary",
    description: "To the moon",
    type: "Direction artistique  / Site vitrine  / Experience digitale",
    image: img01,
    link: "/akaru",
    year: 2023,
    color: "var(--terra)",
  },
  {
    title: "Maison Yokō",
    description: "Rendez-vous avec vous même",
    type: "Direction artistique  / Site vitrine",
    image: img02,
    link: "/akaru",
    year: 2022,
    color: "var(--green)",
  },
  {
    title: "Ubac store",
    description: "Baskets éco responsables ",
    type: "Direction artistique  / E-commerce",
    image: img03,
    link: "/akaru",
    year: 2022,
    color: "var(--pink)",
  },
  {
    title: "Avoriaz",
    description: "Site vitrine sur mesure et immersif",
    type: "Direction artistique  / Site vitrine",
    image: img04,
    link: "/akaru",
    year: 2022,
    color: "var(--blue)",
  },
  {
    title: "Salomon",
    description: "Tomorrow is yours",
    type: "Experience digitale",
    image: img05,
    link: "/akaru",
    year: 2021,
    color: "var(--terra)",
  },
  {
    title: "Asics",
    description: "Asics : Paris, bouge ton esprit",
    type: "Direction artistique  / Experience digitale",
    image: img06,
    link: "/akaru",
    year: 2021,
    color: "var(--green)",
  },
  {
    title: "Enchanted tools ",
    description: "Changer le visage de la robotique",
    type: "Site vitrine",
    image: img07,
    link: "/akaru",
    year: 2021,
    color: "var(--pink)",
  },
  {
    title: "Alexandre Mertens",
    description: "L'harmonie d'être soi-même",
    type: "Direction artistique  / Site vitrine",
    image: img08,
    link: "/akaru",
    year: 2021,
    color: "var(--blue)",
  },
  {
    title: "Zorba ",
    description: "The new generation of storytellers",
    type: "Direction artistique  / Site vitrine",
    image: img09,
    link: "/akaru",
    year: 2021,
    color: "var(--terra)",
  },
  {
    title: "Mediakeys",
    description: "International media solutions",
    type: "Direction artistique  / Site vitrine",
    image: img10,
    link: "/akaru",
    year: 2020,
    color: "var(--green)",
  },
  {
    title: "Crosscall Stellar-X5",
    description: "Une sensation unique entre vos doigts",
    type: "Direction artistique  / E-commerce",
    image: img11,
    link: "/akaru",
    year: 2020,
    color: "var(--pink)",
  },
  {
    title: "Jacques Rival",
    description: "Conception & réalisation de projets d'architecture",
    type: "Direction artistique  / Site vitrine",
    image: img12,
    link: "/akaru",
    year: 2020,
    color: "var(--blue)",
  },
];

const PROJECT_NAV = [
  {
    title: "Direction artistique",
    link: "/akaru",
    count: 23,
    color: "var(--terra)",
  },
  {
    title: "Experience digitale",
    link: "/akaru",
    count: 12,
    color: "var(--green)",
  },
  {
    title: "Site vitrine",
    link: "/akaru",
    count: 13,
    color: "var(--pink)",
  },
  {
    title: "E-commerce",
    link: "/akaru",
    count: 10,
    color: "var(--blue)",
  },
];

const PROJECTS_EXTRA = [
  {
    title: "Olaian x Kimjaly",
    link: "/akaru",
    description: "Salty flow",
    type: "Direction artistique  / Experience digitale  / E-commerce",
    year: 2022,
    color: "var(--terra)",
  },
  {
    title: "Schizinfo",
    link: "/akaru",
    description: "Journées de la schizophrénie",
    type: "Experience digitale",
    year: 2022,
    color: "var(--green)",
  },
  {
    title: "Interstellar Lab",
    link: "/akaru",
    description: "Cultiver la vie partout",
    type: "Direction artistique  / Site vitrine",
    year: 2022,
    color: "var(--pink)",
  },
  {
    title: "Abondance",
    link: "/akaru",
    description: "Une vallée, une vache, un fromage",
    type: "Experience digitale",
    year: 2018,
    color: "var(--blue)",
  },
  {
    title: "RGL",
    link: "/akaru",
    description: "Au plus de proche de vous",
    type: "Direction artistique  / Site vitrine",
    year: 2023,
    color: "var(--terra)",
  },
  {
    title: "Olaian LB",
    link: "/akaru",
    description: "Surfing wetsuits",
    type: "Direction artistique  / Experience digitale  / E-commerce",
    year: 2022,
    color: "var(--green)",
  },
  {
    title: "The Field",
    link: "/akaru",
    description: "Experience WebGL ",
    type: "Experience digitale",
    year: 2020,
    color: "var(--pink)",
  },
  {
    title: "Crossfit",
    link: "/akaru",
    description: "Le sport santé à Lyon",
    type: "Direction artistique  / Site vitrine",
    year: 2023,
    color: "var(--blue)",
  },
  {
    title: "66° NORD",
    link: "/akaru",
    description: "Le spécialiste des voyages polaire",
    type: "Direction artistique  / Site vitrine",
    year: 2018,
    color: "var(--terra)",
  },
  {
    title: "Mix & Match",
    link: "/akaru",
    description: "Expérience digitale",
    type: "Direction artistique  / Experience digitale  / E-commerce",
    year: 2020,
    color: "var(--green)",
  },
  {
    title: "Wedze goggles",
    link: "/akaru",
    description: "Goggles lookbook 2017/2018",
    type: "Direction artistique  / Experience digitale  / E-commerce",
    year: 2017,
    color: "var(--pink)",
  },
  {
    title: "Olaian x Jeykill",
    link: "/akaru",
    description: "Collection Jeykill 2022",
    type: "Direction artistique  / E-commerce",
    year: 2022,
    color: "var(--blue)",
  },
  {
    title: "Hifi Filter",
    link: "/akaru",
    description: "Votre partenaire filtration",
    type: "Direction artistique  / Site vitrine",
    year: 2021,
    color: "var(--terra)",
  },
  {
    title: "Olaian LB 2018",
    link: "/akaru",
    description: "Lookbook Olaian collection 2018",
    type: "Direction artistique  / E-commerce  / Experience digitale",
    year: 2018,
    color: "var(--green)",
  },
  {
    title: "Alliance Pornic",
    link: "/akaru",
    description: "Une immersion sensorielle",
    type: "Direction artistique  / E-commerce",
    year: 2020,
    color: "var(--pink)",
  },
  {
    title: "Wedze LB 2018",
    link: "/akaru",
    description: "Wedze Lookbook 2018",
    type: "Direction artistique  / E-commerce",
    year: "2017-2018",
    color: "var(--blue)",
  },
];

gsap.registerPlugin(CustomEase, ScrollTrigger);
CustomEase.create("akaruEase", "0.645, 0.045, 0.355, 1");

const CURSOR_SIZE = 75;

// Reference: https://akaru.fr/projets/
function Akaru() {
  const [isLoading, setIsLoading] = useState(true);
  const cursorRef = useRef(null);
  const cursorArrowRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis();

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    window.scrollTo(0, 0);
  }, []);

  useGSAP(() => {
    gsap.set(cursorRef.current, {
      width: `${CURSOR_SIZE}px`,
      height: `${CURSOR_SIZE}px`,
      scale: 0,
      opacity: 0,
      // backgroundColor: "transparent",
    });
    gsap.set(cursorArrowRef.current, {
      scale: 0,
      opacity: 0,
    });
    const xTo = gsap.quickTo(cursorRef.current, "x", {
      duration: 0.4,
    });
    const yTo = gsap.quickTo(cursorRef.current, "y", {
      duration: 0.4,
    });

    const xArrowTo = gsap.quickTo(cursorArrowRef.current, "x", {
      duration: 0.36,
    });
    const yArrowTo = gsap.quickTo(cursorArrowRef.current, "y", {
      duration: 0.36,
    });

    const handleMouseMove = (e) => {
      xTo(e.clientX - CURSOR_SIZE / 2);
      yTo(e.clientY - CURSOR_SIZE / 2);
      xArrowTo(e.clientX - 6);
      yArrowTo(e.clientY - 6);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => window.removeEventListener("mousemove", handleMouseMove);
  });

  useGSAP(() => {
    const subtitle = new SplitType(".akaru__heroSubtitle", {
      types: ["lines", "words"],
      lineClass: "akaru__heroSubtitleLine",
      wordClass: "akaru__heroSubtitleWord",
    });
    gsap.set(".akaru__projectLargeLink", {
      y: "100%",
    });
    const tl = gsap.timeline({ defaults: { ease: "akaruEase" } });
    tl.to(".akaru__transitionOverlayLogoWrapper svg", {
      duration: 0.6,
      y: "-150%",
      stagger: 0.05,
      reversed: true,
      delay: 0.5,
    });
    tl.to(
      ".akaru__transitionOverlayWrapper",
      {
        duration: 0.75,
        height: 0,
      },
      "-=0.35",
    );
    // tl.from(
    //   ".akaru__main",
    //   {
    //     duration: 0.6,
    //     // marginTop: "100vh",
    //     // opacity: 0,
    //     onComplete: () => {
    //       setIsLoading(false);
    //     },
    //   },
    //   "<",
    // );
    tl.from(
      [".akaru__heroTitle", ".akaru__heroTitleCount"],
      {
        duration: 1.25,
        y: "150%",
        stagger: 0.25,
      },
      "<",
    );
    tl.from(
      [".akaru__heroSubtitleWord"],
      {
        duration: 1.25,
        y: "150%",
        stagger: 0.01,
      },
      "<",
    );
    tl.to(
      ".akaru__projectLargeLink",
      {
        duration: 1.5,
        y: 0,
        stagger: 0.1,
        delay: 0.1,
        onComplete: () => {
          subtitle.revert();
        },
      },
      "<",
    );
  });

  useGSAP(() => {
    // use scrolltrigger gsap to animate footer svg with skew rotation
    gsap.from(".akaru__footerLogoWrapper svg", {
      scrollTrigger: {
        trigger: ".akaru__footerLogoWrapper svg",
        start: "top 90%",
        end: "bottom bottom",
        scrub: 1,
        // markers: true,
      },
      y: 200,
      skewY: 10,
      rotation: 10,
    });
  });

  return (
    <>
      <div className="akaru__transitionOverlayWrapper">
        <div
          className="akaru__transitionOverlayLogoWrapper"
          data-v-499417f3=""
          data-v-68cd6665=""
        >
          <svg
            width="157"
            height="413"
            viewBox="0 0 157 413"
            xmlns="http://www.w3.org/2000/svg"
            data-v-68cd6665=""
          >
            <path
              d="M118.058 0.957886C139.367 0.957886 156.643 18.1954 156.643 39.455V412.147H84.1312V230.578C84.1312 224.161 78.9292 218.959 72.5121 218.959V218.959V412.147H0V39.455C0 18.1954 17.2768 0.957886 38.5849 0.957886H118.058ZM72.5121 196.104C78.9292 196.104 84.1312 190.902 84.1312 184.485V43.8388C84.1312 37.4218 78.9292 32.2197 72.5121 32.2197V32.2197V196.104V196.104Z"
              data-v-68cd6665=""
            ></path>
          </svg>
          <svg
            width="159"
            height="413"
            viewBox="0 0 159 413"
            xmlns="http://www.w3.org/2000/svg"
            data-v-68cd6665=""
          >
            <path
              d="M158.951 0.957886V179.857C158.951 189.855 155.452 198.676 149.622 205.733C155.452 212.79 158.951 221.611 158.951 231.608V412.147H85.5325V232.199C85.5325 225.702 80.2654 220.435 73.7681 220.435V220.435V412.147L0.349609 411.559V1.59491H73.7681V191.031V191.031C80.2654 191.031 85.5325 185.764 85.5325 179.266V0.957886H158.951Z"
              data-v-68cd6665=""
            ></path>
          </svg>
          <svg
            width="157"
            height="413"
            viewBox="0 0 157 413"
            xmlns="http://www.w3.org/2000/svg"
            data-v-68cd6665=""
          >
            <path
              d="M118.058 0.957886C139.367 0.957886 156.643 18.1954 156.643 39.455V412.147H84.1312V230.578C84.1312 224.161 78.9292 218.959 72.5121 218.959V218.959V412.147H0V39.455C0 18.1954 17.2768 0.957886 38.5849 0.957886H118.058ZM72.5121 196.104C78.9292 196.104 84.1312 190.902 84.1312 184.485V43.8388C84.1312 37.4218 78.9292 32.2197 72.5121 32.2197V32.2197V196.104V196.104Z"
              data-v-68cd6665=""
            ></path>
          </svg>
          <svg
            width="157"
            height="414"
            viewBox="0 0 157 414"
            xmlns="http://www.w3.org/2000/svg"
            data-v-68cd6665=""
          >
            <path
              d="M156.651 40.1561V185.255C156.651 195.059 153.195 204.287 147.436 210.631C153.195 217.552 156.651 226.78 156.651 236.008V413.07H84.1386V237.246C84.1386 230.829 78.9365 225.627 72.5194 225.627V225.627V413.07H0.00732422V0H118.642C139.374 0 156.651 18.8164 156.651 40.1561ZM72.5194 196.213C78.9365 196.213 84.1386 191.011 84.1386 184.594V42.5473C84.1386 36.1302 78.9365 30.9281 72.5194 30.9281V30.9281V196.213V196.213Z"
              data-v-68cd6665=""
            ></path>
          </svg>
          <svg
            width="157"
            height="413"
            viewBox="0 0 157 413"
            xmlns="http://www.w3.org/2000/svg"
            data-v-68cd6665=""
          >
            <path
              d="M84.4882 0.957886H157V374.269C157 395.609 139.723 412.911 118.415 412.911H38.9419C17.6338 412.911 0.356934 395.609 0.356934 374.269V0.957886H72.8691V384.074V384.074C79.2861 384.074 84.4882 378.872 84.4882 372.455V0.957886Z"
              data-v-68cd6665=""
            ></path>
          </svg>
        </div>
      </div>
      <div className="akaru__main">
        <div ref={cursorRef} className="akaru__cursor"></div>
        <svg
          width="19"
          height="19"
          viewBox="0 0 19 19"
          fill="black"
          className="akaru__cursorArrow"
          ref={cursorArrowRef}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0.292893 17.2929C-0.0976311 17.6834 -0.0976311 18.3166 0.292893 18.7071C0.683418 19.0976 1.31658 19.0976 1.70711 18.7071L0.292893 17.2929ZM18.9706 1.02944C18.9706 0.477153 18.5228 0.0294373 17.9706 0.029437L8.97056 0.0294378C8.41828 0.0294375 7.97056 0.477153 7.97056 1.02944C7.97056 1.58172 8.41828 2.02944 8.97056 2.02944L16.9706 2.02944L16.9706 10.0294C16.9706 10.5817 17.4183 11.0294 17.9706 11.0294C18.5228 11.0294 18.9706 10.5817 18.9706 10.0294L18.9706 1.02944ZM1.70711 18.7071L18.6777 1.73654L17.2635 0.322331L0.292893 17.2929L1.70711 18.7071Z"
            fill="inherit"
          ></path>
        </svg>
        <header className="akaru__header">
          <a className="akaru__headerLogoWrapper" href="/akaru">
            <svg
              width="157"
              height="413"
              viewBox="0 0 157 413"
              xmlns="http://www.w3.org/2000/svg"
              data-v-68cd6665=""
            >
              <path
                d="M118.058 0.957886C139.367 0.957886 156.643 18.1954 156.643 39.455V412.147H84.1312V230.578C84.1312 224.161 78.9292 218.959 72.5121 218.959V218.959V412.147H0V39.455C0 18.1954 17.2768 0.957886 38.5849 0.957886H118.058ZM72.5121 196.104C78.9292 196.104 84.1312 190.902 84.1312 184.485V43.8388C84.1312 37.4218 78.9292 32.2197 72.5121 32.2197V32.2197V196.104V196.104Z"
                data-v-68cd6665=""
              ></path>
            </svg>
            <svg
              width="159"
              height="413"
              viewBox="0 0 159 413"
              xmlns="http://www.w3.org/2000/svg"
              data-v-68cd6665=""
            >
              <path
                d="M158.951 0.957886V179.857C158.951 189.855 155.452 198.676 149.622 205.733C155.452 212.79 158.951 221.611 158.951 231.608V412.147H85.5325V232.199C85.5325 225.702 80.2654 220.435 73.7681 220.435V220.435V412.147L0.349609 411.559V1.59491H73.7681V191.031V191.031C80.2654 191.031 85.5325 185.764 85.5325 179.266V0.957886H158.951Z"
                data-v-68cd6665=""
              ></path>
            </svg>
            <svg
              width="157"
              height="413"
              viewBox="0 0 157 413"
              xmlns="http://www.w3.org/2000/svg"
              data-v-68cd6665=""
            >
              <path
                d="M118.058 0.957886C139.367 0.957886 156.643 18.1954 156.643 39.455V412.147H84.1312V230.578C84.1312 224.161 78.9292 218.959 72.5121 218.959V218.959V412.147H0V39.455C0 18.1954 17.2768 0.957886 38.5849 0.957886H118.058ZM72.5121 196.104C78.9292 196.104 84.1312 190.902 84.1312 184.485V43.8388C84.1312 37.4218 78.9292 32.2197 72.5121 32.2197V32.2197V196.104V196.104Z"
                data-v-68cd6665=""
              ></path>
            </svg>
            <svg
              width="157"
              height="414"
              viewBox="0 0 157 414"
              xmlns="http://www.w3.org/2000/svg"
              data-v-68cd6665=""
            >
              <path
                d="M156.651 40.1561V185.255C156.651 195.059 153.195 204.287 147.436 210.631C153.195 217.552 156.651 226.78 156.651 236.008V413.07H84.1386V237.246C84.1386 230.829 78.9365 225.627 72.5194 225.627V225.627V413.07H0.00732422V0H118.642C139.374 0 156.651 18.8164 156.651 40.1561ZM72.5194 196.213C78.9365 196.213 84.1386 191.011 84.1386 184.594V42.5473C84.1386 36.1302 78.9365 30.9281 72.5194 30.9281V30.9281V196.213V196.213Z"
                data-v-68cd6665=""
              ></path>
            </svg>
            <svg
              width="157"
              height="413"
              viewBox="0 0 157 413"
              xmlns="http://www.w3.org/2000/svg"
              data-v-68cd6665=""
            >
              <path
                d="M84.4882 0.957886H157V374.269C157 395.609 139.723 412.911 118.415 412.911H38.9419C17.6338 412.911 0.356934 395.609 0.356934 374.269V0.957886H72.8691V384.074V384.074C79.2861 384.074 84.4882 378.872 84.4882 372.455V0.957886Z"
                data-v-68cd6665=""
              ></path>
            </svg>
          </a>
          <div>
            <button className="akaru__headerBtn">
              <span className="akaru__headerBtnText">Menu</span>
              <div className="akaru__headerBtnBurgerWrapper">
                <div className="akaru__headerBtnBurger"></div>
              </div>
            </button>
          </div>
        </header>
        <div className="akaru__hero">
          <div className="akaru__heroTitleWrapper">
            <span className="akaru__heroTitleCountWrapper">
              <span className="akaru__heroTitleCount">28</span>
            </span>
            <div className="akaru__heroTitleWrapperInner">
              <h1 className="akaru__heroTitle">Projects</h1>
            </div>
          </div>
          <div className="akaru__heroSubtitleWrapper">
            <span className="akaru__heroSubtitle">
              Chaque projet priorise l'excellence dans le but de plonger vos
              visiteurs dans un univers puissant et percutant. Nous croyons que
              rien ne vaut une expérience immersive, et surtout une expérience
              bien à vous.
            </span>
          </div>
        </div>
        <div className="akaru__projectNavWrapper">
          <ul className="akaru__projectNav">
            {PROJECT_NAV.map((item, idx) => (
              <li key={idx} className="akaru__projectNavItem">
                <a href="/akaru" className="akaru__projectNavLink">
                  <div className="akaru__projectNavDotWrapperOuter">
                    <div
                      className="akaru__projectNavDotWrapper"
                      style={{ backgroundColor: item.color }}
                    >
                      <svg
                        width="19"
                        height="19"
                        viewBox="0 0 19 19"
                        fill="black"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M0.292893 17.2929C-0.0976311 17.6834 -0.0976311 18.3166 0.292893 18.7071C0.683418 19.0976 1.31658 19.0976 1.70711 18.7071L0.292893 17.2929ZM18.9706 1.02944C18.9706 0.477153 18.5228 0.0294373 17.9706 0.029437L8.97056 0.0294378C8.41828 0.0294375 7.97056 0.477153 7.97056 1.02944C7.97056 1.58172 8.41828 2.02944 8.97056 2.02944L16.9706 2.02944L16.9706 10.0294C16.9706 10.5817 17.4183 11.0294 17.9706 11.0294C18.5228 11.0294 18.9706 10.5817 18.9706 10.0294L18.9706 1.02944ZM1.70711 18.7071L18.6777 1.73654L17.2635 0.322331L0.292893 17.2929L1.70711 18.7071Z"
                          fill="inherit"
                        ></path>
                      </svg>
                    </div>
                  </div>
                  <span className="akaru__projectNavCount">{item.count}</span>
                  <span className="akaru__projectNavTitle">{item.title}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div
          className="akaru__projectsWrapper"
          onMouseEnter={() => {
            gsap.to([cursorRef.current, cursorArrowRef.current], {
              scale: 1,
              opacity: 1,
              duration: 0.2,
            });
          }}
          onMouseLeave={() => {
            gsap.to([cursorRef.current, cursorArrowRef.current], {
              scale: 0,
              opacity: 0,
              duration: 0.2,
            });
          }}
        >
          {PROJECTS.slice(0, 4).map((project, index) => (
            <ProjectLarge key={index} {...project} />
          ))}
          {PROJECTS.slice(4).map((project, index) => (
            <ProjectMedium key={index} {...project} />
          ))}
          {PROJECTS_EXTRA.map((project, index) => (
            <ProjectSmall key={index} {...project} />
          ))}
        </div>
        <div className="akaru__footerWrapper">
          <div className="akaru__footerTop">
            <div className="akaru__footerTopAddress">
              <a
                href="/akaru"
                className="akaru__footerTopAddressLink akaru__footerLink"
              >
                <span>Akaru</span>
                <span>9 Quai Andres Lassagne</span>
                <span>69001 Lyon</span>
                <span>France</span>
              </a>
            </div>
            <div className="akaru__footerTopContact">
              <div>
                <a
                  href="/akaru"
                  className="akaru__footerTopContactLink akaru__footerLink"
                >
                  <span>Contact@akaru.fr</span>
                </a>
                <a
                  href="/akaru"
                  className="akaru__footerTopContactLink akaru__footerLink"
                >
                  <span>job@akaru.fr</span>
                </a>
              </div>
              <a
                href="/akaru"
                className="akaru__footerTopContactLink akaru__footerLink"
              >
                <span>04 82 33 85 10</span>
              </a>
            </div>
            <div className="akaru__footerTopSocial">
              <a
                href="/akaru"
                className="akaru__footerTopSocialLink akaru__footerLink"
              >
                <span>Instagram</span>
              </a>
              <a
                href="/akaru"
                className="akaru__footerTopSocialLink akaru__footerLink"
              >
                <span>Linkedin</span>
              </a>
              <a
                href="/akaru"
                className="akaru__footerTopSocialLink akaru__footerLink"
              >
                <span>Twitter</span>
              </a>
              <a
                href="/akaru"
                className="akaru__footerTopSocialLink akaru__footerLink"
              >
                <span>Facebook</span>
              </a>
            </div>
            <div className="akaru__footerTopMention">
              <a
                href="/akaru"
                className="akaru__footerTopMentionLink akaru__footerLink"
              >
                <span>Mentions légales</span>
              </a>
              <span className="akaru__footerTopMentionCopy">Akaru© 2023</span>
            </div>
          </div>
          <div className="akaru__footerBottom">
            <div className="akaru__footerLogoWrapper">
              <svg
                width="157"
                height="413"
                viewBox="0 0 157 413"
                xmlns="http://www.w3.org/2000/svg"
                data-v-68cd6665=""
              >
                <path
                  d="M118.058 0.957886C139.367 0.957886 156.643 18.1954 156.643 39.455V412.147H84.1312V230.578C84.1312 224.161 78.9292 218.959 72.5121 218.959V218.959V412.147H0V39.455C0 18.1954 17.2768 0.957886 38.5849 0.957886H118.058ZM72.5121 196.104C78.9292 196.104 84.1312 190.902 84.1312 184.485V43.8388C84.1312 37.4218 78.9292 32.2197 72.5121 32.2197V32.2197V196.104V196.104Z"
                  data-v-68cd6665=""
                ></path>
              </svg>
              <svg
                width="159"
                height="413"
                viewBox="0 0 159 413"
                xmlns="http://www.w3.org/2000/svg"
                data-v-68cd6665=""
              >
                <path
                  d="M158.951 0.957886V179.857C158.951 189.855 155.452 198.676 149.622 205.733C155.452 212.79 158.951 221.611 158.951 231.608V412.147H85.5325V232.199C85.5325 225.702 80.2654 220.435 73.7681 220.435V220.435V412.147L0.349609 411.559V1.59491H73.7681V191.031V191.031C80.2654 191.031 85.5325 185.764 85.5325 179.266V0.957886H158.951Z"
                  data-v-68cd6665=""
                ></path>
              </svg>
              <svg
                width="157"
                height="413"
                viewBox="0 0 157 413"
                xmlns="http://www.w3.org/2000/svg"
                data-v-68cd6665=""
              >
                <path
                  d="M118.058 0.957886C139.367 0.957886 156.643 18.1954 156.643 39.455V412.147H84.1312V230.578C84.1312 224.161 78.9292 218.959 72.5121 218.959V218.959V412.147H0V39.455C0 18.1954 17.2768 0.957886 38.5849 0.957886H118.058ZM72.5121 196.104C78.9292 196.104 84.1312 190.902 84.1312 184.485V43.8388C84.1312 37.4218 78.9292 32.2197 72.5121 32.2197V32.2197V196.104V196.104Z"
                  data-v-68cd6665=""
                ></path>
              </svg>
              <svg
                width="157"
                height="414"
                viewBox="0 0 157 414"
                xmlns="http://www.w3.org/2000/svg"
                data-v-68cd6665=""
              >
                <path
                  d="M156.651 40.1561V185.255C156.651 195.059 153.195 204.287 147.436 210.631C153.195 217.552 156.651 226.78 156.651 236.008V413.07H84.1386V237.246C84.1386 230.829 78.9365 225.627 72.5194 225.627V225.627V413.07H0.00732422V0H118.642C139.374 0 156.651 18.8164 156.651 40.1561ZM72.5194 196.213C78.9365 196.213 84.1386 191.011 84.1386 184.594V42.5473C84.1386 36.1302 78.9365 30.9281 72.5194 30.9281V30.9281V196.213V196.213Z"
                  data-v-68cd6665=""
                ></path>
              </svg>
              <svg
                width="157"
                height="413"
                viewBox="0 0 157 413"
                xmlns="http://www.w3.org/2000/svg"
                data-v-68cd6665=""
              >
                <path
                  d="M84.4882 0.957886H157V374.269C157 395.609 139.723 412.911 118.415 412.911H38.9419C17.6338 412.911 0.356934 395.609 0.356934 374.269V0.957886H72.8691V384.074V384.074C79.2861 384.074 84.4882 378.872 84.4882 372.455V0.957886Z"
                  data-v-68cd6665=""
                ></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function ProjectLarge({
  title,
  description,
  type,
  image,
  link,
  year,
  color = "rgba(0,0,0,.2)",
}) {
  const projectRef = useRef(null);
  const backgroundRef = useRef(null);

  const handleMouseEnter = (e) => {
    const bounds = projectRef.current.getBoundingClientRect();
    const mouseY = e.clientY;
    const top = bounds.top;
    const bottom = bounds.bottom;
    const middle = top + (bottom - top) / 2;
    const isTop = mouseY < middle;
    const isBottom = mouseY > middle;

    if (isTop) {
      gsap.set(backgroundRef.current, {
        y: "-100%",
      });
      gsap.to(backgroundRef.current, {
        duration: 0.5,
        ease: "akaruEase",
        y: 0,
      });
    } else if (isBottom) {
      gsap.set(backgroundRef.current, {
        y: "100%",
      });
      gsap.to(backgroundRef.current, {
        duration: 0.5,
        ease: "akaruEase",
        y: 0,
      });
    }
  };
  const handleMouseLeave = (e) => {
    const bounds = projectRef.current.getBoundingClientRect();
    const mouseY = e.clientY;
    const top = bounds.top;
    const bottom = bounds.bottom;
    const middle = top + (bottom - top) / 2;
    const isTop = mouseY < middle;
    const isBottom = mouseY > middle;

    if (isTop) {
      gsap.to(backgroundRef.current, {
        duration: 0.5,
        ease: "akaruEase",
        y: "-100%",
      });
    } else if (isBottom) {
      gsap.to(backgroundRef.current, {
        duration: 0.5,
        ease: "akaruEase",
        y: "100%",
      });
    }
  };

  // useGSAP(() => {
  //   const tl = gsap.timeline({
  //     defaults: { ease: "akaruEase" },
  //   });
  //   gsap.set(".akaru__projectLargeLink", {
  //     y: "100%",
  //   });
  //   tl.to(".akaru__projectLargeLink", {
  //     duration: 1,
  //     y: 0,
  //     delay: 1,
  //   });
  // });

  return (
    <div
      ref={projectRef}
      className="akaru__projectLargeWrapper"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <a href={link} className="akaru__projectLargeLink">
        <div
          ref={backgroundRef}
          className="akaru__projectLargeBackground"
          style={{ backgroundColor: color }}
        ></div>
        <div className="akaru__projectLargeTitleContainer">
          <div className="akaru__projectLargeTitleWrapper">
            <h2 className="akaru__projectLargeTitle">{title}</h2>
          </div>
          <div className="akaru__projectLargeDescriptionWrapper">
            <span className="akaru__projectLargeDescription">
              {description}
            </span>
          </div>
        </div>
        <div className="akaru__projectLargeImageWrapper">
          <img src={image} alt={title} className="akaru__projectLargeImage" />
          <div className="akaru__projectLargeImageOverlay">
            <div className="akaru__projectLargeImageTitleWrapper">
              <span className="akaru__projectLargeImageTitle">{title}</span>
            </div>
          </div>
        </div>
        <div className="akaru__projectLargeFooterWrapper">
          <span className="akaru__projectLargeType">{type}</span>
          <span className="akaru__projectLargeYear">{year}</span>
        </div>
      </a>
    </div>
  );
}

function ProjectMedium({
  title,
  description,
  type,
  image,
  link,
  year,
  color = "rgba(0,0,0,.2)",
}) {
  const projectRef = useRef(null);
  const backgroundRef = useRef(null);

  const handleMouseEnter = (e) => {
    const bounds = projectRef.current.getBoundingClientRect();
    const mouseY = e.clientY;
    const top = bounds.top;
    const bottom = bounds.bottom;
    const middle = top + (bottom - top) / 2;
    const isTop = mouseY < middle;
    const isBottom = mouseY > middle;

    if (isTop) {
      gsap.set(backgroundRef.current, {
        y: "-100%",
      });
      gsap.to(backgroundRef.current, {
        duration: 0.3,
        ease: "akaruEase",
        y: 0,
      });
    } else if (isBottom) {
      gsap.set(backgroundRef.current, {
        y: "100%",
      });
      gsap.to(backgroundRef.current, {
        duration: 0.3,
        ease: "akaruEase",
        y: 0,
      });
    }
  };
  const handleMouseLeave = (e) => {
    const bounds = projectRef.current.getBoundingClientRect();
    const mouseY = e.clientY;
    const top = bounds.top;
    const bottom = bounds.bottom;
    const middle = top + (bottom - top) / 2;
    const isTop = mouseY < middle;
    const isBottom = mouseY > middle;

    if (isTop) {
      gsap.to(backgroundRef.current, {
        duration: 0.3,
        ease: "akaruEase",
        y: "-100%",
      });
    } else if (isBottom) {
      gsap.to(backgroundRef.current, {
        duration: 0.3,
        ease: "akaruEase",
        y: "100%",
      });
    }
  };

  return (
    <div
      ref={projectRef}
      className="akaru__projectMediumWrapper"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <a href={link} className="akaru__projectMediumLink">
        <div
          ref={backgroundRef}
          className="akaru__projectMediumBackground"
          style={{ backgroundColor: color }}
        ></div>
        <div className="akaru__projectMediumImageWrapper">
          <div className="akaru__projectMediumImageWrapperInner">
            <img
              src={image}
              alt={title}
              className="akaru__projectMediumImage"
            />
          </div>
        </div>
        <div className="akaru__projectMediumContentWrapper">
          <div className="akaru__projectMediumFooterWrapper">
            <span className="akaru__projectMediumYear">{year}</span>
            <span className="akaru__projectMediumType">{type}</span>
          </div>
          <div className="akaru__projectMediumTitleContainer">
            <div className="akaru__projectMediumTitleWrapper">
              <h2 className="akaru__projectMediumTitle">{title}</h2>
            </div>
            <div className="akaru__projectMediumDescriptionWrapper">
              <span className="akaru__projectMediumDescription">
                {description}
              </span>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
}

function ProjectSmall({
  title,
  description,
  type,
  link,
  year,
  color = "rgba(0,0,0,.2)",
}) {
  const projectRef = useRef(null);
  const backgroundRef = useRef(null);

  const handleMouseEnter = (e) => {
    const bounds = projectRef.current.getBoundingClientRect();
    const mouseY = e.clientY;
    const top = bounds.top;
    const bottom = bounds.bottom;
    const middle = top + (bottom - top) / 2;
    const isTop = mouseY < middle;
    const isBottom = mouseY > middle;

    if (isTop) {
      gsap.set(backgroundRef.current, {
        y: "-100%",
      });
      gsap.to(backgroundRef.current, {
        duration: 0.3,
        ease: "akaruEase",
        y: 0,
      });
    } else if (isBottom) {
      gsap.set(backgroundRef.current, {
        y: "100%",
      });
      gsap.to(backgroundRef.current, {
        duration: 0.3,
        ease: "akaruEase",
        y: 0,
      });
    }
  };
  const handleMouseLeave = (e) => {
    const bounds = projectRef.current.getBoundingClientRect();
    const mouseY = e.clientY;
    const top = bounds.top;
    const bottom = bounds.bottom;
    const middle = top + (bottom - top) / 2;
    const isTop = mouseY < middle;
    const isBottom = mouseY > middle;

    if (isTop) {
      gsap.to(backgroundRef.current, {
        duration: 0.3,
        ease: "akaruEase",
        y: "-100%",
      });
    } else if (isBottom) {
      gsap.to(backgroundRef.current, {
        duration: 0.3,
        ease: "akaruEase",
        y: "100%",
      });
    }
  };

  return (
    <div
      ref={projectRef}
      className="akaru__projectSmallWrapper"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <a href={link} className="akaru__projectSmallLink">
        <div
          ref={backgroundRef}
          className="akaru__projectSmallBackground"
          style={{ backgroundColor: color }}
        ></div>
        <div className="akaru__projectSmallTitleWrapper">
          <h2 className="akaru__projectSmallTitle">{title}</h2>
        </div>
        <div className="akaru__projectSmallDescriptionWrapper">
          <span className="akaru__projectSmallDescription">{description}</span>
        </div>
        <div className="akaru__projectSmallFooterWrapper">
          <span className="akaru__projectSmallType">{type}</span>
          <div className="akaru__projectSmallYearWrapper">
            <span className="akaru__projectSmallYear">{year}</span>
          </div>
        </div>
      </a>
    </div>
  );
}

export default Akaru;
