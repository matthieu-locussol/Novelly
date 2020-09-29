import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import {
   Button,
   Dialog,
   DialogActions,
   DialogContent,
   DialogContentText,
   DialogTitle,
   Typography,
   useMediaQuery,
} from '@material-ui/core';

import { useTheme } from '@contexts/ThemeProvider';

interface ModalEULAProps {
   open: boolean;
   onClose: any;
}

const useStyles = makeStyles((theme: Theme) =>
   createStyles({
      hey: {
         marginBottom: theme.spacing(2),
      },
   }),
);

const ModalEULA = ({ open, onClose }: ModalEULAProps) => {
   const classes = useStyles();
   const { muiTheme } = useTheme();
   const fullScreen = useMediaQuery(muiTheme.breakpoints.down('sm'));

   return (
      <Dialog
         open={open}
         onClose={onClose}
         scroll="paper"
         fullScreen={fullScreen}
         aria-labelledby="eula-dialog-title"
         aria-describedby="eula-dialog-description">
         <DialogTitle id="eula-dialog-title">✨ Work in progress</DialogTitle>
         <DialogContent dividers>
            <DialogContentText color="textPrimary" id="eula-dialog-description" tabIndex={-1}>
               <Typography className={classes.hey}>Hey!</Typography>
               <Typography>
                  Novelly is currently in a development mode, this feature is going to be available soon. We
                  will let you know when it will be avaible!
               </Typography>
            </DialogContentText>
         </DialogContent>
         <DialogActions>
            <Button onClick={onClose} color="primary" variant="contained">
               Understood!
            </Button>
         </DialogActions>
      </Dialog>
   );
};

export default ModalEULA;
