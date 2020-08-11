import React, { createContext, useState, useContext } from 'react';

import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import { Default, Dark } from '../themes';

interface ThemeContextInterface {
   theme: 'light' | 'dark';
   setTheme: Function;
}

interface ThemeProviderInterface {
   children: any;
}

export const ThemeContext = createContext<ThemeContextInterface>({
   theme: 'light',
   setTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }: ThemeProviderInterface) => {
   const [theme, setTheme] = useState<'light' | 'dark'>('light');
   const muiTheme = theme === 'dark' ? Dark : Default;

   const state: ThemeContextInterface = {
      theme,
      setTheme,
   };

   return (
      <ThemeContext.Provider value={state}>
         <MuiThemeProvider theme={muiTheme}>{children}</MuiThemeProvider>
      </ThemeContext.Provider>
   );
};
