const express = require('express')

const router = express.Router()

app.get('/test', (req, res) => {
  res.json({ profile: req.user ? req.user.profile : null })
})

function loginRequired (req, res, next) {
  if (!req.user) {
    return res.status(401).render('unauthenticated')
  }

  next()
}

module.exports = router
