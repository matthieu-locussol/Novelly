import React, { ReactNode } from "react";

import Header from "@components/layout/Header";
import Footer from "@components/layout/Footer";

type Props = {
  children?: ReactNode;
};

const Layout = ({ children }: Props) => (
  <div>
    <Header />
    {children}
    <Footer />
  </div>
);

export default Layout;
