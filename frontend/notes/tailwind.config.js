/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#f8efd4",
        secondary: "#2E8B57",
        darkBackground: "rgb(27, 27, 27)",
        darkCard: "#1f1f1f",
        darkTitleText: "#f8efd4",
        darkText: "#999",
      },
      fontFamily: {
        dosis: ["Dosis", "sans-serif"],
        bigShoulders: ['"Big Shoulders Stencil Display"', "cursive"],
      },
      backgroundImage: {
        footer: "url('/footer-bg-color.png')",
      },
    },
  },
  plugins: [],
};
