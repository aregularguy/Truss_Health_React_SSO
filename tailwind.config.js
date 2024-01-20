/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",


  "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      backgroundColor: {
        mainColor: '#FBF8F9',
        secondaryColor: '#F0F0F0',
        blackOverlay: 'rgba(0, 0 ,0 ,0.7)',
      }
    },
  },
  plugins: [],
}

