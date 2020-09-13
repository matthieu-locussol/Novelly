import React from 'react';
import { Box, Container, Typography } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

import Layout from '@components/Layout';
import Book from '@components/Book';

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
                  <Book />
                  <Book />
                  <Book />
                  <Book />
                  <Book />
                  <Book />
                  <Book />
                  <Book />
               </Box>
            </Box>
         </Container>
      </Layout>
   );
};

export default Books;
