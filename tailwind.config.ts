import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#FFF8EF",
        ink: "#3A2B52",
        lavender: {
          DEFAULT: "#B99AF2",
          light: "#F1EAFF",
          dark: "#8A63D9",
        },
        bubblegum: {
          DEFAULT: "#FF8FBF",
          light: "#FFE3F0",
        },
        mint: {
          DEFAULT: "#5FE0C0",
          light: "#DFFBF3",
        },
        sun: {
          DEFAULT: "#FFCF4D",
          light: "#FFF3D2",
        },
      },
      fontFamily: {
        display: ["var(--font-baloo)", "cursive"],
        body: ["var(--font-vietnam)", "sans-serif"],
      },
      borderRadius: {
        blob: "42% 58% 62% 38% / 45% 40% 60% 55%",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "50%": { transform: "translateY(-14px) rotate(2deg)" },
        },
        pop: {
          "0%": { transform: "scale(0.9)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        pop: "pop 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) both",
      },
    },
  },
  plugins: [],
};

export default config;
