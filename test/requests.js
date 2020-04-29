const axios = require('axios')
const urls = require('./urls')

async function getBooks () {
  return axios.get(urls.books)
    .then((res) => res.data)
}

async function getNrOfBooks () {
  return getBooks()
    .then(books => books.length)
}

async function getBook (uuid) {
  const url = urls.getBook(uuid)
  return axios.get(url)
    .then((res) => res.data)
}

async function addBook (book) {
  return axios.post(urls.addBook, book).catch(err => console.log(err))
}

async function deleteBook (uuid) {
  const url = urls.deleteBook(uuid)
  return axios.post(url)
}

async function updateBook (book) {
  const url = urls.updateBook(book.uuid)
  return axios.post(url, book)
}

module.exports = {
  getNrOfBooks,
  addBook,
  deleteBook,
  updateBook,
  getBook
}
