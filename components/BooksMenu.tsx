import React from 'react';
import { Fab } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { AddRounded as AddIcon } from '@material-ui/icons';

const useStyles = makeStyles((theme: Theme) =>
   createStyles({
      root: {
         position: 'fixed',
         bottom: theme.spacing(2),
         right: theme.spacing(2),
      },
   }),
);

const BooksMenu = () => {
   const classes = useStyles();

   return (
      <Fab aria-label="books-menu" className={classes.root} color="primary">
         <AddIcon />
      </Fab>
   );
};

export default BooksMenu;
