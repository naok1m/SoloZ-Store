/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'db-dark': '#151518',
        'db-card': '#1b1b22',
        'db-border': '#2a2a35',
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
