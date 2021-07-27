var express = require('express');
var cors = require('cors')

const socket = require("socket.io");
var app = express();
app.use(express.static('assets'));


app.use(express.json()); 

app.use(cors())

var server = app.listen(8081);


app.get('/admin', function (req, res) {
  res.sendFile( __dirname +  "/" + 'adminlogin.html' );
});
app.get('/user', function (req, res) {
  res.sendFile( __dirname +  "/" + 'userlogin.html' );
});

const io = socket(server);
io.on("connection", function (socket) {
  console.log("Made socket connection");

  socket.on("disconnect", function () {
    console.log("Made socket disconnected");
  });

  socket.on("send-notification", function (data) {
    socket.broadcast.emit("new-notification", data);
  });

});
