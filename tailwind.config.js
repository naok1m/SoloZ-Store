/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'db-dark': '#0a0a14',
        'db-card': '#16162a',
        'db-border': '#2d2d4e',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        'gaming': ['Poppins', 'sans-serif'],
        'rajdhani': ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
