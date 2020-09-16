import React from 'react';
import Link from 'next/link';
import { Divider, Drawer, IconButton } from '@material-ui/core';
import {
   HomeRounded as HomeIcon,
   AccountCircle as AccountIcon,
   MenuBookRounded as BooksIcon,
   MenuRounded as MenuIcon,
} from '@material-ui/icons';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import BugReport from '@components/BugReport/BugReport';
import LangPicker from '@components/LangPicker';
import ThemePicker from '@components/ThemePicker';

const useStyles = makeStyles((theme: Theme) =>
   createStyles({
      paper: {
         color: 'white',
         backgroundColor: theme.palette.primary.main,
      },
      drawer: {
         color: 'inherit',
         transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
         }),
         overflowX: 'hidden',
         [theme.breakpoints.up('sm')]: {
            width: theme.spacing(7) + 1,
         },
      },
      button: {
         color: 'inherit',
         marginTop: theme.spacing(1),
         padding: `0 ${theme.spacing(1)}px`,
      },
      buttonBottom: {
         color: 'inherit',
         margin: `${theme.spacing(1)}px 0`,
         padding: `0 ${theme.spacing(1)}px`,
      },
      sep: {
         flexGrow: 1,
      },
      divider: {
         color: 'inherit',
         marginTop: theme.spacing(1),
      },
   }),
);

const HeaderEditor = () => {
   const classes = useStyles();

   return (
      <Drawer
         variant="permanent"
         classes={{ paper: classes.paper }}
         className={classes.drawer}
         PaperProps={{ elevation: 4 }}>
         <div className={classes.button}>
            <IconButton color="inherit" onClick={() => alert('Clicked!')}>
               <MenuIcon />
            </IconButton>
         </div>
         <Divider className={classes.divider} orientation="horizontal" />
         <div className={classes.button}>
            <Link href="/">
               <IconButton color="inherit">
                  <HomeIcon />
               </IconButton>
            </Link>
         </div>
         <div className={classes.button}>
            <Link href="/books">
               <IconButton color="inherit">
                  <BooksIcon />
               </IconButton>
            </Link>
         </div>
         <div className={classes.sep} />
         <div className={classes.button}>
            <BugReport />
         </div>
         <div className={classes.button}>
            <LangPicker />
         </div>
         <div className={classes.button}>
            <ThemePicker />
         </div>
         <Divider className={classes.divider} orientation="horizontal" />
         <div className={classes.buttonBottom}>
            <Link href="/login">
               <IconButton color="inherit">
                  <AccountIcon />
               </IconButton>
            </Link>
         </div>
      </Drawer>
   );
};

export default HeaderEditor;
