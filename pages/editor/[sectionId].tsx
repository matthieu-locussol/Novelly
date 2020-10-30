import React, { useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
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

import api from '@config/api';
import Section from '@datatypes/Section';

interface EditorProps {}

const AUTOSAVE_DELAY = 1000;

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

const Editor = ({}: EditorProps) => {
   const router = useRouter();
   const { muiTheme } = useTheme();
   const isMobile = useMediaQuery(muiTheme.breakpoints.down('xs'));
   const [fullSize, setFullSize] = useState(false);
   const [isOpen, setIsOpen] = useState(false);
   const [section, setSection] = useState<Section | null>(null);
   const [initialValue, setInitialValue] = useState('');
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
            paddingLeft: !isMobile && isOpen ? theme.spacing(29) : 0,
            paddingRight: isMobile ? 0 : theme.spacing(8),
            transition: `padding 225ms cubic-bezier(0, 0, 0.2, 1) 0ms`,
            marginBottom: theme.spacing(1),
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
         },
         container: {
            width: '100%',
            margin: 0,
         },
         rteEditor: {
            paddingLeft: !isMobile && isOpen ? theme.spacing(29) : 0,
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

   const getValue = () => {
      const value = window.localStorage.getItem('editor');
      return value || '';
   };

   const setValue = (data: string) => {
      window.localStorage.setItem('editor', data);
   };

   const fetchCloudContent = async (sectionId: string) => {
      const response = await api.post('/contents', {
         type: 'contentBySectionId',
         sectionId,
      });

      const content = response.data.body[0].content;
      setRemoteValue(content);

      setLoading(false);

      return content;
   };

   const shouldSave = () => remoteValue !== undefined && !(getValue() === remoteValue);

   const initialize = (remoteContent: string) => {
      setInitialValue(remoteContent);
   };

   const save = (data: string) => {
      const mustSave = getValue() !== data;

      if (mustSave) {
         setValue(data);
      }

      setCanCloudSave(canCloudSave || mustSave);
   };

   const saveCloud = () => {
      if (shouldSave()) {
         editorRef.current?.save();
         const content = getValue();

         api.post('/contents', {
            type: 'updateContent',
            sectionId: section?.id,
            content,
         })
            .then(() => {
               setRemoteValue(content);
            })
            .catch((error) => {
               console.log(error);
            });
      }

      setCanCloudSave(false);
   };

   const saveHotkey = (editorState: EditorState) => {
      saveCloud();
      return editorState;
   };

   const saveCron = () =>
      window.setTimeout(() => {
         editorRef.current?.save();
         saveCron();
      }, AUTOSAVE_DELAY);

   useEffect(() => {
      api.post('/sections', {
         type: 'sectionInfos',
         sectionId: router.query.sectionId,
      })
         .then((response) => {
            setSection(response.data.body);
            console.log(response.data.body);
         })
         .catch((error) => {
            console.log(error);
         });
   }, [router.query.sectionId]);

   useEffect(() => {
      if (section) {
         let cronId: number | undefined = undefined;

         setLoading(true);
         fetchCloudContent(section.id).then((remoteContent) => {
            initialize(remoteContent);
            cronId = saveCron();
         });

         return () => {
            window.clearTimeout(cronId);
            saveCloud();
         };
      }
   }, [section]);

   if (!section) {
      return (
         <LayoutEditor bookId={undefined} callback={setIsOpen}>
            <Container maxWidth="md" className={classes.editor}>
               <Box my={1} className={classes.box} onClick={() => focus()}>
                  <CircularProgress size={64} />
               </Box>
            </Container>
         </LayoutEditor>
      );
   }

   return (
      <LayoutEditor bookId={section?.bookId} callback={setIsOpen}>
         <Container maxWidth="md" className={classes.editor}>
            <Box my={1} className={classes.box} onClick={() => focus()}>
               {loading ? (
                  <CircularProgress size={64} />
               ) : (
                  <RichEditor
                     ref={editorRef}
                     value={initialValue}
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
            <SaveMenu disabled={!canCloudSave} onClick={() => saveCloud()}></SaveMenu>
            <WritingMenu />
         </Container>
      </LayoutEditor>
   );
};

export default Editor;
