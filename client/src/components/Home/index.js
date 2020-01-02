import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css'
import API from '../../utils/API';

const Home = (props) => {

  const [rooms, setRooms] = useState([]);
  const [newRoom, setNewRoom] = useState('');

  useEffect(() => {
    API.getRooms()
      .then(result => {
        console.log(result.data);
        setRooms(result.data);
      })
      .catch(err => console.log(err))
  }, [])

  const deleteRooms = () => {
    API.deleteRooms()
      .then(result => console.log(result))
      .catch(err => console.log(err))
  }

  const handleInputNewRoom = (e) => {
    setNewRoom(e.target.value);
  }

  const createRoom = () => {

  }

  return (
    <div className='home'>
      <h1>This is the Home Page</h1>

      <div className="test-btn-area">
        <button onClick={() => { props.setRoom('testing') }}>test room</button>
        <button onClick={() => { deleteRooms() }}>Delete Rooms</button>
        <Link to='/chat'>Chat</Link>
      </div>

      <hr />
      <div className="rooms-container">
        <div className="left-side">
          <h3>Rooms to play in</h3>
          {rooms.map((room, i) => (
            <button onClick={() => { props.setRoom(room.name) }} key={i}>name: {room.name}</button>
          ))}
        </div>
        <div className="right-side">
          <h3>Create Room</h3>
          <div className="create-room-form">
            <div className="input-group">
              <label htmlFor="name">Room Name</label>
              <input type="text" name="name" id="name" value={newRoom} onChange={(e) => { handleInputNewRoom(e) }} />
            </div>
            <div className="input-group">
              <button className="createBtn" onClick={() => { props.setRoom(newRoom) }}>Create Room</button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Home;