import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Stagger from "./components/Stagger";
import Intro from "./components/Intro";
import Examples from "./components/Examples";
import SidebarMenu from "./components/sidebar_menu/SidebarMenu";
import SlideBox from "./components/slide_box/SlideBox";
import Trippy from "./components/trippy/Trippy";
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

const PAGES = [
  { path: "/stagger", element: <Stagger /> },
  { path: "/intro", element: <Intro /> },
  { path: "/examples", element: <Examples /> },
  { path: "/trippy", element: <Trippy /> },
  { path: "/sidebar-menu", element: <SidebarMenu /> },
  { path: "/slide-box", element: <SlideBox /> },
  { path: "/fruit-scroll", element: <FruitScroll /> },
  { path: "/spring-scroll", element: <SpringScroll /> },
  { path: "/image-carousel", element: <ImageCarousel /> },
  { path: "/toggle", element: <Toggle /> },
  { path: "/tabs-fruit", element: <TabsFruit /> },
  { path: "/parallax", element: <Layout /> },
  { path: "/smooth-cursor", element: <SmoothCursor /> },
  { path: "/zoom-parallax", element: <ZoomParallax /> },
  { path: "/infinite-marquee", element: <InfiniteMarquee /> },
  { path: "/pixel-transition", element: <PixelTransition /> },
  { path: "/character-scroll", element: <CharacterScroll /> },
  { path: "/cursor-hover-mask", element: <CursorHoverMask /> },
  { path: "/text-disperse", element: <TextDisperse /> },
  { path: "/pixel-cursor", element: <PixelCursor /> },
];

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/stagger" element={<Stagger />} />
        <Route path="/intro" element={<Intro />} />
        <Route path="/examples" element={<Examples />} />
        <Route path="/trippy" element={<Trippy />} />
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
      </Routes>
    </BrowserRouter>
  );
}

function Home() {
  return (
    <div className="container mx-auto">
      <h1 className="mb-6 mt-6 text-2xl font-bold">Framer Motion:</h1>
      <nav>
        <ul>
          {PAGES.map((page, idx) => (
            <li key={idx}>
              <Link to={page.path} className="py-1">
                {page.path}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default App;
