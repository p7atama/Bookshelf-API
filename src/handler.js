const { nanoid } = require('nanoid');
const books = require('./books');
 
/**
 * Handler to add a new book
 * @param {*} request
 * @param {*} h
 * @returns {Object} response
 */
const addBookHandler = (request, h) => {
  // Extracting payload data
  const {
    name, year, author, summary, publisher, pageCount, readPage, reading,
  } = request.payload;
 
  const id = nanoid(16);
  const finished = pageCount === readPage;
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
 
  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
  };
 
  // Validation: Check if name is provided
  if (typeof name === 'undefined') {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    });
 
    response.code(400);
    return response;
  }
 
  // Validation: Check if readPage is not greater than pageCount
  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    });
 
    response.code(400);
    return response;
  }
 
  books.push(newBook);
 
  const isSuccess = books.filter((book) => book.id === id).length > 0;
 
  // Respond with success or error message
  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id,
      },
    });
 
    response.code(201);
    return response;
  }
 
  const response = h.response({
    status: 'error',
    message: 'Buku gagal ditambahkan',
  });
 
  response.code(500);
  return response;
};
 
/**
 * Handler to get all books
 * @param {*} request
 * @param {*} h
 * @returns {Object} response
 */
const getAllBooksHandler = (request, h) => {
  const { name, reading, finished } = request.query;
 
  // If there are no books, return an empty array
  if (books.length === 0) {
    const response = h.response({
      status: 'success',
      data: {
        books: [],
      },
    });
 
    response.code(200);
    return response;
  }
 
  let filterBook = books;
 
  // Filter books by name if provided
  if (typeof name !== 'undefined') {
    filterBook = books.filter((book) => book.name.toLowerCase().includes(name.toLowerCase()));
  }
 
  // Filter books by reading status if provided
  if (typeof reading !== 'undefined') {
    filterBook = books.filter((book) => Number(book.reading) === Number(reading));
  }
 
  // Filter books by finished status if provided
  if (typeof finished !== 'undefined') {
    filterBook = books.filter((book) => Number(book.finished) === Number(finished));
  }
 
  // Map filtered books to a simplified object
  const listBook = filterBook.map((book) => ({
    id: book.id,
    name: book.name,
    publisher: book.publisher,
  }));
 
  // Respond with the filtered book list
  const response = h.response({
    status: 'success',
    data: {
      books: listBook,
    },
  });
 
  response.code(200);
  return response;
};
 
/**
 * Handler to get a book by id
 * @param {*} request
 * @param {*} h
 * @returns {Object} response
 */
const getBookByIdHandler = (request, h) => {
  const { bookId } = request.params;
 
  const book = books.find((n) => n.id === bookId);
 
  // Respond with the book if found, or return a fail message
  if (book) {
    const response = h.response({
      status: 'success',
      data: {
        book,
      },
    });
 
    response.code(200);
    return response;
  }
 
  const response = h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan',
  });
 
  response.code(404);
  return response;
};
 
/**
 * Handler to edit a book by id
 * @param {*} request
 * @param {*} h
 * @returns {Object} response
 */
const editBookByIdHandler = (request, h) => {
  const { bookId } = request.params;
 
  const {
    name, year, author, summary, publisher, pageCount, readPage, reading,
  } = request.payload;
  const updatedAt = new Date().toISOString();
  const index = books.findIndex((book) => book.id === bookId);
 
  // Validation: Check if name is provided
  if (typeof name === 'undefined') {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku',
    });
 
    response.code(400);
    return response;
  }
 
  // Validation: Check if readPage is not greater than pageCount
  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
    });
 
    response.code(400);
    return response;
  }
 
  if (index !== -1) {
    books[index] = {
      ...books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      updatedAt,
    };
 
    // Respond with a success message
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui',
    });
 
    response.code(200);
    return response;
  }
 
  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui buku. Id tidak ditemukan',
  });
 
  response.code(404);
  return response;
};
 
/**
 * Handler to delete a book by id
 * @param {*} request
 * @param {*} h
 * @returns {Object} response
 */
const deleteBookByIdHandler = (request, h) => {
  const { bookId } = request.params;
 
  const index = books.findIndex((book) => book.id === bookId);
 
  // If the book is found, remove it and respond with a success message
  if (index !== -1) {
    books.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil dihapus',
    });
 
    response.code(200);
    return response;
  }
 
  const response = h.response({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan',
  });
 
  response.code(404);
  return response;
};
 
module.exports = {
  addBookHandler,
  getAllBooksHandler,
  getBookByIdHandler,
  editBookByIdHandler,
  deleteBookByIdHandler,
};