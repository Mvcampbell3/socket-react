const express = require('express');
const http = require('http');
const app = express();
const PORT = process.env.PORT || 3001;
const server = http.Server(app);
const io = require('socket.io')(server);
require('./controllers/socket')(io);
const routes = require('./routes');

const mongoose = require('mongoose');

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(routes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/socketreact',
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
  .then(() => {
    console.log('mongoose is connected');
  })
  .catch(err => {
    console.log(err);
  })

server.listen(PORT, () => {
  console.log(`server is runnning on http://localhost:${PORT}`)
})