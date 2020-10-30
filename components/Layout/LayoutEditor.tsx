import React, { useState, useEffect } from 'react';
import { useMediaQuery } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import HeaderMobile from '@components/Layout/HeaderMobile';
import HeaderEditor from '@components/Layout/HeaderEditor';
import { useTheme } from '@contexts/ThemeProvider';
import api from '@config/api';

const useStyles = makeStyles((theme: Theme) =>
   createStyles({
      desktop: {
         marginLeft: theme.spacing(8),
      },
   }),
);

interface LayoutEditorProps {
   bookId: string | undefined;
   children: any;
   callback?: any;
}

const LayoutEditor = ({ bookId, children, callback }: LayoutEditorProps) => {
   const classes = useStyles();
   const { muiTheme } = useTheme();
   const desktop = useMediaQuery(muiTheme.breakpoints.up('sm'));
   const [sections, setSections] = useState<any[] | undefined>(undefined);

   useEffect(() => {
      if (bookId) {
         api.post('/sections', {
            type: 'sectionsByBookId',
            bookId,
         })
            .then((sections) => {
               setSections(sections.data.body);
            })
            .catch((error) => {
               console.log(error);
            });
      }
   }, [bookId]);

   return (
      <>
         {desktop ? (
            <HeaderEditor sections={sections} callback={callback} />
         ) : (
            <HeaderMobile sections={sections} />
         )}
         <div className={desktop ? classes.desktop : ''}>{children}</div>
      </>
   );
};

export default LayoutEditor;
