import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import HeaderEditor from '@components/Layout/HeaderEditor';

interface LayoutEditorProps {
   children: any;
}

const useStyles = makeStyles((theme: Theme) =>
   createStyles({
      children: {
         marginLeft: theme.spacing(8),
      },
   }),
);

const LayoutEditor = ({ children }: LayoutEditorProps) => {
   const classes = useStyles();

   return (
      <>
         <HeaderEditor />
         <div className={classes.children}>{children}</div>
      </>
   );
};

export default LayoutEditor;
