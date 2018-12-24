const express = require('express')
const router = express.Router()
const User = require('../models/user')

router.get('/', function (req, res) {
  User.fetch((err, users) => {
    if (err) {
      console.error(err)
    }
    res.render('index', {
      title: 'Express',
      users,
      movies: []
    })
  })
})

module.exports = router
