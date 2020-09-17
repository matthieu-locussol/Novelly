import React from 'react';
import Link from 'next/link';
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { HomeRounded as HomeIcon, MenuBookRounded as BooksIcon } from '@material-ui/icons';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
   createStyles({
      listitem: {
         marginRight: theme.spacing(1),
      },
   }),
);

const elements = [
   { link: '/', name: 'Home', icon: <HomeIcon /> },
   { link: '/books', name: 'My library', icon: <BooksIcon /> },
];

interface DrawerMobileProps {
   open: boolean;
   onClose: () => void;
   children: any;
}

const DrawerMobile = ({ open, onClose, children }: DrawerMobileProps) => {
   const classes = useStyles();

   return (
      <Drawer anchor="left" open={open} onClose={() => onClose()}>
         <List>
            {elements.map((item, index) => (
               <Link href={item.link} key={index}>
                  <ListItem button className={classes.listitem}>
                     <ListItemIcon>{item.icon}</ListItemIcon>
                     <ListItemText primary={item.name} />
                  </ListItem>
               </Link>
            ))}
         </List>
         {children}
      </Drawer>
   );
};

export default DrawerMobile;
