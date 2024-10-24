/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      white: "#ffffff", // White
      black: "#000000", // Black,
      primary: "#FF6D2C", // Orange from the banner
      secondary: "#333333", // Dark grey for headers, footer, text
      beige: "#E6C9A8", // Light beige for subtle backgrounds and highlights
      lightGrey: "#F5F5F5", // Light grey for clean background sections
      darkGrey: "#2B2B2B", // Secondary dark grey for navbar or text
      green: {
        500: "#22c55e",
      },
      blue: {
        100: "#ebf8ff",
        200: "#bee3f8",
        300: "#90cdf4",
        400: "#63b3ed",
        500: "#4299e1", 
        600: "#3182ce",
        700: "#2b6cb0",
        800: "#2c5282",
        900: "#2a4365",
      },
      yellow: {
        100: "#fffff0",
        200: "#fefcbf",
        300: "#faf089",
        400: "#f6e05e",
        500: "#ecc94b",
        600: "#d69e2e",
        700: "#b7791f",
        800: "#975a16",
        900: "#744210",
      },      
      orange: {
        100: "#fff7ed",
        200: "#ffedd5",
        300: "#fed7aa",
        400: "#fdba74",
        500: "#FF6D2C", 
        600: "#f97316", 
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
        500: "#ef4444", // Red for warnings/errors
        600: "#dc2626",
      },
      beige: {
        100: "#f9ede7",
        200: "#e6c9a8",
        300: "#d4a680",
      },
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