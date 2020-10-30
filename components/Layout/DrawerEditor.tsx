import React from 'react';
import { AppBar, Toolbar, IconButton, Drawer } from '@material-ui/core';
import { AddRounded as AddIcon } from '@material-ui/icons';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

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
   open: boolean;
   onClose: () => void;
   children: any;
}

const DrawerEditor = ({ open, onClose, children }: DrawerEditorProps) => {
   const classes = useStyles();

   return (
      <Drawer
         classes={{ paper: classes.drawer }}
         variant="persistent"
         anchor="left"
         open={open}
         onClose={() => onClose()}>
         <AppBar className={classes.appBar} color="secondary">
            <Toolbar className={classes.toolbar}>
               <IconButton color="inherit" edge="end" aria-label="close">
                  <AddIcon />
               </IconButton>
            </Toolbar>
         </AppBar>
         {children}
      </Drawer>
   );
};

export default DrawerEditor;
