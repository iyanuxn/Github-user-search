/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        lightBg: '#F6F8FF',
        darkBg: '#141D2F',
      },
      fontFamily: {
        space: ['Space Mono', 'monospace'],
      },
    },
  },
  plugins: [],  
}
