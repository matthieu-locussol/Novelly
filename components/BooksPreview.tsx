import React from 'react';

import BookPreview from '@components/BookPreview';

type Book = {
   title: string;
   summary: string;
};

type BooksPreviewProps = {
   booksInfos: Book[];
};

const BooksPreview = ({ booksInfos }: BooksPreviewProps) => (
   <div className="books-preview">
      {booksInfos.map((book, id) => (
         <BookPreview key={id} title={book.title} summary={book.summary} />
      ))}
   </div>
);

export default BooksPreview;
