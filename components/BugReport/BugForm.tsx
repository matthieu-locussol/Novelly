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

interface BugFormProps {
   open: boolean;
   onClose: () => void;
}

interface IBugReportData {
   summary: string;
   description: string;
}

const useStyles = makeStyles((theme: Theme) =>
   createStyles({
      content: {
         display: 'flex',
         flexDirection: 'column',
         '& > *:not(:first-child)': {
            marginTop: theme.spacing(2),
         },
         '& > *:last-child': {
            marginBottom: theme.spacing(2),
         },
      },
   }),
);

const BugForm = ({ open, onClose }: BugFormProps) => {
   const classes = useStyles();
   const { register, handleSubmit } = useForm();

   const onSubmit = (data: IBugReportData) => {
      console.log(data);
   };

   return (
      <Dialog
         onClose={() => onClose()}
         aria-labelledby="report-form"
         aria-describedby="report-form-content"
         open={open}>
         <DialogTitle id="report-form">Report a bug</DialogTitle>
         <form onSubmit={handleSubmit(onSubmit)}>
            <DialogContent id="report-form-content" className={classes.content}>
               <Typography>
                  Novelly is still in a development stage, so you might experience some issues while using it.
                  If so, please help us improving the website by reporting bugs!
               </Typography>
               <TextField
                  required
                  name="summary"
                  label="Summary"
                  helperText="Provide a summary of the bug."
                  variant="outlined"
                  inputRef={register}
               />
               <TextField
                  required
                  name="description"
                  label="Description"
                  helperText="Provide a full description of the bug."
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

export default BugForm;
