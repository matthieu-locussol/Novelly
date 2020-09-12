import React from 'react';
import Link from 'next/link';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
   createStyles({
      logo: {
         width: '24px',
         height: '24px',
         marginRight: theme.spacing(2),
      },
   }),
);

const Logo = () => {
   const classes = useStyles();

   return (
      <Link href="/">
         <img className={classes.logo} src="/logo.png" alt="logo" />
      </Link>
   );
};

export default Logo;
