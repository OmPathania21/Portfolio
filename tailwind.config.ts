import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#0C0B0A",
          800: "#121110",
          700: "#1A1917",
          600: "#26241F",
        },
        paper: {
          DEFAULT: "#EDE8DD",
          soft: "#C7C1B3",
          dim: "#8B857A",
        },
        gold: {
          DEFAULT: "#C9A96A",
          soft: "#E0C892",
          deep: "#9C7E48",
        },
      },
      fontFamily: {
        serif: ["var(--font-fraunces)", "Georgia", "serif"],
        sans: ["var(--font-space)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        tightest: "-0.045em",
      },
    },
  },
  plugins: [],
};

export default config;
