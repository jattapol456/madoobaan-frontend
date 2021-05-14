/* eslint-disable @typescript-eslint/no-var-requires */
const defaultTheme = require('tailwindcss/defaultTheme')
const plugin = require('tailwindcss/plugin')

module.exports = {
  important: '#app',
  purge: ['./src/**/*.html', './src/**/*.vue'],

  theme: {
    scale:{
      '0': '0',
      '25': '.25',
      '50': '.5',
      '75': '.75',
      '90': '.9',
      '95': '.95',
      '100': '1',
      '105': '1.05',
      '110': '1.1',
      '125': '1.25',
      '150': '1.5',
      '200': '2',
     },

    screens: {
      xl: { max: '1281px' },
      lg: { max: '1025px' },
      md: { max: '769px' },
      sm: { max: '641px' },
      xs: { max: '376px' },
    },

    colors: {
      primary: {
        50: '#fffbf2',
        100: '#fff7e6',
        200: '#ffecbf',
        300: '#ffe199',
        400: '#ffca4d',
        500: '#ffb300',
        600: '#e6a100',
        700: '#bf8600',
        800: '#996b00',
        900: '#7d5800',
      },
      black: {
        50: '#e8e8ea',
        100: '#d1d2d4',
        200: '#b9bbbf',
        300: '#8b8e95',
        400: '#5d616a',
        500: '#454a55',
        600: '#2e343f',
        700: '#171d2a',
        800: '#121722',
        900: '#0e1119',
      },
      success: {
        50: '#f3fcf7',
        100: '#e6f9ef',
        200: '#c1efd6',
        300: '#9ce5bd',
        400: '#52d28c',
        500: '#08bf5b',
        600: '#07ac52',
        700: '#068f44',
        800: '#057337',
        900: '#045e2d',
      },
      error: {
        50: '#fef7f7',
        100: '#fdeeee',
        200: '#fad5d5',
        300: '#f7bcbc',
        400: '#f18989',
        500: '#eb5757',
        600: '#d44e4e',
        700: '#b04141',
        800: '#8d3434',
        900: '#732b2b',
      },
      info: {
        50: '#E7EFFA',
        100: '#D2E1F5',
        200: '#A8C5EC',
        300: '#7EA9E3',
        400: '#538DDB',
        500: '#2C72CF',
        600: '#235BA5',
        700: '#1A447B',
        800: '#112D51',
        900: '#081527',
      },
      white: '#ffffff',
      backdrop: '#F5F7F9',
      disabled: '#EFF1F3',
      transparent: '#FFFFFF00',
      navColor: 'rgba(0,0,0,.25098)',
    },

    fontFamily: {
      ...defaultTheme.fontFamily,
      noto: ['NotoSans'],
    },

    fontSize: {
      ...defaultTheme.fontSize,
      ...defaultTheme.spacing,
      '14px': '0.875rem',
    },

    spacing: {
      ...defaultTheme.spacing,
      input: '2.5rem',
      navbar: '3.75rem',
      '14px': '0.875rem',
    },

    minWidth: {
      ...defaultTheme.minWidth,
      ...defaultTheme.spacing,
    },

    minHeight: {
      ...defaultTheme.minHeight,
      ...defaultTheme.spacing,
    },

    boxShadow: {
      ...defaultTheme.boxShadow,
      soft: '0px 0px 16px rgba(52, 73, 85, 0.08)',
      meduim:
        '0px 0px 8px rgba(52, 73, 85, 0.08), 0px 8px 16px rgba(52, 73, 85, 0.08)',
      hard:
        '0px 0px 4px rgba(0, 0, 0, 0.16), 0px 4px 8px rgba(52, 73, 85, 0.36)',
    },

    extend: {
      maxWidth: {
        ...defaultTheme.spacing,
        '7xl': '80rem',
      },

      maxHeight: {
        ...defaultTheme.spacing,
      },
    },
  },
  variants: {},
  plugins: [
    plugin(function ({ addUtilities }) {
      const utilities = Object.keys(defaultTheme.spacing)
        .filter((key) => key === 'px' || (key >= 1 && key % 1 === 0))
        .reduce(
          (temp, key) => ({
            ...temp,
            [`.square-${key}`]: {
              width: defaultTheme.spacing[key],
              height: defaultTheme.spacing[key],
            },
          }),
          {}
        )

      addUtilities(utilities)
    }),

    plugin(function ({ addComponents, theme }) {
      const buttons = {
        '.button': {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0px 1rem',
          width: 'auto',
          height: '2.5rem',
          fontFamily: `${theme('fontFamily.noto')}`,
          fontWeight: 600,
          backgroundColor: 'transparent',
          border: `solid ${theme('colors.black.900')} 1px`,
          borderRadius: '4px',
          '&:hover': {
            backgroundColor: theme('colors.black.50'),
          },
          '&:active': {
            backgroundColor: theme('colors.black.50'),
          },

          '&:disabled': {
            opacity: '0.5',
            pointerEvents: 'none',
          },

          '&-primary': {
            backgroundImage: `linear-gradient(to right, ${theme(
              'colors.primary.400'
            )}, ${theme('colors.primary.500')})`,
            border: 'none',

            '&:hover, &:active': {
              backgroundImage: `linear-gradient(to right, ${theme(
                'colors.primary.600'
              )}, ${theme('colors.primary.600')})`,
            },
          },
          '&-success': {
            backgroundImage: `linear-gradient(to right, ${theme(
              'colors.success.400'
            )}, ${theme('colors.success.500')})`,
            border: 'none',

            '&:hover, &:active': {
              backgroundImage: `linear-gradient(to right, ${theme(
                'colors.success.600'
              )}, ${theme('colors.success.600')})`,
            },
          },
        },
      }
      addComponents(buttons)
    }),
  ],
}
