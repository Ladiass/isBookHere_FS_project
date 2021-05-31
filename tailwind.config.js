module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      height:{
        "1/2vh":"50vh",
        "1/3vh":"33.33333vh",
        "4/10vh":"40vh",
        "4/5vh":"80vh",
        "1/4vh":"25vh"
      },
      width:{
        "1/2vw":"50vw",
        "1/3vw":"33.33333vw",
        "2/3vw":"66.66666vw",
        "4/10vw":"40vw"
      },
      keyframes:{
        dingdong:{
          '0%,100%':{left:'4%'},
          '50%':{left:'0%'}
        },
      },
      animation:{
        dingdong : 'dingdong 1.5s infinite'
      }
    },
  },
  variants: {
    extend: {
      outline: ["active"],
      gradientColorStops: ["active"],
      animation:["hover"],
      inset: ["group-hover","group-focus"],
      display:["group-hover"],
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}
