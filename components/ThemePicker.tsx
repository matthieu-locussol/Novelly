import React from 'react';
import { IconButton } from '@material-ui/core';
import DarkIcon from '@material-ui/icons/Brightness4';
import LightIcon from '@material-ui/icons/Brightness7';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import { useTheme } from '@contexts/ThemeProvider';

const useStyles = makeStyles(() =>
   createStyles({
      button: {
         color: 'inherit',
      },
   }),
);

const ThemePicker = () => {
   const classes = useStyles();
   const { theme, setTheme } = useTheme();

   const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

   return (
      <IconButton className={classes.button} aria-label="theme" onClick={() => toggleTheme()}>
         {theme === 'dark' ? <LightIcon /> : <DarkIcon />}
      </IconButton>
   );
};

export default ThemePicker;
