import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import '../App.css';

function ShowBookDetails() {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:5000/api/books/${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setBook(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error from ShowBookDetails:', error);
        setError('Failed to load book details.');
        setLoading(false);
      });
  }, [id]);

  const onDeleteClick = (id) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      fetch(`http://localhost:5000/api/books/${id}`, { method: 'DELETE' })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          navigate('/');
        })
        .catch(error => console.error('Error from ShowBookDetails_deleteClick:', error));
    }
  };

  const BookItem = (
    <div className="book-details-card">
      <table className='table table-hover table-striped'>
        <tbody>
          <tr>
            <th scope='row'>1</th>
            <td><strong>Title</strong></td>
            <td>{book.title}</td>
          </tr>
          <tr>
            <th scope='row'>2</th>
            <td><strong>Author</strong></td>
            <td>{book.author}</td>
          </tr>
          <tr>
            <th scope='row'>3</th>
            <td><strong>ISBN</strong></td>
            <td>{book.isbn}</td>
          </tr>
          <tr>
            <th scope='row'>4</th>
            <td><strong>Publisher</strong></td>
            <td>{book.publisher}</td>
          </tr>
          <tr>
            <th scope='row'>5</th>
            <td><strong>Published Date</strong></td>
            <td>{new Date(book.published_date).toLocaleDateString()}</td>
          </tr>
          <tr>
            <th scope='row'>6</th>
            <td><strong>Description</strong></td>
            <td>{book.description}</td>
          </tr>
          <tr>
            <th scope='row'>7</th>
            <td><strong>Genre</strong></td>
            <td>{book.genre}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  return (
    <div className='ShowBookDetails'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-10 m-auto'>
            <br /><br />
            <Link to='/' className='btn btn-outline-warning float-left'>
              Show Book List
            </Link>
          </div>
          <br />
          <div className='col-md-8 m-auto'>
            <h1 className='display-4 text-center text-warning'>Book's Record</h1>
            <p className='lead text-center'>View Book's Information</p>
            <hr /><br />
          </div>

          {/* Book Image at the Top */}
          <div className='col-md-6 m-auto text-center'>
            <img 
              src={book.image_path} 
              className='book-image img-fluid mb-4' 
              alt={`${book.title} cover`} 
              style={{ maxHeight: '400px' }} 
            />
          </div>

          {/* Book Details Table */}
          <div className='col-md-8 m-auto'>
            {loading ? (
              <div className='text-center'>
                <h4>Loading...</h4>
              </div>
            ) : error ? (
              <div className='text-center'>
                <h4 className='text-danger'>{error}</h4>
              </div>
            ) : (
              BookItem
            )}
          </div>

          {!loading && !error && (
            <div className='col-md-8 m-auto mt-3'>
              <div className="row text-center">
                <div className='col-6'>
                  <button 
                    type='button' 
                    className='btn btn-outline-danger btn-lg btn-block' 
                    onClick={() => onDeleteClick(book._id)}>
                    Delete Book
                  </button>
                </div>
                <div className='col-6'>
                  <Link to={`/edit-book/${book._id}`} className='btn btn-outline-info btn-lg btn-block'>
                    Edit Book
                  </Link>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default ShowBookDetails;
