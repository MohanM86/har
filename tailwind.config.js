/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        hair: {
          50: '#f7f5f3',
          100: '#efeae5',
          200: '#ddd4ca',
          300: '#c8b8a8',
          400: '#b09786',
          500: '#9e7f6c',
          600: '#917160',
          700: '#795d51',
          800: '#634d45',
          900: '#52413b',
          950: '#2b211e',
        },
        cream: '#FDFBF8',
        sand: '#F5F0EA',
        ink: '#1C1917',
        muted: '#78716C',
        border: '#E7E0D8',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['"Source Sans 3"', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        'article': '720px',
        'wide': '1120px',
      },
    },
  },
  plugins: [],
}
