/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "zoom-parallax": "url('/src/images/zoom-parallax/1.jpeg')",
      },
      fontSize: {
        "10xl": "10rem",
      },
    },
  },
  plugins: [],
};
