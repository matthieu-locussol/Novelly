import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Container, CircularProgress, Button, TextField } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { useUser } from 'contexts/UserProvider';
import Notification, { MessageType } from '@components/Notification';

interface ISettingsData {
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
   const [loading, setLoading] = useState(false);
   const [message, setMessage] = useState<MessageType>(null);
   const { user, setUser } = useUser();
   const { register, handleSubmit } = useForm();

   const onSubmit = (data: ISettingsData) => {
      setLoading(true);

      user
         ?.update({
            data: {
               pseudonym: data.pseudonym,
            },
         })
         .then((response) => {
            setUser(response);
            setMessage({
               content: 'Informations successsfully updated.',
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
               name="pseudonym"
               placeholder="Pseudonym"
               variant="outlined"
               defaultValue={user?.user_metadata.pseudonym}
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
