import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
   AppBar,
   Divider,
   Toolbar,
   IconButton,
   List,
   ListItem,
   ListItemText,
   CircularProgress,
   Menu,
   MenuItem,
} from '@material-ui/core';
import {
   AccountCircle as AccountIcon,
   MenuRounded as MenuIcon,
   ExitToAppRounded as LoginIcon,
} from '@material-ui/icons';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import DrawerMobile from '@components/Layout/DrawerMobile';
import BugReport from '@components/BugReport/BugReport';
import LangPicker from '@components/LangPicker';
import ThemePicker from '@components/ThemePicker';
import { useUser } from '@contexts/UserProvider';

const useStyles = makeStyles((theme: Theme) =>
   createStyles({
      root: {
         flexGrow: 1,
      },
      button: {
         color: 'inherit',
         marginRight: theme.spacing(1),
      },
      buttonRight: {
         color: 'inherit',
      },
      sep: {
         flexGrow: 1,
      },
      divider: {
         color: 'inherit',
         marginLeft: theme.spacing(0),
         marginRight: theme.spacing(1),
      },
      dividerSection: {
         color: 'inherit',
         marginBottom: theme.spacing(2),
      },
      toolbar: {
         padding: `0 ${theme.spacing(1)}px`,
      },
      listitem: {
         marginRight: theme.spacing(1),
      },
   }),
);

interface HeaderMobileProps {
   sections?: any[];
}

const HeaderMobile = ({ sections }: HeaderMobileProps) => {
   const router = useRouter();
   const classes = useStyles();
   const { user, setUser } = useUser();
   const [open, setOpen] = useState(false);
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

   return (
      <div className={classes.root}>
         <AppBar position="static">
            <Toolbar disableGutters className={classes.toolbar}>
               <IconButton className={classes.button} onClick={() => setOpen(true)}>
                  <MenuIcon />
               </IconButton>
               <Divider className={classes.sep} orientation="vertical" />
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
         <DrawerMobile open={open} user={user} onClose={() => setOpen(false)}>
            {sections && (
               <List>
                  <Divider className={classes.dividerSection} />
                  {sections.map((section, index) => (
                     <Link href={section.link} key={index}>
                        <ListItem button className={classes.listitem}>
                           <ListItemText primary={section.name} />
                        </ListItem>
                     </Link>
                  ))}
               </List>
            )}
         </DrawerMobile>
      </div>
   );
};

export default HeaderMobile;
