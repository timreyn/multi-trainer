const express = require('express')
const dotenv = require('dotenv')
const { Issuer } = require('openid-client')

dotenv.config()

var router = express.Router()

const wca = new Issuer({
  issuer: 'worldcubeassociation',
  authorization_endpoint: `${process.env.WCA_HOST}/oauth/authorize`,
  token_endpoint: `${process.env.WCA_HOST}/oauth/token`,
  userinfo_endpoint: `${process.env.WCA_HOST}/api/v0/me`
})

const redirect_uri = `${process.env.SCHEME}://${process.env.HOST}:${process.env.PORT}/auth/oauth_response`

const client = new wca.Client({
  client_id: process.env.API_KEY,
  client_secret: process.env.API_SECRET,
  response_type: 'code',
  redirect_uri: redirect_uri
})

router.get('/login', function(req, res) {
  const uri = client.authorizationUrl({
    scope: 'public'
  })
  if (req.get('Referer')) {
    res.cookie('redirectUrl', req.get('Referer'))
  }

  res.redirect(uri)
})

router.get('/oauth_response', function(req, res) {
  const params = client.callbackParams(req)
  client.oauthCallback(redirect_uri, params)
    .then(function (tokenSet) {
      client.userinfo(tokenSet).then(function (userinfo) {
        var url = req.cookies.redirectUrl
        if (url) {
          res.clearCookie('redirectUrl')
          res.redirect(url)
        } else {
          res.redirect(process.env.NG_FRONTEND)
        }
      })
    })
})

module.exports = router
