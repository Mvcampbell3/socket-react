import React, { useEffect, useState } from 'react';

const Landing = (props) => {

  const [newRoom, setNewRoom] = useState('');
  const [goChat, setGoChat] = useState('');

  useEffect(() => {
    // props.getRooms()
  })

  const handleNewRoomInput = (e) => {
    setNewRoom(e.target.value)
  }

  const createRoom = () => {
    console.log(newRoom);
  }

  return (
    <div className="landing-container">
      <h3>This is the landing page</h3>
      <button onClick={() => { props.getRooms() }}>Get Rooms</button>

      <div className="form-container">
        <div className="input-group">
          <input type="text" placeholder='Room Name...' value={newRoom} onChange={(e) => { handleNewRoomInput(e) }} />
        </div>
        <div className="input-group">
          <button onClick={createRoom}>Create Room</button>
        </div>
      </div>
      
    </div>
  );
}

export default Landing;