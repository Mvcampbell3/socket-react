const returnPlayersOrder = (cb) => {
  var randNum = Math.floor((Math.random() * 10000));
  if (randNum > 5000) {
    cb(0, 1)
  } else {
    cb(1, 0)
  }
}

module.exports = { returnPlayersOrder }