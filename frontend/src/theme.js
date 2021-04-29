import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#5BE584',
      main: 'rgb(0, 171, 85)',
      dark: '#007B55',
    },
    secondary: {
      light: '#74CAFF',
      main: 'rgb(51, 102, 255)',
      dark: '#0C53B7',
    },
  },
  typography: {
    fontFamily: [
      '"Be Vietnam"',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    subtitle2: {
      fontSize: 13,
      color: 'rgb(33, 43, 54)',
      lineHeight: '1.57143',
      fontWeight: 'bold',
    },
    body2: {
      color: 'rgb(99, 115, 129)',
      lineHeight: '1.57143',
    },
  },
});

export default theme;