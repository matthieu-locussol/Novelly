import React from 'react';
import { Fab } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { SettingsRounded as SettingsIcon } from '@material-ui/icons';

interface SettingsMenuProps {
   onClick?: () => void;
}

const useStyles = makeStyles((theme: Theme) =>
   createStyles({
      menu: {
         position: 'fixed',
         bottom: theme.spacing(2),
         right: theme.spacing(11),
      },
   }),
);

const SettingsMenu = ({ ...rest }: SettingsMenuProps) => {
   const classes = useStyles();

   return (
      <Fab aria-label="settings-menu" className={classes.menu} color="secondary" {...rest}>
         <SettingsIcon />
      </Fab>
   );
};

export default SettingsMenu;
