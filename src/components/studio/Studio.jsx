import React from "react";

import "./studio.css";
import media01 from "./assets/images/01_the-studio-reel2.mp4";
import media02 from "./assets/images/02_royalcastle-trapphus-2500x-q80.webp";
import media03 from "./assets/images/03_verso.svg";
import media04 from "./assets/images/04_canalife-sym-hd.mp4";
import media05 from "./assets/images/05_herbert-4-5-1500x-q80.webp";
import media06 from "./assets/images/06_sh-3d-white-2_compressed.mp4";
import media07 from "./assets/images/07_oolonginstagram-3-1500x-q80.webp";
import media08 from "./assets/images/08_carina-seth-andersson-book-crop-1500x-q80.webp";
import media09 from "./assets/images/09_lemonaid-table.mp4";
import media10 from "./assets/images/10_lindell-ts-svensktenn-64-01-1500x-q80.webp";
import media11 from "./assets/images/11_blossa-glogg-063-1500x-q80.webp";
import media12 from "./assets/images/12_symbols.mp4";
import media13 from "./assets/images/13_karela-07854-2-1500x-q80.webp";
import media14 from "./assets/images/14_wa-logo.svg";
import media15 from "./assets/images/15_community-cola-1500x-q80.webp";
import media16 from "./assets/images/16_nrs.mp4";
import media17 from "./assets/images/17_verso-skincare-002-1500x-q80.webp";
import media18 from "./assets/images/18_tallberg-ig-artboard-3-1500x-q80.webp";
import media19 from "./assets/images/19_wordmarks.mp4";
import media20 from "./assets/images/20_hm-tights-images-10-1500x-q80.webp";
import media21 from "./assets/images/21_oolong-web.mp4";
import media22 from "./assets/images/22_brilliant-logo-23.mp4";
import media23 from "./assets/images/23_vete-katten-konditori-1500x-q80.webp";
import media24 from "./assets/images/24_sh-illustration-2.svg";
import media25 from "./assets/images/25_hm-tights-1500x-q80.webp";
import media26 from "./assets/images/26_digital_icon_animation-square-cropped_2_compressed.mp4";
import media27 from "./assets/images/27_purewell.mp4";
import media28 from "./assets/images/28_lemonaid-ginger-1-1500x-q80.webp";
import media29 from "./assets/images/29_skog-zoom-speed-up-final.mp4";

const MEDIA_TYPES = {
  VIDEO: "video",
  IMAGE: "image",
};

const ITEMS = [
  {
    id: "01",
    media: media01,
    title: "The Studio, 10 years",
    type: MEDIA_TYPES.VIDEO,
  },
  {
    id: "02",
    media: media02,
    title: "Swedish Royal Court",
    type: MEDIA_TYPES.IMAGE,
  },
  {
    id: "03",
    media: media03,
    title: "Verso Skincare",
    type: MEDIA_TYPES.IMAGE,
  },
  {
    id: "04",
    media: media04,
    title: "Canalife",
    type: MEDIA_TYPES.VIDEO,
  },
  {
    id: "05",
    media: media05,
    title: "Herbert",
    type: MEDIA_TYPES.IMAGE,
  },
  {
    id: "06",
    media: media06,
    title: "Svensk Handel",
    type: MEDIA_TYPES.VIDEO,
  },
  {
    id: "07",
    media: media07,
    title: "Oolong Tea House",
    type: MEDIA_TYPES.IMAGE,
  },
  {
    id: "08",
    media: media08,
    title: "Carina Seth Andersson",
    type: MEDIA_TYPES.IMAGE,
  },
  {
    id: "09",
    media: media09,
    title: "Lemonaid",
    type: MEDIA_TYPES.VIDEO,
  },
  {
    id: "10",
    media: media10,
    title: "Svenskt Tenn",
    type: MEDIA_TYPES.IMAGE,
  },
  {
    id: "11",
    media: media11,
    title: "Blossa Glögg",
    type: MEDIA_TYPES.IMAGE,
  },
  {
    id: "12",
    media: media12,
    title: "Symbols",
    type: MEDIA_TYPES.VIDEO,
  },
  {
    id: "13",
    media: media13,
    title: "Nela",
    type: MEDIA_TYPES.IMAGE,
  },
  {
    id: "14",
    media: media14,
    title: "Waldemarson Arkitekter",
    type: MEDIA_TYPES.IMAGE,
  },
  {
    id: "15",
    media: media15,
    title: "Community Cola",
    type: MEDIA_TYPES.IMAGE,
  },
  {
    id: "16",
    media: media16,
    title: "Svensk Handel",
    type: MEDIA_TYPES.VIDEO,
  },
  {
    id: "17",
    media: media17,
    title: "Verso Skincare",
    type: MEDIA_TYPES.IMAGE,
  },
  {
    id: "18",
    media: media18,
    title: "Tällbergsgruppen",
    type: MEDIA_TYPES.IMAGE,
  },
  {
    id: "19",
    media: media19,
    title: "Waldemarson Arkitekter",
    type: MEDIA_TYPES.VIDEO,
  },
  {
    id: "20",
    media: media20,
    title: "H&M",
    type: MEDIA_TYPES.IMAGE,
  },
  {
    id: "21",
    media: media21,
    title: "Oolong Tea House",
    type: MEDIA_TYPES.VIDEO,
  },
  {
    id: "22",
    media: media22,
    title: "Brilliant",
    type: MEDIA_TYPES.VIDEO,
  },
  {
    id: "23",
    media: media23,
    title: "Vete-Katten",
    type: MEDIA_TYPES.IMAGE,
  },
  {
    id: "24",
    media: media24,
    title: "Svensk Handel",
    type: MEDIA_TYPES.IMAGE,
  },
  {
    id: "25",
    media: media25,
    title: "H&M",
    type: MEDIA_TYPES.IMAGE,
  },
  {
    id: "26",
    media: media26,
    title: "Wise Group",
    type: MEDIA_TYPES.VIDEO,
  },
  {
    id: "27",
    media: media27,
    title: "Purewell",
    type: MEDIA_TYPES.VIDEO,
  },
  {
    id: "28",
    media: media28,
    title: "Lemonaid",
    type: MEDIA_TYPES.IMAGE,
  },
  {
    id: "29",
    media: media29,
    title: "Tällbergsgruppen",
    type: MEDIA_TYPES.VIDEO,
  },
];

// Reference: https://www.the-studio.se/

function Studio() {
  return <div>Studio</div>;
}

export default Studio;
