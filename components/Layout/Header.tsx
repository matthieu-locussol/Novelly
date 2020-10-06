import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { AppBar, Divider, Toolbar, IconButton, Menu, MenuItem, CircularProgress } from '@material-ui/core';
import {
   HomeRounded as HomeIcon,
   AccountCircle as AccountIcon,
   MenuBookRounded as BooksIcon,
   ExitToAppRounded as LoginIcon,
} from '@material-ui/icons';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import BugReport from '@components/BugReport/BugReport';
import LangPicker from '@components/LangPicker';
import ThemePicker from '@components/ThemePicker';
import { useUser } from '@contexts/UserProvider';

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
   const router = useRouter();
   const classes = useStyles();
   const { user, setUser } = useUser();
   const [loading, setLoading] = useState(false);
   const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

   const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
   };

   const handleClose = () => {
      setAnchorEl(null);
   };

   const logout = () => {
      setLoading(true);
      handleClose();
      user?.logout().then(() => {
         setUser(null);
         setLoading(false);
         router.push('/');
      });
   };

   useEffect(() => {
      console.log(user);
   }, [user]);

   return (
      <div className={classes.root}>
         <AppBar position="static">
            <Toolbar disableGutters className={classes.toolbar}>
               <Link href="/">
                  <IconButton className={classes.button}>
                     <HomeIcon />
                  </IconButton>
               </Link>
               {user && (
                  <Link href="/books">
                     <IconButton className={classes.button}>
                        <BooksIcon />
                     </IconButton>
                  </Link>
               )}
               <div className={classes.sep} />
               {user && (
                  <div className={classes.button}>
                     <BugReport />
                  </div>
               )}
               <div className={classes.button}>
                  <LangPicker />
               </div>
               <div className={classes.button}>
                  <ThemePicker />
               </div>
               <Divider className={classes.divider} orientation="vertical" flexItem />
               {user ? (
                  <>
                     <IconButton className={classes.buttonRight} onClick={handleClick} disabled={loading}>
                        {loading ? <CircularProgress color="inherit" size={24} /> : <AccountIcon />}
                     </IconButton>
                     <Menu
                        id="lang-picker-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}>
                        <Link href="/settings">
                           <MenuItem onClick={handleClose}>Settings</MenuItem>
                        </Link>
                        <MenuItem onClick={logout}>Logout</MenuItem>
                     </Menu>
                  </>
               ) : (
                  <Link href="/login">
                     <IconButton className={classes.buttonRight}>
                        <LoginIcon />
                     </IconButton>
                  </Link>
               )}
            </Toolbar>
         </AppBar>
      </div>
   );
};

export default Header;
