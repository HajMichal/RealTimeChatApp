/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", "./node_modules/flowbite/**/*.js"],
  theme: {
    screens: {
      tablet: "640px",
      // => @media (min-width: 640px) { ... }

      laptop: "1024px",
      // => @media (min-width: 1024px) { ... }

      desktop: "1280px",
      // => @media (min-width: 1280px) { ... }
    },
    extend: {
      fontFamily: {
        orkney: "Orkney",
        orkneyBold: "Orkney-Bold",
        orkneyLight: "Orkney-Light",
      },
      colors: {
        black: "#000000",
        dark: "#111827",
        darkblue: "#10214a",
        mid: "#B5BBC7",
        light: "#F8FAFC",

        brand: "#37A778",
        backgroundGray: "#F0F0F0",
      },
    },
  },
  plugins: [require("daisyui"), require("flowbite/plugin")],
};
