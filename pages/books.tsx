import React from 'react';
import { Box, Container, Typography } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

import Layout from '@components/Layout';
import Book from '@components/Book';
import BooksMenu from '@components/BooksMenu';

const useStyles = makeStyles((theme: Theme) =>
   createStyles({
      books: {
         display: 'flex',
         flexWrap: 'wrap',
         '& > *': {
            margin: `0 ${theme.spacing(2)}px ${theme.spacing(2)}px 0`,
         },
      },
   }),
);

const Books = () => {
   const classes = useStyles();

   return (
      <Layout>
         <Container maxWidth="md">
            <Box my={4}>
               <Typography variant="h4" component="h1" gutterBottom>
                  Your library
               </Typography>
               <Box className={classes.books}>
                  {[...Array(10).keys()].map((_, index) => (
                     <Book
                        key={index}
                        title="My book title"
                        createdAt="July 26th, 2020"
                        updatedAt="July 26th, 2020 at 18:32"
                        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                  labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                  voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                     />
                  ))}
               </Box>
            </Box>
            <BooksMenu />
         </Container>
      </Layout>
   );
};

export default Books;
