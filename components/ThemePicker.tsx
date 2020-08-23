import React from 'react';

import IconButton from '@material-ui/core/IconButton';

import DarkIcon from '@material-ui/icons/Brightness4';
import LightIcon from '@material-ui/icons/Brightness7';

import { useTheme } from '@contexts/ThemeProvider';

const ThemePicker = () => {
   const { theme, muiTheme, setTheme } = useTheme();

   const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

   return (
      <div className="theme-picker">
         <IconButton onClick={() => toggleTheme()}>
            {theme === 'dark' ? (
               <LightIcon style={{ color: muiTheme.palette.text.primary }} />
            ) : (
               <DarkIcon style={{ color: muiTheme.palette.text.primary }} />
            )}
         </IconButton>
      </div>
   );
};

export default ThemePicker;
