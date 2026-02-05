const express = require("express");
const bookService = require("../services/book.service");
const fs = require("fs")
const multer = require("multer");

/**
 * Book Service Routes
 * =========================================================================
 * Defines RESTful endpoints for the Book microservice.
 * Handles book catalog management, image uploads, and search queries.
 * 
 * Database: Uses 'book_db' for staff-facing operations and search.
 * Authentication: Relies on Gateway for JWT validation.
 */

// Multer configuration for book cover image uploads
const upload = multer({
  dest: "images/"
});

const mysql2 = require("mysql2")

/**
 * Connection pool specifically for staff-related legacy queries.
 * @type {Pool}
 */
const staffPool = mysql2.createPool({
  host: "localhost",
  port: "3306",
  user: "bookstack",
  database: "book_db",
  password: "bookstack"
})

const router = express.Router();

// --- Core API Endpoints ---

/**
 * GET /copy
 * Retrieves the remaining copy count for a specific book.
 * Query Param: bookId
 */
router.get("/copy", (req, res) => {
  const bookId = req.query.bookId;
  const sql = `
    SELECT
      number_of_copies_remaining
    FROM book_table
    WHERE
      book_id=?
  `;

  const values = [
    bookId
  ];

  staffPool.query(sql, values, (error, rows) => {
    if (error) {
      console.error(error);
      return res.sendStatus(500);
    }
    res.status(200).send(rows[0].number_of_copies_remaining);
  });
})

/**
 * POST /bookFromId
 * Retrieves detailed book metadata for a given ID.
 * Body: { bookId }
 */
router.post("/bookFromId", (request, res) => {
  const { bookId } = request.body;

  const sql = `
    SELECT
      book_id,
      isbn,
      title,
      author,
      description,
      book_image,
      publisher,
      number_of_copies,
      number_of_copies_remaining
    FROM book_table
    WHERE
      book_id=?
    LIMIT 5
  `;

  const values = [
    bookId
  ];

  staffPool.query(sql, values, (error, rows) => {
    if (error) {
      console.error(error);
      return res.sendStatus(500);
    }

    // Map database snake_case to frontend-friendly camelCase
    const mapped = rows.map(b => ({
      bookId: b.book_id,
      isbn: b.isbn,
      title: b.title,
      author: b.author,
      description: b.description,
      bookImage: b.book_image,
      publisher: b.publisher,
      numberOfCopies: b.number_of_copies,
      numberOfCopiesRemaining: b.number_of_copies_remaining
    }));

    res.status(200).send(mapped);
  });
});

/**
 * POST /id
 * Short-form retrieval of remaining copies.
 */
router.post("/id", (req, res) => {
  const { bookId } = req.body;
  const sql = "select number_of_copies_remaining from book_table where book_id = ?"

  staffPool.query(sql, [bookId], (error, data) => {
    if (error) return res.sendStatus(500);
    res.send({
      noOfCopiesRemaining: data[0].number_of_copies_remaining
    })
  })
})

/**
 * PUT /id
 * Updates the remaining copy count (used during rent/return flows).
 */
router.put("/id", (req, res) => {
  const { bookId, noOfCopiesRemaining } = req.body;
  const sql = "update book_table set number_of_copies_remaining = ? where book_id = ?"

  staffPool.query(sql, [noOfCopiesRemaining, bookId], (error, data) => {
    if (error) {
      res.sendStatus(500)
    } else {
      res.sendStatus(200)
    }
  })
})

/**
 * POST /search
 * Multi-field fuzzy search for the book catalog.
 */
router.post("/search", (req, res) => {
  const { search } = req.body;
  const sql = `
    SELECT
      book_id,
      isbn,
      title,
      author,
      description,
      book_image,
      publisher,
      number_of_copies,
      number_of_copies_remaining
    FROM book_table
    WHERE
      title LIKE ?
      OR isbn LIKE ?
      OR author LIKE ?
      OR publisher LIKE ?
    LIMIT 5
  `;

  const values = [
    `%${search}%`,
    `${search}%`,
    `%${search}%`,
    `%${search}%`
  ];

  staffPool.query(sql, values, (error, rows) => {
    if (error) {
      console.error(error);
      return res.sendStatus(500);
    }

    const mapped = rows.map(b => ({
      bookId: b.book_id,
      isbn: b.isbn,
      title: b.title,
      author: b.author,
      description: b.description,
      bookImage: b.book_image,
      publisher: b.publisher,
      numberOfCopies: b.number_of_copies,
      numberOfCopiesRemaining: b.number_of_copies_remaining
    }));

    res.status(200).send(mapped);
  });
});

