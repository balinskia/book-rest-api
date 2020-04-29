## Book REST API
API that provide the possibility to manage books in the
library:
- Add a book to the library: POST `/book/add`
- Update book details: POST `book/{bookUuid}/update`
- Delete a book from the library: POST `/book/{bookUuid}/delete`
- Get all books: GET `/books`
- Get book details: GET `/book/{bookUuid}`

Tech Stack:
* Serverless
* NodeJS
* DynamoDB

### Install

    $ npm install


### Deploy

    $ npm run deploy

### Run integration tests, assuming service is deployed to `url`
```
    $ export BASE_URL=<url>
    $ npm run test

    > mocha

      Books API
        ✓ should add a new book (3152ms)
        ✓ should update book (2843ms)
        ✓ should delete a book (2809ms)
```
