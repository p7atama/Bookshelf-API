# Postman API Collection - README

This Postman API Collection provides endpoints for managing books. It allows you to perform CRUD operations (Create, Read, Update, Delete) on books.

## Prerequisites

To use this API Collection, you need the following:

- [Postman](https://www.postman.com/downloads/) - A collaboration platform for API development.

## Installation

To install and use this API Collection, follow these steps:

1. Clone or download the repository containing the API Collection files.
2. Open Postman.
3. Click on the **Import** button in the top-left corner of the Postman interface.
4. Select the **Import From Folder** option and browse to the location where you cloned or downloaded the API Collection files.
5. Click the **Choose** button to import the API Collection into Postman.

## Usage

Once you have imported the API Collection into Postman, you can use the following endpoints:

### Add Book

- Endpoint: `POST /books`
- Description: Adds a new book to the collection.
- Request Body: The request body should contain the following properties:
  - `name` (string): The name of the book (required).
  - `year` (number): The publication year of the book.
  - `author` (string): The author of the book.
  - `summary` (string): A summary of the book.
  - `publisher` (string): The publisher of the book.
  - `pageCount` (number): The total number of pages in the book.
  - `readPage` (number): The number of pages that have been read.
  - `reading` (boolean): Indicates whether the book is currently being read.
- Response:
  - Success (201 Created): Returns the ID of the newly added book.
  - Error (400 Bad Request): If the request body is missing the `name` property or if `readPage` is greater than `pageCount`.
  - Error (500 Internal Server Error): If the book fails to be added.

### Get All Books

- Endpoint: `GET /books`
- Description: Retrieves a list of all books in the collection.
- Query Parameters:
  - `name` (string): Filters the books by name (case-insensitive).
  - `reading` (boolean): Filters the books by reading status (`true` for books being read, `false` for books not being read).
  - `finished` (boolean): Filters the books by finished status (`true` for finished books, `false` for unfinished books).
- Response:
  - Success (200 OK): Returns an array of books matching the specified filters.
  - Success (200 OK): Returns an empty array if there are no books in the collection.

### Get Book by ID

- Endpoint: `GET /books/{bookId}`
- Description: Retrieves a book by its ID.
- Path Parameter:
  - `bookId` (string): The ID of the book to retrieve.
- Response:
  - Success (200 OK): Returns the book object with the specified ID.
  - Error (404 Not Found): If a book with the specified ID does not exist.

### Edit Book by ID

- Endpoint: `PUT /books/{bookId}`
- Description: Edits a book by its ID.
- Path Parameter:
  - `bookId` (string): The ID of the book to edit.
- Request Body: The request body should contain the properties that you want to update:
  - `name` (string): The updated name of the book.
  - `year` (number): The updated publication year of the book.
  - `author` (string): The updated author of the book.
  - `summary` (string): The updated summary of the book.
  - `publisher` (string): The updated publisher of the book.
  - `pageCount` (number): The updated total number of pages in the book.
  - `readPage` (number): The updated number of pages that have been read.
  - `reading` (boolean): The updated reading status of the book.
- Response:
  - Success (200 OK): Indicates that the book was successfully updated.
  - Error (400 Bad Request): If the request body is missing the `name` property or if `readPage` is greater than `pageCount`.
  - Error (404 Not Found): If a book with the specified ID does not exist.

### Delete Book by ID

- Endpoint: `DELETE /books/{bookId}`
- Description: Deletes a book by its ID.
- Path Parameter:
  - `bookId` (string): The ID of the book to delete.
- Response:
  - Success (200 OK): Indicates that the book was successfully deleted.
  - Error (404 Not Found): If a book with the specified ID does not exist.

## Server Configuration

The API is designed to run on a server using the [Hapi](https://hapi.dev/) framework. To start the server, follow these steps:

1. Make sure you have [Node.js](https://nodejs.org/) installed on your machine.
2. Install the required dependencies by running `npm install` in the project directory.
3. Open the `server.js` file and configure the `config` object with your desired server settings (e.g., port, host).
4. Start the server by running `npm start` in the project directory.
5. The server will start running and listening for API requests at the specified port and host.


## License

This API Collection is released under the [MIT License](LICENSE). Feel free to modify and use it for your own purposes.
