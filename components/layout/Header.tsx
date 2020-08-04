import React from 'react';
import Link from 'next/link';

const Header = () => (
   <header>
      <nav>
         <Link href="/">
            <a className="active">Dashboard</a>
         </Link>
         <Link href="/">
            <a>Stories</a>
         </Link>
         <Link href="/">
            <a>Featured</a>
         </Link>
      </nav>
   </header>
);

export default Header;
