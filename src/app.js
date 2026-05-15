//nhận request từ người dùng --> middlewares

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config();



const { checkUser } = require('./middlewares/auth');


const indexRouter = require('./routes/index');

var app = express();



app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));           
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(checkUser);               // Middleware kiểm tra user cho toàn bộ app


app.use('/', indexRouter);

// Xử lý lỗi 404
app.use(function(req, res, next) {
    next(createError(404));
});

// Xử lý lỗi hệ thống
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.send(`<h1>Lỗi: ${err.status || 500}</h1><p>${err.message}</p><a href="/">Quay lại trang chủ</a>`);
});

module.exports = app;