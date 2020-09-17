import React, { useRef, useState } from 'react';
import { Box, Container, useMediaQuery } from '@material-ui/core';
import {
   FullscreenRounded as FullscreenIcon,
   FullscreenExitRounded as FullscreenExitIcon,
} from '@material-ui/icons';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import RichEditor from 'mui-rte';
import { TMUIRichTextEditorRef } from 'mui-rte/src/MUIRichTextEditor';

import LayoutEditor from '@components/Layout/LayoutEditor';
import WritingMenu from '@components/Editor/WritingMenu';
import SaveMenu from '@components/Editor/SaveMenu';
import { useTheme } from '@contexts/ThemeProvider';

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
   'editorFullscreen',
];

const Editor = () => {
   const { muiTheme } = useTheme();
   const isMobile = useMediaQuery(muiTheme.breakpoints.down('xs'));
   const [fullSize, setFullSize] = useState(false);
   const [isOpen, setIsOpen] = useState(false);

   const useStyles = makeStyles((theme: Theme) =>
      createStyles({
         editor: {
            display: 'flex',
            justifyContent: 'center',
         },
         box: {
            display: 'flex',
            justifyContent: 'center',
            height: `calc(100vh - ${theme.spacing(8)}px)`,
            cursor: 'text',
            marginLeft: !isMobile && fullSize ? `${theme.spacing(8)}px` : 0,
            marginRight: !isMobile && fullSize ? `${theme.spacing(8)}px` : 0,
         },
         root: {
            width: '100%',
            display: 'flex',
         },
         toolbar: {
            width: !isMobile && fullSize ? `calc(100vw - ${theme.spacing(16)}px)` : '100%',
            paddingLeft: !isMobile && isOpen ? theme.spacing(24) : 0,
            paddingRight: isMobile ? 0 : theme.spacing(8),
            transition: `padding 225ms cubic-bezier(0, 0, 0.2, 1) 0ms`,
            marginBottom: theme.spacing(1),
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            '& > *': {
               color: 'inherit',
            },
         },
         container: {
            width: '100%',
            margin: 0,
         },
         rteEditor: {
            paddingLeft: !isMobile && isOpen ? theme.spacing(24) : 0,
            paddingRight: isMobile ? 0 : theme.spacing(8),
            transition: `padding 225ms cubic-bezier(0, 0, 0.2, 1) 0ms`,
         },
      }),
   );

   const classes = useStyles();
   const editorRef = useRef<TMUIRichTextEditorRef>(null);

   const save = (data: string) => {
      console.log(JSON.stringify(JSON.parse(data)));
   };

   const focus = () => {
      editorRef.current?.focus();
   };

   // Autosave toutes les 5min vers FaunaDB + localStorage toutes les 5 secondes

   return (
      <LayoutEditor bookId={1} callback={setIsOpen}>
         <Container maxWidth="md" className={classes.editor}>
            <Box my={1} className={classes.box} onClick={() => focus()}>
               <RichEditor
                  ref={editorRef}
                  classes={{
                     root: classes.root,
                     editor: classes.rteEditor,
                     toolbar: classes.toolbar,
                     container: classes.container,
                  }}
                  controls={controls}
                  customControls={[
                     {
                        icon: fullSize ? <FullscreenExitIcon /> : <FullscreenIcon />,
                        name: 'editorFullscreen',
                        type: 'callback',
                        onClick: () => setFullSize(!fullSize),
                     },
                  ]}
                  onSave={save}
               />
            </Box>
            <SaveMenu />
            <WritingMenu />
         </Container>
      </LayoutEditor>
   );
};

export default Editor;
