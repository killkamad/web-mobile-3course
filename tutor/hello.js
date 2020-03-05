var express = require('express');
var app = express();
var logger = require('morgan');
var wiki = require('./wikii.js');

// app.get('/', function(req, res) {
//     res.send('Hello World!');
// });

app.use('/wiki', wiki);
app.use(logger('dev'));
app.all('/secret', function(req, res, next) {
    console.log('Accessing the secret section ...');
    next(); // pass control to the next handler
});
// app.use(function(err, req, res, next) {
//     console.error(err.stack);
//     res.status(500).send('Something broke!');
// });
app.listen(3000, function() {
    console.log('Example app listening on port 3000!');
});


// setTimeout(function () {
//     console.log('dada')
// },1000);

// // Загружаем HTTP модуль
// var http = require("http");
//
// // Создаем HTTP-сервер и слушаем порт 8000 на запросы
// http.createServer(function(request, response) {
//
//     // Устанавливаем HTTP-заголовок ответа со статусом HTTP и Content type
//     response.writeHead(200, {'Content-Type': 'text/plain'});
//
//     // Отсылаем тело ответа "Hello World"
//     response.end('Hello World\n');
// }).listen(8000);
//
// // Выводим URL для доступа к серверу
// console.log('Server running at http://127.0.0.1:8000/');