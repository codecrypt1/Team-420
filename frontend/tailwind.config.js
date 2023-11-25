/** @type {import('tailwindcss').Config} */
import { nextui } from "@nextui-org/react";


module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        body: ["var(--font-poppins)", "sans-serif"],
        body1: ["var(--font-inter)", "sans-serif"],
        body2: ["var(--font-sora)", "sans-serif"],
        body3: ["var(--font-rubik)", "sans-serif"],
        body4: ["var(--font-urbanist)", "sans-serif"],
        body6: ["ClashDisplay-Semibold"],
      },
      fontWeight: {
        300: 300,
        500: 500,
        600: 600,
        700: 700,
        800: 800,
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        btn: {
          background: "hsl(var(--btn-background))",
          "background-hover": "hsl(var(--btn-background-hover))",
        },
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
