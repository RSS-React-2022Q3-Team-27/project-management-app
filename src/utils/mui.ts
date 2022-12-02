import colors from '@mui/joy/colors';
import { extendTheme as extendJoyTheme } from '@mui/joy/styles';
import { experimental_extendTheme as extendMuiTheme } from '@mui/material/styles';
import { deepmerge } from '@mui/utils';

const muiTheme = extendMuiTheme({
  cssVarPrefix: 'joy',
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: colors.blue[500],
        },
        grey: colors.grey,
        error: {
          main: colors.red[500],
        },
        info: {
          main: colors.purple[500],
        },
        success: {
          main: colors.green[500],
        },
        warning: {
          main: colors.yellow[200],
        },
        common: {
          white: '#FFF',
          black: '#09090D',
        },
        divider: colors.grey[200],
        text: {
          primary: colors.grey[800],
          secondary: colors.grey[600],
        },
      },
    },
    dark: {
      palette: {
        primary: {
          main: colors.blue[600],
        },
        grey: colors.grey,
        error: {
          main: colors.red[600],
        },
        info: {
          main: colors.purple[600],
        },
        success: {
          main: colors.green[600],
        },
        warning: {
          main: colors.yellow[300],
        },
        common: {
          white: '#FFF',
          black: '#09090D',
        },
        divider: colors.grey[800],
        text: {
          primary: colors.grey[100],
          secondary: colors.grey[300],
        },
      },
    },
  },
});

const githubTheme = extendJoyTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          plainColor: '#007FFF',
          solidBg: '#007FFF',
          mainChannel: '0 127 255',
          lightChannel: '77 182 172',
          darkChannel: '0 89 178',
          50: '#F0F7FF',
          100: '#C2E0FF',
          200: '#99CCF3',
          300: '#66B2FF',
          400: '#3399FF',
          500: '#007FFF',
          600: '#0072E5',
          700: '#0059B2',
          800: '#004C99',
          900: '#003A75',
        },
        neutral: {
          softBg: '#F6F6F6',
        },
        text: {
          primary: '#1A2027',
          secondary: '#3E5060',
        },
      },
    },
    dark: {
      palette: {
        primary: {
          solidBg: '#2499ef',
          mainChannel: '51 153 255',
          lightChannel: '102 178 255',
          darkChannel: '0 89 178',
          50: '#F0F7FF',
          100: '#C2E0FF',
          200: '#99CCF3',
          300: '#66B2FF',
          400: '#3399FF',
          500: '#007FFF',
          600: '#0072E5',
          700: '#0059B2',
          800: '#004C99',
          900: '#003A75',
        },
        neutral: {
          softBg: '#20232a',
          outlinedBorder: '#42454D',
        },
        background: {
          surface: '#282c34',
        },
        text: {
          secondary: '#919eab',
        },
      },
    },
  },
});

export const theme = deepmerge(muiTheme, githubTheme);
