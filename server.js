const express = require('express');
const http = require('http');
const app = express();
const PORT = process.env.PORT || 3001;
const server = http.Server(app);
const io = require('socket.io')(server);

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/socketreact', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('mongoose is connected');
  })
  .catch(err => {
    console.log(err);
  })

server.listen(PORT, () => {
  console.log(`server is runnning on http://localhost:${PORT}`)
})