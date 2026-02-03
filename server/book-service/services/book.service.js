const pool = require("../db/pool");

/* ---------------- BASIC ---------------- */

function getAllBooks(cb) {
  pool.query(
    `
    SELECT 
      book_id AS bookId,
      title,
      author,
      book_image AS bookImage 
    FROM book_table
    `,
    (err, rows) => cb(err, rows)
  );
}

/* ---------------- LIKED / RECOMMENDED / TRENDING ---------------- */

function getAllLikedBooks(ids, cb) {
  if (!Array.isArray(ids) || ids.length === 0) return cb(null, []);

  const sql = `
    SELECT book_id AS bookId, title, author, book_image AS bookImage
    FROM book_table
    WHERE book_id IN (?)
  `;

  pool.query(sql, [ids], (err, rows) => cb(err, rows));
}

function getRecommendedBooks(ids, cb) {
  if (!Array.isArray(ids) || ids.length === 0) return cb(null, []);

  const sql = `
    SELECT book_id AS bookId, title, author, book_image AS bookImage
    FROM book_table
    WHERE book_id IN (?)
    LIMIT 10
  `;

  pool.query(sql, [ids], (err, rows) => cb(err, rows));
}

function getTrendingBooks(ids, cb) {
  if (!Array.isArray(ids) || ids.length === 0) return cb(null, []);

  const sql = `
    SELECT book_id AS bookId, title, author, book_image AS bookImage
    FROM book_table
    WHERE book_id IN (?)
    LIMIT 10
  `;

  pool.query(sql, [ids], (err, rows) => cb(err, rows));
}

/* ---------------- NEW ARRIVED ---------------- */

function getNewArrivedBooks(cb) {
  pool.query(
    `
    SELECT book_id AS bookId, title, author, book_image AS bookImage
    FROM book_table
    ORDER BY action_date DESC
    LIMIT 10
    `,
    (err, rows) => cb(err, rows)
  );
}

function getAllNewArrivedBooks(cb) {
  pool.query(
    `
    SELECT book_id AS bookId, title, author, book_image AS bookImage
    FROM book_table
    ORDER BY action_date DESC
    LIMIT 24
    `,
    (err, rows) => cb(err, rows)
  );
}

/* ---------------- SINGLE BOOK ---------------- */

function getBookDetails(bookId, cb) {
  pool.query(
    `
    SELECT 
      book_id AS bookId,
      isbn, title, author, description, publisher,
      number_of_copies AS numberOfCopies,
      number_of_copies_remaining AS numberOfCopiesRemaining,
      book_image AS bookImage
    FROM book_table
    WHERE book_id = ?
    `,
    [bookId],
    (err, rows) => cb(err, rows?.[0])
  );
}

/* ---------------- EXTRA ---------------- */

function getMightAlsoLikedBooks(ids, bookId, cb) {
  if (!Array.isArray(ids) || ids.length === 0) return cb(null, []);

  const sql = `
    SELECT book_id AS bookId, title, author, book_image AS bookImage
    FROM book_table
    WHERE book_id IN (?) AND book_id != ?
  `;

  pool.query(sql, [ids, bookId], (err, rows) => cb(err, rows));
}

function getBookNamesByIds(ids, cb) {
  if (!Array.isArray(ids) || ids.length === 0) return cb(null, []);

  const sql = `
    SELECT book_id AS bookId, title
    FROM book_table
    WHERE book_id IN (?)
  `;

  pool.query(sql, [ids], (err, rows) => cb(err, rows));
}

function searchBooks(search, cb) {
  if (!search || search.trim().length < 2) return cb(null, []);

  const sql = `
    SELECT book_id, title, author
    FROM book_table
    WHERE title LIKE ? OR isbn LIKE ? OR author LIKE ? OR publisher LIKE ?
    LIMIT 5
  `;

  const values = [
    `%${search}%`,
    `${search}%`,
    `%${search}%`,
    `%${search}%`
  ];

  pool.query(sql, values, (err, rows) => cb(err, rows));
}

/* ---------------- EXPORT ---------------- */

module.exports = {
  getAllBooks,
  getAllLikedBooks,
  getRecommendedBooks,
  getTrendingBooks,
  getNewArrivedBooks,
  getAllNewArrivedBooks,
  getBookDetails,
  getMightAlsoLikedBooks,
  getBookNamesByIds,
  searchBooks
};
