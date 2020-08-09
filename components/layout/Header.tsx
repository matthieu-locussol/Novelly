import React from 'react';
import Link from 'next/link';

import Logo from '@components/common/Logo';
import Button from '@components/common/Button';
import LangPicker from '@components/LangPicker';
import ThemePicker from '@components/ThemePicker';

const Header = () => (
   <header>
      <div className="header-left">
         <Logo width="42px" height="42px" />
         <nav>
            <Link href="/">
               <Button disabled className="active-button">
                  Dashboard
               </Button>
            </Link>
            <Link href="/">
               <Button className="button">Stories</Button>
            </Link>
            <Link href="/">
               <Button className="button">Featured</Button>
            </Link>
         </nav>
      </div>
      <div className="header-right">
         <LangPicker />
         <ThemePicker />
      </div>
   </header>
);

export default Header;
