var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session')
const RedisStore = require('connect-redis')(session)

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
const blogRouter = require('./routes/blog')
const userRouter = require('./routes/user')

var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// 接入日志
app.use(logger('dev'));

// 解析post请求数据，req.body中取值
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// 解析cookie
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// 解析session
const redisClient = require('./db/redis')
const sessionStore = new RedisStore({
  client: redisClient
})
app.use(session({
  resave: false, //添加 resave 选项,解决控制台提示
  saveUninitialized: true, //添加 saveUninitialized 选项
  secret: 'express_test',
  cookie: {
    // path: '/',    // 默认配置
    // httpOnly: true,  // 默认配置
    maxAge: 24*60*60*1000
  },
  store: sessionStore
}))

// 注册路由
// app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('/api/blog', blogRouter)
app.use('/api/user', userRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'dev' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
