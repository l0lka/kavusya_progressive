var express = require('express');

var app = express();
var server = app.listen(3000);
//var io = require('socket.io').listen(server);
app.use(express.static('app'));

app.all('/*', function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
});

// app.get('/', function (req, res) {
//     res.send('Hello World!')
// })

// io.attach(server);
//
// io.on('connection', function(socket){
//     console.log("User connected somewhere");
//
//     socket.emit('news', {hello: 'www'});
//
//     socket.on('postMessage', function(data){
//         console.log("User got message....  ", data);
//         io.emit('updateMessage', data);
//     });
//
//     socket.on('doneMessage', function(data){
//         console.log("User got done message....  ", data);
//         io.emit('updateMessage', data);
//     });
//
//     socket.on('disconnect', function(){
//         console.log("User disconnected");
//     });
//
// });



