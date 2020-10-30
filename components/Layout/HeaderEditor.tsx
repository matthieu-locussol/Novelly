import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
   Divider,
   Drawer,
   IconButton,
   List,
   ListItem,
   ListItemText,
   Menu,
   MenuItem,
   CircularProgress,
} from '@material-ui/core';
import {
   HomeRounded as HomeIcon,
   AccountCircle as AccountIcon,
   MenuBookRounded as BooksIcon,
   ChevronRightRounded as OpenIcon,
   ChevronLeftRounded as CloseIcon,
} from '@material-ui/icons';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import DrawerEditor from '@components/Layout/DrawerEditor';
import BugReport from '@components/BugReport/BugReport';
import LangPicker from '@components/LangPicker';
import ThemePicker from '@components/ThemePicker';
import { useUser } from '@contexts/UserProvider';
import Section from '@datatypes/Section';

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
      listitem: {
         paddingLeft: theme.spacing(4),
         paddingRight: theme.spacing(4),
      },
      active: {
         color: theme.palette.secondary.contrastText,
         backgroundColor: theme.palette.secondary.light,
         paddingLeft: theme.spacing(4),
         paddingRight: theme.spacing(4),
      },
      activeText: {
         fontWeight: 500,
         fontStyle: 'italic',
      },
      dividerBook: {
         color: 'inherit',
         marginTop: theme.spacing(1),
         marginBottom: theme.spacing(1),
      },
   }),
);

interface HeaderEditorProps {
   sections?: Section[];
   callback?: any;
}

const HeaderEditor = ({ sections, callback }: HeaderEditorProps) => {
   const router = useRouter();
   const classes = useStyles();
   const { user, setUser } = useUser();
   const [open, setOpen] = useState(false);
   const [loading, setLoading] = useState(false);
   const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

   const isBookPage = router.asPath.startsWith('/book/');

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

   const toggleDrawer = () => {
      const newValue = !open;
      setOpen(newValue);

      if (callback) {
         callback(newValue);
      }
   };

   return (
      <>
         <Drawer
            variant="permanent"
            classes={{ paper: classes.paper }}
            className={classes.drawer}
            PaperProps={{ elevation: 4 }}>
            <div className={classes.button}>
               <IconButton color="inherit" onClick={() => toggleDrawer()}>
                  {open ? <CloseIcon /> : <OpenIcon />}
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
               <IconButton color="inherit" onClick={handleClick} disabled={loading}>
                  {loading ? <CircularProgress color="inherit" size={24} /> : <AccountIcon />}
               </IconButton>
            </div>
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
         </Drawer>
         <DrawerEditor open={open} onClose={() => setOpen(false)}>
            {sections && sections.length > 0 && (
               <List>
                  {!isBookPage && (
                     <React.Fragment>
                        <Link href="/book/[bookId]" as={`/book/${sections[0].bookId}`}>
                           <ListItem button className={classes.listitem}>
                              <ListItemText primary="Book settings" />
                           </ListItem>
                        </Link>
                        <Divider className={classes.dividerBook} />
                     </React.Fragment>
                  )}
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
            )}
         </DrawerEditor>
      </>
   );
};

export default HeaderEditor;
