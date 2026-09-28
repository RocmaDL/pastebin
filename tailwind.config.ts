import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#08070a",
          900: "#0d0b10",
          850: "#131019",
          800: "#191521",
          700: "#241f2e",
          600: "#332c40",
          500: "#4a4158",
        },
        paper: {
          50: "#faf8f5",
          100: "#f1ece4",
          200: "#e4dccf",
          400: "#b8ada0",
          600: "#8a7f74",
        },
        ember: {
          400: "#f2a65a",
          500: "#e8873a",
          600: "#d16a1f",
        },
        moss: {
          400: "#9ecb9e",
          500: "#7fb586",
        },
      },
      fontFamily: {
        display: ["var(--font-display)"],
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
      backgroundImage: {
        grain: "url('/grain.svg')",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        blink: {
          "0%, 49%": { opacity: "1" },
          "50%, 100%": { opacity: "0" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        blink: "blink 1s step-start infinite",
      },
    },
  },
  plugins: [],
};

export default config;
