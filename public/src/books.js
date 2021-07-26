function findAuthorById(authors, id) {
  return authorObject = authors.find((author) => author.id === id);
}


function findBookById(books, id) {
  return bookObject = books.find((book) => book.id === id);
}


function partitionBooksByBorrowedStatus(books) {
  // Array containing two arrays: books still being borrowed and returned books
  let arrayAllBooks = [];

  // filter for books still being borrowed
  let arrayBorrowed = books.filter((book) => (!book.borrows[0].returned));
  // filter for returned books
  let arrayReturned = books.filter((book) => book.borrows[0].returned);

  // Combine borrowed and returned arrays into single array
  arrayAllBooks.push(arrayBorrowed);
  arrayAllBooks.push(arrayReturned);

  return arrayAllBooks;
}


function getBorrowersForBook(book, accounts) {
  borrowerList = [];  // Borrower ids for this book
  result = [];  // Final array with all borrower records
  borrows = book.borrows;  // borrows array, a.k.a. borrow records for this book

  // should limit the list to ten borrowers
  for(i = borrows.length; i > 10; i--) {  borrows.pop();  }

  // Move each borrow id from book object (input), into borrowerList array
  borrows.forEach((borrow) => { borrowerList.push(borrow);  });

  borrowerList.forEach((borrow) => { 
    //  Find account object for each borrow record in borrowerList array, 
    //  based on borrow.id match to to accounts array
    const accountMatch = accounts.find((account) => borrow.id === account.id); 
    //  Append the account object to the borrower ID and returned status
    borrow = { ...borrow, ...accountMatch };
    //  Move each borrower object into result array for output
    result.push(borrow); 
  });

  return result;
}


module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
