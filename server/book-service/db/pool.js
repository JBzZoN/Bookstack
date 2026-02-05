const mysql = require("mysql2");

const pool = mysql.createPool({
  host: 'localhost',
  user: 'bookstack',
  password: 'bookstack',
  database: 'book_db',
});

module.exports=pool