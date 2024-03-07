import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import Flip from "gsap/Flip";

import "../mason.css";

import img01 from "../assets/home/01_anker.jpeg";
import img02 from "../assets/home/02_stella.jpeg";
import img03 from "../assets/home/03_logitech.jpeg";
import img04 from "../assets/home/04_poulsen.jpeg";
import img05 from "../assets/home/05_glossier.jpeg";
import img06 from "../assets/home/06_sona.jpeg";
import img07 from "../assets/home/07_sese.jpeg";

const PAGES = [
  {
    title: "Index,",
    url: "/mason",
  },
  {
    title: "Patreon,",
    url: "/mason",
  },
  {
    title: "Store,",
    url: "/mason",
  },
  {
    title: "About,",
    url: "/mason",
  },
  {
    title: "Lab",
    url: "/mason",
  },
];

const ITEMS = [
  {
    index: "01",
    title: "Anker",
    description: "Personal",
    url: "/mason",
    img: img01,
  },
  {
    index: "02",
    title: "Stella Artois",
    description: "Client Work",
    url: "/mason",
    img: img02,
  },
  {
    index: "03",
    title: "Logitech Quake",
    description: "Client Work",
    url: "/mason",
    img: img03,
  },
  {
    index: "04",
    title: "Louis Poulsen",
    description: "Client Work",
    url: "/mason",
    img: img04,
  },
  {
    index: "05",
    title: "Glossier",
    description: "Client Work",
    url: "/mason",
    img: img05,
  },
  {
    index: "06",
    title: "SONA",
    description: "Client Work",
    url: "/mason",
    img: img06,
  },
  {
    index: "07",
    title: "SESE Botanics",
    description: "Client Work",
    url: "/mason",
    img: img07,
  },
  {
    index: "01",
    title: "Anker",
    description: "Personal",
    url: "/mason",
    img: img01,
  },
];

