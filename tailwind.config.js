/** @type {import('tailwindcss').Config} */
import { Color } from "./src/constants/styles/color.style";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ...Color,
      },
      screens: {
        "semi-sm": "448px",
      },
    },
  },
  plugins: [],
};
