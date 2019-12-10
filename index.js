const express = require('express');

// Routes
const bookRoutes = require('./bookRoutes.js');
let {books, updateFile} = require('./booksData.js');

const app = express();
const PORT = 3333;

// Allows express to read JSON files
app.use(express.json());
app.use('/books', bookRoutes);

app.get('/', (req, res) => {
  return res.send(books);
});

app.listen(PORT, () => {
  console.log(`Listening at ${PORT}`)
});