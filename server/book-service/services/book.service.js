const db = require("../db/db");

/**
 * Book Service Layer
 * =========================================================================
 * Provides core business logic and database abstractions for book operations.
 * Interacts with the 'book_db' MySQL database using asynchronous queries.
 */

/**
 * Retrieves all books with minimal fields for listing.
 * 
 * @returns {Promise<Array>} List of simplified book objects.
 */
async function getAllBooks() {
  const [rows] = await db.query(
    `
    SELECT 
      book_id AS bookId,
      title,
      author,
      book_image AS bookImage 
    FROM book_table
    `
  );
  return rows;
}

/**
 * Retrieves full details for a list of liked book IDs.
 * 
 * @param {Array<number>} likedBookIds - Array of book primary keys.
 * @returns {Promise<Array>} List of book objects.
 */
async function getAllLikedBooks(likedBookIds) {
  if (!Array.isArray(likedBookIds) || likedBookIds.length === 0) {
    return [];
  }

  const placeholders = likedBookIds.map(() => "?").join(",");
  const sql = `
    SELECT 
      book_id AS bookId,
      title,
      author,
      book_image AS bookImage 
    FROM book_table
    WHERE book_id IN (${placeholders})
  `;

  const [rows] = await db.query(sql, likedBookIds);
  return rows;
}

/**
 * Retrieves a subset of books for the horizontal recommended section.
 * 
 * @param {Array<number>} recommendedBookIds 
 * @returns {Promise<Array>} Limited list of books.
 */
async function getRecommendedBooks(recommendedBookIds) {
  if (!Array.isArray(recommendedBookIds) || recommendedBookIds.length === 0) {
    return [];
  }

  const placeholders1 = recommendedBookIds.map(() => "?").join(",");
  const sql = `
    SELECT 
      book_id AS bookId,
      title,
      author,
      book_image AS bookImage 
    FROM book_table
    WHERE book_id IN (${placeholders1}) 
    LIMIT 10
  `;

  const [rows] = await db.query(sql, recommendedBookIds);
  return rows;
}

/**
 * Retrieves a subset of books for the trending section.
 */
async function getTrendingBooks(trendingBooksIds) {
  if (!Array.isArray(trendingBooksIds) || trendingBooksIds.length === 0) {
    return [];
  }

  const placeholders1 = trendingBooksIds.map(() => "?").join(",");
  const sql = `
    SELECT 
      book_id AS bookId,
      title,
      author,
      book_image AS bookImage 
    FROM book_table
    WHERE book_id IN (${placeholders1}) 
    LIMIT 10
  `;

  const [rows] = await db.query(sql, trendingBooksIds);
  return rows;
}

/**
 * Retrieves the most recently added books.
 */
async function getNewArrivedBooks() {
  const [rows] = await db.query(
    `
    SELECT 
      book_id AS bookId,
      title,
      author,
      book_image AS bookImage 
    FROM book_table
    ORDER BY action_date DESC
    LIMIT 10
    `
  );
  return rows;
}

/**
 * Retrieves all recommended books for the View All page.
 */
async function getAllRecommendedBooks(recommendedBookIds) {
  if (!Array.isArray(recommendedBookIds) || recommendedBookIds.length === 0) {
    return [];
  }

  const placeholders1 = recommendedBookIds.map(() => "?").join(",");
  const sql = `
    SELECT 
      book_id AS bookId,
      title,
      author,
      book_image AS bookImage 
    FROM book_table
    WHERE book_id IN (${placeholders1}) 
  `;

  const [rows] = await db.query(sql, recommendedBookIds);
  return rows;
}

/**
 * Retrieves all trending books for the View All page.
 */
async function getAllTrendingBooks(trendingBooksIds) {
  if (!Array.isArray(trendingBooksIds) || trendingBooksIds.length === 0) {
    return [];
  }

  const placeholders1 = trendingBooksIds.map(() => "?").join(",");
  const sql = `
    SELECT 
      book_id AS bookId,
      title,
      author,
      book_image AS bookImage 
    FROM book_table
    WHERE book_id IN (${placeholders1}) 
  `;

  const [rows] = await db.query(sql, trendingBooksIds);
  return rows;
}

/**
 * Retrieves a larger set of new arrivals.
 */
async function getAllNewArrivedBooks() {
  const [rows] = await db.query(
    `
    SELECT 
      book_id AS bookId,
      title,
      author,
      book_image AS bookImage 
    FROM book_table
    ORDER BY action_date DESC
    LIMIT 24
    `
  );
  return rows;
}

/**
 * Retrieves full details for a single book.
 * 
 * @param {number} bookId 
 * @returns {Promise<Object>} Complete book details.
 */
async function getBookDetails(bookId) {
  const [rows] = await db.query(
    `
    SELECT 
      book_id AS bookId,
      isbn,
      title,
      author,
      description,
      publisher,
      number_of_copies AS numberOfCopies,
      number_of_copies_remaining AS numberOfCopiesRemaining,
      book_image AS bookImage
    FROM book_table
    WHERE book_id = ?
    `,
    [bookId]
  );
  return rows[0];
}

/**
 * Retrieves books that other users also liked, excluding the current book.
 * 
 * @param {Array<number>} mightLikeBookIds 
 * @param {number} bookId - ID to exclude.
 */
async function getMightAlsoLikedBooks(mightLikeBookIds, bookId) {
  if (!Array.isArray(mightLikeBookIds) || mightLikeBookIds.length === 0) {
    return [];
  }

  const placeholders1 = mightLikeBookIds.map(() => "?").join(",");
  const sql = `
    SELECT 
      book_id AS bookId,
      title,
      author,
      book_image AS bookImage 
    FROM book_table
    WHERE book_id IN (${placeholders1}) 
    AND book_id != ?
  `;

  const params = [...mightLikeBookIds, bookId];
  const [rows] = await db.query(sql, params);
  return rows;
}

/**
 * Utility to fetch only names, useful for breadcrumbs or simple links.
 */
async function getBookNamesByIds(bookIds) {
  if (!Array.isArray(bookIds) || bookIds.length === 0) {
    return [];
  }

  const placeholders1 = bookIds.map(() => "?").join(",");
  const sql = `
    SELECT 
      book_id AS bookId,
      title 
    FROM book_table
    WHERE book_id IN (${placeholders1}) 
  `;

  const [rows] = await db.query(sql, bookIds);
  return rows;
}

/**
 * Search functionality for the main catalog.
 * Uses fuzzy matching on title, ISBN, author, and publisher.
 * 
 * @param {string} search - Keyword.
 */
async function searchBooks(search) {
  if (!search || search.trim().length < 2) {
    return [];
  }

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
  `

  const values = [
    `%${search}%`,
    `${search}%`,
    `%${search}%`,
    `%${search}%`
  ];

  const [rows] = await db.query(sql, values);
  return rows;
}

module.exports = {
  getAllBooks,
  getAllLikedBooks,
  getRecommendedBooks,
  getTrendingBooks,
  getNewArrivedBooks,
  getAllRecommendedBooks,
  getAllTrendingBooks,
  getAllNewArrivedBooks,
  getBookDetails,
  getMightAlsoLikedBooks,
  getBookNamesByIds,
  searchBooks
};

