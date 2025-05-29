/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        arabic: ['Cairo', 'sans-serif'],
        english: ['Roboto', 'sans-serif'],
        sans: ['Cairo', 'Roboto', 'sans-serif'],
      },
      animation: {
        loadingProgress: 'loadingProgress 2s ease-in-out infinite',
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        bounce: 'bounce 1s infinite',
        fadeIn: 'fadeIn 0.5s ease-out',
        loadingBar: 'loadingBar 1s ease-in-out infinite',
      },
      keyframes: {
        loadingProgress: {
          '0%': { width: '0%' },
          '50%': { width: '100%' },
          '100%': { width: '0%' },
        },
        pulse: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.5 },
        },
        bounce: {
          '0%, 100%': {
            transform: 'translateY(0)',
          },
          '50%': {
            transform: 'translateY(-25%)',
          },
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        loadingBar: {
          '0%': { width: '0%', opacity: 0.7 },
          '50%': { width: '60%', opacity: 1 },
          '100%': { width: '100%', opacity: 0 },
        },
      },
    },
  },
  plugins: [],
};
