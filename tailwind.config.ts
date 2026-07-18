import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Light, airy blue backgrounds & raised surfaces
        surface: {
          DEFAULT: "#D8E7FA", // page background (soft sky blue — clearly tinted)
          800: "#F4F9FF", // cards / raised panels (lighter, lifts off the bg)
          700: "#C7DBF5", // subtle bands / deeper tint
          600: "#A9C4EC", // borders / scrollbar
        },
        // Ink text on light
        content: {
          DEFAULT: "#0F1E38", // primary text (deep navy)
          soft: "#41506A", // secondary text
          dim: "#55627A", // muted labels & meta
        },
        // Blue accent + lighter sky tone
        accent: {
          DEFAULT: "#2563EB",
          soft: "#60A5FA",
          deep: "#1D4ED8",
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
