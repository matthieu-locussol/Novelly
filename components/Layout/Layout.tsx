import React from 'react';

import Header from '@components/Layout/Header';

interface LayoutProps {
   children: any;
}

const Layout = ({ children }: LayoutProps) => (
   <>
      <Header />
      {children}
   </>
);

export default Layout;
