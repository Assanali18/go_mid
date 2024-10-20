/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}', // Убедитесь, что файлы React будут обработаны Tailwind
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

