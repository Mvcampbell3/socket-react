import React from 'react';

import './Landing.css'

const Landing = (props) => {

  const testing = true;

  return (
    <div className="landing-container">
      <h1>This is the landing page</h1>

      {testing ?
        <div className='test-area'>
          <button className="testBtn">Test Room</button>
          <button className="testBtn" onClick={props.deleteRooms}>Delete Rooms</button>
          <button className="testBtn">Delete Messages</button>
        </div>
        : null}

      <div className="grid-landing">
        <div className="create-room-holder">
          <h3 className="text-center">Create Room</h3>
          <div className="create-room-form">
            <div className="input-group">
              <input className='input-create input-text' type="text" placeholder='Room name...' onChange={(e) => props.handleInputChange(e)} name='newRoomName' value={props.newRoomName} />
            </div>
            <div className="input-group">
              <button className='input-create' onClick={props.createRoom}>Create Room</button>
            </div>
          </div>
        </div>
        <div className="room-holder">
          <h3 className='text-center'>Rooms Open</h3>
          {props.rooms.map((room, i) => (
            <div key={i} className="room">{room.name}</div>
          ))}
        </div>
      </div>


    </div>
  );
}

export default Landing;