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

const AlreadyRegistered = () => {
   const classes = useStyles();

   return (
      <Container maxWidth="sm" className={classes.root}>
         <h2>Already have an account?</h2>
         <Link href="/login">
            <Button color="primary" variant="outlined">
               Yes, I want to log in
            </Button>
         </Link>
      </Container>
   );
};

export default AlreadyRegistered;
