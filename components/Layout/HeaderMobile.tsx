import React, { useState } from 'react';
import Link from 'next/link';
import { AppBar, Divider, Toolbar, IconButton, List, ListItem, ListItemText } from '@material-ui/core';
import { AccountCircle as AccountIcon, MenuRounded as MenuIcon } from '@material-ui/icons';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import DrawerMobile from '@components/Layout/DrawerMobile';
import BugReport from '@components/BugReport/BugReport';
import LangPicker from '@components/LangPicker';
import ThemePicker from '@components/ThemePicker';

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
   const classes = useStyles();
   const [open, setOpen] = useState(false);

   return (
      <div className={classes.root}>
         <AppBar position="static">
            <Toolbar disableGutters className={classes.toolbar}>
               <IconButton className={classes.button} onClick={() => setOpen(true)}>
                  <MenuIcon />
               </IconButton>
               <Divider className={classes.sep} orientation="vertical" />
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
         <DrawerMobile open={open} onClose={() => setOpen(false)}>
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
