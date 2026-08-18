import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "p5-red": "#CE0000",
        "p5-black": "#121212",
        "p5-paper": "#F5F5F5",
      },
    },
    // Enforce anti-slop rules
    borderRadius: {
      none: "0",
    },
  },
  plugins: [],
};
export default config;
