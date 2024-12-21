/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["*.html", "JS/**/*.js"],
  theme: {
    extend: {
      colors: {
        customGreen: 'rgb(13,148,136 )',
        custombg : '#F0ECF5',
        customlightbg: '#F5F2F9',
      },
    },
  },
  plugins: [],
}

