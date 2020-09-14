import React from 'react';
import Link from 'next/link';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Card, CardActionArea, CardContent, Typography } from '@material-ui/core';

interface BookProps {
   title: string;
   description: string;
   createdAt: string;
   updatedAt: string;
}

const useStyles = makeStyles((theme: Theme) =>
   createStyles({
      root: {
         minWidth: 275,
         maxWidth: 280,
         '&:hover': {
            borderColor: theme.palette.primary.main,
            color: theme.palette.primary.main,
         },
      },
      title: {
         fontSize: 14,
      },
      pos: {
         marginBottom: 12,
      },
      top: {
         fontSize: '14px',
         marginTop: 12,
      },
   }),
);

const Book = ({ title, description, createdAt, updatedAt }: BookProps) => {
   const classes = useStyles();
   const shortDescription = description.length > 80 ? `${description.slice(0, 80)}...` : description;

   return (
      <Card className={classes.root} variant="outlined">
         <Link href="/editor">
            <CardActionArea>
               <CardContent>
                  <Typography variant="h5" component="h2">
                     {title}
                  </Typography>
                  <Typography className={classes.pos} color="textSecondary">
                     {createdAt}
                  </Typography>
                  <Typography variant="body2" component="p">
                     {shortDescription}
                  </Typography>
                  <Typography className={classes.top} color="textSecondary">
                     Last edited: {updatedAt}
                  </Typography>
               </CardContent>
            </CardActionArea>
         </Link>
      </Card>
   );
};

export default Book;
