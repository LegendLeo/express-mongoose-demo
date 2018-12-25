const express = require('express')
const router = express.Router()
const Movie = require('../models/movie')

// 电影列表
router.get('/', function(req, res) {
  Movie.fetch(function (err, movies) {
    if (err) {
      console.error(err)
    }
    res.render('index', {
      title: '首页',
      movies
    })
  })
})

// 电影详情
router.get('/movie/:id', function(req, res) {
  let id = req.params.id
  if (id) {
    Movie.findById(id, function(err, movie) {
      res.render('movie', {
        title: movie.title,
        movie
      })
    })
  }
  res.render('movie', {
    title: 'this is a movie'
  })
})

module.exports = router
