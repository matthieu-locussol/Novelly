import React, { createContext, useState, useContext } from 'react';

import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import { Theme as MuiTheme } from '@material-ui/core/styles';
import { Default, Dark } from '@themes/index';

type ThemeType = 'light' | 'dark';

interface ThemeContextInterface {
   theme: ThemeType;
   muiTheme: MuiTheme;
   setTheme: Function;
}

interface ThemeProviderInterface {
   children: any;
}

export const ThemeContext = createContext<ThemeContextInterface>({
   theme: 'light',
   muiTheme: Default,
   setTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }: ThemeProviderInterface) => {
   const [theme, setTheme] = useState<ThemeType>('light');
   const [muiTheme, setMuiTheme] = useState<MuiTheme>(Default);

   const selectTheme = (theme: ThemeType) => {
      setTheme(theme);
      setMuiTheme(theme === 'dark' ? Dark : Default);
   };

   const state: ThemeContextInterface = {
      theme,
      muiTheme,
      setTheme: selectTheme,
   };

   return (
      <ThemeContext.Provider value={state}>
         <MuiThemeProvider theme={muiTheme}>{children}</MuiThemeProvider>
      </ThemeContext.Provider>
   );
};
