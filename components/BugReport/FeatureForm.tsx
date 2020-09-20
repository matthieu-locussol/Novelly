import React from 'react';
import { useForm } from 'react-hook-form';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import {
   Button,
   DialogActions,
   DialogContent,
   DialogTitle,
   Dialog,
   TextField,
   Typography,
} from '@material-ui/core';

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
   }),
);

const FeatureForm = ({ open, onClose }: FeatureFormProps) => {
   const classes = useStyles();
   const { register, handleSubmit } = useForm();

   const onSubmit = (data: IFeatureRequestData) => {
      console.log(data);
   };

   return (
      <Dialog
         onClose={() => onClose()}
         aria-labelledby="report-form"
         aria-describedby="report-form-content"
         open={open}>
         <DialogTitle id="report-form">Request a feature</DialogTitle>
         <form onSubmit={handleSubmit(onSubmit)}>
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
            <DialogActions>
               <Button onClick={onClose} color="primary">
                  Cancel
               </Button>
               <Button type="submit" color="primary" variant="contained">
                  Submit
               </Button>
            </DialogActions>
         </form>
      </Dialog>
   );
};

export default FeatureForm;
