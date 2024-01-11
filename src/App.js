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

const PAGES = [
  { path: "/stagger", element: <Stagger /> },
  { path: "/intro", element: <Intro /> },
  { path: "/examples", element: <Examples /> },
  { path: "/sidebar-menu", element: <SidebarMenu /> },
  { path: "/slide-box", element: <SlideBox /> },
  { path: "/fruit-scroll", element: <FruitScroll /> },
  { path: "/spring-scroll", element: <SpringScroll /> },
  { path: "/image-carousel", element: <ImageCarousel /> },
  { path: "/toggle", element: <Toggle /> },
  { path: "/tabs-fruit", element: <TabsFruit /> },
  { path: "/parallax", element: <Layout /> },
  { path: "/smooth-cursor", element: <SmoothCursor /> },
  { path: "/trippy", element: <Trippy /> },
];

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/intro" element={<Intro />} />
        <Route path="/examples" element={<Examples />} />
        <Route path="/stagger" element={<Stagger />} />
        <Route path="/sidebar-menu" element={<SidebarMenu />} />
        <Route path="/slide-box" element={<SlideBox />} />
        <Route path="/fruit-scroll" element={<FruitScroll />} />
        <Route path="/spring-scroll" element={<SpringScroll />} />
        <Route path="/image-carousel" element={<ImageCarousel />} />
        <Route path="/toggle" element={<Toggle />} />
        <Route path="/tabs-fruit" element={<TabsFruit />} />
        <Route path="/parallax" element={<Layout />} />
        <Route path="/smooth-cursor" element={<SmoothCursor />} />
        <Route path="/trippy" element={<Trippy />} />
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
