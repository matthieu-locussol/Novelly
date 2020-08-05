import React from 'react';

import Paper from '@material-ui/core/Paper';

type BookPreviewProps = {
   title: string;
   summary: string;
};

const BookPreview = ({ title, summary }: BookPreviewProps) => {
   const description = summary.length > 100 ? `${summary.substring(0, 100)}...` : summary;

   return (
      <div className="book-preview">
         <Paper elevation={0}>
            <h2>{title}</h2>
            <p>{description}</p>
         </Paper>
      </div>
   );
};

export default BookPreview;
