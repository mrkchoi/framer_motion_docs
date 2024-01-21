import React, { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";
import Lenis from "@studio-freight/lenis";
import SplitType from "split-type";

import "./textScroll.css";

export default function TextScroll() {
  useEffect(() => {
    const lenis = new Lenis();

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }, []);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    const splitTypes = document.querySelectorAll(".textScroll__content");

    splitTypes.forEach((element, i) => {
      const text = new SplitType(element, { types: "chars, words, lines" });

      const bg = element.getAttribute("data-bg-color");
      const fg = element.getAttribute("data-fg-color");

      gsap.fromTo(
        text.words,
        {
          color: bg,
          opacity: 0.2,
        },
        {
          color: fg,
          opacity: 1,
          stagger: 0.05,
          scrollTrigger: {
            trigger: element,
            start: "top 80%",
            end: "top 30%",
            scrub: true,
            // toggleActions: "start start ",
          },
        },
      );

      // gsap.from(text.chars, {
      //   scrollTrigger: {
      //     trigger: element,
      //     start: "top 80%",
      //     end: "top 30%",
      //     scrub: true,
      //     // toggleActions: "start start ",
      //   },
      //   y: 50,
      //   x: 20,
      //   opacity: 0,
      //   stagger: 0.05,
      // });
    });
  });

  return (
    <div className="textScroll__main">
      <div className="textScroll__intro">
        <p>Scroll down to see text animations</p>
      </div>
      <div className="textScroll__section">
        <p
          className="textScroll__content"
          data-bg-color="black"
          data-fg-color="teal"
        >
          I'm baby raclette stumptown ugh gentrify migas jean shorts. Echo park
          cray occupy, subway tile gochujang mlkshk polaroid tumeric blackbird
          spyplane.
        </p>
      </div>
      <div className="textScroll__section">
        <p className="textScroll__content">
          Taxidermy jianbing coloring book, pug prism organic fashion axe.
          Bodega boys mukbang yuccie sriracha selfies hexagon.
        </p>
      </div>
      <div className="textScroll__section">
        <p className="textScroll__content">
          Intelligentsia flannel synth, DIY thundercats venmo poutine pug.
          Readymade crucifix blue bottle hoodie.
        </p>
      </div>
      <div className="textScroll__spacer"></div>
    </div>
  );
}
