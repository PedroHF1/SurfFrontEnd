import type { Config } from 'tailwindcss'

const config = {
  darkMode: 'class',
  theme: {
    container: {
      center: true,
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    },
  },
  plugins: [],
} satisfies Config

export default config;
