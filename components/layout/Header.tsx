import React from 'react';
import Link from 'next/link';

import Button from '@components/common/Button';

const Header = () => (
   <header>
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
   </header>
);

export default Header;
