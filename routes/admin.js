const express = require('express')
const router = express.Router()
const _ = require('underscore')
const Movie = require('../models/movie')

// 后台列表
router.get('/', function(req, res) {
  Movie.fetch(function(err, movies) {
    if (err) {
      console.error(err)
    } else {
      res.render('list', {
        title: '后台列表',
        movies
      })
    }
  })
})

// 后台录入页
router.get('/create', function(req, res) {
  res.render('info', {
    title: '后台录入页',
    isNew: true,
    movie: {
      title: '',
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
router.post('/create', function(req, res) {
  console.log(req.body)
  var id = req.body.movie.id
  console.log(id)
  let movieObj = req.body.movie
  let _movie = new Movie({
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
    } else {
      res.redirect('/movie/' + movie.id)
    }
  })
})

// 后台列表
router.get('/update/:id', function(req, res) {
  let id = req.params.id
  Movie.findById(id, function(err, movie) {
    if (err) {
      console.error(err)
    } else {
      res.render('info', {
        title: '修改项目',
        isNew: false,
        movie
      })
    }
  })
})

// 电影更新接口
router.post('/update', function(req, res) {
  let id = req.body.movie.id
  let movieObj = req.body.movie
  if (id) {
    Movie.findById(id, function(err, movie) {
      if (err) {
        console.error(err)
      } else {
        let _movie = _.extend(movie, movieObj) // 用新对象里的字段替换老的字段
        _movie.save(function(err, newMovie) {
          if (err) {
            console.log(err)
          } else {
            res.redirect('/admin')
          }
        })
      }
    })
  }
})

module.exports = router
