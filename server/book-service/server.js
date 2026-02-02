const express = require('express');
const bookRoutes = require('./routes/book.routes');

const app = express();
app.use("/book/image", express.static("images"))
app.use(express.json());

app.use('/book', bookRoutes);

app.listen(4040, () => {
  console.log('Book service running on 4000 port.');
});
