import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const BookCard = ({ book }) => {
  if (!book || !book._id || !book.title || !book.author) {
    return <div className='card-container'>Invalid book data.</div>;
  }

  return (
    <Link to={`/show-book/${book._id}`} className='card-link'>
      <div className='card-container p-2'>
        <img 
          src={book.image_path || 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d'} 
          alt={`Cover of the book: ${book.title}`} 
          height={200} 
          className='book-image animated-book-image' // Added 'animated-book-image' class
        />
        <div className='desc'>
          <h2 className='book-title'>{book.title}</h2>
          <h3 className='book-author'>{book.author}</h3>
          <p className='book-description'>{book.description}</p>
          {book.genre && (
            <span className='badge bg-secondary'>{book.genre}</span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default BookCard;