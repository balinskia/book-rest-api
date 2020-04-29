const faker = require('faker')
const expect = require('chai').expect
const { getNrOfBooks, addBook, deleteBook, updateBook, getBook } = require('./requests')

const mockBook = {
  uuid: faker.random.uuid(),
  name: faker.random.words(2),
  releaseDate: 123456,
  authorName: faker.name.findName()
}

describe('Books API', function () {
  this.timeout(5000)
  it('should add a new book', async function () {
    const oldNrOfBooks = await getNrOfBooks()
    await addBook(mockBook)
    const newNrOfBooks = await getNrOfBooks()
    expect(oldNrOfBooks + 1).to.equal(newNrOfBooks)
  })

  it('should update book', async function () {
    const updatedBook = {
      ...mockBook,
      name: 'book name updated',
      authorName: 'new author'
    }
    await updateBook(updatedBook)
    const { name, authorName } = await getBook(mockBook.uuid)
    expect(name).to.equal('book name updated')
    expect(authorName).to.equal('new author')
  })

  it('should delete a book', async function () {
    const oldNrOfBooks = await getNrOfBooks()
    await deleteBook(mockBook.uuid)
    const newNrOfBooks = await getNrOfBooks()
    expect(oldNrOfBooks - 1).to.equal(newNrOfBooks)
  })
})
