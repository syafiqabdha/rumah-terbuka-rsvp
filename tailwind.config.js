module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: '#0a1128',
        gold: '#d4af37',
      },
      fontFamily: {
        script: ['"Great Vibes"', 'cursive'],
        sans: ['"Inter"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
