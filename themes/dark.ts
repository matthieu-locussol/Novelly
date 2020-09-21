import { createMuiTheme } from '@material-ui/core/styles';

const Dark = createMuiTheme({
   palette: {
      type: 'dark',
      primary: {
         main: '#34b580',
         contrastText: '#ffffff',
      },
      secondary: {
         main: '#3a4a51',
      },
      background: {
         default: '#36393f',
      },
      text: {
         primary: '#ffffff',
         secondary: '#A2A3A7',
      },
   },
   overrides: {
      //@ts-ignore
      MUIRichTextEditor: {
         editor: {
            backgroundColor: '#36393f',
            maxHeight: 'calc(100vh - 112px)',
            overflow: 'scroll',
            overflowX: 'hidden',
            '&::-webkit-scrollbar': {
               width: '0px',
               background: 'transparent',
            },
         },
      },
   },
});

export default Dark;
