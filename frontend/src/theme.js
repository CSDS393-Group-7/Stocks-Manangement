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
    subtitle2: {
      fontSize: 14,
      color: 'rgb(33, 43, 54)',
      lineHeight: '1.57143',
      fontWeight: 'bold',
    },
    body2: {
      fontSize: 13,
      color: 'rgb(99, 115, 129)',
      lineHeight: '1.57143',
    },
  },
  overrides: {
    MuiPaper: {
      elevation1: {
        boxShadow: 'rgb(145 158 171 / 24%) 0px 0px 2px 0px, rgb(145 158 171 / 24%) 0px 16px 32px -4px',
        borderRadius: '16px',
        padding: '25px 26px 10px',
      },
      elevation4: {
        boxShadow: 'rgb(145 158 171 / 24%) 0px 0px 2px 0px, rgb(145 158 171 / 24%) 0px 16px 32px -4px',
        borderRadius: '16px',
      },
    },
    MuiCardHeader: {
      root: {
        padding: '0px',
        paddingLeft: '14px',
        borderLeft: '2px solid black',
      },
    },
  }
});

export default theme;