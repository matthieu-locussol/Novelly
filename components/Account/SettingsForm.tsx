import React from 'react';
import { useForm } from 'react-hook-form';
import { Container, Button, TextField } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { useUser } from 'contexts/UserProvider';

interface ISettingsData {
   mail: string;
   pseudonym: string;
}

const useStyles = makeStyles((theme: Theme) =>
   createStyles({
      root: {
         display: 'flex',
         flexDirection: 'column',
         '& > *': {
            marginTop: theme.spacing(2),
         },
         '& > *:last-child': {
            marginBottom: 0,
         },
      },
      button: {
         marginLeft: 'auto',
      },
   }),
);

const SettingsForm = () => {
   const classes = useStyles();
   const { user } = useUser();
   const { register, handleSubmit } = useForm();

   const onSubmit = (data: ISettingsData) => {
      console.log(data);
   };

   return (
      <Container maxWidth="sm">
         <form className={classes.root} onSubmit={handleSubmit(onSubmit)}>
            <TextField
               color="primary"
               name="mail"
               placeholder="Email"
               variant="outlined"
               defaultValue={user?.email}
               inputRef={register}
            />
            <TextField
               name="pseudonym"
               placeholder="Pseudonym"
               variant="outlined"
               defaultValue={user?.user_metadata.pseudonym}
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
