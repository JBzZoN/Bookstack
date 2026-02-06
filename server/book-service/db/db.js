const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'mysql-book-db',
  user: 'root',
  password: 'bookstack',
  database: 'book_db',
  waitForConnections: true,
  connectionLimit: 10
});

module.exports = pool;
