import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css'
import API from '../../utils/API';

const Home = (props) => {

  const [rooms, setRooms] = useState([]);

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

  return (
    <div className='home'>
      <h1>This is the Home Page</h1>

      <div className="test-btn-area">
        <button onClick={() => { props.setRoom('testing') }}>test room</button>
        <button onClick={() => {deleteRooms()}}>Delete Rooms</button>
        <Link to='/chat'>Chat</Link>
      </div>

      <hr />
      <div className="rooms-container">
        <h3>Rooms to play in</h3>
        {rooms.map((room, i) => (
          <button onClick={() => { props.setRoom(room.name) }} key={i}>name: {room.name}</button>
        ))}
      </div>

    </div>
  );
}

export default Home;