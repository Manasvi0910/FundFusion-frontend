/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: '#121212',  // Dark background matching the PDF
        'card-blue': '#19283f',  // Dark blue for investment cards
        'accent-blue': '#007AFF', // Bright blue used for highlights/graphs
        'gray': {
          800: '#1E1E1E',
          900: '#121212', // Main background color
        },
        'blue': {
          400: '#2B87FF', // Lighter blue for selected tabs
          500: '#007AFF', // Main bright blue accent
          600: '#0062CC', // Darker blue for hover states
        },
        'green': {
          500: '#00C853', // Green used for positive indicators
        },
        'red': {
          500: '#FF3B30', // Red used for negative indicators
        },
      },
      fontSize: {
        'xs': '0.75rem',
        'sm': '0.875rem',
        'base': '1rem',
        'lg': '1.125rem',
        'xl': '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
      },
    },
  },
  plugins: [],
}