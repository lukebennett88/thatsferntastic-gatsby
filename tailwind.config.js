const defaultTheme = require('tailwindcss/defaultTheme');
const plugin = require('tailwindcss/plugin');
const tailwindUI = require('@tailwindcss/ui');
const tailwindcssAspectRatio = require('tailwindcss-aspect-ratio');

module.exports = {
  purge: false,
  theme: {
    aspectRatio: {
      none: 0,
      square: [1, 1],
      '16/9': [16, 9],
      '4/3': [4, 3],
    },
    extend: {
      colors: {
        pastel: {
          pink: '#ffc6e8',
          yellow: '#ffeda3',
          teal: '#8be8e9',
          blue: '#69dff3',
          lavender: '#d8bbf3',
        },
      },
      fontFamily: {
        mono: ['Courier Prime', ...defaultTheme.fontFamily.mono],
        sans: ['Montserrat', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  variants: {
    margin: ['responsive', 'first'],
  },
  plugins: [
    tailwindcssAspectRatio,
    tailwindUI,
    plugin(function ({ addComponents }) {
      const lineClamp = {
        '.line-clamp-1': {
          display: '-webkit-box',
          '-webkit-line-clamp': '1',
          '-webkit-box-orient': 'vertical',
          overflow: 'hidden',
        },
        '.line-clamp-2': {
          display: '-webkit-box',
          '-webkit-line-clamp': '2',
          '-webkit-box-orient': 'vertical',
          overflow: 'hidden',
        },
      };
      addComponents(lineClamp);
    }),
  ],
};
