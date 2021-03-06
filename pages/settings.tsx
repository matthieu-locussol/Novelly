import React from 'react';
import md5 from 'md5';
import { Avatar, Box, Card, CardContent, CardHeader, Container, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Layout from '@components/Layout/Layout';
import SettingsForm from '@components/Account/SettingsForm';
import PasswordForm from '@components/Account/PasswordForm';
import DeleteForm from '@components/Account/DeleteForm';
import { useUser } from '@contexts/UserProvider';

const useStyles = makeStyles((theme: Theme) =>
   createStyles({
      card: {
         marginBottom: theme.spacing(4),
         [theme.breakpoints.down('xs')]: {
            borderRadius: 0,
         },
      },
      container: {
         [theme.breakpoints.down('xs')]: {
            padding: 0,
         },
      },
      avatar: {
         color: theme.palette.text.primary,
         border: `1px solid ${theme.palette.primary.dark}`,
         backgroundColor: theme.palette.background.default,
         width: theme.spacing(6),
         height: theme.spacing(6),
      },
      header: {
         color: theme.palette.text.primary,
         backgroundColor: theme.palette.primary.main,
      },
   }),
);

const Settings = () => {
   const classes = useStyles();
   const { user } = useUser();

   return (
      <Layout>
         <Container maxWidth="sm" className={classes.container}>
            <Box my={4}>
               <Typography align="center" variant="h4" component="h1" gutterBottom>
                  Account settings
               </Typography>
            </Box>
            <Card className={classes.card}>
               <CardHeader
                  avatar={
                     <Avatar
                        aria-label="user-avatar"
                        className={classes.avatar}
                        src={`https://gravatar.com/avatar/${md5(user?.email || '')}`}>
                        ML
                     </Avatar>
                  }
                  className={classes.header}
                  title={<Typography variant="h6">{user?.user_metadata.pseudonym}</Typography>}
                  disableTypography
               />
               <CardContent>
                  <SettingsForm />
               </CardContent>
            </Card>
            <Card className={classes.card}>
               <CardContent>
                  <PasswordForm />
               </CardContent>
            </Card>
            <Card className={classes.card}>
               <CardContent>
                  <DeleteForm />
               </CardContent>
            </Card>
         </Container>
      </Layout>
   );
};

export default Settings;
