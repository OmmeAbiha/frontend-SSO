import type { Config } from "tailwindcss";
const { fontFamily } = require("tailwindcss/defaultTheme");

export default {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/store/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // sans: ["var(--font-iranYekanFontNum)", "var(--font-iranYekanFont)", ...fontFamily.sans],
        IranYekanFont: ["var(--font-iranYekanFont)", ...fontFamily.sans],
        IranYekanFontNum: ["var(--font-iranYekanFontNum)", ...fontFamily.sans],
      },
      gridTemplateColumns: {
        '20': 'repeat(20, minmax(0, 1fr))',
      },
      keyframes: {
        'caret-blink': {
          '0%,70%,100%': { opacity: '1' },
          '20%,50%': { opacity: '0' },
        },
      },
      animation: {
        'caret-blink': 'caret-blink 1.2s ease-out infinite',
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',

        primary: {
          veryLight: 'hsl(var(--primary-veryLight))',
          light: 'hsl(var(--primary-light))',
          medium: 'hsl(var(--primary-medium))',
          main: 'hsl(var(--primary))',
          dark: 'hsl(var(--primary-dark))',
          foreground: 'hsl(var(--primary-foreground))',
        },

        secondary: {
          100: 'hsl(var(--secondary-100))',
          200: 'hsl(var(--secondary-200))',
          300: 'hsl(var(--secondary-300))',
          400: 'hsl(var(--secondary-400))',
          500: 'hsl(var(--secondary-500))',
          600: 'hsl(var(--secondary-600))',
          700: 'hsl(var(--secondary-700))',
        },

        tertiary: {
          100: 'hsl(var(--tertiary-100))',
          200: 'hsl(var(--tertiary-200))',
          300: 'hsl(var(--tertiary-300))',
          400: 'hsl(var(--tertiary-400))',
          500: 'hsl(var(--tertiary-500))',
          600: 'hsl(var(--tertiary-600))',
          700: 'hsl(var(--tertiary-700))',
          800: 'hsl(var(--tertiary-800))',
          900: 'hsl(var(--tertiary-900))',
        },

        success: {
          100: 'hsl(var(--success-100))',
          300: 'hsl(var(--success-300))',
          400: 'hsl(var(--success-400))',
          500: 'hsl(var(--success-500))',
          700: 'hsl(var(--success-700))',
        },

        warning: {
          100: 'hsl(var(--warning-100))',
          300: 'hsl(var(--warning-300))',
          400: 'hsl(var(--warning-400))',
          500: 'hsl(var(--warning-500))',
          700: 'hsl(var(--warning-700))',
        },

        info: {
          100: 'hsl(var(--info-100))',
          300: 'hsl(var(--info-300))',
          400: 'hsl(var(--info-400))',
          500: 'hsl(var(--info-500))',
          700: 'hsl(var(--info-700))',
        },

        danger: {
          100: 'hsl(var(--danger-100))',
          300: 'hsl(var(--danger-300))',
          400: 'hsl(var(--danger-400))',
          500: 'hsl(var(--danger-500))',
          700: 'hsl(var(--danger-700))',
        },

        border: {
          1: 'var(--border-1)',
          2: 'var(--border-2)',

          cta: {
            natural: {
              DEFAULT: 'hsl(var(--border-cta-naturalDefault))',
              darkSelected: 'hsl(var(--border-cta-naturalDarkSelected))',
              focus: 'hsl(var(--border-cta-naturalFocus))',
            },
            secondary: {
              disabled: 'hsl(var(--border-cta-secondaryDisabled))',
              loading: 'hsl(var(--border-cta-secondaryLoading))',
              DEFAULT: 'hsl(var(--border-cta-secondaryDefault))',
              selected: 'hsl(var(--border-cta-secondarySelected))',
              focus: 'hsl(var(--border-cta-secondaryFocus))',
            },
          },
        },
      },

      maxWidth: {
        container: '1340px',
      },
    },
  },
  plugins: [],
} satisfies Config;