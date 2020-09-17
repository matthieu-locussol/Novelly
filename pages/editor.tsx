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
   // Autosave toutes les 5min vers FaunaDB + localStorage toutes les 5 secondes
   // Pour la height de l'editor faire calc(blabla - blabla)
   // Déplacement du texte en fondu (un div en bas un div en haut avec un dégradé transparent)
   // Mise en place d'un tableau de liège (V2)

   return (
      <LayoutEditor bookId={1}>
         <Container maxWidth="sm" className={classes.editor}>
            <Box my={4} className={classes.box} onClick={() => focus()}>
               <RichEditor ref={editorRef} controls={controls} label="Start typing..." onSave={save} />
            </Box>
            <WritingMenu />
         </Container>
      </LayoutEditor>
   );
};

export default Editor;
