function getTotalBooksCount(books) {
  let totalBooks;
  totalBooks = books.length;
  return totalBooks;
}


function getTotalAccountsCount(accounts) {
  return accounts.length;
}


function getBooksBorrowedCount(books) {
  // books.id.borrows.returned = false;
  let totalBooksBorrowed = 0;

  // Use reduce method to condense books array to just title and most recent borrow record
  const popularBooks = books.reduce((acc, book) => {
    bookBorrows = book.borrows[0]; 
    acc[book.title] = bookBorrows.returned;
    return acc;
  }, {});
  // return popularBooks;
  
  for (const book in popularBooks) {
    //  Increment totalBooksBorrowed for books not retured
    if(!popularBooks[book]) totalBooksBorrowed++;
  }
  return totalBooksBorrowed;
}


function getMostCommonGenres(books) {
  let result = {};
  let genre = books.forEach((book) => {
    if (result[book.genre] == null) {
      result[book.genre] = 1; 
    } else {
      result[book.genre] += 1;
    }
  })
  let countArray = [];
  for (const [key, value] of Object.entries(result)) {
    countArray.push( { 'name' : key, 'count' : value } ); 
  }
  return topFive(countArray)
}
  

function getMostPopularBooks(books) {
  // Use reduce method to condense books array to just title and borrows
  const popularBooks = books.reduce((acc, book) => {
  acc[book.title] = book.borrows.length;
  return acc;
  }, {});
  // return popularBooks;

  // Transform popularBooks object into an array of several objects:  
  //   { name: 'title', count: 999 }, ...
  const popularBooksArray = [];
  for (const [key, value] of Object.entries(popularBooks)) {
    popularBooksArray.push( { 'name' : key, 'count' : value } ); 
  }
  return topFive(popularBooksArray);
}


function getMostPopularAuthors(books, authors) {
  let result = {};

  let authorId = books.forEach((book) => {
      bookAuthorId = book.authorId;
      bookBorrows = book.borrows; 
      bookBorrowsLength = bookBorrows.length;
  
       if (result[bookAuthorId] == null) {
           { result[bookAuthorId] = bookBorrowsLength; }
      } else {
        result[bookAuthorId] += bookBorrowsLength;
      }
  })
  // return result;

  let countArray = [];
  for (const [key, count] of Object.entries(result)) {

    authorObject = authors.find((author) => author.id == key);

    const authorName = authorObject.name;
    // Example of object destructuring
    const { first, last } = authorName;
    const name =  `${first} ${last}`;

    // Example of object shorthand
    const authorCountObj = { name, count };
    countArray.push(authorCountObj);
  }
  return topFive(countArray);
}


function topFive(array) 
{ let result = array .sort((countA, countB) => (countA.count < countB.count ? 1 : -1)) .slice(0, 5); return result; }


module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
