const defaultTheme = require('tailwindcss/defaultTheme');
const tailwindUI = require('@tailwindcss/ui');
const tailwindcssAspectRatio = require('tailwindcss-aspect-ratio');
const tailwindcssLineClamp = require('tailwindcss-line-clamp');

module.exports = {
  purge: ['./src/**/*.js'],
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
          50: '#fffbea',
          100: '#fff0b2',
          200: '#ffe16a',
          300: '#facc15',
          400: '#e3b708',
          500: '#c29c03',
          600: '#9f810a',
          700: '#8e7510',
          800: '#725f13',
          900: '#635312',
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
        blue: {
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
        purple: {
          50: '#faf5ff',
          100: '#f5ebfe',
          200: '#ebd7fe',
          300: '#dfbffd',
          400: '#c994fa',
          500: '#b061f9',
          600: '#993af2',
          700: '#852bd9',
          800: '#6d21b5',
          900: '#5c1d96',
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
