/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";

module.exports = {
  
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  plugins: [
    require('daisyui'),
  ],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: ["light", "dark"],
  },
  darkMode: "class",
};
