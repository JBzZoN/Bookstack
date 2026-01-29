const express = require('express');
const bookRoutes = require('./routes/book.routes');

const app = express();
app.use(express.json());

app.use('/book', bookRoutes);

app.listen(4000, () => {
  console.log('Book service running on 4000 port.');
});


