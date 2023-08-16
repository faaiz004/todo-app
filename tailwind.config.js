/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundColor:{
        'very-dark-blue' : 'hsl(235, 21%, 11%)',
        'very-dark-saturated-blue' : 'hsl(235, 24%, 19%)',
      },
    },
  },
  plugins: [],
}

