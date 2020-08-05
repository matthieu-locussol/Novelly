import React from 'react';
import Link from 'next/link';

import Button from '@components/common/Button';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
   createStyles({
      activeButton: {
         'font-weight': 600,
         'border-bottom': `2px solid ${theme.palette.primary.main}`,
         'border-bottom-left-radius': '0px',
         'border-bottom-right-radius': '0px',
         '&.Mui-disabled': {
            color: theme.palette.text.primary,
         },
      },
      button: {
         'font-weight': 600,
         'border-bottom': `2px solid transparent`,
      },
   }),
);

const Header = () => {
   const classes = useStyles();

   return (
      <header>
         <nav>
            <Link href="/">
               <Button disabled className={classes.activeButton}>
                  Dashboard
               </Button>
            </Link>
            <Link href="/">
               <Button className={classes.button}>Stories</Button>
            </Link>
            <Link href="/">
               <Button className={classes.button}>Featured</Button>
            </Link>
         </nav>
      </header>
   );
};

export default Header;
