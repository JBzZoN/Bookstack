const express = require('express');
const bookRoutes = require('./routes/book.routes');

/**
 * Book Microservice Entry Point
 * =========================================================================
 * Responsibilities:
 * - Bootstraps the Express application.
 * - Serves static book cover images.
 * - Mounts the book management routes.
 * 
 * Port: 4000
 */

const app = express();

// Serve static images for book covers
app.use("/book/image", express.static("images"))

// Parse JSON request bodies
app.use(express.json());

// Mount book-related API endpoints
app.use('/book', bookRoutes);

app.listen(4000, () => {
  console.log('Book service running on 4000 port.');
});

