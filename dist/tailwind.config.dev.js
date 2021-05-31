"use strict";

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false,
  // or 'media' or 'class'
  theme: {
    extend: {
      height: {
        "1/2vh": "50vh",
        "1/3vh": "33.33333vh",
        "4/10vh": "40vh"
      },
      width: {
        "1/2vw": "50vw",
        "1/3vw": "33.33333vw",
        "4/10vw": "40vw"
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
};