import React, { useEffect, useState, useRef } from 'react';
import './Game.css'

const Game = (props) => {

  const testing = false;
  // let socket = useRef(null);

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

  // useEffect(() => {
  //   if (props.appSocket) {
  //     socket.current = props.appSocket
  //   }

  //   socket.current.emit('testing');

  //   socket.current.on('test back', message => {
  //     console.log(message)
  //   })

  // }, [props.appSocket])

  return (
    <div className="wrapper">
      <h3 className='text-center'>{props.selectedRoom}</h3>

      {testing ? <div className="test-area">
        <h4 className="text-center">Testing Area</h4>
      </div> : null}


      <div className="game-container">
        <div className="square-holder">
          {squares.map(square => (
            <div
              className={square.open ? `square sq${square.place}` :
                square.value === 'X' ? `square sq${square.place} sqx` : `square sq${square.place} sqo`} key={square.place}>{square.value}</div>
          ))}
        </div>
        <div className="chat-holder">
          <div className="message-area">
            {props.messages.map((message, i) => (
              <div className="message" key={i}>{message.content}</div>
            ))}
          </div>
          <div className="input-group">
            <input type="text" placeholder='username...' value={props.username} onChange={(e) => { props.setUsername(e.target.value) }} />
          </div>
          <div className="input-group">
            <input type="text" placeholder='message' value={props.message} onChange={(e) => props.setMessage(e.target.value)} />
          </div>
          <div className="input-group">
            <button onClick={props.sendMessage}>Send Message</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Game;