const BASE_URL = process.env.BASE_URL

module.exports = {
  books: BASE_URL + '/books',
  getBook: (uuid) => `${BASE_URL}/book/${uuid}`,
  addBook: BASE_URL + '/book/add',
  updateBook: (uuid) => `${BASE_URL}/book/${uuid}/update`,
  deleteBook: (uuid) => `${BASE_URL}/book/${uuid}/delete`
}
