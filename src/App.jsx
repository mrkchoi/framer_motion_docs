import "./App.css";
import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Lenis from "@studio-freight/lenis";

import Stagger from "./components/Stagger";
import Intro from "./components/Intro";
import Examples from "./components/Examples";
import SidebarMenu from "./components/sidebar_menu/SidebarMenu";
import SlideBox from "./components/slide_box/SlideBox";
import FruitScroll from "./components/fruit_scroll/FruitScroll";
import SpringScroll from "./components/spring_scroll/SpringScroll";
import ImageCarousel from "./components/image_carousel/ImageCarousel";
import TabsFruit from "./components/tabs-fruit/TabsFruit";
import Toggle from "./components/toggle/Toggle";
import Layout from "./components/parallax/Layout";
import SmoothCursor from "./components/smooth_cursor/SmoothCursor";
import ZoomParallax from "./components/zoom_parallax/ZoomParallax";
import InfiniteMarquee from "./components/infinite_marquee/InfiniteMarquee";
import PixelTransition from "./components/pixel_transition/PixelTransition";
import CharacterScroll from "./components/character_scroll/CharacterScroll";
import CursorHoverMask from "./components/cursor_hover_mask/CursorHoverMask";
import TextDisperse from "./components/text-disperse/TextDisperse";
import PixelCursor from "./components/pixel_cursor/PixelCursor";
import TextMask from "./components/text_mask_slide/TextMask";
import ImageReveal from "./components/image_reveal/ImageReveal";
import Portfolio from "./components/portfolio_home/Portfolio";
import TransitionSlide from "./components/page_transition/slide/TransitionSlide";
import ScrollMarquee from "./components/scroll_marquee/ScrollMarquee";
import Gsap01 from "./components/gsap_01/Gsap01";
import SmoothScrollLanding from "./components/smooth_scroll/SmoothScroll";
import ScrollTrigger01 from "./components/scroll_trigger_01/ScrollTrigger01";
import SmoothMenu from "./components/smooth_menu/SmoothMenu";
import Preloader01 from "./components/preloader_01/Preloader01";
import SideMenu from "./components/side_menu/SideMenu";
import TextScroll from "./components/text_scroll/TextScroll";
import GallerySlide from "./components/gallery_slide/GallerySlide";
import Text3D from "./components/3d_text_single/Text3D";
import PerspectiveText3D from "./components/3d_perspective_text/PerspectiveText3D";
import ProjectGalleryModal from "./components/project_gallery_modal/ProjectGalleryModal";
import BlockMenu from "./components/block_menu/BlockMenu";
import ImagePreloader from "./components/image_preloader/ImagePreloader";
import ScrollSVG from "./components/svg_scroll_path/ScrollSVG";
import HybridScroll from "./components/hybrid_scroll/HybridScroll";
import TextRotate3d from "./components/3d_text_rotate_hover/TextRotate3d";
import Trionn from "./components/trionn/Trionn";
import GlobeNav from "./components/3d_globe_nav/GlobeNav";
import MixBlendText from "./components/mix_blend_text/MixBlendText";
import MagneticButton from "./components/magnetic_buttons/MagneticButton";
import PressPlay from "./components/press_play/PressPlay";
import HorizonStudio from "./components/horizon_studio/HorizonStudio";
import Nascent from "./components/nascent/Nascent";
import Drei01 from "./components/drei_01/Drei01";
import Transition01 from "./components/transition_01/Transition01";
import Transition02 from "./components/transition_02/Transition02";
import Study from "./components/study/Study";
import Matter01 from "./components/matter_01/Matter01";
import Zajno from "./components/zajno/Zajno";
import Yuri01 from "./components/yuri_01/Yuri01";
import Yuri02 from "./components/yuri_02/Yuri02";
import Shader01 from "./components/shader_01/Shader01";
import Shader02 from "./components/shader_02/Shader02";
import Loket from "./components/loket/Loket";
import Gallery01 from "./components/gallery_01/Gallery01";
import Vucko from "./components/vucko/Vucko";
import Gradient01 from "./components/gradient01/Gradient01";
import Raxo from "./components/raxo/Raxo";
import Flip01 from "./components/flip01/Flip01";
import Rejouice from "./components/rejouice/Rejouice";
import Bezier from "./components/bezier/Bezier";
import Stairs from "./components/stairs/Stairs";
import Cotterell from "./components/cotterell/Cotterell";
import Mason from "./components/mason/Mason";
import Curved from "./components/curved/Curved";
import Florian from "./components/florian/Florian";
import Studiod from "./components/studiod/Studiod";
import Studio from "./components/studio/Studio";
import Slinky from "./components/slinky/Slinky";
import Canvas01 from "./components/canvas01/Canvas01";
import Arcs from "./components/arcs/Arcs";
import Sketch03 from "./components/sketch03/Sketch03";
import CanvasStyles from "./components/canvas_styles/CanvasStyles";
import Sketch04 from "./components/sketch04/Sketch04";
import Sketch05 from "./components/sketch05/Sketch05";
import Sketch06 from "./components/sketch06/Sketch06";
import Sketch07 from "./components/sketch07/Sketch07";
import Sketch08 from "./components/sketch08/Sketch08";
import Midnight from "./components/midnight/Midnight";
import Sketch09 from "./components/sketch09/Sketch09";

