var express = require('express')
var bodyParser = require('body-parser')

var app = express()

app.use(bodyParser.json())

app.get('/', function(req, res) {
  res.send('Hello World!');
})

app.listen(3000, function() {
  console.log('Server running at http://localhost:3000');
})
