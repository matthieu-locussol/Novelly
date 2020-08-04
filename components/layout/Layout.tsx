import React, { ReactNode } from 'react';

import Header from '@components/layout/Header';

type Props = {
   children?: ReactNode;
};

const Layout = ({ children }: Props) => (
   <div className="layout">
      <Header />
      {children}
   </div>
);

export default Layout;
