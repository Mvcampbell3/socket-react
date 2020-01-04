import React, { Component } from 'react';

import io from 'socket.io-client';

import Header from './components/Header';
import Landing from './components/Landing';
import './App.css'

class App extends Component {

  state = {
    socket: null,
    connected: false,
    showLanding: true,
    rooms: [],
    messages: [],
    newRoomName: '',
    selectedRoom: '',
  }

  componentDidMount() {
    this.socketInit()
  }

  componentWillUnmount() {
    this.state.socket.disconnect();
  }

  createRoom = () => {
    this.setState(prevState => {
      prevState.selectedRoom = prevState.newRoomName;
      return prevState;
    }, () => {
      // join room
      this.joinRoom()
    })
  }

  joinRoom = () => {
    this.state.socket.emit('join room', this.state.selectedRoom);
  }

  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  deleteRooms = () => {
    this.state.socket.emit('delete rooms')
  }

  // Will contain ALL of the socket.on events
  socketInit = () => {
    this.setState(prevState => {
      prevState.socket = io('localhost:3001');
      return prevState;
    }, () => {
      this.setState({ connected: true })

      let { socket } = this.state;

      socket.emit('get rooms')

      socket.on('rooms back', (rooms) => {
        console.log(rooms);
        this.setState(prevState => {
          prevState.rooms = rooms.rooms;
          return prevState;
        })
      })

      socket.on('join room', (data) => {
        console.log(data);
      })
    })
  }

  render() {
    return (
      <div>
        <Header />
        {this.state.showLanding ?

          <Landing
            rooms={this.state.rooms}
            newRoomName={this.state.newRoomName}
            handleInputChange={this.handleInputChange}
            createRoom={this.createRoom}
            deleteRooms={this.deleteRooms}
          />

          : null}

      </div>
    );
  }
}

export default App;