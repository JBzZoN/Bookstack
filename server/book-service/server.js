const express = require('express');
const bookRoutes = require('./routes/book.routes');

require("dotenv").config();

const app = express();
app.use("/book/image", express.static("images"))
app.use(express.json());

app.use('/book', bookRoutes);

const PORT = process.env.PORT || 4040;

app.listen(PORT, () => {
  console.log('Book service running on 4040 port.');
});
