import React from 'react';

type LogoProps = {
   width: string;
   height: string;
};

const Logo = ({ width, height }: LogoProps) => (
   <div className="logo">
      <img src="/logo.png" alt="Logo" width={width} height={height} />
   </div>
);

export default Logo;
