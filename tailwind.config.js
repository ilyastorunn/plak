/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        customWhite: "#F5EDF0",
        customgray: "#4B5E6C",
        customblack: "#06080F",
        customorange: "#D7521D",
      },
      fontFamily: {
        Magtis: ["Magtis", "sans-serif"],
        Inter: ["Inter", "sans-serif"],
      },
      animation: {
        'spin': 'spin 2s linear infinite',
        'spin-slow': 'spin 5s linear infinite',
      },
    },
  },
  plugins: [],
};
