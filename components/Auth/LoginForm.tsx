import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import {
   Container,
   Button,
   TextField,
   Checkbox,
   FormControlLabel,
   CircularProgress,
} from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import NotRegistered from '@components/Auth/NotRegistered';
import Notification, { MessageType } from '@components/Notification';
import { loginUser } from '@config/auth';
import { useUser } from '@contexts/UserProvider';

export interface ILoginData {
   mail: string;
   password: string;
   remember: boolean;
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
      loader: {
         display: 'flex',
         justifyContent: 'center',
         color: theme.palette.primary.main,
      },
   }),
);

const LoginForm = () => {
   const router = useRouter();
   const classes = useStyles();
   const { setUser } = useUser();
   const { register, handleSubmit } = useForm();
   const [loading, setLoading] = useState(false);
   const [message, setMessage] = useState<MessageType>(null);
   const [data, setData] = useState<ILoginData | null>(null);

   const onSubmit = (data: ILoginData) => {
      setData(data);
      setLoading(true);

      loginUser(data)
         .then((res) => {
            //@ts-ignore
            if (res?.id) {
               setUser(res);
               router.replace('/');
            } else {
               //@ts-ignore
               setMessage(res);
               setLoading(false);
            }
         })
         .catch((error) => {
            console.log(error);
            setLoading(false);
         });
   };

   if (loading) {
      return (
         <Container maxWidth="sm" className={classes.loader}>
            <CircularProgress size={64} />
         </Container>
      );
   }

   return (
      <Container maxWidth="sm">
         {message && <Notification message={message} setMessage={setMessage} />}
         <form className={classes.root} onSubmit={handleSubmit(onSubmit)}>
            <TextField
               required
               name="mail"
               label="E-mail"
               variant="outlined"
               inputRef={register}
               defaultValue={data ? data.mail : undefined}
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
            <FormControlLabel
               control={
                  <Checkbox name="remember" color="primary" inputRef={register} defaultChecked={true} />
               }
               label="Remember me"
            />
            <Button type="submit" color="primary" variant="contained">
               Login
            </Button>
         </form>
         <NotRegistered />
      </Container>
   );
};

export default LoginForm;
