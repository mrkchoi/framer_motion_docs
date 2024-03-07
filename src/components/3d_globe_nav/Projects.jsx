import React, { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

const data = [
  {
    title: "Ford",
    description:
      "Working on the Next-Generation HMI Experience without no driving experience.",
    speed: 0.5,
  },
  {
    title: "UFC",
    description:
      "Developed the Future of UFC Sports Ecosystem despite not being a sports fan.",
    speed: 0.5,
  },
  {
    title: "Lincoln",
    description:
      "Defined the visual concept and design language for the Lincoln Zephyr 2022 but never seen it in real life.",
    speed: 0.67,
  },
  {
    title: "Royal Caribbean",
    description:
      "I was just one person on a massive team that created an entire Royal Caribbean eco-system.",
    speed: 0.8,
  },
  {
    title: "Sleepiq",
    description:
      "Designed a 1M+ users product utilizing my best personal experience: sleeping.",
    speed: 0.8,
  },
  {
    title: "NFL",
    description:
      "Explored the Future of Fantasy Football while being in a country where football means a total different sport.",
    speed: 0.8,
  },
];

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);
  const projectsRef = useRef(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    const titles = document.querySelectorAll(".globeNav__projectTitle");

    gsap.to([...titles], {
      scrollTrigger: {
        trigger: projectsRef.current,
        scrub: true,
        // markers: true,
        start: "start 80%",
        end: "center 50%",
      },
      backgroundPositionX: "0%",
    });
  });

  const trimTitle = (string, maxLength) => {
    return string.substring(0, maxLength);
  };

  return (
    <div ref={projectsRef} className="globeNav__projects">
      {data.map((item, idx) => (
        <div
          key={idx}
          className="globeNav__project"
          onMouseOver={() => {
            setSelectedProject(idx);
          }}
          onMouseLeave={() => {
            setSelectedProject(null);
          }}
        >
          <span className="globeNav__projectTitle">{item.title}</span>
          <div
            className={["globeNav__projectOverlay"].join(" ")}
            style={{
              clipPath:
                selectedProject === idx ? `inset(0 0 0)` : `inset(50% 0 50%)`,
            }}
          >
            <span className="globeNav__projectOverlay--title">
              {trimTitle(item.title, 9)}
            </span>
            <span className="globeNav__projectOverlay--description">
              {item.description}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
