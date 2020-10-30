import React, { useState } from 'react';
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
   CircularProgress,
} from '@material-ui/core';
import { CloseRounded as CloseIcon } from '@material-ui/icons';

import api from '@config/api';
import { useTheme } from '@contexts/ThemeProvider';
import Book from '@datatypes/Book';

interface EditBookProps {
   book: Book;
   setBook: (book: Book) => void;
   open: boolean;
   onClose: () => void;
}

interface IBookEditData {
   title: string;
   description: string;
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
         '& > *:first-child': {
            marginTop: theme.spacing(2),
         },
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
      loader: {
         color: 'inherit',
      },
   }),
);

const EditBook = ({ book, setBook, open, onClose }: EditBookProps) => {
   const classes = useStyles();
   const { muiTheme } = useTheme();
   const { register, handleSubmit } = useForm();
   const [loading, setLoading] = useState(false);
   const fullScreen = useMediaQuery(muiTheme.breakpoints.down('sm'));

   const onSubmit = (data: IBookEditData) => {
      setLoading(true);

      api.post('/books', {
         type: 'updateBook',
         bookId: book.id,
         ...data,
      })
         .then(() => {
            setBook({
               ...book,
               ...data,
            });
            onClose();
         })
         .catch((error) => {
            console.log(error);
            setLoading(false);
         });
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
            {!fullScreen && <DialogTitle id="create-book">Update book settings</DialogTitle>}
            {fullScreen && (
               <AppBar className={classes.appBar}>
                  <Toolbar>
                     <IconButton edge="start" color="inherit" onClick={onClose} aria-label="close">
                        <CloseIcon />
                     </IconButton>
                     <Typography variant="h6" className={classes.title}>
                        Update book settings
                     </Typography>
                     <Button autoFocus color="inherit" type="submit">
                        Update
                     </Button>
                  </Toolbar>
               </AppBar>
            )}
            <DialogContent id="create-book-content" className={classes.content}>
               <TextField
                  required
                  name="title"
                  placeholder="Title"
                  variant="outlined"
                  inputRef={register}
                  defaultValue={book.title}
               />
               <TextField
                  name="description"
                  placeholder="Description"
                  helperText="A short description of your book."
                  multiline
                  rows={4}
                  variant="outlined"
                  inputRef={register}
                  className={classes.spacing}
                  defaultValue={book.description}
               />
               <FormControlLabel
                  control={
                     <Checkbox
                        name="private"
                        color="primary"
                        inputRef={register}
                        defaultChecked={book.private}
                     />
                  }
                  label={<Typography>Private</Typography>}
               />
            </DialogContent>
            {!fullScreen && (
               <DialogActions>
                  <Button onClick={onClose} color="inherit">
                     Cancel
                  </Button>
                  <Button disabled={loading} type="submit" color="primary" variant="contained">
                     {loading ? <CircularProgress size={18} className={classes.loader} /> : 'Update'}
                  </Button>
               </DialogActions>
            )}
         </form>
      </Dialog>
   );
};

export default EditBook;
