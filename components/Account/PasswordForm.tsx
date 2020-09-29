import React from 'react';
import { useForm } from 'react-hook-form';
import { Container, Button, TextField } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

interface IPasswordData {
   password: string;
}

const useStyles = makeStyles((theme: Theme) =>
   createStyles({
      root: {
         display: 'flex',
         flexDirection: 'column',
         '& > *:first-child': {
            marginTop: theme.spacing(2),
            marginBottom: theme.spacing(2),
         },
      },
      button: {
         marginLeft: 'auto',
      },
   }),
);

const SettingsForm = () => {
   const classes = useStyles();
   const { register, handleSubmit } = useForm();

   const onSubmit = (data: IPasswordData) => {
      console.log(data);
   };

   return (
      <Container maxWidth="sm">
         <form className={classes.root} onSubmit={handleSubmit(onSubmit)}>
            <TextField
               color="primary"
               name="password"
               type="password"
               label="Password"
               variant="outlined"
               inputRef={register}
            />
            <Button type="submit" color="primary" variant="contained" className={classes.button}>
               Save
            </Button>
         </form>
      </Container>
   );
};

export default SettingsForm;
