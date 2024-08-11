import { url } from "inspector";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        //You can customize this as you wish
        dark: {
          bg: "#161616",
          text: "#FFFFFF",
          primary: "#27B5E2",
          secondary: "#1A97BF",
        },
        light: {
          bg: "#F5F5F5",
          text: "#000000",
          primary: "#D56C6C",
          secondary: "#EE1B1B",
        },
      },
      fontFamily: {
        figtree: ['Figtree', 'sans-serif'],
        lato: ['Lato', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
        nunito: ['Nunito', 'sans-serif'],
      },

      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "custom-gradient":
          "inear-gradient(90deg, rgba(172, 169, 255, 0.91) 0%, rgba(172, 169, 255, 0) 91.25%)",
      },
      
    },
  },
  plugins: [],
};
export default config;
