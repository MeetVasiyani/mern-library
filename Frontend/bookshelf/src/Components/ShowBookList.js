import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import BookCard from "./BookCard";
import "../App.css";

function ShowBookList() {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [genre, setGenre] = useState("");
  const [loading, setLoading] = useState(true);
  const inputRef = useRef(null);
  const [tempGenre, setTempGenre] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/books")
      .then((response) => response.json())
      .then((data) => {
        setBooks(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error from ShowBookList:", error);
        setLoading(false);
      });
  }, []);

  const clearSearch = () => {
    setSearchTerm("");
    inputRef.current.focus();
  };

  const clearFilters = () => {
    setGenre("");
    setTempGenre("");
  };

  const filteredBooks = books.filter((book) => {
    const matchesSearch = book.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesGenre =
      genre === "" || book.genre.toLowerCase() === genre.toLowerCase();
    return matchesSearch && matchesGenre;
  });

  const bookList =
    filteredBooks.length === 0 ? (
      <div className="text-center mt-5">
        <h4>There is no book record!</h4>
      </div>
    ) : (
      filteredBooks.map((book) => <BookCard book={book} key={book._id} />)
    );

  const handleFilter = () => {
    setGenre(tempGenre);
  };

  return (
    <div className="ShowBookList">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <br />
            <h2 className="display-4 text-center">Books List</h2>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div className="input-group" style={{ width: "70%" }}>
                <input
                  type="text"
                  placeholder="Search by title"
                  value={searchTerm}
                  ref={inputRef}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="form-control"
                  aria-label="Search by title"
                />
                <button
                  className="btn btn-outline-danger"
                  onClick={clearSearch}
                  aria-label="Clear search"
                >
                  &times;
                </button>
              </div>
              <div className="d-flex align-items-center" style={{ width: "28%" }}>
                <select
                  className="form-select form-select-sm me-2"
                  value={tempGenre}
                  onChange={(e) => setTempGenre(e.target.value)}
                  style={{ width: "auto" }}
                >
                  <option value="">Genre</option>
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
                <button className="btn btn-primary btn-sm me-2" onClick={handleFilter}>
                  Filter
                </button>
                <button className="btn btn-secondary btn-sm" onClick={clearFilters}>
                  Clear
                </button>
              </div>
            </div>
          </div>
          <div className="col-md-11">
            <Link to="/create-book" className="btn btn-outline-warning float-right">
              + Add New Book
            </Link>
            <br />
            <br />
            <hr />
          </div>
        </div>
        <div className="row list">
          {loading ? (
            <div className="text-center mt-5">
              <h4>Loading...</h4>
            </div>
          ) : (
            bookList
          )}
        </div>
      </div>
    </div>
  );
}

export default ShowBookList