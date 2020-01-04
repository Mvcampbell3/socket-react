const returnPlayersOrder = (dbRoom, cb) => {
  console.log(dbRoom);

  var randNum = Math.floor((Math.random() * 10000));
  if (randNum > 5000) {
    cb([dbRoom.users[0], dbRoom.users[1]])
  } else {
    cb([dbRoom.users[1], dbRoom.users[0]])
  }
}

module.exports = { returnPlayersOrder }