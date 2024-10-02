import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../App.css';

const CreateBook = () => {
  const navigate = useNavigate();
  const [book, setBook] = useState({
    title: "",
    isbn: "",
    author: "",
    description: "",
    published_date: "",
    publisher: "",
    genre: "",
    image_path: "",
  });

  const onChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(book),
      });

      if (response.ok) {
        setBook({
          title: "",
          isbn: "",
          author: "",
          description: "",
          published_date: "",
          publisher: "",
          genre: "",
          image_path: "",
        });
        toast.success('Book created successfully!', {
          position: "top-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        setTimeout(() => navigate("/"), 2500);
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Error creating book", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (error) {
      console.error("Error in CreateBook:", error);
      toast.error("Error creating book", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  return (
    <div className="CreateBook">
      <ToastContainer />
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto mt-2">
            <Link to="/" className="btn btn-outline-warning float-left">
              Show Book List
            </Link>
          </div>
          <div className="col-md-8 m-auto text-center">
            <h1 className="display-4 text-warning">Add New Book</h1>
            <p className="lead text-white">Fill out the form below to add a new book</p>
          </div>
        </div>

        <div className="col-md-8 m-auto">
          <form noValidate onSubmit={onSubmit} className="form-container bg-white p-4 rounded shadow">
            <div className="form-group">
              <label htmlFor="title" className="text-dark">Title</label>
              <input type="text" placeholder="Enter book title" name="title" className="form-control" value={book.title} onChange={onChange} required />
            </div>
            <br />

            <div className="form-group">
              <label htmlFor="isbn" className="text-dark">ISBN</label>
              <input type="text" placeholder="Enter ISBN" name="isbn" className="form-control" value={book.isbn} onChange={onChange} required />
            </div>
            <br />

            <div className="form-group">
              <label htmlFor="author" className="text-dark">Author</label>
              <input type="text" placeholder="Enter author name" name="author" className="form-control" value={book.author} onChange={onChange} required />
            </div>
            <br />

            <div className="form-group">
              <label htmlFor="description" className="text-dark">Description</label>
              <textarea placeholder="Enter book description" name="description" className="form-control" value={book.description} onChange={onChange} rows="3" required></textarea>
            </div>
            <br />

            <div className="form-group">
              <label htmlFor="published_date" className="text-dark">Published Date</label>
              <input type="date" name="published_date" className="form-control" value={book.published_date} onChange={onChange} required />
            </div>
            <br />

            <div className="form-group">
              <label htmlFor="publisher" className="text-dark">Publisher</label>
              <input type="text" placeholder="Enter publisher name" name="publisher" className="form-control" value={book.publisher} onChange={onChange} required />
            </div>
            <br />

            <div className="form-group">
              <label htmlFor="genre" className="text-dark">Genre</label>
              <select name="genre" className="form-control" value={book.genre} onChange={onChange} required>
                <option value="">Select genre</option>
                <option value="Fiction">Fiction</option>
                <option value="Non-Fiction">Non-Fiction</option>
                <option value="Science">Science</option>
                <option value="Science-Fiction">Science-Fiction</option>
                <option value="Fantasy">Fantasy</option>
                <option value="Biography">Biography</option>
                <option value="Mystery">Mystery</option>
                <option value="History">History</option>
                <option value="Children">Children</option>
                <option value="Self-Help">Self-Help</option>
                <option value="Romance">Romance</option>
              </select>
            </div>
            <br />

            <div className="form-group">
              <label htmlFor="image_path" className="text-dark">Image Path</label>
              <input type="text" placeholder="Enter image URL or path" name="image_path" className="form-control" value={book.image_path} onChange={onChange} />
            </div>
            <br />

            <button type="submit" className="btn btn-warning btn-lg btn-block">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateBook;