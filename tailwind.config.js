/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: "440px",
        sm: "576px",
        md: "768px",
        lg: "992px",
        xl: "1200px",
        "2xl": "1400px",
      },
      fontFamily: {
        "inter-medium": ["Inter-Medium"],
      },
      colors: {
        black: {
          core: "#000000",
          900: "#3d3d3d",
        },
        white: "#ffffff",
        pink: {
          300: "#f2709c",
        },
        orange: {
          300: "#ff835b",
        },
        slate: {
          200: "rgb(226, 226, 226)",
          400: "rgb(141, 138, 138)",
        },
      },
    },
  },
  corePlugins: {
    container: false,
  },
  plugins: [
    require("@tailwindcss/line-clamp"),
    require("@tailwindcss/typography"),
    function ({ addComponents }) {
      addComponents({
        ".container": {
          margin: "auto",
          padding: "0 0.75rem",
          maxWidth: "100%",
          "@screen xs": {
            maxWidth: "440px",
          },
          "@screen sm": {
            maxWidth: "540px",
          },
          "@screen md": {
            maxWidth: "720px",
          },
          "@screen lg": {
            maxWidth: "960px",
          },
          "@screen xl": {
            maxWidth: "1140px",
          },
          "@screen 2xl": {
            maxWidth: "1320px",
          },
        },
      });
    },
  ],
};
