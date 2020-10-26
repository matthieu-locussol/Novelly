import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import {
   AppBar,
   Toolbar,
   IconButton,
   Button,
   CircularProgress,
   DialogActions,
   DialogContent,
   DialogTitle,
   Dialog,
   TextField,
   Typography,
   useMediaQuery,
} from '@material-ui/core';
import { CloseRounded as CloseIcon } from '@material-ui/icons';

import api from '@config/api';
import constants from '@config/constants';
import { useUser } from '@contexts/UserProvider';
import { useTheme } from '@contexts/ThemeProvider';

interface FeatureFormProps {
   open: boolean;
   onClose: () => void;
}

interface IFeatureRequestData {
   name: string;
   description: string;
}

const useStyles = makeStyles((theme: Theme) =>
   createStyles({
      content: {
         display: 'flex',
         flexDirection: 'column',
         '& > *': {
            marginTop: theme.spacing(2),
         },
         '& > *:last-child': {
            marginBottom: theme.spacing(2),
         },
      },
      appBar: {
         position: 'relative',
      },
      title: {
         marginLeft: theme.spacing(2),
         flex: 1,
      },
      loader: {
         color: 'inherit',
      },
   }),
);

const FeatureForm = ({ open, onClose }: FeatureFormProps) => {
   const classes = useStyles();
   const { user } = useUser();
   const { muiTheme } = useTheme();
   const { register, handleSubmit } = useForm();
   const [done, setDone] = useState(false);
   const [loading, setLoading] = useState(false);
   const fullScreen = useMediaQuery(muiTheme.breakpoints.down('sm'));

   const onSubmit = (data: IFeatureRequestData) => {
      setLoading(true);

      api.post('/mail', {
         sender: constants.mail.sender,
         mail: constants.mail.mail,
         title: 'Novelly - Demande de fonctionnalité',
         content: `
				<h1>Nouvelle demande de fonctionnalité</h1>
				<p><b>Utilisateur:</b> ${user?.email} (${user?.id})</p>
				<p><b>Fonctionnalité:</b> ${data.name}</p>
				<p><b>Description:</b> ${data.description}</p>
			`,
      })
         .then(() => {
            setDone(true);
         })
         .catch((error) => {
            console.log(error);
         })
         .finally(() => {
            setLoading(false);
         });
   };

   if (done) {
      return (
         <Dialog
            fullScreen={fullScreen}
            onClose={onClose}
            aria-labelledby="report-form"
            aria-describedby="report-form-content"
            open={open}>
            {!fullScreen && <DialogTitle id="report-form">Thank you! 🚀</DialogTitle>}
            {fullScreen && (
               <AppBar className={classes.appBar}>
                  <Toolbar>
                     <IconButton
                        disabled={loading}
                        edge="start"
                        color="inherit"
                        onClick={onClose}
                        aria-label="close">
                        <CloseIcon />
                     </IconButton>
                     <Typography variant="h6" className={classes.title}>
                        Thank you! 🚀
                     </Typography>
                     <Button autoFocus color="inherit" type="submit" onClick={onClose}>
                        Close
                     </Button>
                  </Toolbar>
               </AppBar>
            )}
            <DialogContent id="report-form-content" className={classes.content}>
               <Typography>
                  Thank you very much for your feedback. I will get back to you as soon as possible.
               </Typography>
            </DialogContent>
            {!fullScreen && (
               <DialogActions>
                  <Button onClick={onClose} color="primary" variant="contained">
                     Close
                  </Button>
               </DialogActions>
            )}
         </Dialog>
      );
   }

   return (
      <Dialog
         fullScreen={fullScreen}
         onClose={onClose}
         aria-labelledby="report-form"
         aria-describedby="report-form-content"
         open={open}>
         <form onSubmit={handleSubmit(onSubmit)}>
            {!fullScreen && <DialogTitle id="report-form">Request a feature</DialogTitle>}
            {fullScreen && (
               <AppBar className={classes.appBar}>
                  <Toolbar>
                     <IconButton
                        disabled={loading}
                        edge="start"
                        color="inherit"
                        onClick={onClose}
                        aria-label="close">
                        <CloseIcon />
                     </IconButton>
                     <Typography variant="h6" className={classes.title}>
                        Request a feature
                     </Typography>
                     <Button disabled={loading} autoFocus color="inherit" type="submit">
                        {loading ? <CircularProgress size={24} className={classes.loader} /> : 'Submit'}
                     </Button>
                  </Toolbar>
               </AppBar>
            )}
            <DialogContent id="report-form-content" className={classes.content}>
               <Typography>
                  Is there a feature you want us to add to Novelly? If so, please help us improving the
                  website by submitting your suggestion!
               </Typography>
               <TextField
                  required
                  name="name"
                  label="Name"
                  helperText="Provide a concise name for this feature."
                  variant="outlined"
                  inputRef={register}
               />
               <TextField
                  required
                  name="description"
                  label="Description"
                  helperText="Provide a detailed description of your suggestion."
                  multiline
                  rows={4}
                  variant="outlined"
                  inputRef={register}
               />
            </DialogContent>
            {!fullScreen && (
               <DialogActions>
                  <Button disabled={loading} onClick={onClose} color="inherit">
                     Cancel
                  </Button>
                  <Button disabled={loading} type="submit" color="primary" variant="contained">
                     {loading ? <CircularProgress size={24} className={classes.loader} /> : 'Submit'}
                  </Button>
               </DialogActions>
            )}
         </form>
      </Dialog>
   );
};

export default FeatureForm;
