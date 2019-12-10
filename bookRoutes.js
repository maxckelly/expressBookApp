const express = require('express');
const router = express.Router();
// The underscore allows you to call the _ variable.
const _ = require('underscore');
const Joi = require('joi');

// Other Files
let { books, updateFile } = require('./booksData.js');

// Below is the gets
router.get('/', (req, res) => {
  return res.send(books);
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const int_id = parseInt(id);
  const book = books.find((element) => element.id === int_id);

  if (book) {
    res.send(book);
  } else {
    res.status(404).send(`Book with an id of ${id} not found`);
  }

  return res;
});

router.get('/sample', (req, res) => {
  // This spits back 3 random objects
  let sample = _.sample(books, 3);
  return res.send(sample);
});

router.post('/create', (req, res) => {
  const { id, author, title, isHardBack } = req.body;

  // Schema is called here in bookHandler.js
  let myNewId = books.reduce((highestId, num) => {
    return (num.id > highestId) ? num.id : highestId
  }, 0);

  // Below is incrementing the id
  myNewId++;

  const schema = {
    id: Joi.number().required(),
    author: Joi.string().min(3).required(),
    title: Joi.string().min(3).required(),
    isHardBack: Joi.required()
  };

  const newBook = {
    id: myNewId,
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

module.exports = router;