/**
 * POST /add
 * Adds a new book to the library, including image file processing.
 * Expects multipart/form-data with an "imageFile" field.
 */
router.post("/add", upload.single("imageFile"), (request, response) => {
  const {
    title,
    author,
    publisher,
    isbn,
    copies,
    description
  } = request.body;

  if (!request.file) {
    return response.status(400).send({
      status: "error",
      message: "Book image is required"
    });
  }

  // Rename and move the uploaded file to the static images directory
  const imageFileName = request.file.filename + ".jpg";

  fs.rename(request.file.path, "images/" + imageFileName, (error) => {
    if (error) return response.sendStatus(500);

    const sql = `
      INSERT INTO book_table (
        isbn,
        title,
        author,
        description,
        book_image,
        publisher,
        action,
        action_date,
        number_of_copies,
        number_of_copies_remaining
      ) VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), ?, ?)
    `;

    const values = [
      isbn,
      title,
      author,
      description,
      imageFileName,
      publisher,
      "CREATED",
      copies,
      copies
    ];

    staffPool.query(sql, values, (error, result) => {
      if (error) {
        console.error(error);
        return response.status(500).send({
          status: "error",
          message: "Failed to add book"
        });
      }

      response.status(201).send({
        status: "success",
        bookId: result.insertId
      });
    });
  })
});

/**
 * GET /all
 * Retrieves the entire book collection for administrative management.
 */
router.get("/all", (request, response) => {
  const sql = "select * from book_table"

  staffPool.query(sql, (error, data) => {
    if (error) return response.sendStatus(500);

    const mappedData = data.map(b => ({
      action: b.action,
      actionDate: b.action_date,
      author: b.author,
      bookId: b.book_id,
      bookImage: b.book_image,
      createdAt: b.created_at,
      description: b.description,
      isbn: b.isbn,
      numberOfCopies: b.number_of_copies,
      numberOfCopiesRemaining: b.number_of_copies_remaining,
      publisher: b.publisher,
      title: b.title,
      updatedAt: b.updated_at
    }));

    response.status(200).send(mappedData);
  });
});

// --- High-Level Service Methods (Abstraction via bookService) ---

const pool = require("../db/pool");

/**
 * GET /books
 * Proxies to bookService.getAllBooks() for member-side listing.
 */
router.get("/books", async (req, res) => {
  try {
    const books = await bookService.getAllBooks();
    res.json(books);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching books" });
  }
});

/**
 * POST /liked-books
 * Retrieves details for books stored in user's browser likes.
 */
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

/**
 * POST /recommended-books
 * Retrieves featured books for the home screen.
 */
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

/**
 * POST /trending-books
 * Retrieves trending content.
 */
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

/**
 * GET /new-arrived-books
 * Top 10 newest books.
 */
router.get("/new-arrived-books", async (req, res) => {
  try {
    const books = await bookService.getNewArrivedBooks();
    res.json(books);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching books" });
  }
});

// --- "View All" Page Endpoints ---

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

// --- Book Details & Discovery ---

/**
 * GET /book/:bookId
 * Full record for the Book Details page.
 */
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

/**
 * POST /might-liked-books/:bookId
 * Similar books or personalized recommendations.
 */
router.post("/might-liked-books/:bookId", async (req, res) => {
  try {
    const { bookId } = req.params;
    const mightLikeBookIds = req.body;
    const books = await bookService.getMightAlsoLikedBooks(mightLikeBookIds, bookId);
    res.json(books);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching books" });
  }
});

/**
 * POST /names-by-id
 * Batch retrieval of titles.
 */
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

/**
 * GET /allbooks
 * Legacy retrieval of all raw book records.
 */
router.get('/allbooks', (req, res) => {
  try {
    const sql = `SELECT * FROM book_table`
    pool.query(sql, (error, data) => {
      if (data) {
        res.json(data)
      }
      else {
        res.send(error)
      }
    })
  } catch (Error) {
    res.send(Error)
  }
})

module.exports = router;

