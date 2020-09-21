import { createMuiTheme } from '@material-ui/core/styles';

const Default = createMuiTheme({
   palette: {
      type: 'light',
      primary: {
         main: '#34b580',
         contrastText: '#ffffff',
      },
      secondary: {
         main: '#3a4a51',
      },
      background: {
         default: '#ffffff',
      },
      text: {
         primary: '#1e2d43',
         secondary: '#727377',
      },
   },
   overrides: {
      //@ts-ignore
      MUIRichTextEditor: {
         editor: {
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

export default Default;
