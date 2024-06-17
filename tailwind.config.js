/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: '',
  content: [
    "./src/**/*.{html,ts}",
    "./src/**/**/*.{html,ts}",
    "./src/**/**/**/*.{html,ts}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