function Home({ isInitialLoad, setIsInitialLoad }) {
  useEffect(() => {
    if (isInitialLoad) {
      const img = document.querySelector(
        ".mason__carouselItemImgWrapper.loading",
      );
      const loadingParent = document.querySelector(".mason__loadingImgWrapper");
      loadingParent.appendChild(img);

      const text = document.querySelector(".mason__footerBottom");
      const textParent = document.querySelector(".mason__loadingTextWrapper");
      textParent.appendChild(text);

      gsap.set(".mason__footerSvgPath", {
        y: "105%",
      });
      gsap.set(".mason__footerBottom", {
        zIndex: 1,
      });
      gsap.set(".mason__loadingImgWrapper", {
        zIndex: 2,
      });
      gsap.set(
        [
          ".mason__headerWrapper",
          ".mason__footerTop",
          ".mason__carouselItemTextWrapper",
          ".mason__footerBottom",
        ],
        {
          opacity: 0,
        },
      );
      gsap.set(".mason__footerBottom", {
        opacity: 1,
      });
      gsap.set(".mason__carouselItemImgMask", {
        scaleY: 1,
      });

      text.classList.remove("loading");

      const tl = gsap.timeline();
      tl.to(".mason__footerBottom", {
        opacity: 1,
      });
      tl.to(".mason__footerSvgPath", {
        y: 0,
        duration: 1,
        ease: "cubic",
        stagger: 0.1,
        delay: 0.25,
      });
      tl.to(".mason__loadingImgWrapper", {
        scale: 1,
        duration: 1.5,
        ease: "cubic",
      });
      tl.to(
        ".mason__footerLeft",
        {
          x: "-5.5vw",
          duration: 1.5,
          ease: "cubic",
        },
        "<",
      );
      tl.to(
        ".mason__footerRight",
        {
          x: "11vw",
          duration: 1.5,
          ease: "cubic",
          onComplete: () => {
            handleImgFlip();
            handleTextFlip();
          },
        },
        "<",
      );
      tl.to(".mason__carouselItemImgMask", {
        scaleY: 0,
        duration: 2,
        ease: "cubic",
        stagger: 0.125,
      });
      tl.to(
        [
          ".mason__headerWrapper",
          ".mason__footerTop",
          ".mason__carouselItemTextWrapper",
        ],
        {
          opacity: 1,
          duration: 5,
          ease: "cubic",
        },
        "<",
      );

      const handleImgFlip = () => {
        const state = Flip.getState(img, {});
        const newParent = document.querySelector(
          ".mason__carouselItem--center",
        );
        newParent.appendChild(img);
        Flip.from(state, {
          duration: 2,
          ease: "cubic",
          absolute: true,
        });
      };

      const handleTextFlip = () => {
        const state = Flip.getState([
          text,
          ".mason__footerLeft",
          ".mason__footerRight",
        ]);
        const newParent = document.querySelector(".mason__footerWrapper");
        newParent.appendChild(text);
        gsap.set([".mason__footerLeft", ".mason__footerRight"], {
          x: 0,
        });
        Flip.from(state, {
          duration: 2,
          ease: "cubic",
        });
      };
      setIsInitialLoad(false);
    }
  }, []);

  return (
    <div className="mason__homeWrapper">
      <div className="mason__loadingOverlay"></div>
      <div className="mason__loadingImgWrapper"></div>
      <div className="mason__loadingTextWrapper"></div>

      <div className="mason__carouselWrapper">
        <div className="mason__carousel">
          {ITEMS.map((item, idx) => (
            <CarouselItem key={idx} item={item} idx={idx} />
          ))}
        </div>
      </div>
      <div className="mason__footerWrapper">
        <div className="mason__footerTop">
          <div className="mason__footerTopLeft">
            <span className="mason__footerTopLeftText mason__footerTopLeftText--active">
              Carousel,
            </span>
            <span className="mason__footerTopLeftText">List</span>
          </div>
          <div className="mason__footerTopRight">
            <span className="mason__footerTopRightText ">London, UK 19:44</span>
          </div>
        </div>
        <div
          className={[
            "mason__footerBottom",
            isInitialLoad ? "loading" : "",
          ].join(" ")}
        >
          <div className="mason__footerLeft">
            <svg
              viewBox="0 0 540 167"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              className="mason__footerLeftSvg"
            >
              <g className="mason__footerLeftG">
                <path
                  d="M117,46.2618767 C117,19.4285412 97.4093791,3 66.3907241,3 L0,3 L0,164 L20.1348621,164 L20.1348621,93.9047748 L62.0371811,93.9047748 C81.627931,93.9047748 93.6000774,98.8333281 93.6000774,122.92855 L93.6000774,164 L113.73494,164 L113.73494,120.190565 C113.73494,102.119117 106.116336,88.9762215 92.5115949,83.5 C105.027983,78.0237655 117,65.4285449 117,46.2618767 Z M63.1256636,75.2857813 L20.1348621,75.2857813 L20.1348621,20.5237609 L63.1256636,20.5237609 C84.3488792,20.5237609 96.3208966,29.8333225 96.3208966,47.3570964 C96.3208966,64.881 83.804638,75.2857813 63.1256636,75.2857813 Z"
                  className="mason__footerLeftPath mason__footerSvgPath"
                ></path>
              </g>
              <g className="mason__footerLeftG">
                <path
                  d="M198.499613,0 C154.996679,0 124,34.928075 124,83.4998706 C124,132.071278 155.540788,167 198.499613,167 C241.459728,167 273,132.071278 273,83.4998706 C273,34.928075 241.459728,0 198.499613,0 Z M198.499613,148.990221 C166.416521,148.990221 144.663765,122.793874 144.663765,83.4998706 C144.663765,44.2057377 166.416521,18.0097785 198.499613,18.0097785 C230.583994,18.0097785 252.335461,44.2057377 252.335461,83.4998706 C252.335461,122.793874 230.583994,148.990221 198.499613,148.990221 Z"
                  className="mason__footerLeftPath mason__footerSvgPath"
                ></path>
              </g>
              <g className="mason__footerLeftG">
                <path
                  d="M361.551325,75.6524907 L332.224982,68.5770111 C313.215784,64.2229889 304.526306,56.603321 304.526306,43.5409963 C304.526306,28.3016605 319.732892,17.9606642 341.456586,17.9606642 C363.181567,17.9606642 378.931567,30.4786716 380.017108,48.4393358 L380.017108,51.1606642 L400.111847,51.1606642 L400.111847,48.4393358 C398.482892,19.593487 374.586829,0 341.456586,0 C308.327631,0 283.888153,18.5048525 283.888153,44.6295019 C283.888153,66.4 299.094739,81.6393358 326.793414,88.1704981 L353.948675,94.1573432 C374.586829,99.0556827 383.818433,106.675351 383.818433,119.193487 C383.818433,137.15428 368.06972,148.583911 343.086829,148.583911 C317.560522,148.583911 300.181567,133.888118 299.094739,111.57369 L299.094739,108.852491 L279,108.852491 L279,111.57369 C280.086829,144.773174 305.06972,166 343.628955,166 C379.473694,166 405,146.4069 405,118.104852 C404.456586,96.8786716 389.25,81.6393358 361.551325,75.6524907 Z"
                  className="mason__footerLeftPath mason__footerSvgPath"
                ></path>
              </g>
              <g className="mason__footerLeftG">
                <path
                  d="M496.009198,75.6524907 L466.681567,68.5770111 C447.672369,64.2229889 438.982892,56.603321 438.982892,43.5409963 C438.982892,28.3016605 454.189478,17.9606642 475.914459,17.9606642 C497.638153,17.9606642 513.388153,30.4786716 514.473694,48.4393358 L514.473694,51.1606642 L534.568433,51.1606642 L534.568433,48.4393358 C532.939478,19.593487 509.586829,0 476.456586,0 C443.327631,0 418.888153,18.5048525 418.888153,44.6295019 C418.888153,66.4 434.094739,81.6393358 461.793414,88.1704981 L488.948675,94.1573432 C509.586829,99.0556827 518.818433,106.675351 518.818433,119.193487 C518.818433,137.15428 503.068433,148.583911 478.086829,148.583911 C452.560522,148.583911 435.181567,133.888118 434.094739,111.57369 L434.094739,108.852491 L414,108.852491 L414,111.57369 C415.086829,144.773174 440.06972,166 478.628955,166 C514.473694,166 540,146.4069 540,118.104852 C538.913171,96.8786716 523.706586,81.6393358 496.009198,75.6524907 Z"
                  className="mason__footerLeftPath mason__footerSvgPath"
                ></path>
              </g>
            </svg>
          </div>
          <div className="mason__footerRight">
            <svg
              viewBox=" 0 0 796 169"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              className="mason__footerRightSvg"
            >
              <g className="mason__footerRightG">
                <path
                  d="M232.822994,61.2267358 C239.365929,37.719987 239.365929,20.226671 232.822994,9.84001296 C228.461038,3.28 221.372535,0 212.648621,0 C175.026422,0 147.763546,61.2267358 127.589173,106.053472 L140.129475,61.2267358 C146.67241,37.1733938 147.217978,20.226671 140.129475,9.84001296 C135.767518,3.28 128.679016,0 119.955102,0 C82.3329024,0 55.0700266,60.6801426 34.8956536,105.506749 L63.79394,3.28 L59.9775511,0 L59.4319833,0.546667099 C48.5270915,8.20001296 35.9867892,13.1200518 22.3553513,16.9467228 L21.2642157,17.4933161 L19.0832374,25.146658 L21.2642157,25.146658 C28.8982864,26.2399741 33.8058109,26.7866969 35.4412214,30.0666451 C36.5310642,32.2534068 36.5310642,35.5333549 34.8956536,40.453342 L0,164 L17.4478268,164 L22.8996263,151.974172 C47.435956,95.1201815 81.2417668,17.4933161 111.231189,17.4933161 C116.138713,17.4933161 119.409534,19.1333549 121.590513,22.4133031 C126.498037,30.0666451 125.952469,46.4667747 118.865259,70.5201167 L92.1479514,163.453018 L110.141346,163.453018 L115.047578,153.066839 C139.583907,95.6667747 173.935286,16.9467228 203.924708,16.9467228 C208.832232,16.9467228 212.103054,18.5866321 214.284032,21.8667099 C219.191556,29.5200518 218.645989,46.4667747 211.557486,69.9733938 L191.928681,139.400065 C189.202134,148.693575 189.747702,155.800454 192.474248,160.173718 C194.109659,162.907332 196.836205,164 200.108319,164 C210.467643,164 224.644649,150.333225 245.908864,119.720117 L247,118.080207 L236.639383,118.080207 L235.003973,120.266839 C219.191556,141.586697 211.557486,148.146593 208.832232,148.693575 C208.286665,148.693575 207.741097,145.412979 210.467643,136.120765 L232.822994,61.2267358 Z"
                  className="mason__footerRightPath mason__footerSvgPath"
                ></path>
              </g>
              <g className="mason__footerRightG">
                <path
                  d="M360.473915,149.91875 C359.929741,149.374569 359.385567,146.103017 361.560973,136.289655 L398,3.81612069 L395.280419,0 L394.736245,0.545159914 C392.560839,2.18064224 390.385432,3.81612069 388.210026,5.45159914 C385.490445,7.63224139 382.22798,9.81288363 378.964226,12.5386897 C370.2626,4.36128449 361.016799,0.545159914 349.595593,0.545159914 C304.999114,0.545159914 258.227229,55.6062932 253.332241,113.938535 C250.61395,147.192673 264.753448,169 289.227094,169 C308.807042,169 330.561108,151.009698 350.139767,117.754655 L345.24478,134.654526 C341.438141,148.283621 341.438141,158.096983 344.157721,162.45819 C345.788954,164.638793 347.96436,165.728449 350.683941,165.728449 C360.473915,165.728449 374.613413,151.555172 394.736245,121.570776 L396.911652,118.299741 L387.122967,118.299741 C374.070528,137.926077 363.192206,148.829095 360.473915,149.91875 Z M297.385836,152.099354 C281.069642,152.099354 272.368016,135.2 274.543422,109.032112 C278.894235,60.5128449 313.157856,12.5386897 343.613547,12.5386897 C361.016799,12.5386897 369.719715,27.8031466 371.350948,40.8870259 L359.385567,82.8643535 C336.000269,129.747845 315.877436,152.099354 297.385836,152.099354 Z"
                  className="mason__footerRightPath mason__footerSvgPath"
                ></path>
              </g>
              <g className="mason__footerRightG">
                <path
                  d="M525,19.0391531 L523.909754,17.9512199 C512.99953,5.98373566 499.363043,0 484.09054,0 C456.273091,0 428.454348,22.3030816 426.272562,46.7819005 C424.636545,65.8210536 439.909048,76.1566123 454.635781,86.4921709 C469.909577,97.3717607 484.09054,107.163288 482.454524,125.114508 C480.818508,144.697047 465.544712,156.664957 443.181081,156.664957 C424.636545,156.664957 412.636075,149.593069 411.000059,114.234918 L411.000059,112.059052 L403.363161,113.691016 L393,148.505781 L393.54577,149.05007 C401.727144,160.472401 418.091187,167 437.181492,167 C469.363807,167 497.727027,143.609759 499.908813,115.322981 C502.090599,92.4758679 483.54477,79.9644429 467.182021,69.0849821 C453.545535,59.8373566 440.454818,51.1337622 441.545064,37.534404 C442.636604,22.3030816 458.454877,9.24758679 474.817626,9.24758679 C487.909636,9.24758679 497.727027,20.6711173 501.544829,39.7102704 L502.090599,41.3422346 L510.273267,39.7102704 L525,19.0391531 Z"
                  className="mason__footerRightPath mason__footerSvgPath"
                ></path>
              </g>
              <g className="mason__footerRightG">
                <path
                  d="M603.913533,0 C560.726617,0 513.713423,50.7273324 509.340163,102.545686 C506.060866,140.18257 526.833203,168 556.900339,168 C601.179921,168 649.287079,116.182034 653.660339,63.8182986 C656.940932,26.7273139 636.167298,0 603.913533,0 Z M632.886705,66.0000831 C628.513445,113.454739 595.713994,156.545308 563.460229,156.545308 C540.499965,156.545308 526.833203,134.727462 529.566815,102.000176 C533.940075,54.54552 566.19384,12.5454813 598.993291,12.5454813 C621.953555,12.5454813 635.620317,33.8183078 632.886705,66.0000831 Z"
                  className="mason__footerRightPath mason__footerSvgPath"
                ></path>
              </g>
              <g className="mason__footerRightG">
                <path
                  d="M781.303965,61.0232077 C787.832669,37.0498232 787.832669,20.1594341 781.303965,9.80730309 C776.955796,3.26909672 769.885184,0 761.175944,0 C724.170063,0 696.416619,60.4784315 676.826636,105.156026 L705.667767,3.26909672 L701.314437,0 L700.771239,0.544849885 C689.886625,8.17275473 677.371125,13.0764386 663.766648,16.8903891 L662.67896,17.4351653 L660.501005,25.0630663 L662.67896,25.6079717 C669.752153,26.6976534 675.19446,27.2425588 676.826636,30.5116039 C677.915614,32.6909672 677.915614,35.9601415 676.826636,40.8637736 L642,164 L659.957807,164 L663.766648,155.282547 C688.798938,97.5281255 723.082375,18.524847 752.466705,18.524847 C757.369684,18.524847 760.634036,20.1594341 763.35648,23.9733846 C768.246557,31.6012856 767.704648,48.4916746 760.634036,71.9202829 L741.040182,139.481839 C738.319029,148.744456 738.863518,155.82771 741.583381,160.186437 C743.216847,162.909672 745.93671,164 749.202353,164 C759.537317,164 773.691444,150.378656 794.916184,119.867052 L796,118.232465 L785.665036,118.232465 C770.969,138.391512 761.175944,148.199293 758.4535,148.199293 C757.911592,148.199293 757.369684,144.929602 760.092128,135.668276 L781.303965,61.0232077 Z"
                  className="mason__footerRightPath mason__footerSvgPath"
                ></path>
              </g>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function CarouselItem({ item, idx }) {
  const ref = useRef(null);
  const navigate = useNavigate();

  const handleMouseEnter = () => {
    const items = document.querySelectorAll(".mason__carouselItem");
    items.forEach((item) => {
      item.classList.remove("mason__carouselItem--active");
    });
    ref.current.classList.add("mason__carouselItem--active");
  };
  const handleMouseLeave = () => {};

  return (
    <div
      ref={ref}
      className={[
        "mason__carouselItem",
        idx === 3
          ? "mason__carouselItem--active mason__carouselItem--center"
          : "",
      ].join(" ")}
    >
      <div
        className="mason__carouselItemTextWrapper"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <span className="mason__carouselItemIndex">{item.index}.</span>
        <span className="mason__carouselItemTitle">{item.title}</span>
        <span className="mason__carouselItemDescription">
          [{item.description}]
        </span>
      </div>
      <div
        className={[
          ["mason__carouselItemImgWrapper", idx === 3 ? "loading" : ""].join(
            " ",
          ),
        ]}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={(e) => {
          if (idx === 3) {
            const img = e.target;
            gsap.to(".mason__homeWrapper", {
              opacity: 0,
              duration: 1,
              ease: "cubic",
            });
            const state = Flip.getState(img, {
              absolute: true,
            });
            const newParent = document.querySelector(
              ".mason__transitionImgWrapper",
            );
            newParent.appendChild(img);
            Flip.from(state, {
              duration: 0.75,
              ease: "cubic",
              absolute: true,
              delay: 0.25,
              onComplete: () => {
                navigate("/mason/poulsen");
              },
            });
          }
        }}
      >
        <div
          className={[
            [
              "mason__carouselItemImgMask",
              idx === 3 ? "mason__carouselItemImgMask--exclude" : "",
            ].join(" "),
          ]}
        ></div>
        <img
          src={item.img}
          alt={item.title}
          className="mason__carouselItemImg"
          data-flip-id="poulsenFlip"
        />
      </div>
    </div>
  );
}

export default Home;
