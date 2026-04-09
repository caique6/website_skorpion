import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/utils/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: "#73022C",
        },
        accent: {
          gold: "#F2D43D",
          crimson: "#D9043D",
          orange: "#F27405",
          red: "#D6002E",
        },
        background: {
          dark: "#1A0010",
          darkSecondary: "#220015",
          light: "#FFFFFF",
          warmNeutral: "#FDF6E3",
        },
      },
      fontFamily: {
        display: ["var(--font-dm-sans)", "sans-serif"],
        body: ["var(--font-montserrat)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;