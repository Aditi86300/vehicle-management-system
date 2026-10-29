import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: "#FCA311",       // warm amber accent - CTAs, ratings, price
        "brand-dark": "#E08E00",
        ink: "#14213D",         // deep navy - navbar, headings
        "ink-light": "#1F2D52",
        cream: "#F7F7F5"        // warm off-white page background
      },
      fontFamily: {
        heading: ["var(--font-poppins)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"]
      }
    }
  },
  plugins: []
};
export default config;
