import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
   Container,
   Button,
   TextField,
   Checkbox,
   FormControlLabel,
   Link,
   Typography,
} from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import ModalEULA from '@components/ModalEULA';

interface IRegisterData {
   mail: string;
   pseudonym: string;
   password: string;
   confirmation: string;
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

const RegisterForm = () => {
   const classes = useStyles();
   const { register, handleSubmit } = useForm();
   const [openEULA, setOpenEULA] = useState(false);

   const showEULA = (e: any) => {
      e.preventDefault();
      setOpenEULA(true);
   };

   const onSubmit = (data: IRegisterData) => {
      console.log(data);
   };

   return (
      <Container maxWidth="sm">
         <form className={classes.root} onSubmit={handleSubmit(onSubmit)}>
            <TextField
               required
               color="primary"
               name="mail"
               label="E-mail"
               variant="outlined"
               inputRef={register}
            />
            <TextField required name="pseudonym" label="Pseudonym" variant="outlined" inputRef={register} />
            <TextField
               required
               name="password"
               type="password"
               label="Password"
               variant="outlined"
               inputRef={register}
            />
            <TextField
               required
               name="confirmation"
               type="password"
               label="Confirmation"
               variant="outlined"
               inputRef={register}
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
         <ModalEULA open={openEULA} onClose={() => setOpenEULA(false)} />
      </Container>
   );
};

export default RegisterForm;
