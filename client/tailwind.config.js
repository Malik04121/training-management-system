/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      white: "#ffffff", // White
      black: "#000000", // Black,
      primary: "#000000", // black
      secondary: "#4299e1", //blue
      blue: {
        100: "#ebf8ff",
        200: "#bee3f8",
        300: "#90cdf4",
        400: "#63b3ed",
        500: "#4299e1", // Secondary blue
        600: "#3182ce",
        700: "#2b6cb0",
        800: "#2c5282",
        900: "#2a4365",
      },
      purple: {
        100: "#faf5ff",
        200: "#e9d8fd",
        300: "#d6bcfa",
        400: "#b794f4",
        500: "#9f7aea", // Primary purple
        600: "#805ad5",
        700: "#6b46c1",
        800: "#553c9a",
        900: "#44337a",
      },
      orange: {
        100: "#fff7ed",
        200: "#ffedd5",
        300: "#fed7aa",
        400: "#fdba74",
        500: "#fb923c", // Default orange
        600: "#f97316", // Darker orange
        700: "#ea580c",
        800: "#c2410c",
        900: "#9a3412",
      },
      gray: {
        100: "#f3f4f6",
        200: "#e5e7eb",
        300: "#d1d5db",
        500: "#6b7280",
        700: "#374151",
        900: "#111827",
      },
        red: {
          500: "#ef4444",
          600: "#dc2626",
        },
      randomColor:{
        100:"#10130c",
        200:"#2b2e23",
        300:"#3a4036"
      }
    },
    extend: {
      keyframes: {
        wave: {
          '0%': { d: 'path("M 0,100 C 150,200 350,0 500,100 L 500,00 L 0,0")' },
          '50%': { d: 'path("M 0,90 C 130,210 370,10 500,90 L 500,00 L 0,0")' },
          '100%': { d: 'path("M 0,100 C 150,200 350,0 500,100 L 500,00 L 0,0")' }
        },
      },
      animation: {
        wave: 'wave 5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};