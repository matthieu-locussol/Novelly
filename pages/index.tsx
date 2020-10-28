import React, { useEffect, useState } from 'react';
import { Box, Container, Typography, CircularProgress } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import Notification, { MessageType } from '@components/Notification';
import Showcase from '@components/Home/Showcase';
import Layout from '@components/Layout/Layout';
import { confirmUser } from '@config/auth';
import { useText } from '../contexts/TextProvider';

const useStyles = makeStyles((theme: Theme) =>
   createStyles({
      loader: {
         display: 'flex',
         justifyContent: 'center',
         color: theme.palette.primary.main,
      },
      italic: {
         fontStyle: 'italic',
         fontWeight: 'bold',
      },
   }),
);

const Index = () => {
   const { texts } = useText();
   const classes = useStyles();
   const [loading, setLoading] = useState(false);
   const [message, setMessage] = useState<MessageType>(null);

   useEffect(() => {
      // Mail confirmation
      if (window.location.hash.includes('confirmation_token')) {
         setLoading(true);
         const token = window.location.hash.split('=')[1];

         confirmUser(token)
            .then((res) => {
               setMessage(res);
            })
            .catch((error) => {
               console.log(error);
            })
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
                     Novelly - {texts.hello}
                  </Typography>
                  <Typography variant="body1" component="h2" gutterBottom>
                     Welcome ! 😄
                  </Typography>
                  <Typography variant="body1" component="h2" gutterBottom>
                     Novelly is a free online writing platform accessible to everyone. Its purpose is to
                     provide a pleasant environment and writing tools. The app is still in development and
                     some features may not yet be available. Do not hesitate to notify me of any bug or
                     feature request.
                  </Typography>
                  <Typography variant="body1" component="h2" className={classes.italic}>
                     Good visit on Novelly!
                  </Typography>
               </Box>
               <Box my={4}>
                  <Typography variant="h4" component="h1" gutterBottom>
                     Features
                  </Typography>
                  <Showcase />
               </Box>
            </Container>
         )}
      </Layout>
   );
};

export default Index;
