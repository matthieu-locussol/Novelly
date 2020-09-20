import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import {
   Avatar,
   Button,
   List,
   ListItem,
   ListItemAvatar,
   ListItemText,
   DialogTitle,
   Dialog,
   DialogContent,
   DialogActions,
} from '@material-ui/core';
import { NewReleasesRounded as FeatureIcon, BugReportRounded as BugIcon } from '@material-ui/icons';

interface ModalTypeProps {
   open: boolean;
   onClose: () => void;
   setValue: (value: string) => void;
}

export const actions = [
   {
      name: 'bug',
      title: 'Report a bug',
      icon: <BugIcon />,
   },
   {
      name: 'feature',
      title: 'Request a feature',
      icon: <FeatureIcon />,
   },
];

const useStyles = makeStyles((theme: Theme) =>
   createStyles({
      avatar: {
         color: theme.palette.primary.contrastText,
         backgroundColor: theme.palette.primary.main,
      },
      content: {
         padding: 0,
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
         <DialogContent className={classes.content}>
            <List>
               {actions.map((action) => (
                  <ListItem button onClick={() => handleListItemClick(action.name)} key={action.name}>
                     <ListItemAvatar>
                        <Avatar className={classes.avatar}>{action.icon}</Avatar>
                     </ListItemAvatar>
                     <ListItemText primary={action.title} />
                  </ListItem>
               ))}
            </List>
         </DialogContent>
         <DialogActions>
            <Button onClick={onClose} color="primary">
               Cancel
            </Button>
         </DialogActions>
      </Dialog>
   );
};

export default ModalType;
