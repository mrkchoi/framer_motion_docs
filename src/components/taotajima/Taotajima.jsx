import { Suspense, useEffect, useState, useRef } from "react";
import Lenis from "@studio-freight/lenis";
import { CustomEase } from "gsap/all";
import gsap from "gsap";
import { Canvas } from "@react-three/fiber";
import { OrthographicCamera } from "@react-three/drei";
import { Perf } from "r3f-perf";

import "./taotajima.css";

import Scene from "./Scene";

import img001 from "./assets/images/001_night_stroll.jpeg";
import img002 from "./assets/images/002_sstv.jpeg";
import img003 from "./assets/images/003_xperia.jpeg";
import img004 from "./assets/images/004_waxing_moon.jpeg";
import img005 from "./assets/images/005_asa_dan.jpeg";
import img006 from "./assets/images/006_bravia.jpeg";
import img007 from "./assets/images/007_itsuka-no-hoshi.jpeg";
import img008 from "./assets/images/008_stripe-intl.jpeg";
import img009 from "./assets/images/009_techne.jpeg";
import img010 from "./assets/images/010_xperia.jpeg";
import img011 from "./assets/images/011_MTV.jpeg";
import img012 from "./assets/images/012_9d_project.jpeg";
import img013 from "./assets/images/013_tsunagaru.jpeg";
import img014 from "./assets/images/014_pasocom.jpeg";
import img015 from "./assets/images/015_cuushe.jpeg";
import img016 from "./assets/images/016_future_food.jpeg";
import img017 from "./assets/images/017_citizen.jpeg";
import img018 from "./assets/images/018_teleplay.jpeg";
import img019 from "./assets/images/019_MN.jpeg";

import video001 from "./assets/videos/001.mp4";
import video002 from "./assets/videos/002.mp4";
import video003 from "./assets/videos/003.mp4";
import video004 from "./assets/videos/004.mp4";
import video005 from "./assets/videos/005.mp4";
import video006 from "./assets/videos/006.mp4";
import video007 from "./assets/videos/007.mp4";
import video008 from "./assets/videos/008.mp4";
import video009 from "./assets/videos/009.mp4";
import video010 from "./assets/videos/010.mp4";
import video011 from "./assets/videos/011.mp4";
import video012 from "./assets/videos/012.mp4";
import video013 from "./assets/videos/013.mp4";
import video014 from "./assets/videos/014.mp4";
import video015 from "./assets/videos/015.mp4";
import video016 from "./assets/videos/016.mp4";
import video017 from "./assets/videos/017.mp4";
import video018 from "./assets/videos/018.mp4";
import video019 from "./assets/videos/019.mp4";

const WORK_DATA = [
  {
    title: "MN concept movie",
    number: "019",
    image: img019,
    video: video019,
  },
  {
    title: "TELE-PLAY - prism",
    number: "018",
    image: img018,
    video: video018,
  },
  {
    title: "CITIZEN - ATTESA",
    number: "017",
    image: img017,
    video: video017,
  },
  {
    title: "FUTURE FOOD TALK",
    number: "016",
    image: img016,
    video: video016,
  },
  {
    title: "Cuushe - Magic",
    number: "015",
    image: img015,
    video: video015,
  },
  {
    title: "Pasocom Music Club - reiji no machi",
    number: "014",
    image: img014,
    video: video014,
  },
  {
    title: "Tsunagaru (connecting) promotional video",
    number: "013",
    image: img013,
    video: video013,
  },
  {
    title: "THE 9D PROJECT -Experience Innovation-",
    number: "012",
    image: img012,
    video: video012,
  },
  {
    title: "MTV ULTRAHITS",
    number: "011",
    image: img011,
    video: video011,
  },
  {
    title: "Xperia Ear Open-style Concept",
    number: "010",
    image: img010,
    video: video010,
  },
  {
    title: "TECHNE",
    number: "009",
    image: img009,
    video: video009,
  },
  {
    title: "STRIPE INTERNATIONAL INC.",
    number: "008",
    image: img008,
    video: video008,
  },
  {
    title: "Gurun Gurun - Itsuka no Hoshi",
    number: "007",
    image: img007,
    video: video007,
  },
  {
    title: "SONY BRAVIA 2017 Design Concept",
    number: "006",
    image: img006,
    video: video006,
  },
  {
    title: "tofubeats - Asa Ga Kuru Made Owaru Koto No Nai Dance Wo",
    number: "005",
    image: img005,
    video: video005,
  },
  {
    title: "Rayons ft. Predawn - Waxing Moon",
    number: "004",
    image: img004,
    video: video004,
  },
  {
    title: "Xperia Ear",
    number: "003",
    image: img003,
    video: video003,
  },
  {
    title: "SPACE SHOWER TV Plus “IDOL SONG RANKING”",
    number: "002",
    image: img002,
    video: video002,
  },
  {
    title: "Night Stroll",
    number: "001",
    image: img001,
    video: video001,
  },
];

gsap.registerPlugin(CustomEase);
CustomEase.create("taotajima", ".39,.575,.565,1");

const PERSPECTIVE = 1000;
const FOV =
  (180 * (2 * Math.atan(window.innerHeight / 2 / PERSPECTIVE))) / Math.PI;

const lerp = (start, end, t) => {
  return start * (1 - t) + end * t;
};
let current = 0;
let target = 0;
let ease = 0.075;

const mouse = {
  current: { x: 0, y: 0 },
  target: { x: 0, y: 0 },
};

