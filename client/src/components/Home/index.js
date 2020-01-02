import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css'
import API from '../../utils/API';
import Header from '../Header';
import { Redirect } from 'react-router-dom';


const Home = (props) => {

  const [rooms, setRooms] = useState([]);
  const [newRoom, setNewRoom] = useState('');
  const [goChat, setGoChat] = useState(false)

  const testing = true;

  useEffect(() => {
    API.getRooms()
      .then(result => {
        console.log(result.data);
        setRooms(result.data);
      })
      .catch(err => console.log(err))
  }, [])

  const redirectChat = () => {
    if (goChat) {
      return <Redirect to='/chat' />
    }
  }

  const deleteRooms = () => {
    API.deleteRooms()
      .then(result => console.log(result))
      .catch(err => console.log(err))
  }

  const handleInputNewRoom = (e) => {
    setNewRoom(e.target.value);
  }

  const handleRoomBtn = (e) => {
    console.log(e.target.dataset.room);
    props.setRoom(e.target.dataset.room);
    setGoChat(true)
  }

  const createRoom = () => {
    API.checkRoom(newRoom)
      .then(result => {
        console.log(result)
        if (result.data.ok) {
          console.log('would make and send to room');
          props.setRoom(newRoom);
          setGoChat(true)
        } else {
          console.log('room already exists')
          alert(`${newRoom} already exists, pick another room name!`)
        }
      })
      .catch(err => {
        console.log(err);
      })
  }

  return (
    <div className='home'>
      <Header />
      {redirectChat()}
      <div className="rooms-container">
        <div className="left-side">
          <h3 className='text-center'>Open Rooms</h3>

          {rooms.map((room, i) => (
            <button onClick={(e) => { handleRoomBtn(e) }} key={i} data-room={room.name}>name: {room.name}</button>
          ))}

          {testing ? <div className="test-btn-area">
            <button onClick={(e) => { handleRoomBtn(e) }} data-room='testing'>test room</button>
            <button onClick={() => { deleteRooms() }}>Delete Rooms</button>
            <button onClick={() => { setGoChat(true) }}>Go Chat</button>
            <Link to='/chat'>Chat</Link>
          </div> : <></>}

        </div>
        <div className="right-side">
          <h3 className='text-center'>Create Room</h3>
          <div className="create-room-form">
            <div className="input-group">
              <label htmlFor="name">Room Name</label>
              <input type="text" name="name" id="name" value={newRoom} onChange={(e) => { handleInputNewRoom(e) }} />
            </div>
            <div className="input-group">
              <button className="createBtn" data-room={newRoom} onClick={(e) => { createRoom(e) }}>Create Room</button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Home;