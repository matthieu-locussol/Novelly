import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Container, CircularProgress, Button, TextField } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { useUser } from 'contexts/UserProvider';
import Notification, { MessageType } from '@components/Notification';

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
   const [loading, setLoading] = useState(false);
   const [message, setMessage] = useState<MessageType>(null);
   const { user, setUser } = useUser();
   const { register, handleSubmit } = useForm();

   const onSubmit = (data: IPasswordData) => {
      setLoading(true);

      user
         ?.update({
            password: data.password,
         })
         .then((response) => {
            setUser(response);
            setMessage({
               content: 'Password successsfully updated.',
               type: 'success',
            });
            setLoading(false);
         })
         .catch((error) => {
            console.log(error);
         });
   };

   return (
      <Container maxWidth="sm">
         {message && <Notification message={message} setMessage={setMessage} />}
         <form className={classes.root} onSubmit={handleSubmit(onSubmit)}>
            <TextField
               color="primary"
               name="password"
               type="password"
               placeholder="New password"
               variant="outlined"
               inputRef={register}
            />
            <Button
               disabled={loading}
               type="submit"
               color="primary"
               variant="contained"
               className={classes.button}>
               {loading ? <CircularProgress size={24} /> : 'Save'}
            </Button>
         </form>
      </Container>
   );
};

export default SettingsForm;
