import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import {
   Box,
   IconButton,
   Avatar,
   Button,
   List,
   ListItem,
   ListItemAvatar,
   ListItemText,
   DialogContent,
   DialogTitle,
   Dialog,
   TextField,
   FormControlLabel,
   Checkbox,
   Typography,
} from '@material-ui/core';
import { NewReleasesRounded as FeatureIcon, BugReportRounded as BugIcon } from '@material-ui/icons';

interface ModalProps {
   open: boolean;
   onClose: () => void;
}

interface ModalTypeProps extends ModalProps {
   setValue: (value: string) => void;
}

interface ModalFormProps extends ModalProps {
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

const types = [
   {
      name: 'bug',
      title: 'Report a bug',
      icon: <BugIcon />,
      description:
         'Novelly is still in a development stage, so you might experience some issues while using it. If so, please help us improving the website by reporting bugs!',
   },
   {
      name: 'feature',
      title: 'Request a feature',
      icon: <FeatureIcon />,
      description:
         'Is there a feature you want us to add to Novelly? If so, please help us improving the website by submitting your suggestion!',
   },
];

const useStyles = makeStyles((theme: Theme) =>
   createStyles({
      avatar: {
         backgroundColor: theme.palette.primary.main,
      },
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

const ModalType = ({ open, onClose, setValue }: ModalTypeProps) => {
   const classes = useStyles();

   const handleListItemClick = (value: string) => {
      setValue(value);
      onClose();
   };

   return (
      <Dialog onClose={() => onClose()} aria-labelledby="simple-dialog-title" open={open}>
         <DialogTitle id="simple-dialog-title">What would you want to do?</DialogTitle>
         <List>
            {types.map((type) => (
               <ListItem button onClick={() => handleListItemClick(type.name)} key={type.name}>
                  <ListItemAvatar>
                     <Avatar className={classes.avatar}>{type.icon}</Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={type.title} />
               </ListItem>
            ))}
         </List>
      </Dialog>
   );
};

const ModalForm = ({ open, onClose, type }: ModalFormProps) => {
   const classes = useStyles();
   const { register, handleSubmit } = useForm();
   const report = types.find((t) => t.name === type);

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

const BugReport = () => {
   const [openType, setOpenType] = useState(false);
   const [openForm, setOpenForm] = useState(false);
   const [type, setType] = useState('');

   const handleClickOpen = () => {
      setOpenType(true);
   };

   const handleCloseType = () => {
      setOpenType(false);
   };

   const handleCloseForm = () => {
      setOpenForm(false);
   };

   const setSelectedType = (type: string) => {
      setType(type);
      setOpenType(false);
      setOpenForm(true);
   };

   return (
      <>
         <IconButton color="inherit" onClick={handleClickOpen}>
            <BugIcon />
         </IconButton>
         <ModalType open={openType} onClose={handleCloseType} setValue={setSelectedType} />
         <ModalForm open={openForm} onClose={handleCloseForm} type={type} />
      </>
   );
};

export default BugReport;
