/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        white: "#F5EDF0",
        gray: "#4B5E6C",
        black: "#06080F",
        orange: "#D7521D",
      },
      fontFamily: {
        Magtis: ["Magtis", "sans-serif"],
        Inter: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
