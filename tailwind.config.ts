import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        mobile: '640px',
        desktop: '1440px'
      },
      colors: {
        primary: {
          zetecBlue:'hsl(240, 90%, 60%)',
          burntOrange: "hsl(14, 74%, 31%)",
          turquoise: "hsl(174, 74%, 51%)",
          alphaBurntOrange: "hsla(14, 74%, 31%, 0.4)",
          alphaTurquoise: "hsla(174, 74%, 51%, 0.1)",
        },
        neutral: {
          magnolia: 'hsl(0deg 0% 97.66%)',
        },
      },
      fontFamily: {
        andika: ['Andika', 'sans-serif'],
        playFair: ['Playfair Display', 'serif'],
        jakarta: ['Plus Jakarta Sans', 'sans-serif'],
      },
      fontWeight: {
        regular: '400',
        medium: '500',
        bold: '700',
        extrabold: '800',
      }
    },
  },
  plugins: [],
}
export default config
