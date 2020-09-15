import { createMuiTheme } from '@material-ui/core/styles';

import RichEditorTheme from '@themes/common/RichEditor';

const Default = createMuiTheme({
   palette: {
      type: 'light',
      primary: {
         main: '#34b580',
         contrastText: '#ffffff',
      },
      secondary: {
         main: '#2c3c4d',
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
         ...RichEditorTheme,
         editor: {
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

export default Default;
