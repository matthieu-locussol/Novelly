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
   Checkbox,
   FormControlLabel,
   Typography,
   useMediaQuery,
} from '@material-ui/core';
import { CloseRounded as CloseIcon } from '@material-ui/icons';

import { useTheme } from '@contexts/ThemeProvider';

interface CreateBookProps {
   open: boolean;
   onClose: () => void;
}

interface IBookData {
   title: string;
   description?: string;
   private: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
   createStyles({
      avatar: {
         backgroundColor: theme.palette.primary.main,
      },
      content: {
         display: 'flex',
         flexDirection: 'column',
      },
      appBar: {
         position: 'relative',
      },
      title: {
         marginLeft: theme.spacing(2),
         flex: 1,
      },
      spacing: {
         marginTop: theme.spacing(2),
      },
   }),
);

const CreateBook = ({ open, onClose }: CreateBookProps) => {
   const classes = useStyles();
   const { muiTheme } = useTheme();
   const { register, handleSubmit } = useForm();
   const fullScreen = useMediaQuery(muiTheme.breakpoints.down('sm'));

   const onSubmit = (data: IBookData) => {
      console.log(data);
   };

   return (
      <Dialog
         fullWidth
         fullScreen={fullScreen}
         onClose={() => onClose()}
         aria-labelledby="create-book"
         aria-describedby="create-book-content"
         open={open}>
         <form onSubmit={handleSubmit(onSubmit)}>
            {!fullScreen && <DialogTitle id="create-book">Create a new book</DialogTitle>}
            {fullScreen && (
               <AppBar className={classes.appBar}>
                  <Toolbar>
                     <IconButton edge="start" color="inherit" onClick={onClose} aria-label="close">
                        <CloseIcon />
                     </IconButton>
                     <Typography variant="h6" className={classes.title}>
                        Create a new book
                     </Typography>
                     <Button autoFocus color="inherit" type="submit">
                        Create
                     </Button>
                  </Toolbar>
               </AppBar>
            )}
            <DialogContent id="create-book-content" className={classes.content}>
               <TextField required name="title" label="Title" variant="outlined" inputRef={register} />
               <TextField
                  name="description"
                  label="Description"
                  helperText="A short description of your book."
                  multiline
                  rows={4}
                  variant="outlined"
                  inputRef={register}
                  className={classes.spacing}
               />
               <FormControlLabel
                  control={
                     <Checkbox required name="private" color="primary" inputRef={register} defaultChecked />
                  }
                  label={<Typography>Private</Typography>}
               />
            </DialogContent>
            {!fullScreen && (
               <DialogActions>
                  <Button onClick={onClose} color="inherit">
                     Cancel
                  </Button>
                  <Button type="submit" color="primary" variant="contained">
                     Create
                  </Button>
               </DialogActions>
            )}
         </form>
      </Dialog>
   );
};

export default CreateBook;
