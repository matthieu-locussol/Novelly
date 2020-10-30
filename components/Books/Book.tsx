import React from 'react';
import Link from 'next/link';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Card, CardActionArea, CardContent, Divider, Typography } from '@material-ui/core';
import { LockRounded as PrivateIcon } from '@material-ui/icons';
import BookDto from '@datatypes/Book';
import { formatDate } from '@config/utils';

interface BookProps {
   book: BookDto;
}

const useStyles = makeStyles((theme: Theme) =>
   createStyles({
      root: {
         width: 280,
         height: 195,
         '&:hover': {
            borderColor: theme.palette.primary.main,
            color: theme.palette.primary.main,
         },
      },
      title: {
         display: 'flex',
         alignItems: 'center',
         justifyContent: 'space-between',
      },
      content: {
         height: 195,
         display: 'flex',
         flexDirection: 'column',
      },
      pos: {
         marginBottom: 12,
      },
      top: {
         fontSize: '14px',
         marginTop: 12,
      },
      divider: {
         display: 'flex',
         marginTop: 'auto',
         background: 'none',
      },
      noDescription: {
         color: theme.palette.text.secondary,
         fontStyle: 'italic',
      },
   }),
);

const Book = ({ book }: BookProps) => {
   const classes = useStyles();

   const shortTitle = book.title.length > 30 ? `${book.title.slice(0, 30)}...` : book.title;
   const shortDescription =
      book.description.length > 80 ? `${book.description.slice(0, 80)}...` : book.description;

   return (
      <Link href="/book/[bookId]" as={`/book/${book.id}`}>
         <Card className={classes.root} variant="outlined">
            <CardActionArea>
               <CardContent className={classes.content}>
                  <Typography variant="h5" component="h2" className={classes.title}>
                     {shortTitle}
                     {book.private && <PrivateIcon />}
                  </Typography>
                  {shortDescription ? (
                     <Typography variant="body2" component="p">
                        {shortDescription}
                     </Typography>
                  ) : (
                     <Typography variant="body2" component="p" className={classes.noDescription}>
                        No description yet.
                     </Typography>
                  )}
                  <Divider className={classes.divider} />
                  <Typography className={classes.top} color="textSecondary">
                     Created on: {formatDate(book.createdAt)}
                  </Typography>
               </CardContent>
            </CardActionArea>
         </Card>
      </Link>
   );
};

export default Book;
