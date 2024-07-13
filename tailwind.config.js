/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "16px",
      screens: {
        xl: "1232px",
        "2xl": "1232px",
      },
    },
    extend: {
      colors: {
        primary: "#F7931E",
        second: "#B9B9B9",
      },
    },
  },
  plugins: [],
};
