import React, { useState } from 'react';
import { Fab } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { AddRounded as AddIcon } from '@material-ui/icons';

import CreateBook from '@components/Books/CreateBook';

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
   const [open, setOpen] = useState(false);

   return (
      <>
         <CreateBook open={open} onClose={() => setOpen(false)} />
         <Fab aria-label="books-menu" className={classes.root} color="primary" onClick={() => setOpen(true)}>
            <AddIcon />
         </Fab>
      </>
   );
};

export default BooksMenu;
