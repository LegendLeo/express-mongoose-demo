const express = require('express')
const router = express.Router()

/* GET users listing. */
router.get('/users', function (req, res, next) {
  res.render('users', {
    title: 'this is a user'
  })
})

module.exports = router
