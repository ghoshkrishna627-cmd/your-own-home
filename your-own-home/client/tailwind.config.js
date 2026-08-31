/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // toggled via ThemeContext adding/removing 'dark' on <html>
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fff1ee',
          100: '#ffe0d9',
          400: '#ff8a65',
          500: '#ff5a36', // primary brand color for "Your Own Home"
          600: '#e6431f',
          700: '#c22f13',
        },
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.5rem',
      },
    },
  },
  plugins: [],
};
