const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');
const forms = require('@tailwindcss/forms');
const typography = require('@tailwindcss/typography');
const aspectRatio = require('@tailwindcss/aspect-ratio');
const lineClamp = require('tailwindcss-line-clamp');
const tailwindFilters = require('tailwindcss-filters');

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    backdropFilter: {
      blur: `blur(${defaultTheme.spacing[2]})`,
    },
    lineClamp: {
      1: 1,
      2: 2,
      3: 3,
    },
    extend: {
      colors: {
        indigo: colors.indigo,
        cyan: {
          50: '#ebfcff',
          100: '#e1fafe',
          200: '#c3f4fd',
          300: '#a4f1fe',
          400: '#76e6fa',
          500: '#3fdcf8',
          600: '#1cd2f2',
          700: '#1abedb',
          800: '#1e8c9f',
          900: '#236a76',
        },
        teal: {
          50: '#edfafa',
          100: '#d5f5f6',
          200: '#afeeef',
          300: '#7ee0e2',
          400: '#16c7ca',
          500: '#069fa2',
          600: '#047f81',
          700: '#037072',
          800: '#055b5c',
          900: '#015051',
        },
        pink: {
          50: '#fdf2f9',
          100: '#fce8f4',
          200: '#fad2ea',
          300: '#f8b4dd',
          400: '#f17ec3',
          500: '#e746a7',
          600: '#d61f8d',
          700: '#bf127a',
          800: '#991564',
          900: '#751a51',
        },
      },
      fontFamily: {
        mono: ['Courier Prime', 'Courier New', ...defaultTheme.fontFamily.mono],
        sans: ['Montserrat', ...defaultTheme.fontFamily.sans],
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            'h1, h2, h3, h4': {
              color: theme('colors.pink.500'),
              fontWeight: theme('fontWeight.medium'),
            },
          },
        },
      }),
    },
  },
  variants: {
    extend: {
      backgroundColor: ['group-focus', 'odd'],
      margin: ['first'],
      opacity: ['group-hover'],
    },
  },
  plugins: [aspectRatio, forms, lineClamp, typography, tailwindFilters],
};
