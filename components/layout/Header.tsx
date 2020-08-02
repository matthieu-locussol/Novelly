import React from "react";
import Link from "next/link";

const Header = () => (
  <header>
    <nav>
      <Link href="/">
        <a>Home</a>
      </Link>
    </nav>
  </header>
);

export default Header;
