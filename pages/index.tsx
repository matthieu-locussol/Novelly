import React from 'react';
import { Box, Container, Typography } from '@material-ui/core';

import Layout from '@components/Layout';
import { useText } from '@contexts/TextProvider';

const Index = () => {
   const { texts } = useText();

   return (
      <Layout>
         <Container maxWidth="md">
            <Box my={4}>
               <Typography variant="h4" component="h1" gutterBottom>
                  {texts.hello}
               </Typography>
               <Typography variant="h4" component="h1" gutterBottom>
                  What is Novelly ?
               </Typography>
            </Box>
         </Container>
      </Layout>
   );
};

export default Index;
