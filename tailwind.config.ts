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
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-bebas)", "Impact", "sans-serif"],
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-15px)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        }
      },
      animation: {
        'float-slow': 'float 5s ease-in-out infinite',
        'float-slower': 'float 7s ease-in-out infinite',
        'marquee': 'marquee 40s linear infinite',
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
