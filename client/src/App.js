import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import io from 'socket.io-client';

import Landing from './testpages/Landing';
import Game from './testpages/Game';

function App() {

  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState('');

  let socket = useRef(null);
  let ENDPOINT = 'localhost:3001';

  useEffect(() => {
    socket.current = io(ENDPOINT);

    socket.current.emit('get rooms');

    // All the sockets.current.on must go in this useEffect?

    socket.current.on('rooms back', ({rooms}) => {
      console.log({rooms})
      setRooms(rooms)
    })

    socket.current.on('join room', (data) => {
      console.log(data);
    })

    socket.current.on('admin message', (message) => {
      console.log(message)
    })

    socket.current.on('update room', () => {
      socket.current.emit('get rooms')
    })

    return function() {
      socket.current.disconnect();
    }
  }, [ENDPOINT, socket])

  const getRooms = () => {
    socket.current.emit('get rooms')
  }

  const joinRoom = () => {
    socket.current.emit('join room', selectedRoom);
  }

  const deleteRooms = () => {
    socket.current.emit('delete rooms')
  }

  return (
    <div className="App">
      <Router>
        <Switch>
          {/* <Route path='/' exact render={props => <Home {...props} setRoom={setRoom} />}></Route> */}
          {/* <Route path='/chat' exact render={props => <Chat {...props} room={room} />}></Route> */}


          <Route path='/' exact render={props =>
            <Landing
              {...props}
              rooms={rooms}
              getRooms={getRooms}
              joinRoom={joinRoom}
              selectedRoom={selectedRoom}
              setSelectedRoom={setSelectedRoom}
              deleteRooms={deleteRooms}

            />
          } />
          <Route path='/game' exact render={props => <Game {...props} />} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
