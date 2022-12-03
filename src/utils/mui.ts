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
          main: '#A10E25',
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
          main: '#FF9192',
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
          plainHoverBg: '#F0F7FF',
          solidHoverBg: '#0072E5',
          solidActiveBg: '#0059B2',
          softColor: '#096BDE',
          softBg: '#DDDEE0',
        },
        neutral: {
          outlinedHoverBg: '#F2F4F5',
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
          plainHoverBg: '#1A2027',
          plainActiveBg: '#161B21',
          solidHoverBg: '#0072E5',
          solidActiveBg: '#004C99',
          softColor: '#5090D3',
          softBg: '#282C34',
          solidDisabledBg: '#404654',
          solidDisabledColor: '#919eab',
        },
        neutral: {
          softBg: '#20232a',
          outlinedBorder: '#42454D',
          softHoverBg: '#363B47',
          softActiveBg: '#404654',
        },
        danger: {
          plainHoverBg: '#2B2226',
        },
        background: {
          surface: '#282c34',
          level1: '#20232a',
          level2: '#2F333D',
        },
        text: {
          secondary: '#919eab',
        },
      },
    },
  },
});

export const theme = deepmerge(muiTheme, githubTheme);
