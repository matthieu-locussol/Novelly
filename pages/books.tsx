import React, { useState, useEffect } from 'react';
import { Box, CircularProgress, Container, Typography } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

import Layout from '@components/Layout/Layout';
import Book from '@components/Books/Book';
import BooksMenu from '@components/Books/BooksMenu';
import BookDto from '@datatypes/Book';
import api from '@config/api';
import { useUser } from '@contexts/UserProvider';

const useStyles = makeStyles((theme: Theme) =>
   createStyles({
      books: {
         display: 'flex',
         flexWrap: 'wrap',
         '& > *': {
            margin: `0 ${theme.spacing(2)}px ${theme.spacing(2)}px 0`,
         },
      },
      loader: {
         width: '100%',
         display: 'flex',
         justifyContent: 'center',
         marginTop: theme.spacing(4),
      },
   }),
);

const Books = () => {
   const classes = useStyles();
   const { user } = useUser();
   const [books, setBooks] = useState<BookDto[] | null>(null);

   useEffect(() => {
      if (user) {
         api.post('/books', {
            type: 'booksByAuthor',
            authorId: user.id,
         }).then((response) => {
            setBooks(response.data.body);
         });
      }
   }, []);

   return (
      <Layout>
         <Container maxWidth="md">
            <Box my={4}>
               <Typography variant="h4" component="h1" gutterBottom>
                  Your library
               </Typography>
               <Box className={classes.books}>
                  {books ? (
                     books.length > 0 ? (
                        books.map((book, index) => <Book key={index} book={book} />)
                     ) : (
                        <Typography variant="body1" component="p">
                           It's deserted here, add a book by clicking on the button at the bottom right!
                        </Typography>
                     )
                  ) : (
                     <Box className={classes.loader}>
                        <CircularProgress size={64} />
                     </Box>
                  )}
               </Box>
            </Box>
            <BooksMenu />
         </Container>
      </Layout>
   );
};

export default Books;
