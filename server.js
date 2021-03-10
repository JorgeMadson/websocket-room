const WebSocket = require('ws');
const port = 8080;
const server = new WebSocket.Server({
  port: port
});

let sockets = [];
server.on('connection', function(socket) {
  sockets.push(socket);

  // When you receive a message, send that message to every socket.
  socket.on('message', function(msg) {
    sockets.forEach(s => s.send(msg));
  });

  // When a socket closes, or disconnects, remove it from the array.
  socket.on('close', function() {
    sockets = sockets.filter(s => s !== socket);
  });
});

console.log(`Server rodando na porta ${port} (${new Date()})`);