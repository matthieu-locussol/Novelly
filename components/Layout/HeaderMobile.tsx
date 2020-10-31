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
   ListItemIcon,
   ListItemText,
   CircularProgress,
   Menu,
   MenuItem,
} from '@material-ui/core';
import {
   AccountCircle as AccountIcon,
   MenuRounded as MenuIcon,
   ExitToAppRounded as LoginIcon,
   SettingsRounded as BookIcon,
   AddRounded as AddIcon,
} from '@material-ui/icons';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import DrawerMobile from '@components/Layout/DrawerMobile';
import BugReport from '@components/BugReport/BugReport';
import LangPicker from '@components/LangPicker';
import ThemePicker from '@components/ThemePicker';
import CreateSection from '@components/Editor/CreateSection';
import { useUser } from '@contexts/UserProvider';
import Section from '@datatypes/Section';

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
      dividerBook: {
         color: 'inherit',
         marginBottom: theme.spacing(2),
      },
      dividerSection: {
         color: 'inherit',
         marginTop: theme.spacing(2),
         marginBottom: theme.spacing(2),
      },
      toolbar: {
         padding: `0 ${theme.spacing(1)}px`,
      },
      listitem: {
         marginRight: theme.spacing(1),
      },
      active: {
         color: theme.palette.secondary.contrastText,
         backgroundColor: `${theme.palette.secondary.light} !important`,
         marginRight: theme.spacing(1),
      },
      activeText: {
         fontWeight: 500,
         fontStyle: 'italic',
      },
   }),
);

interface HeaderMobileProps {
   bookId?: string;
   sections?: Section[];
}

const HeaderMobile = ({ bookId, sections }: HeaderMobileProps) => {
   const router = useRouter();
   const classes = useStyles();
   const { user, setUser } = useUser();
   const [open, setOpen] = useState(false);
   const [loading, setLoading] = useState(false);
   const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
   const [openCreate, setOpenCreate] = useState(false);

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
            {sections && sections.length > 0 ? (
               <List>
                  <Divider className={classes.dividerBook} />
                  <Link href="/book/[bookId]" as={`/book/${sections[0].bookId}`}>
                     <ListItem button className={classes.listitem}>
                        <ListItemIcon>
                           <BookIcon />
                        </ListItemIcon>
                        <ListItemText primary="Book settings" />
                     </ListItem>
                  </Link>
                  <Divider className={classes.dividerSection} />
                  <ListItem button className={classes.listitem} onClick={() => setOpenCreate(true)}>
                     <ListItemIcon>
                        <AddIcon />
                     </ListItemIcon>
                     <ListItemText primary="Create a section" />
                  </ListItem>
                  <Divider className={classes.dividerSection} />
                  {sections.map((section, index) => {
                     const link = `/editor/${section.id}`;
                     const active = router.asPath === link;

                     return (
                        <Link href="/editor/[sectionId]" as={link} key={index}>
                           <ListItem
                              button
                              disabled={active}
                              className={active ? classes.active : classes.listitem}>
                              <ListItemText
                                 primary={section.title}
                                 primaryTypographyProps={{
                                    className: active ? classes.activeText : '',
                                 }}
                              />
                           </ListItem>
                        </Link>
                     );
                  })}
               </List>
            ) : (
               <>
                  <Divider className={classes.dividerBook} />
                  <ListItem button className={classes.listitem} onClick={() => setOpenCreate(true)}>
                     <ListItemIcon>
                        <AddIcon />
                     </ListItemIcon>
                     <ListItemText primary="Create a section" />
                  </ListItem>
               </>
            )}
            {bookId && (
               <CreateSection bookId={bookId} open={openCreate} onClose={() => setOpenCreate(false)} />
            )}
         </DrawerMobile>
      </div>
   );
};

export default HeaderMobile;
