const express = require('express');
var app = express();
var server = require('http').Server(app);
const PORT = process.env.PORT || 3001;
var io = require('socket.io')(server);
const routes = require('./routes');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(routes)

server.listen(PORT, () => {
  console.log(`server is live at http://localhost:${PORT}`)
})