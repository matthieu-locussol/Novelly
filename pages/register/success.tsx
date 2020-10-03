import React from 'react';
import { useRouter } from 'next/router';
import { Box, Container, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import Layout from '@components/Layout/Layout';

const useStyles = makeStyles((theme: Theme) =>
   createStyles({
      mail: {
         color: theme.palette.primary.main,
      },
   }),
);

const Success = () => {
   const router = useRouter();
   const classes = useStyles();
   const mail = router.query.mail || '';

   return (
      <Layout>
         <Container maxWidth="sm">
            <Box my={4}>
               <Typography align="center" variant="h4" component="h1" gutterBottom>
                  Successfully registered!
               </Typography>
            </Box>
            <Box my={4}>
               <Typography variant="body1" component="p">
                  Thank you for your registration!
               </Typography>
            </Box>
            <Box my={4}>
               <Typography variant="body1" component="p">
                  Your account has been successfully created but is not yet activated. To proceed with its
                  activation, simply click on the link we sent to your email address{mail && ' at '}
                  <span className={classes.mail}>{mail && `${mail}`}</span>.
               </Typography>
            </Box>
         </Container>
      </Layout>
   );
};

export default Success;
