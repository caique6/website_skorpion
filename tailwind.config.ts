import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        skorpion: {
          red: "#F21B42",
          darkRed: "#D9183B",
          yellow: "#F2CE16",
          darkYellow: "#F2BD1D",
          orange: "#BF2604",
          black: "#1A1A1A",
          white: "#FFFFFF",
          bg: "#E6193B",
        },
      },
    },
  },
  plugins: [],
};
export default config;