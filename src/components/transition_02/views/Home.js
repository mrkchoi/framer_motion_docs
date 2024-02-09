import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useNavigate } from "react-router-dom";

import img1 from "../images/1_small.jpg";
import img2 from "../images/2_small.jpg";
import img3 from "../images/3_small.jpg";

const data = [
  {
    id: 1,
    year: "2021",
    title: "Alex Moulder",
    img: img1,
    subtitle:
      "I AM ONLY WAITING FOR LOVE TO GIVE MYSELF UP AT LAST INTO HIS HANDS. THAT IS WHY IT IS SO LATE AND WHY I HAVE BEEN GUILTY OF SUCH OMISSIONS.",
    path: "alex",
  },
  {
    id: 2,
    year: "2022",
    title: "ARIA BENNETT",
    img: img2,
    subtitle:
      "THEY COME WITH THEIR LAWS AND THEIR CODES TO BIND ME FAST; BUT I EVADE THEM EVER, FOR I AM ONLY WAITING FOR LOVE TO GIVE MYSELF UP AT LAST INTO HIS HANDS.",
    path: "aria",
  },
  {
    id: 3,
    year: "2023",
    title: "JIMMY HUGHES",
    img: img3,
    subtitle:
      "CLOUDS HEAP UPON CLOUDS AND IT DARKENS. AH, LOVE, WHY DOST THOU LET ME WAIT OUTSIDE AT THE DOOR ALL ALONE?",
    path: "jimmy",
  },
];

function Home() {
  return (
    <div className={"transition02__homeContainer transition02__view"}>
      <div className="transition02__homeGrid">
        {data.map(({ id, year, title, img, subtitle, path }) => (
          <HomeItem
            key={id}
            id={id}
            year={year}
            title={title}
            img={img}
            subtitle={subtitle}
            path={path}
          />
        ))}
      </div>
    </div>
  );
}

function HomeItem({ id, year, title, img, subtitle, path }) {
  const imageRef = useRef(null);
  const timelineRef = useRef(null);
  const navigate = useNavigate();

  useGSAP(() => {
    const tl = gsap.timeline();
    timelineRef.current = tl;

    tl.to(imageRef.current, {
      duration: 1,
      scale: 1.2,
      ease: "power2.inOut",
    }).pause();
  });

  return (
    <div key={id} className="transition02__homeGridItem">
      <div className="transition02__homeGridItemTop">
        <span className="transition02__homeYear">{year}</span>
        <h1 className="transition02__homeTitle">{title}</h1>
        <div
          className="transition02__homeImgWrapper"
          onClick={() => navigate(`/transition02/${path}`)}
        >
          <div
            ref={imageRef}
            className="transition02__homeImg"
            style={{ backgroundImage: `url(${img})` }}
            onMouseEnter={() => {
              timelineRef.current.play();
            }}
            onMouseLeave={() => {
              timelineRef.current.reverse();
            }}
          ></div>
        </div>
        <p className="transition02__homeSubtitle">{subtitle}</p>
      </div>
      <button
        className="transition02__homeButton"
        onMouseEnter={() => {
          timelineRef.current.play();
        }}
        onMouseLeave={() => {
          timelineRef.current.reverse();
        }}
        onClick={() => navigate(`/transition02/${path}`)}
      >
        view
      </button>
    </div>
  );
}
export default Home;
