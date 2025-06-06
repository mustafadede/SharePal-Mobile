// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require("nativewind/preset")],
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
 theme: {
    extend: {
      colors: {
        cBlack: "#000",
        cDarkGray: "#353535",
        cDarkerPurple: "#3A1479",
        cFuchsia600: "#C026D3",
        cWhite: "#FFF",
        cGolden: "#EFD05B",
        cGradient1: "#18043A",
        cGradient2: "#0E0B13",
      },
      fontWeight: {
        light: 300,
        normal: 400,
        medium: 500,
        bold: 700,
      },
      animation: {
        text: "text 5s ease infinite",
      },
      keyframes: {
        text: {
          "0%, 100%": {
            "background-size": "200% 200%",
            "background-position": "left center",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "right center",
          },
          "25%": {
            "background-size": "200% 200%",
            "background-position": "top center",
          },
        },
      },
    },
  },
  plugins: [],
};