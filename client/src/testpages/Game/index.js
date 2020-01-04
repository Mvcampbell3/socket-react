import React from 'react';
import './Game.css'

const Game = (props) => {

  const testing = true;

  return (
    <div className="wrapper">
      <h3 className='text-center'>{props.selectedRoom}</h3>

      {testing ? <div className="test-area">
        <h4 className="text-center">Testing Area</h4>
        <div className="test-box">
          <button onClick={props.leaveRoom}>Landing</button>
        </div>
      </div> : null}

      <div className="game-container">

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
  );
}

export default Game;