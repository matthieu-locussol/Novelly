import { createMuiTheme } from '@material-ui/core/styles';

const Dark = createMuiTheme({
   palette: {
      primary: {
         main: '#34b580',
         contrastText: '#ffffff',
      },
      secondary: {
         main: '#2c3c4d',
      },
      background: {
         default: '#36393f',
      },
      text: {
         primary: '#1e2d43',
         secondary: '#727377',
      },
   },
});

export default Dark;
