const MongoClient = require('mongodb').MongoClient
const assert = require('assert')
const dotenv = require('dotenv')

dotenv.config()

dbRun = function(callback) {
  const client = new MongoClient(process.env.MONGODB_URL)

  client.connect(function(err) {
    assert.equal(null, err)
    const db = client.db(process.env.MONGODB_DATABASE)
    callback(db, function() {
      client.close()
    })
  })
}

module.exports = dbRun
