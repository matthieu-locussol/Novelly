import React from 'react';
import { useForm } from 'react-hook-form';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import {
   AppBar,
   Toolbar,
   IconButton,
   Button,
   DialogActions,
   DialogContent,
   DialogTitle,
   Dialog,
   TextField,
   Typography,
   useMediaQuery,
} from '@material-ui/core';
import { CloseRounded as CloseIcon } from '@material-ui/icons';

import { useTheme } from '@contexts/ThemeProvider';

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
   }),
);

const BugForm = ({ open, onClose }: BugFormProps) => {
   const classes = useStyles();
   const { muiTheme } = useTheme();
   const { register, handleSubmit } = useForm();
   const fullScreen = useMediaQuery(muiTheme.breakpoints.down('sm'));

   const onSubmit = (data: IBugReportData) => {
      console.log(data);
      onClose();
   };

   return (
      <Dialog
         fullScreen={fullScreen}
         onClose={() => onClose()}
         aria-labelledby="report-form"
         aria-describedby="report-form-content"
         open={open}>
         <form onSubmit={handleSubmit(onSubmit)}>
            {!fullScreen && <DialogTitle id="report-form">Report a bug</DialogTitle>}
            {fullScreen && (
               <AppBar className={classes.appBar}>
                  <Toolbar>
                     <IconButton edge="start" color="inherit" onClick={onClose} aria-label="close">
                        <CloseIcon />
                     </IconButton>
                     <Typography variant="h6" className={classes.title}>
                        Report a bug
                     </Typography>
                     <Button autoFocus color="inherit" type="submit">
                        Submit
                     </Button>
                  </Toolbar>
               </AppBar>
            )}
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
            {!fullScreen && (
               <DialogActions>
                  <Button onClick={onClose} color="inherit">
                     Cancel
                  </Button>
                  <Button type="submit" color="primary" variant="contained">
                     Submit
                  </Button>
               </DialogActions>
            )}
         </form>
      </Dialog>
   );
};

export default BugForm;
