import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Avatar, List, ListItem, ListItemAvatar, ListItemText, DialogTitle, Dialog } from '@material-ui/core';
import { NewReleasesRounded as FeatureIcon, BugReportRounded as BugIcon } from '@material-ui/icons';

interface ModalTypeProps {
   open: boolean;
   onClose: () => void;
   setValue: (value: string) => void;
}

export const REPORT_TYPES = [
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
   }),
);

const ModalType = ({ open, onClose, setValue }: ModalTypeProps) => {
   const classes = useStyles();

   const handleListItemClick = (value: string) => {
      setValue(value);
      onClose();
   };

   return (
      <Dialog onClose={() => onClose()} aria-labelledby="report-type" open={open}>
         <DialogTitle id="report-type">What would you want to do?</DialogTitle>
         <List>
            {REPORT_TYPES.map((type) => (
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

export default ModalType;
