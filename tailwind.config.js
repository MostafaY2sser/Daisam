/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#bea486",
        },
        secondary: {
          DEFAULT: "#f8f5ef",
        },
        text: {
          DEFAULT: "#000000",
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
};