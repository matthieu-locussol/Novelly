import React from 'react';

import Header from '@components/Header';

const Layout = ({ children }: any) => (
   <>
      <Header />
      {children}
   </>
);

export default Layout;
