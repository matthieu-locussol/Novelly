import React, { useState } from 'react';
import { GetStaticPaths } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { Box, Container, useMediaQuery } from '@material-ui/core';
import { MenuBook as BookIcon } from '@material-ui/icons';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

import LayoutEditor from '@components/Layout/LayoutEditor';
import WritingMenu from '@components/Editor/WritingMenu';
import { useTheme } from '@contexts/ThemeProvider';

import api from '@config/api';
import Book from '@datatypes/Book';

interface PathsProps extends ParsedUrlQuery {
   bookId: string;
}

interface EditorProps {
   book: Book;
}

const Editor = ({ book }: EditorProps) => {
   const { muiTheme } = useTheme();
   const isMobile = useMediaQuery(muiTheme.breakpoints.down('xs'));
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
            alignItems: 'center',
            height: `calc(100vh - ${theme.spacing(8)}px)`,
            cursor: 'text',
            marginLeft: 0,
            marginRight: 0,
         },
         root: {
            width: '100%',
            display: 'flex',
         },
         toolbar: {
            width: '100%',
            paddingLeft: !isMobile && isOpen ? theme.spacing(24) : 0,
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
            paddingLeft: !isMobile && isOpen ? theme.spacing(24) : 0,
            paddingRight: isMobile ? 0 : theme.spacing(8),
            transition: `padding 225ms cubic-bezier(0, 0, 0.2, 1) 0ms`,
         },
         icon: {
            fontSize: '192px',
         },
      }),
   );

   const classes = useStyles();

   return (
      <LayoutEditor bookId={book?.id} callback={setIsOpen}>
         <Container maxWidth="md" className={classes.editor}>
            <Box my={1} className={classes.box} onClick={() => focus()}>
               <BookIcon className={classes.icon} />
            </Box>
            <WritingMenu />
         </Container>
      </LayoutEditor>
   );
};

export const getStaticPaths: GetStaticPaths<PathsProps> = async () => {
   const response = await api.post('/books', { type: 'booksIds' });

   const paths = {
      paths: response.data.body.map((bookId: string) => ({
         params: {
            bookId,
         },
      })),
      fallback: true,
   };

   return paths;
};

type Params = {
   params: {
      bookId: string;
   };
};

export const getStaticProps = async ({ params }: Params) => {
   const response = await api.post('/books', {
      type: 'bookInfos',
      bookId: params.bookId,
   });

   return {
      props: {
         book: response.data.body,
      },
   };
};

export default Editor;
