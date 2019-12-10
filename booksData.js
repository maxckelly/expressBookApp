const fs = require('fs');
const dataFileName = './books.json'

// This calls the JSON read me function
let books = readDataFromFile();

// This function reads the Books.json file
function readDataFromFile() {
  let newBooks = [];

  if (fs.existsSync(dataFileName)) {
    let data = fs.readFileSync(dataFileName, 'utf8')
    newBooks = JSON.parse(data);   
  };

  return newBooks;
};

// When the function is called it rewrites the file and adds the the object to the array in books.json
function updateFile() {
  let json = JSON.stringify(books);
  console.log(books);
  fs.writeFile(dataFileName, json, 'utf8', (err) => {
    if (err) {
      throw err;
    };
  });
};

module.exports = { books, updateFile };