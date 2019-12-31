import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

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

  return (
    <div className='home'>
      <h1>This is the Home Page</h1>
      {rooms.map((room, i) => (
        <button onClick={() => { props.setRoom(room.name) }} key={i}>name: {room.name}</button>
      ))}
      <Link to='/chat'>Chat</Link>
    </div>
  );
}

export default Home;