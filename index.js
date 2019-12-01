const express = require("express");
const app = express();
const server = require("http").Server(app);
const port = process.env.PORT || 8080;
const io = require("socket.io")(server);

io.on("connection", function(socket) {
  socket.on("forward", function(msg) {
    io.emit("forward", msg);
  });
  socket.on("backward", function(msg) {
    io.emit("backward", msg);
  });
  socket.on("left", function(msg) {
    io.emit("left", msg);
  });
  socket.on("right", function(msg) {
    io.emit("right", msg);
  });
  socket.on("sit", function(msg) {
    io.emit("sit", msg);
  });
});

app.use(express.static("public"));

server.listen(port, () => {
  console.log(`App listening on port ${port}!`);
});
