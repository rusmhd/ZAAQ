/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#09090C',
        midnight: '#11111F',
        nocturne: '#171321',
        plum: {
          DEFAULT: '#3D1A5C',
          deep: '#1B0D26',
          soft: '#6B3B82',
          mist: '#C9A8C2',
        },
        cream: '#F5F4F0',
        mist: '#E8E6E1',
        stone: '#8A8580',
      },
      fontFamily: {
        display: ['Cormorant', 'serif'],
        sans: ['"DM Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      letterSpacing: {
        widest2: '0.28em',
      },
      transitionTimingFunction: {
        editorial: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
};