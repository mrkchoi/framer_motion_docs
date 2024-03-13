import React, { useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { CustomEase } from "gsap/CustomEase";

import img1 from "./assets/img1.jpeg";
import img2 from "./assets/img2.jpeg";
import img3 from "./assets/img3.jpeg";
import img4 from "./assets/img4.jpeg";
import img5 from "./assets/img5.jpeg";
import img6 from "./assets/img6.jpeg";
import img7 from "./assets/img7.jpeg";
import img8 from "./assets/img8.jpeg";
import img9 from "./assets/img9.jpeg";
import img10 from "./assets/img10.jpeg";
import img11 from "./assets/img11.jpeg";
import img12 from "./assets/img12.jpeg";
import img13 from "./assets/img13.jpeg";
import img14 from "./assets/img14.jpeg";
import img15 from "./assets/img15.jpeg";
import img16 from "./assets/img16.jpeg";
import img17 from "./assets/img17.jpeg";
import img18 from "./assets/img18.jpeg";
import img19 from "./assets/img19.jpeg";
import img20 from "./assets/img20.jpeg";
import img21 from "./assets/img21.jpeg";
import img22 from "./assets/img22.jpeg";
import img23 from "./assets/img23.jpeg";
import img24 from "./assets/img24.jpeg";
import img25 from "./assets/img25.jpeg";
import img26 from "./assets/img26.jpeg";
import img27 from "./assets/img27.jpeg";
import img28 from "./assets/img28.jpeg";
import img29 from "./assets/img29.jpeg";
import img30 from "./assets/img30.jpeg";
import img31 from "./assets/img31.jpeg";
import img32 from "./assets/img32.jpeg";
import img33 from "./assets/img33.jpeg";
import img34 from "./assets/img34.jpeg";
import img35 from "./assets/img35.jpeg";
import img36 from "./assets/img36.jpeg";
import img37 from "./assets/img37.jpeg";
import img38 from "./assets/img38.jpeg";
import img39 from "./assets/img39.jpeg";
import img40 from "./assets/img40.jpeg";
import img41 from "./assets/img41.jpeg";
import img42 from "./assets/img42.jpeg";
import img43 from "./assets/img43.jpeg";
import img44 from "./assets/img44.jpeg";
import img45 from "./assets/img45.jpeg";
import img46 from "./assets/img46.jpeg";
import img47 from "./assets/img47.jpeg";
import img48 from "./assets/img48.jpeg";
import img49 from "./assets/img49.jpeg";
import img50 from "./assets/img50.jpeg";
import img51 from "./assets/img51.jpeg";
import img52 from "./assets/img52.jpeg";
import img53 from "./assets/img53.jpeg";
import img54 from "./assets/img54.jpeg";
import img55 from "./assets/img55.jpeg";
import img56 from "./assets/img56.jpeg";
import img57 from "./assets/img57.jpeg";
import img58 from "./assets/img58.jpeg";
import img59 from "./assets/img59.jpeg";
import img60 from "./assets/img60.jpeg";
import img61 from "./assets/img61.jpeg";
import img62 from "./assets/img62.jpeg";
import img63 from "./assets/img63.jpeg";
import img64 from "./assets/img64.jpeg";
import img65 from "./assets/img65.jpeg";

import "./cotterell.css";

CustomEase.create("cubic", "0.16, 1, 0.3, 1");

const NAV_ITEMS = ["Overview", "Commissions", "Editorial", "Personal", "Film"];

const MENU_ITEMS = [
  {
    title: "Antica Terra",
    images: [img1, img2, img3, img4, img5],
  },
  {
    title: "Canada Goose",
    images: [img6, img7, img8, img9, img10],
  },
  { title: "France", images: [img11, img12, img13, img14, img15] },
  { title: "Hawk on Hand", images: [img16, img17, img18, img19, img20] },
  { title: "Knot Spring", images: [img21, img22, img23, img24, img25] },
  { title: "The New York Times", images: [img26, img27, img28, img29, img30] },
  { title: "Nike", images: [img31, img32, img33, img34, img35] },
  { title: "Noe", images: [img36, img37, img38, img39, img40] },
  { title: "New Dance Project", images: [img41, img42, img43, img44, img45] },
  { title: "Okaidja Afroso", images: [img46, img47, img48, img49, img50] },
  { title: "Rolling Stone", images: [img51, img52, img53, img54, img55] },
  { title: "Rothy's", images: [img56, img57, img58, img59, img60] },
  { title: "Spartan Shop", images: [img61, img62, img63, img64, img65] },
];

function Cotterell() {
  const ref = useRef(null);

  useEffect(() => {
    const lenis = new Lenis();

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  useGSAP(() => {
    gsap.set(".cotterell__itemInner", {
      y: "100%",
      opacity: 0,
    });
    gsap.to(".cotterell__itemInner", {
      y: "0%",
      opacity: 1,
      duration: 0.8,
      ease: "cubic",
      stagger: 0.05,
      onComplete: () => {
        document
          .querySelectorAll(".cotterell__item")
          .forEach((item) =>
            item.classList.remove("cotterell__item--overflowHidden"),
          );
      },
    });
  });

  return (
    <div ref={ref} className="cotterell__main">
      <header className="cotterell__header">
        <a href="/cotterell" className="cotterell__logo">
          Cotterell
        </a>
        <div className="cotterell__navWrapper">
          <ul className="cotterell__nav">
            {NAV_ITEMS.map((item, idx) => (
              <li key={idx} className="cotterell__navItem">
                <a
                  href="/cotterell"
                  className={[
                    "cotterell__navItemLink",
                    item === "Overview" ? "cotterell__navItemLink--active" : "",
                  ].join(" ")}
                >
                  <span className="cotterell__navItemLinkText">{item}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="cotterell__headerRightWrapper">
          <a className="cotterell__navItemLink" href="/cotterell">
            Archive
          </a>
        </div>
      </header>
      <div className="cotterell__menuWrapper">
        {MENU_ITEMS.map((item, idx) => (
          <MenuItem item={item} key={idx} />
        ))}
      </div>
    </div>
  );
}

function MenuItem({ item }) {
  const imageCount = item.images.length;
  const itemRef = useRef(null);
  const imageRef = useRef(null);
  const intervalRef = useRef(null);
  let count = 0;

  useGSAP(
    () => {
      const xTo = gsap.quickTo(imageRef.current, "x", {
        duration: 1,
      });

      const handleMouseMove = (e) => {
        const bounds = itemRef.current.getBoundingClientRect();
        const mouseX = e.clientX;
        const right = bounds.left + bounds.width;
        const left = bounds.left;
        const normalizedMouseX = (mouseX - left) / (right - left);

        // console.log("normalizedMouseX: ", normalizedMouseX);

        const translateValue = normalizedMouseX * 100 - 50 * 0.2;
        xTo(translateValue);
      };

      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    },
    {
      scope: itemRef.current,
    },
  );

  const handleActiveImageInterval = () => {
    const images = itemRef.current.querySelectorAll(".cotterell__itemImage");
    images.forEach((img, _) => {
      img.classList.remove("cotterell__itemImage--active");
    });
    images[count].classList.add("cotterell__itemImage--active");
    count++;
    if (count === imageCount) {
      count = 0;
    }
    intervalRef.current = setInterval(() => {
      images.forEach((img, _) => {
        img.classList.remove("cotterell__itemImage--active");
      });

      images[count].classList.add("cotterell__itemImage--active");

      count++;

      if (count === imageCount) {
        count = 0;
      }
    }, 500);
  };

  const handleMouseEnter = () => {
    gsap.set(itemRef.current.querySelector(".cotterell__itemImageWrapper"), {
      scale: 0.95,
    });
    gsap.to(itemRef.current.querySelector(".cotterell__itemImageWrapper"), {
      scale: 1,
      duration: 0.25,
      ease: "cubic",
    });
    gsap.to(itemRef.current.querySelector(".cotterell__itemImageWrapper"), {
      scale: 0.95,
      duration: 0.75,
      ease: "cubic",
      delay: 0.25,
    });
    handleActiveImageInterval();
  };

  const handleMouseLeave = () => {
    clearInterval(intervalRef.current);
  };

  return (
    <div
      ref={itemRef}
      className="cotterell__item cotterell__item--overflowHidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="cotterell__itemInner">
        <div ref={imageRef} className="cotterell__itemImageWrapper">
          {item.images.map((img, idx) => (
            <img key={idx} className="cotterell__itemImage" src={img} alt="" />
          ))}
        </div>
        <div className="cotterell__itemTextWrapper">
          <span className="cotterell__itemText cotterell__itemText1">
            {item.title}
          </span>
          <span className="cotterell__itemText cotterell__itemText2">
            {item.title}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Cotterell;
