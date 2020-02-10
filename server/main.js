const auth = require('./auth')

const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const dotenv = require('dotenv')
const express = require('express')
dotenv.config()

var app = express()

app.use(bodyParser.json())
app.use(cors({
  origin: process.env.NG_FRONTEND,
  credentials: true
}))
app.use(cookieParser(process.env.COOKIE_SECRET))
app.use('/auth', auth)

app.listen(process.env.PORT, function() {
  console.log('Server running at http://localhost:%d', process.env.PORT);
})
