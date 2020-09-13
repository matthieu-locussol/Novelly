import React, { useState } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { SpeedDial, SpeedDialIcon, SpeedDialAction } from '@material-ui/lab';
import {
   EditRounded as EditIcon,
   CloseRounded as CloseIcon,
   AssignmentRounded as NotesIcon,
   PrintRounded as PrintIcon,
   BarChartRounded as StatsIcon,
   StoreMallDirectoryRounded as PlacesIcon,
   AssignmentIndRounded as CharactersIcon,
} from '@material-ui/icons';

const useStyles = makeStyles((theme: Theme) =>
   createStyles({
      root: {
         position: 'absolute',
         right: 0,
         bottom: 0,
         marginTop: theme.spacing(3),
      },
      menu: {
         position: 'absolute',
         '&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft': {
            bottom: theme.spacing(2),
            right: theme.spacing(2),
         },
      },
   }),
);

const actions = [
   { icon: <PrintIcon />, name: 'Print' },
   { icon: <StatsIcon />, name: 'Stats' },
   { icon: <NotesIcon />, name: 'Notes' },
   { icon: <PlacesIcon />, name: 'Places' },
   { icon: <CharactersIcon />, name: 'Characters' },
];

const WritingMenu = () => {
   const classes = useStyles();
   const [open, setOpen] = useState(false);

   const handleClose = () => {
      setOpen(false);
   };

   const handleOpen = () => {
      setOpen(true);
   };

   return (
      <div className={classes.root}>
         <SpeedDial
            ariaLabel="writing-menu"
            className={classes.menu}
            icon={<SpeedDialIcon icon={<EditIcon />} openIcon={<CloseIcon />} />}
            onClose={handleClose}
            onOpen={handleOpen}
            open={open}
            direction="up">
            {actions.map((action) => (
               <SpeedDialAction
                  key={action.name}
                  icon={action.icon}
                  tooltipTitle={action.name}
                  onClick={handleClose}
               />
            ))}
         </SpeedDial>
      </div>
   );
};

export default WritingMenu;
