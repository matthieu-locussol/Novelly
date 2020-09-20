import React from 'react';
import { useForm } from 'react-hook-form';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Button, DialogActions, TextField, DialogTitle, Dialog, DialogContent } from '@material-ui/core';

interface CreateBookProps {
   open: boolean;
   onClose: () => void;
}

interface IBookData {
   title: string;
   description?: string;
}

const useStyles = makeStyles((theme: Theme) =>
   createStyles({
      avatar: {
         backgroundColor: theme.palette.primary.main,
      },
      content: {
         display: 'flex',
         flexDirection: 'column',
         '& > *:not(:first-child)': {
            marginTop: theme.spacing(2),
         },
      },
   }),
);

const CreateBook = ({ open, onClose }: CreateBookProps) => {
   const classes = useStyles();
   const { register, handleSubmit } = useForm();

   const onSubmit = (data: IBookData) => {
      console.log(data);
   };

   return (
      <Dialog
         fullWidth
         onClose={() => onClose()}
         aria-labelledby="create-book"
         aria-describedby="create-book-content"
         open={open}>
         <DialogTitle id="create-book">Create a new book</DialogTitle>
         <form onSubmit={handleSubmit(onSubmit)}>
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
               />
            </DialogContent>
            <DialogActions>
               <Button onClick={onClose} color="primary">
                  Cancel
               </Button>
               <Button type="submit" color="primary" variant="contained">
                  Create
               </Button>
            </DialogActions>
         </form>
      </Dialog>
   );
};

export default CreateBook;
