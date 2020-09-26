import React from 'react';
import { Fade, Fab, useMediaQuery } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { SaveRounded as SaveIcon } from '@material-ui/icons';

import { useTheme } from '@contexts/ThemeProvider';

interface SaveMenuProps {
   disabled?: boolean;
   onClick?: () => void;
}

const useStyles = makeStyles((theme: Theme) =>
   createStyles({
      desktop: {
         position: 'fixed',
         top: theme.spacing(2),
         right: theme.spacing(2),
      },
      mobile: {
         position: 'fixed',
         bottom: theme.spacing(11),
         right: theme.spacing(2),
      },
   }),
);

const SaveMenu = ({ disabled = false, ...rest }: SaveMenuProps) => {
   const classes = useStyles();
   const { muiTheme } = useTheme();
   const isMobile = useMediaQuery(muiTheme.breakpoints.down('xs'));

   return (
      <Fab
         disabled={disabled}
         aria-label="save-menu"
         className={isMobile ? classes.mobile : classes.desktop}
         color="secondary"
         {...rest}>
         <SaveIcon />
      </Fab>
   );
};

export default SaveMenu;
