const axios = require('axios');

export default {
  testAxios() {
    return axios.get('/api/test');
  },

  getRooms() {
    return axios.get('/api/room/all')
  },

  getMessagesForRoom(room) {
    return axios.get(`/api/message/all/${room}`)
  }
}