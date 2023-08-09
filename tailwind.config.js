/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        black: '#333333',
        'primary.gray': '#737373',
        'secondary.gray': '#D9D9D9',
        'tertiary.gray': '#FAFAFA',
        'primary.blue': '#633CFF',
        'secondary.blue': '#BEADFF',
        'tertiary.blue': '#EFEBFF',
        background: '#FAFAFA',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily: {
        sans: ['InstrumentSans', 'sans-serif'],
      },
      screens: {
        phone: '320px',
        // => @media (min-width: 320px) { ... }

        lgPhone: '420px',
        // => @media (min-width: 420px) { ... }

        tablet: '640px',
        // => @media (min-width: 640px) { ... }

        laptop: '1024px',
        // => @media (min-width: 1024px) { ... }

        desktop: '1280px',
        // => @media (min-width: 1280px) { ... }
      },
    },
  },
  plugins: [],
}
