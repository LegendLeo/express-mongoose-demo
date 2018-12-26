const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const lessMiddleware = require('less-middleware')
const logger = require('morgan')
const mongoDB = require('mongoose')
const config = require('./config')

// routes
const indexRouter = require('./routes/movie')
const adminRouter = require('./routes/admin')

const app = express()

mongoDB.connect('mongodb://' + config.DB, {
  useNewUrlParser: true
})
const db = mongoDB.connection
db.on('error', console.error.bind(console, 'MongoDB连接错误：'))
db.on('open', () => {})

// view engine setup
app.set('views', path.join(__dirname, 'views/pages'))
app.set('view engine', 'pug')

app.use(logger('dev'))
app.use(express.json())
// 开启转换post请求的数据格式
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(lessMiddleware(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/admin', adminRouter)

app.locals.moment = require('moment')

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404))
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('../includes/error')
})

module.exports = app
