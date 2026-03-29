import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Fraunces", "Georgia", "serif"],
        sans: ["Manrope", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 20px 60px rgba(18, 24, 38, 0.10)",
      },
      colors: {
        canvas: "#f7f4ee",
        ink: "#13161d",
        muted: "#5b6272",
        accent: "#0f766e",
        peach: "#f4ddc8",
        line: "#e6dccf",
      },
    },
  },
  plugins: [],
};

export default config;

