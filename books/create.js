const AWS = require('aws-sdk')

const dynamoDb = new AWS.DynamoDB.DocumentClient()

module.exports.create = (event, context, callback) => {
  const data = JSON.parse(event.body)

  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Item: {
      uuid: data.uuid,
      name: data.name,
      releaseDate: data.releaseDate,
      authorName: data.authorName
    }
  }

  // write the book to the database
  // TODO - think what happens when users adds an item which already exists
  dynamoDb.put(params, (error) => {
    // handle potential errors
    if (error) {
      console.error(error)
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'text/plain' },
        body: 'Couldn\'t create the book item.' + JSON.stringify(error)
      })
      return
    }

    // create a response
    const response = {
      statusCode: 200,
      body: JSON.stringify(params.Item)
    }
    callback(null, response)
  })
}
