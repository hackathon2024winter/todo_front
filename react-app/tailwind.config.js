/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        custom: "0 4px 6px -1px rgba(0, 0, 0, 0.5)", // 半透明の真っ黒な影
      },
      colors: {
        PoulRed: "#E2B49A",
        PoulOrange: "#E2B49A",
        PoulYellow: "#E9C77B",
        PoulBlue: "#99ABB9",
        PoulGray: "#F5F5F5",
        PoulIndigo: "#183346"
      },
    },
  },
  plugins: [],
};
