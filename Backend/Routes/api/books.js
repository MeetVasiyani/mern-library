const express = require("express");
const router = express.Router();
const Book = require('../../Models/Book');

router.get("/", (req, res) => {
  const { sortBy = 'title', order = 'asc' } = req.query;

  Book.find()
    .then((books) => {
      res.json(books);
    })
    .catch((err) => {
      res.status(404).json({ nobooksfound: "No books found" });
    });
});

router.get("/:id", (req, res) => {
  Book.findById(req.params.id)
    .then((book) => {
      if (!book) {
        return res.status(404).json({ nobooksfound: "No book found" });
      }
      res.json(book);
    })
    .catch((err) => {
      res.status(404).json({ nobooksfound: "No book found" });
    });
});

router.post("/", (req, res) => {
  Book.create(req.body)
    .then((book) => {
      res.json({ msg: "Book added successfully", book });
    })
    .catch((err) => {
      res.status(400).json({ error: "Unable to add this book" });
    });
});

router.patch("/:id", (req, res) => {
  Book.findByIdAndUpdate(req.params.id, req.body, { new: true }) // Returns the updated document
    .then((book) => {
      if (!book) {
        return res.status(404).json({ error: "No such book found" });
      }
      res.json({ msg: "Updated Successfully", book });
    })
    .catch((err) => {
      res.status(400).json({ error: "Unable to update the Database" });
    });
});


router.delete("/:id", (req, res) => {
  Book.findByIdAndDelete(req.params.id)
    .then((book) => {
      if (!book) {
        return res.status(404).json({ error: "No such book found" });
      }
      res.json({ msg: "Book entry deleted successfully" });
    })
    .catch((err) => {
      res.status(404).json({ error: "No such book found" });
    });
});

module.exports = router;