const CATEGORY_TITLES = [
  "Menu/Nav",
  "Transitions",
  "Layout",
  "Scroll",
  "Hovers, Cursors, Micro Interactions",
  "Typography",
  "Canvas",
  "WebGL & 3D",
  "SVG/Lottie",
  "Matter.js",
  "Misc",
  "Basic",
];

const CATEGORIES = {
  MENU_NAV: "Menu/Nav",
  TRANSITIONS: "Transitions",
  LAYOUT: "Layout",
  SCROLL: "Scroll",
  HOVERS_CURSORS_MICRO: "Hovers, Cursors, Micro Interactions",
  TYPOGRAPHY: "Typography",
  CANVAS: "Canvas",
  WEBGL_3D: "WebGL & 3D",
  SVG_LOTTIE: "SVG/Lottie",
  MATTER_JS: "Matter.js",
  MISC: "Misc",
  BASIC: "Basic",
};

const PAGES = [
  { path: "/stagger", element: <Stagger />, category: CATEGORIES.TYPOGRAPHY },
  { path: "/intro", element: <Intro />, category: CATEGORIES.BASIC },
  { path: "/examples", element: <Examples />, category: CATEGORIES.BASIC },
  {
    path: "/sidebar-menu",
    element: <SidebarMenu />,
    category: CATEGORIES.MENU_NAV,
  },
  {
    path: "/slide-box",
    element: <SlideBox />,
    category: CATEGORIES.MICRO_INTERACTIONS,
  },
  {
    path: "/fruit-scroll",
    element: <FruitScroll />,
    category: CATEGORIES.HOVERS_CURSORS_MICRO,
  },
  {
    path: "/spring-scroll",
    element: <SpringScroll />,
    category: CATEGORIES.HOVERS_CURSORS_MICRO,
  },
  {
    path: "/image-carousel",
    element: <ImageCarousel />,
    category: CATEGORIES.MISC,
  },
  {
    path: "/toggle",
    element: <Toggle />,
    category: CATEGORIES.HOVERS_CURSORS_MICRO,
  },
  {
    path: "/tabs-fruit",
    element: <TabsFruit />,
    category: CATEGORIES.MISC,
  },
  { path: "/parallax", element: <Layout />, category: CATEGORIES.MISC },
  {
    path: "/smooth-cursor",
    element: <SmoothCursor />,
    category: CATEGORIES.HOVERS_CURSORS_MICRO,
  },
  {
    path: "/zoom-parallax",
    element: <ZoomParallax />,
    category: CATEGORIES.MISC,
  },
  {
    path: "/infinite-marquee",
    element: <InfiniteMarquee />,
    category: CATEGORIES.TYPOGRAPHY,
  },
  {
    path: "/pixel-transition",
    element: <PixelTransition />,
    category: CATEGORIES.TRANSITIONS,
  },
  {
    path: "/character-scroll",
    element: <CharacterScroll />,
    category: CATEGORIES.TYPOGRAPHY,
  },
  {
    path: "/cursor-hover-mask",
    element: <CursorHoverMask />,
    category: CATEGORIES.HOVERS_CURSORS,
  },
  {
    path: "/text-disperse",
    element: <TextDisperse />,
    category: CATEGORIES.HOVERS_CURSORS,
  },
  {
    path: "/pixel-cursor",
    element: <PixelCursor />,
    category: CATEGORIES.HOVERS_CURSORS,
  },
  {
    path: "/text-mask",
    element: <TextMask />,
    category: CATEGORIES.TYPOGRAPHY,
  },
  {
    path: "/image-reveal",
    element: <ImageReveal />,
    category: CATEGORIES.HOVERS_CURSORS_MICRO,
  },
  {
    path: "/portfolio",
    element: <Portfolio />,
    category: CATEGORIES.TRANSITIONS,
  },

  {
    path: "/transition-slide/home",
    element: <TransitionSlide />,
    category: CATEGORIES.TRANSITIONS,
  },
  {
    path: "/scroll-marquee",
    element: <ScrollMarquee />,
    category: CATEGORIES.TYPOGRAPHY,
  },
  { path: "/gsap-01", element: <Gsap01 />, category: CATEGORIES.BASIC },
  {
    path: "/smooth-scroll",
    element: <SmoothScrollLanding />,
    category: CATEGORIES.MISC,
  },
  {
    path: "/scroll-trigger-01",
    element: <ScrollTrigger01 />,
    category: CATEGORIES.BASIC,
  },
  {
    path: "/smooth-menu",
    element: <SmoothMenu />,
    category: CATEGORIES.MENU_NAV,
  },
  {
    path: "/preloader01",
    element: <Preloader01 />,
    category: CATEGORIES.TRANSITIONS,
  },
  { path: "/side-menu", element: <SideMenu />, category: CATEGORIES.MENU_NAV },
  {
    path: "/text-scroll",
    element: <TextScroll />,
    category: CATEGORIES.TYPOGRAPHY,
  },
  {
    path: "/gallery-slide",
    element: <GallerySlide />,
    category: CATEGORIES.MENU_NAV,
  },
  { path: "/text-3d", element: <Text3D />, category: CATEGORIES.TYPOGRAPHY },
  {
    path: "/3d-perspective-text",
    element: <PerspectiveText3D />,
    category: CATEGORIES.TYPOGRAPHY,
  },
  {
    path: "/project-gallery-modal",
    element: <ProjectGalleryModal />,
    category: CATEGORIES.MENU_NAV,
  },
  {
    path: "/block-menu",
    element: <BlockMenu />,
    category: CATEGORIES.MENU_NAV,
  },
  {
    path: "/image-preloader",
    element: <ImagePreloader />,
    category: CATEGORIES.TRANSITIONS,
  },
  {
    path: "/scroll-svg",
    element: <ScrollSVG />,
    category: CATEGORIES.SVG_ANIMATION,
  },
  {
    path: "/hybrid-scroll",
    element: <HybridScroll />,
    category: CATEGORIES.LAYOUT,
  },
  {
    path: "/text-rotate-3d",
    element: <TextRotate3d />,
    category: CATEGORIES.MISC,
  },
  {
    path: "/trionn",
    element: <Trionn />,
    category: CATEGORIES.HOVERS_CURSORS_MICRO,
  },
  {
    path: "/mix-blend-text",
    element: <MixBlendText />,
    category: CATEGORIES.MISC,
  },
  { path: "/globe-nav", element: <GlobeNav />, category: CATEGORIES.MENU_NAV },
  {
    path: "/magnetic-button",
    element: <MagneticButton />,
    category: CATEGORIES.HOVERS_CURSORS_MICRO,
  },
  {
    path: "/press-play",
    element: <PressPlay />,
    category: CATEGORIES.MENU_NAV,
  },
  {
    path: "/horizon-studio",
    element: <HorizonStudio />,
    category: CATEGORIES.MENU_NAV,
  },
  { path: "/nascent", element: <Nascent />, category: CATEGORIES.LAYOUT },
  { path: "/drei01", element: <Drei01 />, category: CATEGORIES.WEBGL_3D },
  {
    path: "/transition01",
    element: <Transition01 />,
    category: CATEGORIES.TRANSITIONS,
  },
  {
    path: "/transition02",
    element: <Transition02 />,
    category: CATEGORIES.TRANSITIONS,
  },
  {
    path: "/study",
    element: <Study />,
    category: CATEGORIES.HOVERS_CURSORS_MICRO,
  },
  { path: "/matter01", element: <Matter01 />, category: CATEGORIES.MATTER_JS },
  { path: "/zajno", element: <Zajno />, category: CATEGORIES.WEBGL_3D },
  { path: "/yuri01", element: <Yuri01 />, category: CATEGORIES.WEBGL_3D },
  { path: "/yuri02", element: <Yuri02 />, category: CATEGORIES.WEBGL_3D },
  { path: "/shader01", element: <Shader01 />, category: CATEGORIES.WEBGL_3D },
  { path: "/shader02", element: <Shader02 />, category: CATEGORIES.WEBGL_3D },
  { path: "/loket", element: <Loket />, category: CATEGORIES.TRANSITIONS },
  { path: "/gallery01", element: <Gallery01 />, category: CATEGORIES.WEBGL_3D },
  { path: "/vucko", element: <Vucko />, category: CATEGORIES.LAYOUT },
  { path: "/gradient01", element: <Gradient01 />, category: CATEGORIES.MISC },
  { path: "/raxo", element: <Raxo />, category: CATEGORIES.SVG_LOTTIE },
  { path: "/flip01", element: <Flip01 />, category: CATEGORIES.BASIC },
  { path: "/rejouice", element: <Rejouice />, category: CATEGORIES.MENU_NAV },
  {
    path: "/bezier",
    element: <Bezier />,
    category: CATEGORIES.HOVERS_CURSORS_MICRO,
  },
  { path: "/stairs", element: <Stairs />, category: CATEGORIES.MENU_NAV },
  { path: "/cotterell", element: <Cotterell />, category: CATEGORIES.MENU_NAV },
  { path: "/mason", element: <Mason />, category: CATEGORIES.TRANSITIONS },
  { path: "/curved", element: <Curved />, category: CATEGORIES.MENU_NAV },
  {
    path: "/florian",
    element: <Florian />,
    category: CATEGORIES.HOVERS_CURSORS_MICRO,
  },
  {
    path: "/studiod",
    element: <Studiod />,
    category: CATEGORIES.SCROLL,
  },
  {
    path: "/studio",
    element: <Studio />,
    category: CATEGORIES.LAYOUT,
  },
  {
    path: "/slinky",
    element: <Slinky />,
    category: CATEGORIES.HOVERS_CURSORS_MICRO,
  },
  {
    path: "/canvas01",
    element: <Canvas01 />,
    category: CATEGORIES.CANVAS,
  },
  {
    path: "/arcs",
    element: <Arcs />,
    category: CATEGORIES.CANVAS,
  },
  {
    path: "/sketch03",
    element: <Sketch03 />,
    category: CATEGORIES.CANVAS,
  },
  {
    path: "/canvas-styles",
    element: <CanvasStyles />,
    category: CATEGORIES.CANVAS,
  },
  {
    path: "/sketch04",
    element: <Sketch04 />,
    category: CATEGORIES.CANVAS,
  },
  {
    path: "/sketch05",
    element: <Sketch05 />,
    category: CATEGORIES.CANVAS,
  },
  {
    path: "/sketch06",
    element: <Sketch06 />,
    category: CATEGORIES.CANVAS,
  },
  {
    path: "/sketch07",
    element: <Sketch07 />,
    category: CATEGORIES.CANVAS,
  },
  {
    path: "/sketch08",
    element: <Sketch08 />,
    category: CATEGORIES.CANVAS,
  },
  {
    path: "/midnight",
    element: <Midnight />,
    category: CATEGORIES.LAYOUT,
  },
  {
    path: "/sketch09",
    element: <Sketch09 />,
    category: CATEGORIES.CANVAS,
  },
];

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/stagger" element={<Stagger />} />
          <Route path="/intro" element={<Intro />} />
          <Route path="/examples" element={<Examples />} />
          <Route path="/sidebar-menu" element={<SidebarMenu />} />
          <Route path="/slide-box" element={<SlideBox />} />
          <Route path="/fruit-scroll" element={<FruitScroll />} />
          <Route path="/spring-scroll" element={<SpringScroll />} />
          <Route path="/image-carousel" element={<ImageCarousel />} />
          <Route path="/toggle" element={<Toggle />} />
          <Route path="/tabs-fruit" element={<TabsFruit />} />
          <Route path="/parallax" element={<Layout />} />
          <Route path="/smooth-cursor" element={<SmoothCursor />} />
          <Route path="/zoom-parallax" element={<ZoomParallax />} />
          <Route path="/infinite-marquee" element={<InfiniteMarquee />} />
          <Route path="/pixel-transition" element={<PixelTransition />} />
          <Route path="/character-scroll" element={<CharacterScroll />} />
          <Route path="/cursor-hover-mask" element={<CursorHoverMask />} />
          <Route path="/text-disperse" element={<TextDisperse />} />
          <Route path="/pixel-cursor" element={<PixelCursor />} />
          <Route path="/text-mask" element={<TextMask />} />
          <Route path="/image-reveal" element={<ImageReveal />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/transition-slide/*" element={<TransitionSlide />} />
          <Route path="/scroll-marquee" element={<ScrollMarquee />} />
          <Route path="/gsap-01" element={<Gsap01 />} />
          <Route path="/smooth-scroll" element={<SmoothScrollLanding />} />
          <Route path="/scroll-trigger-01" element={<ScrollTrigger01 />} />
          <Route path="/smooth-menu" element={<SmoothMenu />} />
          <Route path="/preloader01" element={<Preloader01 />} />
          <Route path="/side-menu" element={<SideMenu />} />
          <Route path="/text-scroll" element={<TextScroll />} />
          <Route path="/gallery-slide" element={<GallerySlide />} />
          <Route path="/text-3d" element={<Text3D />} />
          <Route path="/3d-perspective-text" element={<PerspectiveText3D />} />
          <Route
            path="/project-gallery-modal"
            element={<ProjectGalleryModal />}
          />
          <Route path="/block-menu" element={<BlockMenu />} />
          <Route path="/image-preloader" element={<ImagePreloader />} />
          <Route path="/scroll-svg" element={<ScrollSVG />} />
          <Route path="/hybrid-scroll" element={<HybridScroll />} />
          <Route path="/text-rotate-3d" element={<TextRotate3d />} />
          <Route path="/trionn" element={<Trionn />} />
          <Route path="/mix-blend-text" element={<MixBlendText />} />
          <Route path="/globe-nav" element={<GlobeNav />} />
          <Route path="/magnetic-button" element={<MagneticButton />} />
          <Route path="/press-play" element={<PressPlay />} />
          <Route path="/horizon-studio" element={<HorizonStudio />} />
          <Route path="/nascent" element={<Nascent />} />
          <Route path="/drei01" element={<Drei01 />} />
          <Route path="/transition01/*" element={<Transition01 />} />
          <Route path="/transition02/*" element={<Transition02 />} />
          <Route path="/study" element={<Study />} />
          <Route path="/matter01" element={<Matter01 />} />
          <Route path="/zajno" element={<Zajno />} />
          <Route path="/yuri01" element={<Yuri01 />} />
          <Route path="/yuri02" element={<Yuri02 />} />
          <Route path="/shader01" element={<Shader01 />} />
          <Route path="/shader02" element={<Shader02 />} />
          <Route path="/loket" element={<Loket />} />
          <Route path="/gallery01" element={<Gallery01 />} />
          <Route path="/vucko" element={<Vucko />} />
          <Route path="/gradient01" element={<Gradient01 />} />
          <Route path="/raxo" element={<Raxo />} />
          <Route path="/flip01" element={<Flip01 />} />
          <Route path="/rejouice" element={<Rejouice />} />
          <Route path="/bezier" element={<Bezier />} />
          <Route path="/stairs" element={<Stairs />} />
          <Route path="/cotterell" element={<Cotterell />} />
          <Route path="/mason/*" element={<Mason />} />
          <Route path="/curved" element={<Curved />} />
          <Route path="/florian" element={<Florian />} />
          <Route path="/studiod" element={<Studiod />} />
          <Route path="/studio" element={<Studio />} />
          <Route path="/slinky" element={<Slinky />} />
          <Route path="/canvas01" element={<Canvas01 />} />
          <Route path="/arcs" element={<Arcs />} />
          <Route path="/sketch03" element={<Sketch03 />} />
          <Route path="/canvas-styles" element={<CanvasStyles />} />
          <Route path="/sketch04" element={<Sketch04 />} />
          <Route path="/sketch05" element={<Sketch05 />} />
          <Route path="/sketch06" element={<Sketch06 />} />
          <Route path="/sketch07" element={<Sketch07 />} />
          <Route path="/sketch08" element={<Sketch08 />} />
          <Route path="/midnight" element={<Midnight />} />
          <Route path="/sketch09" element={<Sketch09 />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

function Home() {
  useEffect(() => {
    const lenis = new Lenis();

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  return (
    <div className="min-h-screen w-full p-12">
      <h1 className="mb-6 text-2xl font-bold">Motion:</h1>
      <nav className="mb-6 mt-6 flex h-full w-full flex-wrap gap-12">
        {CATEGORY_TITLES.map((title, idx) => (
          <div key={idx} className="mb-4">
            <h2 className="mb-2 text-lg font-bold">{title}</h2>
            <ul>
              {PAGES.filter((page) => page.category === title).map(
                (page, idx) => (
                  <li
                    key={idx}
                    className="underline-offset-2 transition-all hover:underline"
                  >
                    <Link to={page.path} className="py-1">
                      {page.path}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </div>
        ))}
      </nav>
    </div>
  );
}

export default App;
