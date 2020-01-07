'use strict';
module.exports = (sequelize, DataTypes) => {
  const Room = sequelize.define('Room', {
    name: {
      type: DataTypes.STRING
    },
    userIds: {
      type: DataTypes.STRING,
      get() {
        return this.getDataValue('userIds').split(',')
      },
      set(val) {
        this.setDataValue('userIds', val.join(','))
      }
    }
    // users: [DataTypes.STRING]
  }, {});
  Room.associate = function(models) {
    // associations can be defined here
    Room.hasMany(models.Message)
  };
  return Room;
};