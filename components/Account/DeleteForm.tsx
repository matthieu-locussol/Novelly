import React from 'react';
import { useForm } from 'react-hook-form';
import { Container, Button, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

interface IPasswordData {
   password: string;
}

const useStyles = makeStyles((theme: Theme) =>
   createStyles({
      root: {
         display: 'flex',
         flexDirection: 'column',
      },
      button: {
         marginTop: theme.spacing(3),
         marginRight: 'auto',
      },
      title: {
         marginTop: theme.spacing(1),
      },
   }),
);

const DeleteForm = () => {
   const classes = useStyles();
   const { handleSubmit } = useForm();

   const onSubmit = (data: IPasswordData) => {
      console.log(data);
   };

   return (
      <Container maxWidth="sm">
         <Typography variant="h6" color="error" className={classes.title}>
            Delete your account?
         </Typography>
         <Typography variant="body1">Delete all of your content and associated data.</Typography>
         <form className={classes.root} onSubmit={handleSubmit(onSubmit)}>
            <Button type="submit" color="secondary" variant="contained" className={classes.button}>
               Delete my account
            </Button>
         </form>
      </Container>
   );
};

export default DeleteForm;
