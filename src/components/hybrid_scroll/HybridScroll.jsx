import React, { useEffect } from "react";
import Lenis from "@studio-freight/lenis";

import img01 from "./images/aac8555b660fcedc736e17.webp";
import img02 from "./images/ad4ac89b5bbcce9b6ebf2b.webp";
import img03 from "./images/b1477560260d85b05c5179.webp";
import img04 from "./images/b52146482e854f4c6c5db2.webp";
import img05 from "./images/89cf477127bd6ca55418b2.webp";
import img06 from "./images/89cf4c637edf8277eaa36e.webp";
import img07 from "./images/a88197f9c33e22cb290306.webp";
import img08 from "./images/ee17e92789795d136c2c19.webp";

import "./hybridScroll.css";

const images = [img01, img02, img03, img04];
const images2 = [img05, img06, img07, img08];

export default function HybridScroll() {
  useEffect(() => {
    const lenis = new Lenis();

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  useEffect(() => {
    const stickySections = [
      ...document.querySelectorAll(".hybridScroll__sticky"),
    ];

    const transform = (section) => {
      const offsetTop = section.parentElement.offsetTop;
      const scrollSection = section.querySelector(
        ".hybridScroll__sticky--section",
      );
      let percentage =
        ((window.scrollY - offsetTop) / window.innerHeight) * 100;
      percentage = percentage < 0 ? 0 : percentage > 400 ? 400 : percentage;
      scrollSection.style.transform = `translate3d(-${percentage}vw,0,0)`;
    };

    const handleScroll = () => {
      for (let i = 0; i < stickySections.length; i++) {
        transform(stickySections[i]);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="hybridScroll__main">
      <VerticalSection title="Hybrid Scroll" />
      <HorizontalSection images={images} />
      <VerticalSection title="About" />
      <HorizontalSection images={images2} />
      <VerticalSection title="End" />
    </div>
  );
}

function VerticalSection({ title }) {
  return (
    <section className="hybridScroll__section">
      <div className="hybridScroll__container">
        <h1>{title}</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magni
          dolorem quia blanditiis aliquid! Explicabo inventore quae et expedita
          voluptas, fugiat quisquam accusamus maxime aliquid quod tenetur labore
          officia voluptate modi.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magni
          dolorem quia blanditiis aliquid! Explicabo inventore quae et expedita
          voluptas, fugiat quisquam accusamus maxime aliquid quod tenetur labore
          officia voluptate modi.
        </p>
      </div>
    </section>
  );
}

function HorizontalSection({ images }) {
  return (
    <div className="hybridScroll__stickyParent">
      <div className="hybridScroll__sticky">
        <div className="hybridScroll__sticky--section">
          {images.map((image, idx) => (
            <img key={idx} src={image} alt="" className="hybridScroll__img" />
          ))}
        </div>
      </div>
    </div>
  );
}