function Taotajima() {
  const scrollableRef = useRef(null);
  const [images, setImages] = useState([]);

  useEffect(() => {
    // get all images from DOM and set them to state for use in canvas scene
    const allImages = [...document.querySelectorAll(".taotajima__itemImage")];
    setImages(allImages);
  }, []);

  useEffect(() => {
    const lenis = new Lenis();

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  // SMOOTH SCROLL SYNC SETUP
  useEffect(() => {
    // window.scrollTo(0, 0);
    // SET VIRTUAL SCROLL PARENT HEIGHT, UPDATE ON RESIZE
    const init = () => {
      document.body.style.height = `${
        scrollableRef.current.getBoundingClientRect().height
      }px`;
    };
    init();
    window.addEventListener("resize", init);

    // UPDATE SCROLLABLE CONTAINER Y POSITION IN ANIMATION LOOP
    const smoothScroll = () => {
      // console.log("window.scrollY:", window.scrollY);
      // console.log("smoothScroll");
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
      window.removeEventListener("resize", init);
      document.body.style.height = "";
    };
  }, []);

  useEffect(() => {
    const onMouseMove = (e) => {
      mouse.target.x = e.clientX;
      mouse.target.y = e.clientY;
    };
    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  return (
    <div className="taotajima__main">
      <div className="taotajima__canvasWrapper">
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
          {/* <Perf /> */}
        </Canvas>
      </div>
      <header className="taotajima__header">
        <div className="taotajima__headerLeft">
          <a href="/taotajima" className="taotajima__logoLink taotajima__link">
            Tao Tajima
          </a>
        </div>
        <div className="taotajima__headerRight">
          <ul className="taotajima__social">
            <li className="taotajima__socialItem">
              <a
                href="/taotajima"
                className="taotajima__socialLink taotajima__link"
              >
                facebook
              </a>
            </li>
            <span>/</span>
            <li className="taotajima__socialItem">
              <a
                href="/taotajima"
                className="taotajima__socialLink taotajima__link"
              >
                vimeo
              </a>
            </li>
          </ul>
        </div>
      </header>
      <div ref={scrollableRef} className="taotajima__scrollable">
        <div className="taotajima__section">
          <div className="taotajima__grid">
            {WORK_DATA.map((work, idx) => (
              <GridItem key={idx} work={work} />
            ))}
            <div className="taotajima__gridItem taotajima__gridItemSpacer"></div>
            <div className="taotajima__gridItem taotajima__gridItemSpacer"></div>
          </div>
        </div>
        <div className="taotajima__section taotajima__footer">
          <div className="taotajima__footerTitle">
            <span className="taotajima__footerSubtitle">Filmmaker</span>
            <span className="taotajima__footerName">
              {"Tao Tajima".split("").map((char, idx) => (
                <span key={idx} className="taotajima__footerNameChar">
                  {char}
                </span>
              ))}
            </span>
          </div>
          <div className="taotajima__footerFrom">
            <span>from TANGRAM co.ltd.</span>
            <a href="/taotajima" className="taotajima__link">
              http://tangram.to/
            </a>
          </div>
          <div className="taotajima__footerDescription">
            <span>
              A director and film maker with the Tokyo visual design studio
              Tangram.
            </span>
            <span>
              Characterized by a worldview that completely transforms casual
              everyday landscapes, expressed through the skillful use of light.
            </span>
          </div>
          <div className="taotajima__footerContact">
            <span>Contact</span>
            <a href="/taotajima" className="taotajima__link">
              info@tangram.to
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function GridItem({ work }) {
  const imgRef = useRef(null);
  const numRef = useRef(null);
  const textRef = useRef(null);

  const handleMouseEnter = (e) => {
    gsap.to(imgRef.current, {
      duration: 1,
      scale: 1.2,
      ease: "taotajima",
    });
    gsap.to(numRef.current, {
      duration: 0.2,
      y: "100%",
      opacity: 0,
      ease: "taotajima",
    });
    gsap.to(textRef.current, {
      duration: 0.2,
      y: "-100%",
      opacity: 0,
      ease: "taotajima",
    });
  };

  const handleMouseLeave = (e) => {
    gsap.to(imgRef.current, {
      duration: 1,
      scale: 1,
      x: 0,
      y: 0,
      ease: "taotajima",
    });
    gsap.to(numRef.current, {
      duration: 0.2,
      y: 0,
      opacity: 1,
      ease: "taotajima",
    });
    gsap.to(textRef.current, {
      duration: 0.2,
      y: 0,
      opacity: 1,
      ease: "taotajima",
    });
  };

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { left, width, top, height } = e.target.getBoundingClientRect();
    const x = clientX - left;
    const y = clientY - top;
    const centerX = width / 2;
    const centerY = height / 2;
    const dx = x - centerX;
    const dy = y - centerY;
    const tiltX = (dx / centerX).toFixed(2);
    const tiltY = (dy / centerY).toFixed(2);
    gsap.to(imgRef.current, {
      duration: 1,
      x: -tiltX * 40,
      y: -tiltY * 5,
      ease: "taotajima",
    });
  };

  return (
    <div
      className="taotajima__gridItem"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      <a href="/taotajima" className="taotajima__gridItemInner">
        <div className="taotajima__itemNumberWrapper" ref={numRef}>
          <span className="taotajima__itemNumber">{work.number}</span>
        </div>
        <div className="taotajima__itemImageWrapper">
          <img
            ref={imgRef}
            className="taotajima__itemImage"
            src={work.image}
            alt="img"
            data-video={work.video}
          />
        </div>
        <div ref={textRef} className="taotajima__itemTextWrapper">
          <span className="taotajima__itemText">{work.title}</span>
        </div>
      </a>
    </div>
  );
}

export default Taotajima;
