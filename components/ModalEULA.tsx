import React, { useRef, useEffect } from 'react';
import {
   Button,
   Dialog,
   DialogActions,
   DialogContent,
   DialogContentText,
   DialogTitle,
   useMediaQuery,
} from '@material-ui/core';

import { useTheme } from '@contexts/ThemeProvider';

interface ModalEULAProps {
   open: boolean;
   onClose: any;
}

const ModalEULA = ({ open, onClose }: ModalEULAProps) => {
   const { muiTheme } = useTheme();
   const descriptionElementRef = useRef<HTMLElement>(null);
   const fullScreen = useMediaQuery(muiTheme.breakpoints.down('sm'));

   useEffect(() => {
      if (open) {
         const { current: descriptionElement } = descriptionElementRef;
         if (descriptionElement !== null) {
            descriptionElement.focus();
         }
      }
   }, [open]);

   return (
      <Dialog
         open={open}
         onClose={onClose}
         scroll="paper"
         fullScreen={fullScreen}
         aria-labelledby="eula-dialog-title"
         aria-describedby="eula-dialog-description">
         <DialogTitle id="eula-dialog-title">End-User Licence Agreement</DialogTitle>
         <DialogContent dividers>
            <DialogContentText
               color="textPrimary"
               id="eula-dialog-description"
               ref={descriptionElementRef}
               tabIndex={-1}>
               {[...new Array(50)]
                  .map(
                     () => `Cras mattis consectetur purus sit amet fermentum.
Cras justo odio, dapibus ac facilisis in, egestas eget quam.
Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`,
                  )
                  .join('\n')}
            </DialogContentText>
         </DialogContent>
         <DialogActions>
            <Button onClick={onClose} color="primary" variant="outlined">
               Close
            </Button>
         </DialogActions>
      </Dialog>
   );
};

export default ModalEULA;
