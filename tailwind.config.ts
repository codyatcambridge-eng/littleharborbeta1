import type { Config } from "tailwindcss";

/**
 * Little Harbor design system.
 *
 * Palette goal: "a harbor" — safe, calm, anchored, warm, quietly hopeful.
 * Soft coastal tones: pale blue, muted teal, warm cream, gentle sand,
 * light gray, with restrained soft-gold accents.
 */
const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // Brand "harbor" blues / teals
        harbor: {
          50: "#f1f6f9",
          100: "#dcebf1",
          200: "#bdd8e4",
          300: "#90bccf",
          400: "#5e99b3",
          500: "#3f7c98", // primary muted teal-blue
          600: "#356880",
          700: "#2f5568",
          800: "#2c4857",
          900: "#283e4b",
        },
        // Warm cream / sand backgrounds
        sand: {
          50: "#fdfbf6",
          100: "#f8f2e7",
          200: "#f0e6d2",
          300: "#e6d6b8",
          400: "#d8c096",
        },
        // Soft gold accent — used sparingly
        gold: {
          300: "#e8cd8e",
          400: "#dab85f",
          500: "#c79f3e",
        },
        // Calm gray scale
        mist: {
          50: "#f7f8f9",
          100: "#eef1f3",
          200: "#dde2e6",
          300: "#c2cad0",
          500: "#8c97a0",
          700: "#525c64",
          900: "#2b3137",
        },
      },
      fontFamily: {
        // Friendly but polished sans-serif (system stack — no external fetch needed)
        sans: [
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Inter",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
      },
      boxShadow: {
        soft: "0 6px 24px -8px rgba(40, 62, 75, 0.18)",
        card: "0 2px 10px -3px rgba(40, 62, 75, 0.12)",
      },
      maxWidth: {
        content: "72rem",
      },
    },
  },
  plugins: [],
};

export default config;
