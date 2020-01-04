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
    messages: []
  }

  componentDidMount() {
    this.socketInit()
  }

  // Will contain ALL of the socket.on events
  socketInit = () => {
    this.setState(prevState => {
      prevState.socket = io('localhost:3001');
      return prevState;
    }, () => {
      this.setState({ connected: true })

      this.state.socket.emit('get rooms')


      this.state.socket.on('rooms back', (rooms) => {
        console.log(rooms);
        this.setState(prevState => {
          prevState.rooms = rooms.rooms;
          return prevState;
        })
      })


    })
  }

  render() {
    return (
      <div>
        <Header />
        {this.state.showLanding ? <Landing />
        
        :null}

      </div>
    );
  }
}

export default App;