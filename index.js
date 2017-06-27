// iniciando um servidor nodejs
var app = require('express')();
var http = require('http').Server(app);
// chamando o socket.io
var io = require('socket.io')(http);
// definindo a página inicial
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});
// fazendo a conexão com o socket.io
io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});
// imprimindo a menssagem 
io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
  });
});

// enviando evento para todo mundo
io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});
    

http.listen(3000, function(){
  console.log('listening on *:3000');
});