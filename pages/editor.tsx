import React, { useRef, useState, useEffect } from 'react';
import { EditorState } from 'draft-js';
import { Box, Container, CircularProgress, useMediaQuery } from '@material-ui/core';
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

const AUTOSAVE_DELAY = 1000;
const CLOUDSAVE_DELAY = 2000;

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
   const [value, setValue] = useState('');
   const [remoteValue, setRemoteValue] = useState<string | undefined>(undefined);
   const [canCloudSave, setCanCloudSave] = useState(false);
   const [loading, setLoading] = useState(true);

   const useStyles = makeStyles((theme: Theme) =>
      createStyles({
         editor: {
            display: 'flex',
            justifyContent: 'center',
         },
         box: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: loading ? 'center' : 'stretch',
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

   const focus = () => {
      editorRef.current?.focus();
   };

   // Change this function to retrieve the book data from FaunaDB
   const fetchCloudContent = async () => {
      const sleep = (ms: number) => {
         return new Promise((resolve) => setTimeout(resolve, ms));
      };

      // We need to fetch data here by awaiting
      // Data then have to be set in "remoteValue" => corresponds to cloud content
      await sleep(Math.random() * 3000 + 2000); // 2s to 5s
      const content = window.localStorage.getItem('editor');
      setRemoteValue(content || '');

      setCanCloudSave(true);
      setLoading(false);
   };

   const shouldSave = () => remoteValue !== undefined && !(value === remoteValue) && canCloudSave;

   const initialize = () => {
      const content = window.localStorage.getItem('editor');
      setValue(content || '');
   };

   const save = (data: string) => {
      const current = window.localStorage.getItem('editor');

      if (current !== data) {
         setValue(data);
         window.localStorage.setItem('editor', data);
      }
   };

   const saveCloud = () => {
      if (shouldSave()) {
         editorRef.current?.save();
         const content = window.localStorage.getItem('editor');

         if (content !== null) {
            setCanCloudSave(false);

            // Send content to FaunaDB
            // Then =>
            //   Updates the "remoteValue" corresponding to the cloud value
            //   Allow the new cloud save after a delay to prevent spam-save
            setRemoteValue(content);
            setTimeout(() => setCanCloudSave(true), CLOUDSAVE_DELAY);
         }
      }
   };

   const saveHotkey = (editorState: EditorState) => {
      saveCloud();
      return editorState;
   };

   const saveCron = () => {
      window.setTimeout(() => {
         editorRef.current?.save();
         saveCron();
      }, AUTOSAVE_DELAY);
   };

   useEffect(() => {
      fetchCloudContent();
      initialize();
      saveCron();
   }, []);

   return (
      <LayoutEditor bookId={1} callback={setIsOpen}>
         <Container maxWidth="md" className={classes.editor}>
            <Box my={1} className={classes.box} onClick={() => focus()}>
               {loading ? (
                  <CircularProgress size={64} />
               ) : (
                  <RichEditor
                     ref={editorRef}
                     value={value}
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
                     keyCommands={[
                        {
                           key: 83,
                           name: 'save',
                           callback: saveHotkey,
                        },
                     ]}
                  />
               )}
            </Box>
            <SaveMenu visible={shouldSave()} onClick={() => saveCloud()}></SaveMenu>
            <WritingMenu />
         </Container>
      </LayoutEditor>
   );
};

export default Editor;
