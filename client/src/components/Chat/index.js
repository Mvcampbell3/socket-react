import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import io from 'socket.io-client';

import API from '../../utils/API';

const Chat = (props) => {

  let socket = useRef(null);
  let ENDPOINT = 'localhost:3001';

  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    console.log('chat loaded')
    socket.current = io(ENDPOINT);

    socket.current.emit('join room', props.room);

    socket.current.on('message back', (message) => {
      console.log(message)
    })

    socket.current.on('room entered', (data) => {
      console.log(data)
    })

    return function() {
      socket.current.emit('leaving room', props.room)
      socket.current.disconnect(props.room);
    }
  }, [ENDPOINT, props.room])

  useEffect(() => {
    API.getMessagesForRoom(props.room)
      .then(result => {
        console.log(result.data);
        setMessages(result.data)
      })
  }, [props.room])

  const onInputHandle = (e) => {
    switch (e.target.name) {
      case 'username':
        setUsername(e.target.value);
        break;
      case 'message':
        setMessage(e.target.value);
        break;
      default:
        console.log('onInputHandle switch not working as expected')
    }
  }

  const sendMessage = () => {
    socket.current.emit('message', { message, room: props.room, username })
  }

  return (
    <div className="chat">
      <h1>This is the chat page</h1>

      <div className="form-container">
        <div className="input-group">
          <label htmlFor="username">Username</label>
          <input type="text" name="username" id="username" value={username} onChange={(e) => { onInputHandle(e) }} />
        </div>
        <div className="input-group">
          <label htmlFor="message">Message</label>
          <input type="text" name="message" id="message" value={message} onChange={(e) => { onInputHandle(e) }} />
        </div>
        <div className="input-group">
          <button onClick={sendMessage}>Send Message</button>
        </div>
      </div>
      <Link to='/'>Home</Link>
    </div>
  );
}

export default Chat;