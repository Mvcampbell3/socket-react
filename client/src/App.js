import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import io from 'socket.io-client';

import Landing from './testpages/Landing';
import Game from './testpages/Game';

// Cannot use router to go to different page
// It will reset the connection
// You can render conditionally on page with redirect

function App() {

  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState('');
  let [landing, setLanding] = useState(true);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState('');

  let socket = useRef(null);
  let ENDPOINT = 'localhost:3001';

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
      // this is where we might want to have goChat be changed
      // have it set here and then run another useEffect inside of landing
      // return a redirect to /game
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

  const sendMessage = () => {
    if (username && selectedRoom && message) {
      socket.current.emit('send message', { username, selectedRoom, message })
    }
  }

  return (
    <div className="App">

      {landing ?
        <Landing
          rooms={rooms}
          getRooms={getRooms}
          joinRoom={joinRoom}
          selectedRoom={selectedRoom}
          setSelectedRoom={setSelectedRoom}
          deleteRooms={deleteRooms}
          appSocket={socket.current}
          setLanding={setLanding}
          landing={landing}
        /> : <Game
          selectedRoom={selectedRoom}
          appSocket={socket.current}
          setLanding={setLanding}
          landing={landing}
          message={message}
          setMessage={setMessage}
          messages={messages}
          setMessages={setMessages}
          username={username}
          setUsername={setUsername}
          sendMessage={sendMessage}
        />}
    </div>
  );
}

export default App;
