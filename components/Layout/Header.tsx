import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { AppBar, Divider, Toolbar, IconButton } from '@material-ui/core';
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
      root: {
         flexGrow: 1,
      },
      buttonRight: {
         color: 'inherit',
      },
      button: {
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
   const router = useRouter();

   const isEditor = router.asPath === '/editor';

   return (
      <div className={classes.root}>
         <AppBar position="static">
            <Toolbar disableGutters className={classes.toolbar}>
               {isEditor && (
                  <>
                     <IconButton className={classes.button} onClick={() => alert('Clicked!')}>
                        <MenuIcon />
                     </IconButton>
                     <Divider className={classes.divider} orientation="vertical" flexItem />
                  </>
               )}
               <Link href="/">
                  <IconButton className={classes.button}>
                     <HomeIcon />
                  </IconButton>
               </Link>
               <Link href="/books">
                  <IconButton className={classes.button}>
                     <BooksIcon />
                  </IconButton>
               </Link>
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
               <Divider className={classes.divider} orientation="vertical" flexItem />
               <Link href="/login">
                  <IconButton className={classes.buttonRight}>
                     <AccountIcon />
                  </IconButton>
               </Link>
            </Toolbar>
         </AppBar>
      </div>
   );
};

export default Header;
