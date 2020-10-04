import React from 'react';
import { useForm } from 'react-hook-form';
import { Container, Button, TextField, Checkbox, FormControlLabel } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

// import novellyApi from '@config/api/novelly';

interface ILoginData {
   mail: string;
   password: string;
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
   }),
);

const LoginForm = () => {
   const classes = useStyles();
   const { register, handleSubmit } = useForm();

   const onSubmit = (data: ILoginData) => {
      console.log(data);

      // novellyApi
      //    .post('/login', data)
      //    .then((res) => console.log(res.data))
      //    .catch((err) => console.log(err));
   };

   return (
      <Container maxWidth="sm">
         <form className={classes.root} onSubmit={handleSubmit(onSubmit)}>
            <TextField required name="mail" label="E-mail" variant="outlined" inputRef={register} />
            <TextField required name="password" label="Password" variant="outlined" inputRef={register} />
            <FormControlLabel
               control={<Checkbox name="remember" color="primary" inputRef={register} />}
               label="Remember me"
            />
            <Button type="submit" color="primary" variant="contained">
               Login
            </Button>
         </form>
      </Container>
   );
};

export default LoginForm;
