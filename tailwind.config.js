/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Geist', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        geist: ['Geist', 'sans-serif'],
        silkscreen: ["'Silkscreen'", 'cursive'],
        serif: ['"Instrument Serif"', 'serif'],
        mono: ['"Geist Mono"', 'monospace'],
      },
      colors: {
        emerald: {
          950: '#022418',
          900: '#033826',
          800: '#084c36',
          700: '#0e6245',
          600: '#15805c',
          500: '#1fa276',
        },
        sunset: {
          aura: '#FDB813',
          soft: '#FFF7E6',
          glow: 'rgba(253, 184, 19, 0.15)',
        }
      },
      keyframes: {
        floatSlow: {
          '0%, 100%': { transform: 'translate3d(0, 0px, 0) rotate(0deg)' },
          '50%': { transform: 'translate3d(0, -12px, 0) rotate(2deg)' },
        },
        floatReverse: {
          '0%, 100%': { transform: 'translate3d(0, 0px, 0) rotate(0deg)' },
          '50%': { transform: 'translate3d(0, 10px, 0) rotate(-2deg)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', transform: 'translate3d(0, 0, 0) scale(1)' },
          '50%': { opacity: '0.65', transform: 'translate3d(0, 0, 0) scale(1.05)' },
        },
        marquee: {
          '0%': { transform: 'translate3d(0%, 0, 0)' },
          '100%': { transform: 'translate3d(-50%, 0, 0)' },
        },
        marqueeReverse: {
          '0%': { transform: 'translate3d(-50%, 0, 0)' },
          '100%': { transform: 'translate3d(0%, 0, 0)' },
        }
      },
      animation: {
        'float-slow': 'floatSlow 7s ease-in-out infinite',
        'float-reverse': 'floatReverse 8s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 6s ease-in-out infinite',
        'marquee': 'marquee 30s linear infinite',
        'marquee-fast': 'marquee 18s linear infinite',
        'marquee-reverse': 'marqueeReverse 30s linear infinite',
      }
    },
  },
  plugins: [],
}
