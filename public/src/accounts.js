function findAccountById(accounts, id) {
  let found = accounts.find((account) => account.id == id);
  return found;
}

function sortAccountsByLastName(accounts) {
  accounts.sort((nameA, nameB) => nameA.name.last > nameB.name.last ? 1 : -1);
  return accounts;
}


function getTotalNumberOfBorrows(account, books) {
  let accountId = account.id;
  let result = 0;

  // Use map() method to gather borrow records
  // allBorrows = books.map((book) => book.borrows);
  allBorrows = books.map((book) => {  let bookBorrows = book.borrows;
      // Use map() method to gather id values from borrow records
      someBorrows = bookBorrows.map((borrow) => borrow.id);
      // If this accountId borrowed this book, increment result (total borrows)
      if(someBorrows.includes(accountId)) result++;
  });
  return result;
}


function getBooksPossessedByAccount(account, books, authors) {
  let result = [];

  // Unreturned books from this account
  books.forEach((book) => { 
    if(!book.borrows[0].returned && book.borrows[0].id === account.id) 
      { result.push(book); } 
    })

  // After result array has books still checked out, add author object to each book
  result.forEach((book) => { 
    const authorMatch = authors.find((author) => book.authorId === author.id); 
    book.author = authorMatch; 
  })

  return result;
}


module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
