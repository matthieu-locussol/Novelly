import React from 'react';
import { useForm } from 'react-hook-form';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Button, DialogContent, DialogTitle, Dialog, TextField, Typography } from '@material-ui/core';

import { REPORT_TYPES } from '@components/BugReport/ModalType';

interface ModalFormProps {
   open: boolean;
   onClose: () => void;
   type: string;
}

interface IBugReportData {
   bugSummary: string;
   bugDescription: string;
}

interface IFeatureRequestData {
   featureSummary: string;
   featureDescription: string;
}

const useStyles = makeStyles((theme: Theme) =>
   createStyles({
      form: {
         display: 'flex',
         flexDirection: 'column',
         '& > *': {
            marginTop: theme.spacing(2),
         },
         '& > *:last-child': {
            marginBottom: theme.spacing(2),
         },
      },
   }),
);

const ModalForm = ({ open, onClose, type }: ModalFormProps) => {
   const classes = useStyles();
   const { register, handleSubmit } = useForm();
   const report = REPORT_TYPES.find((t) => t.name === type);

   const onSubmit = (data: IBugReportData | IFeatureRequestData) => {
      console.log(data);
   };

   return (
      <Dialog onClose={() => onClose()} aria-labelledby="simple-dialog-title" open={open}>
         <DialogTitle id="simple-dialog-title">{report?.title}</DialogTitle>
         <DialogContent>
            <Typography>{report?.description}</Typography>
            {type === 'bug' && (
               <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
                  <TextField
                     required
                     name="bugSummary"
                     label="Summary"
                     helperText="Provide a summary of the bug."
                     variant="outlined"
                     inputRef={register}
                  />
                  <TextField
                     required
                     name="bugDescription"
                     label="Description"
                     helperText="Provide a full description of the bug."
                     multiline
                     rows={4}
                     variant="outlined"
                     inputRef={register}
                  />
                  <Button type="submit" color="primary" variant="contained">
                     Submit
                  </Button>
               </form>
            )}
            {type === 'feature' && (
               <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
                  <TextField
                     required
                     name="featureSummary"
                     label="Name"
                     helperText="Provide a concise name for this feature."
                     variant="outlined"
                     inputRef={register}
                  />
                  <TextField
                     required
                     name="featureDescription"
                     label="Description"
                     helperText="Provide a detailed description of your suggestion."
                     multiline
                     rows={4}
                     variant="outlined"
                     inputRef={register}
                  />
                  <Button type="submit" color="primary" variant="contained">
                     Submit
                  </Button>
               </form>
            )}
         </DialogContent>
      </Dialog>
   );
};

export default ModalForm;
