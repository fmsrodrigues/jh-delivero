/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.tsx",
  ],
  theme: {
    extend: {
      colors: {
        'text': '#e7e5f0',
        'background': '#0a090f',
        'primary': '#b6afcf',
        'secondary': '#6a3f5b',
        'accent': '#af7984',
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}

