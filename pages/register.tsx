import React from 'react';
import { Box, Container, Typography } from '@material-ui/core';

import Header from '@components/Header';
import RegisterForm from '@components/RegisterForm';
import AlreadyRegistered from '@components/AlreadyRegistered';
import { useText } from '@contexts/TextProvider';

const Index = () => {
   const { texts } = useText();

   return (
      <>
         <Header />
         <Container maxWidth="md">
            <Box my={4}>
               <Typography align="center" variant="h4" component="h1" gutterBottom>
                  Not yet a Novellist?
               </Typography>
               <Typography align="center" color="textSecondary" component="p" gutterBottom>
                  Register and start writing stories instantly, for free!
               </Typography>
            </Box>
            <RegisterForm />
            <AlreadyRegistered />
         </Container>
      </>
   );
};

export default Index;
