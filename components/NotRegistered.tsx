import React from 'react';
import Link from 'next/link';
import { Button, Container } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
   createStyles({
      root: {
         textAlign: 'center',
      },
   }),
);

const NotRegistered = () => {
   const classes = useStyles();

   return (
      <Container maxWidth="sm" className={classes.root}>
         <h2>Not yet a Novellist?</h2>
         <Link href="/register">
            <Button color="primary" variant="outlined">
               Create an account
            </Button>
         </Link>
      </Container>
   );
};

export default NotRegistered;
