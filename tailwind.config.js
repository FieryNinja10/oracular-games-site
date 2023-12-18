/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      height: {
        footer: "405px",
        nav: "69px",
      },
      colors: {
        prime: "rgb(24, 24, 24)",
        second: "rgb(36, 36, 36)",
        darker: "rgba(0,0,0,.6);",
        darkWhite: "#717171",
        rad: "rgb(255, 0, 0)",
        darkRad: "rgb(177, 0, 0)",
      },
      fontFamily: {
        rubik: ["var(--font-rubik)"],
        nunito: ["var(--font-nunito)"],
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("tailwind-clip-path")],
};
