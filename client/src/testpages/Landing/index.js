import React, { useState } from 'react';
import './Landing.css'

const Landing = (props) => {

  const [newRoom, setNewRoom] = useState('');
  const [goChat, setGoChat] = useState(false);

  const testing = true;

  const handleNewRoomInput = (e) => {
    setNewRoom(e.target.value)
  }

  const createRoom = () => {
    console.log(newRoom);
  }

  return (
    <div className="wrapper">
      <h3>This is the landing page</h3>

      {testing ?
        <div className='test-area'>
          <h4 className='text-center'>Testing Area</h4>
          <div className="testing-box">
            <button onClick={() => { props.getRooms() }}>Get Rooms</button>
          </div>
        </div>
        : null
      }

      <div className="landing-container">
        <div className="left-side">
          <div className="form-container">
            <div className="input-group">
              <input type="text" placeholder='Room Name...' value={newRoom} onChange={(e) => { handleNewRoomInput(e) }} />
            </div>
            <div className="input-group">
              <button onClick={createRoom}>Create Room</button>
            </div>
          </div>
        </div>
        <div className="right-side">
          {props.rooms.length > 0 ?
            <>
              {props.rooms.map(room => (
                <div className="room">{room.name}</div>
              ))}
            </>
            : <h4 className='text-center'>There are no rooms yet</h4>
          }
        </div>
      </div>


    </div>
  );
}

export default Landing;