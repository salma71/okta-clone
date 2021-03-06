var createError = require('http-errors')
var express = require('express')
var path = require('path')
const logger = require('morgan')
const session = require('express-session')
const process = require('dotenv').config()

// var indexRouter = require('./routes/index')
// var usersRouter = require('./routes/users')
// delete the default routes and define the new created ones
const dashboardRouter = require('./routes/dashboard')
const publicRouter = require('./routes/public')

const app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')))

app.use(
  session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: false
  })
)

// app.use('/', indexRouter)
// app.use('/users', usersRouter)

// route the new created routes for app.js
app.use('/', publicRouter)
app.use('/dashboard', dashboardRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
