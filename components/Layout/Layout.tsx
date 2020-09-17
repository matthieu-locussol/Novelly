import React from 'react';
import { useMediaQuery } from '@material-ui/core';

import Header from '@components/Layout/Header';
import HeaderMobile from '@components/Layout/HeaderMobile';
import { useTheme } from '@contexts/ThemeProvider';

interface LayoutProps {
   children: any;
}

const Layout = ({ children }: LayoutProps) => {
   const { muiTheme } = useTheme();
   const desktop = useMediaQuery(muiTheme.breakpoints.up('sm'));

   return (
      <>
         {desktop ? <Header /> : <HeaderMobile />}
         {children}
      </>
   );
};

export default Layout;
