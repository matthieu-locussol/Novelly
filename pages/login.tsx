import React from 'react';
import { Box, Container, Typography } from '@material-ui/core';

import Layout from '@components/Layout/Layout';
import LoginForm from '@components/Auth/LoginForm';

const Login = () => {
   return (
      <Layout>
         <Container maxWidth="md">
            <Box my={4}>
               <Typography align="center" variant="h4" component="h1" gutterBottom>
                  Are you a member?
               </Typography>
               <Typography align="center" color="textSecondary" component="p" gutterBottom>
                  We are glad to see you again. Login to your account!
               </Typography>
            </Box>
            <LoginForm />
         </Container>
      </Layout>
   );
};

export default Login;
