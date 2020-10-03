import React from 'react';
import { Box, Container, Typography } from '@material-ui/core';

import Layout from '@components/Layout/Layout';
import RegisterForm from '@components/Auth/RegisterForm';

const Register = () => {
   return (
      <Layout>
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
         </Container>
      </Layout>
   );
};

export default Register;
