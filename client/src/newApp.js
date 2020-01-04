import React, { Component } from 'react';

import io from 'socket.io-client';

class App extends Component {

  state = {
    socket: null,
    connected: false,
    messages: []
  }

  componentDidMount() {
    this.setState(prevState => {
      prevState.socket = io('localhost:3001');
      return prevState;
    }, () => {
      this.setState({ connected: true })
      this.state.socket.emit('hello')


      this.state.socket.on('hello back', (id) => {
        console.log(id);
        this.setState(prevState => {
          prevState.messages = [...this.state.messages, id]
          return prevState;
        })
      })
    })
  }



  emitHello = () => {
    this.state.socket.emit('hello');
  }

  clearMessages = () => {
    this.setState({messages: []})
  }

  render() {
    return (
      <div className="container">
        <button onClick={this.emitHello}>Hello</button>
        <button onClick={this.clearMessages}>Clear</button>
        {this.state.messages.map((message, i) => (
          <p key={i}>{message}</p>
        ))}
      </div>
    );
  }
}

export default App;