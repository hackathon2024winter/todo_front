/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        'custom': '0 4px 6px -1px rgba(0, 0, 0, 0.5)', // 半透明の真っ黒な影
      },
    },
  },
  plugins: [],

}

