import React from 'react';
import { Fab, useMediaQuery } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { SaveRounded as SaveIcon } from '@material-ui/icons';

import { useTheme } from '@contexts/ThemeProvider';

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

const SaveMenu = () => {
   const classes = useStyles();
   const { muiTheme } = useTheme();
   const isMobile = useMediaQuery(muiTheme.breakpoints.down('xs'));

   return (
      <Fab aria-label="save-menu" className={isMobile ? classes.mobile : classes.desktop} color="secondary">
         <SaveIcon />
      </Fab>
   );
};

export default SaveMenu;
