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
        customborder: "rgba(229, 217, 221, 0.8)",
      },
      blur: {
        xs: "2px",
      },
      boxShadow: {
        top: "0 -10px 15px -3px rgba(0, 0, 0, 0.1), 0 -4px 6px -2px rgba(0, 0, 0, 0.05)",
        "custom-strong": "0 10px 20px rgba(0, 0, 0, 0.3)",
      },
      fontFamily: {
        Magtis: ["Magtis", "sans-serif"],
        Inter: ["Inter", "sans-serif"],
        PoppinsRegular: ["Poppins", "serif"],
        Lora: ["Lora", "serif"],
      },
      animation: {
        spin: "spin 2s linear infinite",
        "spin-slow": "spin 10s linear infinite",
      },
      keyframes: {
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("@nextui-org/react")],
};
