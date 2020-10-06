import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import {
   Container,
   Button,
   TextField,
   Checkbox,
   FormControlLabel,
   Link,
   CircularProgress,
   Typography,
} from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import ModalEULA from '@components/ModalEULA';
import Notification, { MessageType } from '@components/Notification';
import AlreadyRegistered from '@components/Auth/AlreadyRegistered';
import { registerUser } from '@config/auth';

export interface IRegisterData {
   mail: string;
   pseudonym: string;
   password: string;
   confirmation: string;
   eula: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
   createStyles({
      root: {
         display: 'flex',
         flexDirection: 'column',
         '& > *': {
            marginBottom: theme.spacing(2),
         },
      },
      container: {
         marginBottom: theme.spacing(2),
      },
      loader: {
         display: 'flex',
         justifyContent: 'center',
         color: theme.palette.primary.main,
      },
      error: {
         marginBottom: theme.spacing(2),
      },
   }),
);

const RegisterForm = () => {
   const router = useRouter();
   const classes = useStyles();
   const { register, handleSubmit } = useForm();
   const [openEULA, setOpenEULA] = useState(false);
   const [loading, setLoading] = useState(false);
   const [message, setMessage] = useState<MessageType>(null);
   const [data, setData] = useState<IRegisterData | null>(null);

   const showEULA = (e: any) => {
      e.preventDefault();
      setOpenEULA(true);
   };

   const onSubmit = (data: IRegisterData) => {
      setData(data);
      setLoading(true);

      registerUser(data)
         .then((res) => {
            if (res?.type !== 'success') {
               setMessage(res);
            } else {
               router.push({
                  pathname: '/register/success',
                  query: { mail: data.mail },
               });
            }
         })
         .catch((err) => console.log(err))
         .finally(() => setLoading(false));
   };

   if (loading) {
      return (
         <Container maxWidth="sm" className={classes.loader}>
            <CircularProgress size={64} />
         </Container>
      );
   }

   return (
      <Container maxWidth="sm" className={classes.container}>
         {message && <Notification message={message} setMessage={setMessage} />}
         <form className={classes.root} onSubmit={handleSubmit(onSubmit)}>
            <TextField
               required
               color="primary"
               name="mail"
               label="E-mail"
               variant="outlined"
               inputRef={register}
               defaultValue={data ? data.mail : undefined}
            />
            <TextField
               required
               name="pseudonym"
               label="Pseudonym"
               variant="outlined"
               inputRef={register}
               defaultValue={data ? data.pseudonym : undefined}
            />
            <TextField
               required
               name="password"
               type="password"
               label="Password"
               variant="outlined"
               inputRef={register}
               defaultValue={data ? data.password : undefined}
            />
            <TextField
               required
               name="confirmation"
               type="password"
               label="Confirmation"
               variant="outlined"
               inputRef={register}
               defaultValue={data ? data.confirmation : undefined}
            />
            <FormControlLabel
               control={<Checkbox required name="eula" color="primary" inputRef={register} />}
               label={
                  <Typography>
                     I have read, understood and accept the <Link onClick={showEULA}>EULA agreement</Link> *
                  </Typography>
               }
            />
            <Button type="submit" color="primary" variant="contained">
               Create an account
            </Button>
         </form>
         <AlreadyRegistered />
         <ModalEULA open={openEULA} onClose={() => setOpenEULA(false)} />
      </Container>
   );
};

export default RegisterForm;
