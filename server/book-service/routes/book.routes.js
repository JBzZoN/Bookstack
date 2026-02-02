const express = require("express");
const bookService = require("../services/book.service");
const fs = require("fs")

const multer = require("multer");

const upload = multer({
  dest: "images/"
});

const mysql2 = require("mysql2")
const staffPool = mysql2.createPool({
  host: "localhost",
  port: "3306",
  user: "bookstack",
  database: "book_db",
  password: "bookstack"
})

const router = express.Router();

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
    console.log(rows)
    res.status(200).send(rows[0].number_of_copies_remaining);
  });
})

router.post("/bookFromId", (request, res) => {

  const {bookId} = request.body;

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

    // camelCase mapping (important for frontend)
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

router.post("/id", (req, res) => {
  const {bookId} = req.body;
  const sql = "select number_of_copies_remaining from book_table where book_id = ?"

  staffPool.query(sql, [bookId], (error, data) => {
    res.send({
      noOfCopiesRemaining: data[0].number_of_copies_remaining
    })
  })
})

router.put("/id", (req, res) => {
  const {bookId, noOfCopiesRemaining} = req.body;
  const sql = "update book_table set number_of_copies_remaining = ? where book_id = ?"

  staffPool.query(sql, [noOfCopiesRemaining, bookId], (error, data) => {
    if(error) {
      res.sendStatus(500)
    }else {
      res.sendStatus(200)
    }
  })
})

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
    `%${search}%`,   // title contains
    `${search}%`,    // isbn starts with
    `%${search}%`,   // author contains
    `%${search}%`    // publisher contains
  ];

  staffPool.query(sql, values, (error, rows) => {
    if (error) {
      console.error(error);
      return res.sendStatus(500);
    }

    // camelCase mapping (important for frontend)
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

  // ONLY store filename in DB
  const imageFileName = request.file.filename + ".jpg";

  fs.rename(request.file.path, "images/" + imageFileName, (error) => {
    if(error) 
      response.sendStatus(500)

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
    imageFileName,          // ✅ filename only
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


router.get("/all", (request, response) => {
  const sql = "select * from book_table"

  staffPool.query(sql, (error, data) => {
    if (error) {
      return response.sendStatus(500);
    }

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

const pool=require("../db/pool")

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

router.get('/allbooks', (req, res) => {
  try{
    const sql = `SELECT * FROM book_table`
    pool.query(sql, (error, data) => {
        if(data){
          console.log(data)
          res.json(data)
        }
        else{
          res.send(error)
        }
      
      })
    }catch(Error){
      res.send(Error)
    } 
})
module.exports = router;
