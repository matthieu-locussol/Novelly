import { createMuiTheme } from '@material-ui/core/styles';

const Dark = createMuiTheme({
   palette: {
      type: 'dark',
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
         primary: '#ffffff',
         secondary: '#A2A3A7',
      },
   },
});

export default Dark;
