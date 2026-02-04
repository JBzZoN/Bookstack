const express = require("express");
const bookService = require("../services/book.service");
const fs = require("fs")

const pool = require("../db/pool")

const multer = require("multer");

const upload = multer({
  dest: "images/"
});

const router = express.Router();

router.get("/copy", (req, res) => {
  const bookId = req.query.bookId;
  const sql = `
    SELECT
      number_of_copies_remaining
    FROM book_table
    WHERE
      book_id=?const pool=require("../db/pool")
  `;

  const values = [
    bookId
  ];

  pool.query(sql, values, (error, rows) => {
    if (error) {
      console.error(error);
      return res.sendStatus(500);
    }
    console.log(rows)
    res.status(200).send(rows[0].number_of_copies_remaining);
  });
})

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

  pool.query(sql, values, (error, rows) => {
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
  const { bookId } = req.body; const pool = require("../db/pool")
  const sql = "select number_of_copies_remaining from book_table where book_id = ?"

  pool.query(sql, [bookId], (error, data) => {
    res.send({
      noOfCopiesRemaining: data[0].number_of_copies_remaining
    })
  })
})

// Create notification table if not exists in bookstack schema
pool.query(`CREATE TABLE IF NOT EXISTS bookstack.notification_table (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  book_id INT,
  email VARCHAR(255),
  requested_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`, (err) => {
  if (err) console.error("Failed to create notification table", err);
});

router.post("/notify", (req, res) => {
  const { userId, bookId, email } = req.body;

  // Check if already notified
  pool.query("SELECT * FROM bookstack.notification_table WHERE user_id = ? AND book_id = ?", [userId, bookId], (err, rows) => {
    if (err) return res.sendStatus(500);
    if (rows.length > 0) return res.status(400).send("You already subscribed for notification.");

    const sql = "INSERT INTO bookstack.notification_table (user_id, book_id, email) VALUES (?, ?, ?)";
    pool.query(sql, [userId, bookId, email], (error, result) => {
      if (error) {
        console.error(error);
        res.sendStatus(500);
      } else {
        res.status(200).send("Notification enabled. We will email you when available.");
      }
    });
  });
});

router.put("/id", (req, res) => {
  const { bookId, noOfCopiesRemaining } = req.body;
  const sql = "update book_table set number_of_copies_remaining = ? where book_id = ?"

  pool.query(sql, [noOfCopiesRemaining, bookId], (error, data) => {
    if (error) {
      res.sendStatus(500)
    } else {

      // Check for notifications
      if (noOfCopiesRemaining > 0) {
        const notifySql = "SELECT * FROM bookstack.notification_table WHERE book_id = ?";
        pool.query(notifySql, [bookId], (nErr, nRows) => {
          if (!nErr && nRows.length > 0) {
            nRows.forEach(row => {
              console.log(`[MAIL SERVICE] Sending email to ${row.email} for book URL http://localhost:3000/member/book/${bookId}`);
              // Here is where you would calculate "send once" logic, effectively deleting the record ensures it's sent once.
            });

            // Clear notifications
            pool.query("DELETE FROM bookstack.notification_table WHERE book_id = ?", [bookId]);
          }
        });
      }

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

  pool.query(sql, values, (error, rows) => {
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
    if (error)
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
      number_of_copies,const pool=require("../db/pool")
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

    pool.query(sql, values, (error, result) => {
      if (error) {
        console.error(error); const pool = require("../db/pool")
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

  pool.query(sql, (error, data) => {
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

router.get("/books", (req, res) => {
  bookService.getAllBooks((err, books) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Error fetching books" });
    }
    res.json(books);
  });
});

router.get("/new-arrived-books", (req, res) => {
  bookService.getNewArrivedBooks((err, books) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Error fetching books" });
    }
    res.json(books);
  });
});

router.get("/all-new-arrived-books", (req, res) => {
  bookService.getAllNewArrivedBooks((err, books) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Error fetching books" });
    }
    res.json(books);
  });
});

/* ---------------- ID BASED ---------------- */

router.post("/liked-books", (req, res) => {
  bookService.getAllLikedBooks(req.body, (err, books) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Error fetching books" });
    }
    res.json(books);
  });
});

router.post("/recommended-books", (req, res) => {
  bookService.getRecommendedBooks(req.body, (err, books) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Error fetching books" });
    }
    res.json(books);
  });
});

router.post("/trending-books", (req, res) => {
  bookService.getTrendingBooks(req.body, (err, books) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Error fetching books" });
    }
    res.json(books);
  });
});

router.post("/all-recommended-books", (req, res) => {
  bookService.getAllRecommendedBooks(req.body, (err, books) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Error fetching books" });
    }
    res.json(books);
  });
});

router.post("/all-trending-books", (req, res) => {
  bookService.getAllTrendingBooks(req.body, (err, books) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Error fetching books" });
    }
    res.json(books);
  });
});

/* ---------------- SINGLE BOOK ---------------- */

router.get("/book/:bookId", (req, res) => {
  bookService.getBookDetails(req.params.bookId, (err, book) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Error fetching book" });
    }
    res.json(book);
  });
});

router.post("/might-liked-books/:bookId", (req, res) => {
  bookService.getMightAlsoLikedBooks(
    req.body,
    req.params.bookId,
    (err, books) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Error fetching books" });
      }
      res.json(books);
    }
  );
});

router.post("/all-might-liked-books/:bookId", (req, res) => {
  bookService.getAllMightAlsoLikedBooks(
    req.body,
    req.params.bookId,
    (err, books) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Error fetching books" });
      }
      res.json(books);
    }
  );
});

/* ---------------- HELPERS ---------------- */

router.post("/names-by-id", (req, res) => {
  bookService.getBookNamesByIds(req.body, (err, books) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Error fetching book names" });
    }
    res.json(books);
  });
});

router.post("/search", (req, res) => {
  const { search } = req.body;

  bookService.searchBooks(search, (err, books) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Search failed" });
    }

    const mapped = books.map(b => ({
      bookId: b.book_id,
      title: b.title,
      author: b.author
    }));

    res.status(200).json(mapped);
  });
});

router.get('/allbooks', (req, res) => {
  try {
    const sql = `SELECT * FROM book_table`
    pool.query(sql, (error, data) => {
      if (data) {
        console.log(data)
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
