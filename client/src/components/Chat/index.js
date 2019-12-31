import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import io from 'socket.io-client';

const Chat = (props) => {

  let socket = useRef(null);
  let ENDPOINT = 'localhost:3001';

  useEffect(() => {
    console.log('chat loaded')
    socket.current = io(ENDPOINT);

    socket.current.emit('join room', props.room);

    return function() {
      socket.current.emit('leaving room', props.room)
      socket.current.disconnect(props.room);
    }
  }, [ENDPOINT])

  return (
    <div className="chat">
      <h1>This is the chat page</h1>
      <Link to='/'>Home</Link>
    </div>
  );
}

export default Chat;