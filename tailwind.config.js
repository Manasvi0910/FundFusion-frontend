/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: '#111827',  // Dark background
        'card-blue': '#172844',  // New color for investment cards
        'gray': {
          800: '#1F2937',
          900: '#111827',
        },
        'blue': {
          500: '#3B82F6',
          600: '#2563EB',
        },
      },
    },
  },
  plugins: [],
}