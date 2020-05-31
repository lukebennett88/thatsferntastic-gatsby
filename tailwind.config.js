const defaultTheme = require('tailwindcss/defaultTheme');
const tailwindUI = require('@tailwindcss/ui');
const tailwindcssAspectRatio = require('tailwindcss-aspect-ratio');
const tailwindcssLineClamp = require('tailwindcss-line-clamp');

module.exports = {
  purge: false,
  theme: {
    aspectRatio: {
      square: [1, 1],
      '2/3': [2, 3],
    },
    lineClamp: {
      1: 1,
      2: 2,
      3: 3,
    },
    extend: {
      colors: {
        yellow: {
          50: '#FFFBEA',
          100: '#FFF0B2',
          200: '#FFE16A',
          300: '#FACC15',
          400: '#E3B708',
          500: '#C29C03',
          600: '#9F810A',
          700: '#8E7510',
          800: '#725F13',
          900: '#635312',
        },
        teal: {
          50: '#EDFAFA',
          100: '#D5F5F6',
          200: '#AFEEEF',
          300: '#7EE0E2',
          400: '#16C7CA',
          500: '#069FA2',
          600: '#047F81',
          700: '#037072',
          800: '#055B5C',
          900: '#015051',
        },
        blue: {
          50: '#EBFCFF',
          100: '#E1FAFE',
          200: '#C3F4FD',
          300: '#A4F1FE',
          400: '#76E6FA',
          500: '#3FDCF8',
          600: '#1CD2F2',
          700: '#1ABEDB',
          800: '#1E8C9F',
          900: '#236A76',
        },
        purple: {
          50: '#FAF5FF',
          100: '#F5EBFE',
          200: '#EBD7FE',
          300: '#DFBFFD',
          400: '#C994FA',
          500: '#B061F9',
          600: '#993AF2',
          700: '#852BD9',
          800: '#6D21B5',
          900: '#5C1D96',
        },
        pink: {
          50: '#FDF2F9',
          100: '#FCE8F4',
          200: '#FAD2EA',
          300: '#F8B4DD',
          400: '#F17EC3',
          500: '#E746A7',
          600: '#D61F8D',
          700: '#BF127A',
          800: '#991564',
          900: '#751A51',
        },
      },
      fontFamily: {
        mono: ['Courier Prime', ...defaultTheme.fontFamily.mono],
        sans: ['Montserrat', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  variants: {
    backgroundColor: ['responsive', 'hover', 'focus', 'odd'],
    margin: ['responsive', 'first'],
    opacity: ['responsive', 'hover', 'focus', 'group-hover'],
  },
  plugins: [tailwindcssAspectRatio, tailwindUI, tailwindcssLineClamp],
};
