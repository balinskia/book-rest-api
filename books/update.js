const AWS = require('aws-sdk')

const dynamoDb = new AWS.DynamoDB.DocumentClient()

module.exports.update = (event, context, callback) => {
  const timestamp = new Date().getTime()
  const data = JSON.parse(event.body)

  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Key: {
      uuid: event.pathParameters.uuid
    },
    ExpressionAttributeNames: {
      '#name_txt': 'name' // https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/ReservedWords.html
    },
    ExpressionAttributeValues: {
      ':name': data.name,
      ':releaseDate': data.releaseDate,
      ':authorName': data.authorName
    },
    UpdateExpression: 'SET #name_txt = :name, releaseDate = :releaseDate,  authorName = :authorName',
    ReturnValues: 'ALL_NEW'
  }

  // update the book in the database
  dynamoDb.update(params, (error, result) => {
    // handle potential errors
    if (error) {
      console.error(error)
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'text/plain' },
        body: 'Couldn\'t fetch the books item.' + JSON.stringify((error))
      })
      return
    }

    // create a response
    const response = {
      statusCode: 200,
      body: JSON.stringify(result.Attributes)
    }
    callback(null, response)
  })
}
