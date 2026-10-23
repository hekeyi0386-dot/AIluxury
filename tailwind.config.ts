import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        emerald: { DEFAULT: "#123D30" },
        forest: "#092820",
        ink: "#101513",
        gold: { DEFAULT: "#C3A36B", soft: "#DCC590", deep: "#8F7343" },
        ivory: "#F5F1E8",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Cormorant Garamond", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Jost", "system-ui", "sans-serif"],
      },
      letterSpacing: { widest2: "0.32em" },
    },
  },
  plugins: [],
};
export default config;
