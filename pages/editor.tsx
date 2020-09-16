import React, { useRef } from 'react';
import { Box, Container } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import RichEditor from 'mui-rte';
import { TMUIRichTextEditorRef } from 'mui-rte/src/MUIRichTextEditor';

import LayoutEditor from '@components/Layout/LayoutEditor';
import WritingMenu from '@components/WritingMenu';

const controls = [
   'title',
   'bold',
   'italic',
   'underline',
   'strikethrough',
   'link',
   'numberList',
   'bulletList',
   'quote',
   'clear',
   'save',
];

const useStyles = makeStyles(() =>
   createStyles({
      editor: {
         display: 'flex',
         justifyContent: 'center',
      },
      box: {
         display: 'flex',
         justifyContent: 'center',
         height: '80vh',
         cursor: 'text',
      },
   }),
);

const Editor = () => {
   const classes = useStyles();
   const editorRef = useRef<TMUIRichTextEditorRef>(null);

   const save = (data: string) => {
      console.log(JSON.parse(data));
   };

   const focus = () => {
      editorRef.current?.focus();
   };

   // Faire bouton taille éditeur
   // Drawer qui sort de l'AppBar pour les sections
   // Autosave toutes les 5min vers FaunaDB + localStorage toutes les 5 secondes

   return (
      <LayoutEditor>
         <Container maxWidth="sm" className={classes.editor}>
            <Box
               my={4}
               className={classes.box}
               onClick={() => focus()}
               onMouseEnter={() => console.log('IN')}>
               <RichEditor ref={editorRef} controls={controls} label="Start typing..." onSave={save} />
            </Box>
            <WritingMenu />
         </Container>
      </LayoutEditor>
   );
};

export default Editor;
