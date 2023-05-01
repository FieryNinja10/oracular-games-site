/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))"
      },
      colors: {
        primary: "rgb(24, 24, 24)",
        secondary: "rgb(36, 36, 36)",
        darker: "rgba(0,0,0,.6);",
        darkWhite: "#717171",
        rad: "rgb(255, 0, 0)",
        darkRad: "rgb(177, 0, 0)"
      },
      fontFamily: {
        rubik: "'Rubik', sans-serif",
        nunito: "'Nunito', sans-serif"
      }
    }
  },
  plugins: []
};
