const express = require('express');
const fs = require('fs');
const Joi = require('joi');
// The underscore allows you to call the _ variable.
const _ = require('underscore');
let {books, updateFile} = require('./booksData');

const app = express();
const PORT = 3333;

// Allows express to read JSON files
app.use(express.json());


app.get('/', (req, res) => {
  return res.send(books);
});

app.get('/books', (req, res) => {
  return res.send(books);
});

app.get('/books/:id', (req, res) => {
  const {id} = req.params;
  const int_id = parseInt(id);
  const book = books.find((element) => element.id === int_id);

  if (book) {
    res.send(book);
  } else {
    res.status(404).send(`Book with an id of ${id} not found`);
  }

  return res;
});

app.get('/sample/books', (req, res) => {
  // This spits back 3 random objects
  let sample = _.sample(books, 3);
  return res.send(sample);
});

app.post('/create/book', (req, res) => {
  const {id, author, title, isHardBack} = req.body;

  const schema = {
    id: Joi.number().required(),
    author: Joi.string().min(3).required(),
    title: Joi.string().min(3).required(),
    isHardBack: Joi.required()
  };

  const newBook = {
    id: parseInt(id), 
    author: author, 
    title: title, 
    isHardBack: isHardBack
  };

  const valid = Joi.validate(newBook, schema);

  if (valid.error) {
    res.status(400).send(valid.error.details[0].message);
  } else if (books.find((e) => e.id === parseInt(id))) {
    res.status(400).send("A book with this id already exists");
  } else {
    books.push(newBook);
    updateFile();
    res.send(newBook);
  }

  return res;
});



app.listen(PORT, () => {
  console.log(`Listening at ${PORT}`)
});