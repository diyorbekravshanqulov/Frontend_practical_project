/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    container: {
      center: true,
      padding: "16px",
      screens: {
        xl: "1236px",
        "2xl": "1236px",
      },
    },
    extend: {
      colors: {
        primary: "#F7931E",
        second: "#B9B9B9",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
