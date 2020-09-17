import React from 'react';
import { Drawer, Divider, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { AddRounded as AddIcon } from '@material-ui/icons';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
   createStyles({
      drawer: {
         position: 'absolute',
         left: theme.spacing(8),
         zIndex: 1,
      },
      sep: {
         flexGrow: 1,
         backgroundColor: 'inherit',
      },
      listicon: {
         minWidth: '40px',
      },
      listitem: {
         paddingRight: theme.spacing(3),
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
         {children}
         <Divider className={classes.sep} />
         <ListItem button className={classes.listitem}>
            <ListItemIcon className={classes.listicon}>
               <AddIcon />
            </ListItemIcon>
            <ListItemText primary="Add a section" />
         </ListItem>
      </Drawer>
   );
};

export default DrawerEditor;
