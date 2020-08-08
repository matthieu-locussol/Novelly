import React from 'react';
import Link from 'next/link';

type LogoProps = {
   width: string;
   height: string;
};

const Logo = ({ width, height }: LogoProps) => (
   <div className="logo">
      <Link href="/">
         <img src="/logo.png" alt="Logo" width={width} height={height} />
      </Link>
   </div>
);

export default Logo;
