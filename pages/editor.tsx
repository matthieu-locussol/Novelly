import React, { useRef } from 'react';
import { Box, Container } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import RichEditor from 'mui-rte';
import { TMUIRichTextEditorRef } from 'mui-rte/src/MUIRichTextEditor';

import Layout from '@components/Layout';
import WritingMenu from '@components/WritingMenu';

const useStyles = makeStyles(() =>
   createStyles({
      editor: {
         display: 'flex',
         justifyContent: 'center',
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

   return (
      <Layout>
         <Container maxWidth="md" className={classes.editor}>
            <Box display="flex" justifyContent="center" my={4} height="80vh" onClick={() => focus()}>
               <RichEditor
                  ref={editorRef}
                  controls={[
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
                  ]}
                  label="Start typing..."
                  onSave={save}
                  inlineToolbar={true}
               />
            </Box>
            <WritingMenu />
         </Container>
      </Layout>
   );
};

export default Editor;
