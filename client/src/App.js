import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import io from 'socket.io-client';

import Landing from './testpages/Landing';
import Game from './testpages/Game';

function App() {
  // state for landing and game component loading
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState('');
  let [landing, setLanding] = useState(true);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState('');
  const [roomId, setRoomId] = useState('');
  const [players, setPlayers] = useState(0);
  let socket = useRef(null);
  let ENDPOINT = 'localhost:3001';
  // state for game play and turns

  const startingSquares = [
    { place: 1, open: true, value: '' },
    { place: 2, open: true, value: '' },
    { place: 3, open: true, value: '' },
    { place: 4, open: true, value: '' },
    { place: 5, open: true, value: '' },
    { place: 6, open: true, value: '' },
    { place: 7, open: true, value: '' },
    { place: 8, open: true, value: '' },
    { place: 9, open: true, value: '' },
  ]

  const [squares, setSquares] = useState(startingSquares);

  useEffect(() => {
    socket.current = io(ENDPOINT);

    console.log(socket)

    socket.current.emit('get rooms');

    // All the sockets.current.on must go in this useEffect?
    // If you want to use them on this component they do
    // Load socket using useEffect/useRef method to carry socket over
    // Create another useEffect for receiving messages there if you want

    socket.current.on('rooms back', ({ rooms }) => {
      console.log({ rooms })
      setRooms(rooms)
    })

    socket.current.on('join room', (data) => {
      console.log(data);
      // setMessages(data.messages);
      console.log(data.dbRoom._id)
      setRoomId(data.dbRoom._id);
      setPlayers(data.dbRoom.users.length);
      setMessages(data.dbRoom.messages)
      setLanding(false);
    })

    socket.current.on('admin message', (message) => {
      console.log(message)
    })

    socket.current.on('update room', () => {
      socket.current.emit('get rooms')
    })

    socket.current.on('message back', ({ result, messages }) => {
      console.log(result);
      console.log(messages)
      setMessages(messages)
    })

    socket.current.on('err send', ({ err }) => {
      console.log(err)
      setSelectedRoom('');
    })

    socket.current.on('left room', () => {
      setSelectedRoom('');
      setLanding(true);
    })

    return function() {
      socket.current.disconnect();
    }
  }, [ENDPOINT, socket])

  useEffect(() => {
    if (selectedRoom) {
      console.log('room has been changed', selectedRoom);
      socket.current.emit('join room', selectedRoom)
    }
  }, [selectedRoom])

  const getRooms = () => {
    socket.current.emit('get rooms')
  }

  const deleteRooms = () => {
    socket.current.emit('delete rooms')
  }

  const deleteMessages = () => {
    socket.current.emit('delete messages');
  }

  const sendMessage = () => {
    if (username && selectedRoom && message && roomId) {
      socket.current.emit('send message', { username, selectedRoom, message, roomId })
    }
  }

  const leaveRoom = () => {
    socket.current.emit('leave room', selectedRoom)
  }

  return (
    <div className="App">

      {landing ?
        <Landing
          rooms={rooms}
          getRooms={getRooms}
          selectedRoom={selectedRoom}
          setSelectedRoom={setSelectedRoom}
          deleteRooms={deleteRooms}
          deleteMessages={deleteMessages}
          appSocket={socket.current}
          setLanding={setLanding}
          landing={landing}
        /> : <Game
          selectedRoom={selectedRoom}
          appSocket={socket.current}
          setLanding={setLanding}
          setSelectedRoom={setSelectedRoom}
          landing={landing}
          message={message}
          setMessage={setMessage}
          messages={messages}
          setMessages={setMessages}
          username={username}
          setUsername={setUsername}
          sendMessage={sendMessage}
          leaveRoom={leaveRoom}
          squares={squares}
          setSquares={setSquares}
          players={players}
        />}
    </div>
  );
}

export default App;
