import React, { useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";

import "./studio.css";
import logo from "./assets/images/the-studio_logo.svg";
import media02 from "./assets/images/02_royalcastle-trapphus-2500x-q80.webp";
import media03 from "./assets/images/03_verso.svg";
import media05 from "./assets/images/05_herbert-4-5-1500x-q80.webp";
import media07 from "./assets/images/07_oolonginstagram-3-1500x-q80.webp";
import media08 from "./assets/images/08_carina-seth-andersson-book-crop-1500x-q80.webp";
import media10 from "./assets/images/10_lindell-ts-svensktenn-64-01-1500x-q80.webp";
import media11 from "./assets/images/11_blossa-glogg-063-1500x-q80.webp";
import media13 from "./assets/images/13_karela-07854-2-1500x-q80.webp";
import media14 from "./assets/images/14_wa-logo.svg";
import media15 from "./assets/images/15_community-cola-1500x-q80.webp";
import media17 from "./assets/images/17_verso-skincare-002-1500x-q80.webp";
import media18 from "./assets/images/18_tallberg-ig-artboard-3-1500x-q80.webp";
import media19 from "./assets/images/19_waldemarson-arkitekter-1500x-q80.webp";
import media20 from "./assets/images/20_hm-tights-images-10-1500x-q80.webp";
import media24 from "./assets/images/24_vete-katten-konditori-1500x-q80.webp";
import media25 from "./assets/images/25_sh-illustration-2.svg";
import media26 from "./assets/images/26_hm-tights-1500x-q80.webp";
import media29 from "./assets/images/29_lemonaid-ginger-1-1500x-q80.webp";

const MEDIA_TYPES = {
  VIDEO: "video",
  IMAGE: "image",
};

const ITEMS = [
  {
    id: "02",
    media: media02,
    title: "Swedish Royal Court",
    type: MEDIA_TYPES.IMAGE,
  },
  {
    id: "05",
    media: media05,
    title: "Herbert",
    type: MEDIA_TYPES.IMAGE,
  },
  {
    id: "03",
    media: media03,
    title: "Verso Skincare",
    type: MEDIA_TYPES.IMAGE,
  },

  {
    id: "07",
    media: media07,
    title: "Oolong Tea House",
    type: MEDIA_TYPES.IMAGE,
  },
  {
    id: "08",
    media: media08,
    title: "Carina Seth Andersson",
    type: MEDIA_TYPES.IMAGE,
  },

  {
    id: "10",
    media: media10,
    title: "Svenskt Tenn",
    type: MEDIA_TYPES.IMAGE,
  },
  {
    id: "11",
    media: media11,
    title: "Blossa Glögg",
    type: MEDIA_TYPES.IMAGE,
  },
  {
    id: "13",
    media: media13,
    title: "Nela",
    type: MEDIA_TYPES.IMAGE,
  },
  {
    id: "14",
    media: media14,
    title: "Waldemarson Arkitekter",
    type: MEDIA_TYPES.IMAGE,
  },
  {
    id: "15",
    media: media15,
    title: "Community Cola",
    type: MEDIA_TYPES.IMAGE,
  },
  {
    id: "17",
    media: media17,
    title: "Verso Skincare",
    type: MEDIA_TYPES.IMAGE,
  },
  {
    id: "18",
    media: media18,
    title: "Tällbergsgruppen",
    type: MEDIA_TYPES.IMAGE,
  },
  {
    id: "19",
    media: media19,
    title: "Waldemarson Arkitekter",
    type: MEDIA_TYPES.IMAGE,
  },
  {
    id: "20",
    media: media20,
    title: "H&M",
    type: MEDIA_TYPES.IMAGE,
  },
  {
    id: "24",
    media: media24,
    title: "Vete-Katten",
    type: MEDIA_TYPES.IMAGE,
  },
  {
    id: "25",
    media: media25,
    title: "Svensk Handel",
    type: MEDIA_TYPES.IMAGE,
  },
  {
    id: "26",
    media: media26,
    title: "H&M",
    type: MEDIA_TYPES.IMAGE,
  },
  {
    id: "29",
    media: media29,
    title: "Lemonaid",
    type: MEDIA_TYPES.IMAGE,
  },
];

const SERVICES = [
  "Graphic Identity",
  "Packaging",
  "Art Direction",
  "Brand Strategy",
  "Copywriting",
  "Naming",
  "Communication",
  "Digital Design",
  "E-commerce",
  "UX/UI Design",
  "Motion",
  "Creative Coding",
  "Development",
  "Exhibition Design",
  "Spatial Design",
  "Film/Photo Production",
  "Signage",
];

const CLIENTS = [
  "Lemonaid",
  "Svenskt Tenn",
  "Tällbergsgruppen",
  "Arket",
  "Swedish Royal Court",
  "Verso Skincare",
  "Pia Wallén",
  "Blossa Glögg",
  "Carina Seth Andersson",
  "Svensk Handel",
  "H&M",
  "Wise Group",
  "Charitea",
  "& Other Stories",
];

const STATES = [
  [12, 6, 3, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [8, 4, 3, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 9, 4, 8, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 5, 4, 6, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 5, 4, 8, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 4, 5, 8, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 5, 4, 8, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 4, 5, 8, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 7, 9, 8, 5, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 4, 5, 8, 5, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 5, 4, 8, 7, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 9, 8, 5, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 5, 8, 7, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 8, 7, 4, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 4, 9, 6, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 4, 8, 7, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 9, 8, 7],
];

// Reference: https://www.the-studio.se/

function Studio() {
  const timeoutRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis();

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  useEffect(() => {
    // update grid template columns on slideParent dynamically based on STATES
    const slideWrapper = document.querySelector(".studio__slideWrapper");
    const slideParent = document.querySelector(".studio__slideParent");
    let idx = 0;

    const handleClick = () => {
      clearTimeout(timeoutRef.current);
      slideParent.style.gridTemplateColumns = STATES[idx]
        .map((val) => `${val}fr`)
        .join(" ");
      idx = (idx + 1) % STATES.length;

      timeoutRef.current = setTimeout(() => {
        handleClick();
      }, 2000);
    };

    slideWrapper.addEventListener("click", handleClick);

    timeoutRef.current = setTimeout(() => {
      handleClick();
    }, 2000);

    return () => {
      slideWrapper.removeEventListener("click", handleClick);
      clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div className="studio__main">
      <section className="studio__slideWrapper">
        <div className="studio__slideParent">
          {ITEMS.map((item) => (
            <div key={item.id} className="studio__slideItem">
              <figure className="studio__slideFigure">
                {item.type === MEDIA_TYPES.VIDEO ? (
                  <video
                    src={item.media}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="studio__media studio__video"
                  ></video>
                ) : (
                  <img
                    src={item.media}
                    alt={item.title}
                    className="studio__media studio__image"
                  />
                )}
                <figcaption className="studio__caption">
                  {item.title}
                </figcaption>
              </figure>
            </div>
          ))}
        </div>
      </section>
      <section className="studio__aboutWrapper">
        <div className="studio__descriptionWrapper studio__descriptionWrapper1">
          <span className="studio__descriptionTitle">The Studio</span>
          <p className="studio__descriptionText">
            We're busy working on our new website, which will be launched
            shortly. In the meantime, feel free to browse our archive site or
            follow us on Instagram.
          </p>
          <p className="studio__descriptionText">
            The Studio helps companies succeed by creating distinct and
            appealing brand experiences based on targeted strategy and clever
            insights. If you need help to strengthen your brand through any
            visual, digital or physical touchpoint, get in touch.
          </p>
        </div>
        <div className="studio__descriptionWrapper studio__descriptionWrapper2">
          <span className="studio__descriptionTitle">Services</span>
          <ul className="studio__list">
            {SERVICES.map((service, index) => (
              <li key={index} className="studio__listItem">
                {service}
              </li>
            ))}
          </ul>
        </div>
        <div className="studio__descriptionWrapper studio__descriptionWrapper3">
          <span className="studio__descriptionTitle">Clients</span>
          <ul className="studio__list">
            {CLIENTS.map((client, index) => (
              <li key={index} className="studio__listItem">
                {client}
              </li>
            ))}
          </ul>
        </div>
        <div className="studio__descriptionWrapper studio__descriptionWrapper4">
          <span className="studio__descriptionTitle">Contact</span>
          <p className="studio__contactWrapper">
            The Studio
            <br />
            Åsögatan 113
            <br />
            116 24 Stockholm
            <br />
            Sweden
          </p>
          <p className="studio__contactWrapper">
            +46 70 732 02 60
            <br />
            info@the-studio.se
          </p>
          <p className="studio__contactWrapper">
            <a href="/studio" className="studio__contactLink">
              Instagram
            </a>
            <a href="/studio" className="studio__contactLink">
              LinkedIn
            </a>
          </p>
        </div>
      </section>
      <section className="studio__footerWrapper">
        <img src={logo} alt="" className="studio__footerImg" />
      </section>
    </div>
  );
}

export default Studio;
