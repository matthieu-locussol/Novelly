import React, { useState } from 'react';

import IconButton from '@material-ui/core/IconButton';

import DarkIcon from '@material-ui/icons/Brightness4';
import LightIcon from '@material-ui/icons/Brightness7';

const ThemePicker = () => {
   const [theme, setTheme] = useState('light');

   const toggleTheme = () => {
      setTheme(theme === 'dark' ? 'light' : 'dark');
   };

   return (
      <div className="theme-picker">
         <IconButton onClick={() => toggleTheme()}>
            {theme === 'dark' ? <LightIcon /> : <DarkIcon />}
         </IconButton>
      </div>
   );
};

export default ThemePicker;
