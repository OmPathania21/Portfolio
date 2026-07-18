import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Driven by CSS variables so light/dark themes can swap the palette.
        // Values are RGB channel triplets — see app/globals.css.
        surface: {
          DEFAULT: "rgb(var(--surface) / <alpha-value>)",
          800: "rgb(var(--surface-800) / <alpha-value>)",
          700: "rgb(var(--surface-700) / <alpha-value>)",
          600: "rgb(var(--surface-600) / <alpha-value>)",
        },
        content: {
          DEFAULT: "rgb(var(--content) / <alpha-value>)",
          soft: "rgb(var(--content-soft) / <alpha-value>)",
          dim: "rgb(var(--content-dim) / <alpha-value>)",
        },
        accent: {
          DEFAULT: "rgb(var(--accent) / <alpha-value>)",
          soft: "rgb(var(--accent-soft) / <alpha-value>)",
          deep: "rgb(var(--accent-deep) / <alpha-value>)",
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
