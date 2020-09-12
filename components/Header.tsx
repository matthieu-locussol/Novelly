import React from 'react';
import Link from 'next/link';
import { AppBar, Divider, Toolbar, IconButton } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import LangPicker from '@components/LangPicker';
import ThemePicker from '@components/ThemePicker';

const useStyles = makeStyles((theme: Theme) =>
   createStyles({
      root: {
         flexGrow: 1,
      },
      button: {
         color: 'inherit',
      },
      buttonLeft: {
         color: 'inherit',
         '&:not(:first-child)': {
            marginLeft: theme.spacing(1),
         },
      },
      buttonRight: {
         color: 'inherit',
         marginRight: theme.spacing(1),
      },
      sep: {
         flexGrow: 1,
      },
      divider: {
         color: 'inherit',
         marginLeft: theme.spacing(0),
         marginRight: theme.spacing(1),
      },
      toolbar: {
         padding: `0 ${theme.spacing(1)}px`,
      },
   }),
);

const Header = () => {
   const classes = useStyles();

   return (
      <div className={classes.root}>
         <AppBar position="static">
            <Toolbar disableGutters className={classes.toolbar}>
               <Link href="/">
                  <IconButton className={classes.button}>
                     <HomeIcon />
                  </IconButton>
               </Link>
               <div className={classes.sep} />
               <div className={classes.buttonRight}>
                  <LangPicker />
               </div>
               <div className={classes.buttonRight}>
                  <ThemePicker />
               </div>
               <Divider className={classes.divider} orientation="vertical" flexItem />
               <Link href="/login">
                  <IconButton className={classes.button}>
                     <AccountCircleIcon />
                  </IconButton>
               </Link>
            </Toolbar>
         </AppBar>
      </div>
   );
};

export default Header;
