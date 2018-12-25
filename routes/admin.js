const express = require('express')
const router = express.Router()
const _ = require('underscore')
const Movie = require('../models/movie')

// 后台列表
router.get('/admin', function(req, res) {
  Movie.fetch(function (err, movies) {
    if (err) {
      console.error(err)
    }
    res.render('index', {
      title: '后台列表',
      movies
    })
  })
})

// 后台录入页
router.get('/admin/movie', function(req, res) {
  res.render('admin', {
    title: '后台录入页',
    movie: {
      title:'',
      poster: '',
      director: '',
      country: '',
      year: '',
      language: '',
      flash: '',
      summary: ''
    }
  })
})

// 电影录入接口
router.post('/admin/movie/create', function(req, res) {
  console.log(req.body)
  var id = req.body.movie.id
  console.log(id)
  let movieObj = req.body.movie
  let _movie = null
  if (id) {
    Movie.findById(id, function(err, movie) {
      if (err) {
        console.error(err)
      }
      _movie = _.extend(movie, movieObj)
      _movie.save(function(err, movie) {
        if (err) {
          console.error(err)
        }
        res.redirect('/movie/' + movie.id)
      })
    })
  } else {
    console.log(111)
    _movie = new Movie({
      title: movieObj.title,
      director: movieObj.director,
      country: movieObj.country,
      language: movieObj.language,
      year: movieObj.year,
      poster: movieObj.poster,
      summary: movieObj.summary,
      flash: movieObj.flash
    })
    _movie.save(function(err, movie) {
      if (err) {
        console.error(err)
      }
      res.redirect('/movie/' + movie.id)
    })
  }
})

// 电影更新接口
router.post('/admin/movie/:id', function(req, res) {
  let id = req.body.id
  if (id) {
    Movie.findById(id, function(err, movie) {
      if (err) {
        console.error(err)
      } else {
        res.render('admin', {
          title: '更新数据',
          movie
        })
      }
    })
  }
})

module.exports = router
