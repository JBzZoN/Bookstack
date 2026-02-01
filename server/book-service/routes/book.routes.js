const express = require("express");
const bookService = require("../services/book.service");

const router = express.Router();

router.get("/books", async (req, res) => {
  try {
    const books = await bookService.getAllBooks();
    res.json(books);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching books" });
  }
});

router.post("/liked-books", async (req, res) => {
  try {
    const likedBookIds = req.body;
    const books = await bookService.getAllLikedBooks(likedBookIds);
    res.json(books);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching books" });
  }
});

router.post("/recommended-books", async (req, res) => {
  try {
    const recommendedBookIds = req.body;
    const books = await bookService.getRecommendedBooks(recommendedBookIds);
    res.json(books);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching books" });
  }
});

router.post("/trending-books", async (req, res) => {
  try {
    const trendingBooksIds = req.body;
    const books = await bookService.getTrendingBooks(trendingBooksIds);
    res.json(books);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching books" });
  }
});

router.get("/new-arrived-books", async (req, res) => {
  try {
    const books = await bookService.getNewArrivedBooks();
    res.json(books);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching books" });
  }
});

router.post("/all-recommended-books", async (req, res) => {
  try {
    const recommendedBookIds = req.body;
    const books = await bookService.getAllRecommendedBooks(recommendedBookIds);
    res.json(books);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching books" });
  }
});

router.post("/all-trending-books", async (req, res) => {
  try {
    const trendingBooksIds = req.body;
    const books = await bookService.getAllTrendingBooks(trendingBooksIds);
    res.json(books);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching books" });
  }
});

router.get("/all-new-arrived-books", async (req, res) => {
  try {
    const books = await bookService.getAllNewArrivedBooks();
    res.json(books);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching books" });
  }
});

router.get("/book/:bookId", async (req, res) => {
  try {
    const bookId = req.params.bookId;
    const books = await bookService.getBookDetails(bookId);
    res.json(books);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching books" });
  }
});

router.post("/might-liked-books/:bookId", async (req, res) => {
  try {
    const { bookId } = req.params;
    const mightLikeBookIds = req.body;
    const books = await bookService.getMightAlsoLikedBooks(mightLikeBookIds,bookId);
    res.json(books);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching books" });
  }
});

router.post("/names-by-id", async (req, res) => {
  try {
    const bookIds = req.body;
    const books = await bookService.getBookNamesByIds(bookIds);
    res.json(books);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching books" });
  }
});

module.exports = router;
