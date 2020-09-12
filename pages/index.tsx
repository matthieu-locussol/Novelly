import React from 'react';
import { Box, Container, Typography } from '@material-ui/core';

import Header from '@components/Header';
import { useText } from '@contexts/TextProvider';

const Index = () => {
   const { texts } = useText();

   return (
      <>
         <Header />
         <Container maxWidth="md">
            <Box my={4}>
               <Typography variant="h4" component="h1" gutterBottom>
                  What is Novelly ?
               </Typography>
            </Box>
         </Container>
      </>
   );
};

export default Index;
