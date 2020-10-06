import React, { useEffect, useState } from 'react';
import { Box, Container, Typography, CircularProgress } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import Notification, { MessageType } from '@components/Notification';
import Layout from '@components/Layout/Layout';
import { confirmUser } from '@config/auth';

const useStyles = makeStyles((theme: Theme) =>
   createStyles({
      loader: {
         display: 'flex',
         justifyContent: 'center',
         color: theme.palette.primary.main,
      },
   }),
);

const Index = () => {
   const classes = useStyles();
   const [loading, setLoading] = useState(false);
   const [message, setMessage] = useState<MessageType>(null);

   useEffect(() => {
      // Mail confirmation
      if (window.location.hash.includes('confirmation_token')) {
         setLoading(true);
         const token = window.location.hash.split('=')[1];

         confirmUser(token)
            .then((res) => setMessage(res))
            .catch((err) => console.log(err))
            .finally(() => {
               history.replaceState(null, '', ' ');
               setLoading(false);
            });
      }
   }, []);

   return (
      <Layout>
         {loading ? (
            <Container maxWidth="sm" className={classes.loader}>
               <Box my={4}>
                  <CircularProgress size={64} />
               </Box>
            </Container>
         ) : (
            <Container maxWidth="md">
               {message && <Notification message={message} setMessage={setMessage} timeout={null} />}
               <Box my={4}>
                  <Typography variant="h4" component="h1" gutterBottom>
                     What is Novelly?
                  </Typography>
               </Box>
            </Container>
         )}
      </Layout>
   );
};

export default Index;
