import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Box, CircularProgress, Container, Typography, useMediaQuery } from '@material-ui/core';
import { MenuBookRounded as BookIcon } from '@material-ui/icons';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

import EditBook from '@components/Books/EditBook';
import LayoutEditor from '@components/Layout/LayoutEditor';
import WritingMenu from '@components/Editor/WritingMenu';
import { useTheme } from '@contexts/ThemeProvider';

import api from '@config/api';
import Book from '@datatypes/Book';
import SettingsMenu from '@components/Editor/SettingsMenu';

interface EditorProps {}

const Editor = ({}: EditorProps) => {
   const router = useRouter();
   const { muiTheme } = useTheme();
   const isMobile = useMediaQuery(muiTheme.breakpoints.down('xs'));
   const isTablet = useMediaQuery(muiTheme.breakpoints.down('md'));
   const [isOpen, setIsOpen] = useState(false);
   const [openEdit, setOpenEdit] = useState(false);
   const [book, setBook] = useState<Book | null>(null);

   const useStyles = makeStyles((theme: Theme) =>
      createStyles({
         container: {
            display: 'flex',
            justifyContent: 'center',
         },
         box: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: `calc(100vh - ${theme.spacing(8)}px)`,
            marginRight: 0,
            textAlign: 'justify',
            marginLeft: !isMobile && isTablet && isOpen ? theme.spacing(29) : 0,
            transition: `margin 225ms cubic-bezier(0, 0, 0.2, 1) 0ms`,
         },
         icon: {
            fontSize: '192px',
            marginBottom: theme.spacing(2),
         },
         title: {
            fontWeight: 'bold',
         },
         noDescription: {
            color: theme.palette.text.secondary,
            fontStyle: 'italic',
         },
      }),
   );

   const classes = useStyles();

   useEffect(() => {
      api.post('/books', {
         type: 'bookInfos',
         bookId: router.query.bookId,
      })
         .then((response) => {
            setBook(response.data.body);
            console.log(response.data.body);
         })
         .catch((error) => {
            console.log(error);
         });
   }, []);

   if (!book) {
      return (
         <LayoutEditor bookId={undefined} callback={setIsOpen}>
            <Container maxWidth="md" className={classes.container}>
               <Box my={1} className={classes.box} onClick={() => focus()}>
                  <CircularProgress size={64} />
               </Box>
               <WritingMenu />
            </Container>
         </LayoutEditor>
      );
   }

   return (
      <LayoutEditor bookId={book.id} callback={setIsOpen}>
         <Container maxWidth="sm" className={classes.container}>
            <Box my={1} className={classes.box} onClick={() => focus()}>
               <Typography variant="h5" className={classes.title}>
                  {book.title}
               </Typography>
               <BookIcon className={classes.icon} />
               {book.description ? (
                  <Typography variant="body2">{book.description}</Typography>
               ) : (
                  <Typography variant="body2" component="p" className={classes.noDescription}>
                     No description yet.
                  </Typography>
               )}
            </Box>
            <SettingsMenu onClick={() => setOpenEdit(true)} />
            <WritingMenu />
            {openEdit && (
               <EditBook book={book} setBook={setBook} open={openEdit} onClose={() => setOpenEdit(false)} />
            )}
         </Container>
      </LayoutEditor>
   );
};

export default Editor;
