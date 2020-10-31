import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import {
   AppBar,
   Toolbar,
   IconButton,
   Button,
   DialogActions,
   DialogContent,
   DialogTitle,
   Dialog,
   TextField,
   Typography,
   useMediaQuery,
   CircularProgress,
} from '@material-ui/core';
import { CloseRounded as CloseIcon } from '@material-ui/icons';

import api from '@config/api';
import { useUser } from '@contexts/UserProvider';
import { useTheme } from '@contexts/ThemeProvider';

interface CreateSectionProps {
   bookId: string;
   open: boolean;
   onClose: () => void;
}

interface ISectionData {
   title: string;
}

const useStyles = makeStyles((theme: Theme) =>
   createStyles({
      avatar: {
         backgroundColor: theme.palette.primary.main,
      },
      content: {
         display: 'flex',
         flexDirection: 'column',
         '& > *:first-child': {
            marginTop: theme.spacing(2),
         },
      },
      appBar: {
         position: 'relative',
      },
      title: {
         marginLeft: theme.spacing(2),
         flex: 1,
      },
      spacing: {
         marginTop: theme.spacing(2),
      },
      loader: {
         color: 'inherit',
      },
   }),
);

const CreateSection = ({ bookId, open, onClose }: CreateSectionProps) => {
   const router = useRouter();
   const classes = useStyles();
   const { user } = useUser();
   const { muiTheme } = useTheme();
   const { register, handleSubmit } = useForm();
   const [loading, setLoading] = useState(false);
   const fullScreen = useMediaQuery(muiTheme.breakpoints.down('sm'));

   const onSubmit = (data: ISectionData) => {
      if (user) {
         setLoading(true);

         const finalData = {
            bookId,
            ...data,
         };

         api.post('/sections', {
            type: 'createSection',
            data: finalData,
         })
            .then((response) => {
               const sectionId = response.data.body.ref['@ref'].id;

               api.post('/contents', {
                  type: 'createContent',
                  data: {
                     sectionId,
                  },
               })
                  .then(() => {
                     if (router.asPath.startsWith('/book')) {
                        router.replace(`/editor/${sectionId}`);
                     } else {
                        router.replace(`/book/${bookId}`);
                     }
                     onClose();
                  })
                  .catch((error) => {
                     console.log(error);
                  });
            })
            .catch((error) => {
               console.log(error);
               setLoading(false);
            });
      }
   };

   return (
      <Dialog
         fullWidth
         fullScreen={fullScreen}
         onClose={() => onClose()}
         aria-labelledby="create-section"
         aria-describedby="create-section-content"
         open={open}>
         <form onSubmit={handleSubmit(onSubmit)}>
            {!fullScreen && <DialogTitle id="create-section">Create a new section</DialogTitle>}
            {fullScreen && (
               <AppBar className={classes.appBar}>
                  <Toolbar>
                     <IconButton edge="start" color="inherit" onClick={onClose} aria-label="close">
                        <CloseIcon />
                     </IconButton>
                     <Typography variant="h6" className={classes.title}>
                        Create a new section
                     </Typography>
                     <Button autoFocus color="inherit" type="submit">
                        {loading ? <CircularProgress size={18} className={classes.loader} /> : 'Create'}
                     </Button>
                  </Toolbar>
               </AppBar>
            )}
            <DialogContent id="create-section-content" className={classes.content}>
               <TextField required name="title" label="Title" variant="outlined" inputRef={register} />
            </DialogContent>
            {!fullScreen && (
               <DialogActions>
                  <Button onClick={onClose} color="inherit">
                     Cancel
                  </Button>
                  <Button disabled={loading} type="submit" color="primary" variant="contained">
                     {loading ? <CircularProgress size={18} className={classes.loader} /> : 'Create'}
                  </Button>
               </DialogActions>
            )}
         </form>
      </Dialog>
   );
};

export default CreateSection;
