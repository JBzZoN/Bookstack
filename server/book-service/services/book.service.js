const db = require("../db/db");

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

async function searchBooks(search) {  
  
  if (!search || search.trim().length < 2) {
    return res.status(200).send([]);
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
    `%${search}%`,   // title contains
    `${search}%`,    // isbn starts with
    `%${search}%`,   // author contains
    `%${search}%`    // publisher contains
  ];

  const [rows] = await db.query(sql, values);

  return rows;
    
}

module.exports = { getAllBooks,getAllLikedBooks,getRecommendedBooks,getTrendingBooks,getNewArrivedBooks,
                   getAllRecommendedBooks,getAllTrendingBooks,getAllNewArrivedBooks,getBookDetails,getMightAlsoLikedBooks,
                   getBookNamesByIds,searchBooks };
