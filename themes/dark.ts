import { createMuiTheme } from '@material-ui/core/styles';

import RichEditorTheme from '@themes/common/RichEditor';

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
   overrides: {
      //@ts-ignore
      MUIRichTextEditor: {
         ...RichEditorTheme,
         editor: {
            backgroundColor: '#36393f',
            maxHeight: '75vh',
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
