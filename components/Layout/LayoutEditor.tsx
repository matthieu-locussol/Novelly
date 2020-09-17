import React, { useState, useEffect } from 'react';
import { useMediaQuery } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import HeaderMobile from '@components/Layout/HeaderMobile';
import HeaderEditor from '@components/Layout/HeaderEditor';
import { useTheme } from '@contexts/ThemeProvider';

//@ts-ignore
const getSections = async (bookId: number) => [
   { link: '/', name: 'Section  1' },
   { link: '/', name: 'Section  2' },
   { link: '/', name: 'Section  3' },
   { link: '/', name: 'Section  4' },
   { link: '/', name: 'Section  5' },
];

const useStyles = makeStyles((theme: Theme) =>
   createStyles({
      desktop: {
         marginLeft: theme.spacing(8),
      },
   }),
);

interface LayoutEditorProps {
   bookId: number;
   children: any;
   callback?: any;
}

const LayoutEditor = ({ bookId, children, callback }: LayoutEditorProps) => {
   const classes = useStyles();
   const { muiTheme } = useTheme();
   const desktop = useMediaQuery(muiTheme.breakpoints.up('sm'));
   const [sections, setSections] = useState<any[] | undefined>(undefined);

   useEffect(() => {
      getSections(bookId)
         .then((sections) => {
            setSections(sections);
         })
         .catch((error) => {
            console.log(error);
         });
   }, []);

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
