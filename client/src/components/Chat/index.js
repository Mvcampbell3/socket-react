import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import io from 'socket.io-client';
import './Chat.css'
import API from '../../utils/API';

const Chat = (props) => {

  let socket = useRef(null);
  let ENDPOINT = 'localhost:3001';

  const startSquares = [
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

  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [squares, setSquares] = useState(startSquares);

  const [turn, setTurn] = useState(false);
  const [start, setStart] = useState(false);

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
      socket.current.disconnect();
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

      <div className="tic-holder">
        {squares.map((square, i) => (
          <div key={i} className={square.open ? `square sq${i + 1}` : square.value === 'X' ? `square sq${i + 1} sqx` : `square sq${i + 1} sqo`}>
            {square.open ? null : square.value === 'X' ? 'X' : 'O'}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Chat;