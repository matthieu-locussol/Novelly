import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Drawer } from '@material-ui/core';
import { AddRounded as AddIcon } from '@material-ui/icons';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import CreateSection from '@components/Editor/CreateSection';

const useStyles = makeStyles((theme: Theme) =>
   createStyles({
      drawer: {
         minWidth: 200,
         maxWidth: 240,
         position: 'absolute',
         left: theme.spacing(8),
         zIndex: 1,
      },
      appBar: {
         position: 'sticky',
      },
      toolbar: {
         display: 'flex',
         justifyContent: 'flex-end',
      },
   }),
);

interface DrawerEditorProps {
   bookId: string;
   open: boolean;
   onClose: () => void;
   children: any;
}

const DrawerEditor = ({ bookId, open, onClose, children }: DrawerEditorProps) => {
   const classes = useStyles();
   const [openCreate, setOpenCreate] = useState(false);

   return (
      <Drawer
         classes={{ paper: classes.drawer }}
         variant="persistent"
         anchor="left"
         open={open}
         onClose={() => onClose()}>
         <AppBar className={classes.appBar} color="secondary">
            <Toolbar className={classes.toolbar}>
               <IconButton color="inherit" edge="end" aria-label="close" onClick={() => setOpenCreate(true)}>
                  <AddIcon />
               </IconButton>
            </Toolbar>
            <CreateSection bookId={bookId} open={openCreate} onClose={() => setOpenCreate(false)} />
         </AppBar>
         {children}
      </Drawer>
   );
};

export default DrawerEditor;
