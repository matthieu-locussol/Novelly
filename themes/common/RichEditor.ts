const RichEditorTheme = {
   root: {
      width: '100%',
      display: 'flex',
   },
   toolbar: {
      width: '100%',
      display: 'flex',
      marginBottom: '16px',
      justifyContent: 'center',
      '& > *:not(:first-child)': {
         marginLeft: '8px',
      },
   },
   container: {
      width: '100%',
      margin: 0,
   },
};

export default RichEditorTheme;
