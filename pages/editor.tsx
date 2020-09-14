import React from 'react';
import { Box, Container, Typography } from '@material-ui/core';

import Layout from '@components/Layout';
import WritingMenu from '@components/WritingMenu';

const Editor = () => {
   return (
      <Layout>
         <Container maxWidth="md">
            <Box my={4}>
               <Typography variant="h4" component="h1" gutterBottom>
                  My book title - Editor
               </Typography>
            </Box>
            <WritingMenu />
         </Container>
      </Layout>
   );
};

export default Editor;
