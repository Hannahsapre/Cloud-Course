/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        custom: ['JetBrains Mono, monospace'], // Replace 'YourCustomFont' with the actual font name
      },
    },
  },
  plugins: [],
}


