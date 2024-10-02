import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../App.css';

function UpdateBookInfo() {
  const [book, setBook] = useState({
    title: '',
    isbn: '',
    author: '',
    description: '',
    published_date: '',
    publisher: '',
    genre: '',
    image_path: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const genres = [
    'Fiction', 'Non-Fiction', 'Science', 'Science Fiction', 'Fantasy', 
    'Biography', 'Mystery', 'History', 'Children', 'Self-Help', 'Romance'
  ];

  useEffect(() => {
    fetch(`http://localhost:5000/api/books/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch book details');
        }
        return response.json();
      })
      .then((data) => {
        setBook({
          title: data.title,
          isbn: data.isbn,
          author: data.author,
          description: data.description,
          published_date: data.published_date,
          publisher: data.publisher,
          genre: data.genre,
          image_path: data.image_path,
        });
        setLoading(false);
      })
      .catch((err) => {
        setError('Error fetching book details.');
        setLoading(false);
        toast.error('Failed to fetch book details.', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      });
  }, [id]);

  const onChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const data = {
      title: book.title,
      isbn: book.isbn,
      author: book.author,
      description: book.description,
      published_date: book.published_date,
      publisher: book.publisher,
      genre: book.genre,
      image_path: book.image_path,
    };

    fetch(`http://localhost:5000/api/books/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to update book');
        }
        return response.json();
      })
      .then(() => {
        toast.success('Book updated successfully!', {
          position: "top-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        setTimeout(() => navigate(`/show-book/${id}`), 2500);
      })
      .catch((err) => {
        setError('Error updating book details.');
        toast.error('Failed to update book details.', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      });
  };

  if (loading) {
    return <div className="container">Loading...</div>;
  }

  if (error) {
    return <div className="container">{error}</div>;
  }

  return (
    <div className="UpdateBookInfo">
      <ToastContainer />
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto mt-2">
            <Link to="/" className="btn btn-outline-warning float-left">
              Show Book List
            </Link>
          </div>
          <div className="col-md-8 m-auto text-center">
            <h1 className="display-4 text-warning">Edit Book</h1>
            <p className="lead text-white">Update the book's information below</p>
          </div>
        </div>

        <div className="col-md-8 m-auto">
          <form noValidate onSubmit={onSubmit} className="form-container bg-white p-4 rounded shadow">
            <div className="form-group">
              <label htmlFor="title" className="text-dark">Title</label>
              <input type="text" placeholder="Title of the Book" name="title" className="form-control" value={book.title} onChange={onChange} />
            </div>
            <br />

            <div className="form-group">
              <label htmlFor="isbn" className="text-dark">ISBN</label>
              <input type="text" placeholder="ISBN" name="isbn" className="form-control" value={book.isbn} onChange={onChange} />
            </div>
            <br />

            <div className="form-group">
              <label htmlFor="author" className="text-dark">Author</label>
              <input type="text" placeholder="Author" name="author" className="form-control" value={book.author} onChange={onChange} />
            </div>
            <br />

            <div className="form-group">
              <label htmlFor="description" className="text-dark">Description</label>
              <textarea placeholder="Description of the Book" name="description" className="form-control" value={book.description} onChange={onChange} />
            </div>
            <br />

            <div className="form-group">
              <label htmlFor="published_date" className="text-dark">Published Date</label>
              <input type="date" name="published_date" className="form-control" value={book.published_date ? book.published_date.slice(0, 10) : ''} onChange={onChange} />
            </div>
            <br />

            <div className="form-group">
              <label htmlFor="publisher" className="text-dark">Publisher</label>
              <input type="text" placeholder="Publisher of the Book" name="publisher" className="form-control" value={book.publisher} onChange={onChange} />
            </div>
            <br />

            <div className="form-group">
              <label htmlFor="genre" className="text-dark">Genre</label>
              <select name="genre" className="form-control" value={book.genre} onChange={onChange}>
                <option value="">Select Genre</option>
                {genres.map((g) => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
            </div>
            <br />
            
            <div className="form-group">
              <label htmlFor="image_path" className="text-dark">Image URL</label>
              <input type="text" placeholder="Enter Image URL" name="image_path" className="form-control" value={book.image_path} onChange={onChange}/>
            </div>
            <br />

            <button type="submit" className="btn btn-warning btn-lg btn-block">
              Update Book
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateBookInfo;